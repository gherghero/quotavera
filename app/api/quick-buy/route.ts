import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { createServiceClient } from '@/lib/supabase';
import { getOrSetClientId } from '@/lib/cookies';

// Zod schema for request body validation
const quickBuySchema = z.object({
  slug: z.string(),
  package_key: z.enum(['base', 'smart', 'plus']),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  let orderId: string | null = null;

  try {
    const body = await req.json();
    const validation = quickBuySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request body', details: validation.error.flatten() }, { status: 400 });
    }

    const { slug, package_key, email } = validation.data;

    // 1. Fetch product and package
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    if (product.status !== 'open') {
      return NextResponse.json({ error: 'Product is not available for purchase' }, { status: 400 });
    }

    const { data: pkg, error: packageError } = await supabase
      .from('packages')
      .select('*')
      .eq('product_id', product.id)
      .eq('package_key', package_key)
      .single();

    if (packageError || !pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    // 2. Get client_id from cookies
    const clientId = getOrSetClientId(req.cookies);

    // 3. Create a new order (initially pending)
    const orderData = {
      product_id: product.id,
      package_key: pkg.package_key,
      entries: pkg.entries,
      amount_eur: pkg.price_eur,
      status: 'pending' as const,
      email: email || undefined,
      client_id: clientId,
    };

    const { data: newOrder, error: createOrderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select('id')
      .single();

    if (createOrderError || !newOrder) {
      console.error('Failed to create order:', createOrderError);
      return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
    }
    orderId = newOrder.id;

    // 4. Immediately mark order as paid (simulating payment)
    const { error: updateOrderStatusError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId);

    if (updateOrderStatusError) {
      throw new Error(`Failed to update order status: ${updateOrderStatusError.message}`);
    }

    // 5. Generate tickets
    const origin = req.nextUrl.origin;
    const ticketsToInsert = [];

    for (let i = 0; i < pkg.entries; i++) {
      const ticketId = uuidv4();
      const serial = `${product.slug}-${nanoid(10)}`;
      const passUrl = `${origin}/pass/${ticketId}`; // The URL the QR code will point to

      // Generate QR code PNG buffer
      const qrCodeBuffer = await QRCode.toBuffer(passUrl, { type: 'png' });

      // Upload QR code to Supabase Storage
      const qrPath = `qr/${orderId}/${serial}.png`;
      const { error: uploadError } = await supabase.storage
        .from('digital-passes')
        .upload(qrPath, qrCodeBuffer, {
          contentType: 'image/png',
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`Failed to upload QR code: ${uploadError.message}`);
      }

      // Get public URL for the QR code
      const { data: { publicUrl: qr_url } } = supabase.storage
        .from('digital-passes')
        .getPublicUrl(qrPath);

      ticketsToInsert.push({
        id: ticketId,
        order_id: orderId,
        product_id: product.id,
        serial,
        qr_url,
        asset_url: product.cover_url,
      });
    }

    const { error: insertTicketsError } = await supabase
      .from('tickets')
      .insert(ticketsToInsert);

    if (insertTicketsError) {
      throw new Error(`Failed to insert tickets: ${insertTicketsError.message}`);
    }

    // 6. Increment product activations (non-atomic, see note in plan)
    const { data: currentProduct, error: readError } = await supabase
        .from('products')
        .select('activations_count')
        .eq('id', product.id)
        .single();

    if (readError || !currentProduct) {
        throw new Error('Could not read product to increment activations.');
    }

    const newActivationsCount = currentProduct.activations_count + pkg.entries;
    const { error: updateProductError } = await supabase
        .from('products')
        .update({ activations_count: newActivationsCount })
        .eq('id', product.id);

    if (updateProductError) {
        console.error('Failed to increment product activations:', updateProductError.message);
        // Not throwing an error here because the order is already paid.
        // This should be handled with a more robust transactional system.
    }


    // 7. Return success
    return NextResponse.json({ ok: true, redirect: '/wallet?success=1' });

  } catch (error: any) {
    console.error('Quick-buy process failed:', error);

    // If an order was created, mark it as failed
    if (orderId) {
      await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', orderId);
    }

    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
}
