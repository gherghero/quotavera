// app/api/quick-buy/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { createServiceClient } from '@/lib/supabase';
import { getOrSetClientId } from '@/lib/cookies';

const quickBuySchema = z.object({
  slug: z.string(),
  package_key: z.enum(['base', 'smart', 'plus']),
  email: z.string().email().optional(),
});

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // --- Modalità FORM: redirect al checkout (quello che cerca Jules) ---
  const ctype = req.headers.get('content-type') || '';
  if (
    ctype.includes('application/x-www-form-urlencoded') ||
    ctype.includes('multipart/form-data')
  ) {
    try {
      const form = await req.formData();
      const slug = String(form.get('pid') || form.get('slug') || '');
      const pkg = String(form.get('pkg') || form.get('package_key') || 'base');
      if (!slug) return NextResponse.json({ error: 'Missing slug/pid' }, { status: 400 });

      const url = new URL(
        `/checkout?pid=${encodeURIComponent(slug)}&pkg=${encodeURIComponent(pkg)}`,
        req.nextUrl
      );
      return NextResponse.redirect(url);
    } catch {
      // se fallisce, si continua con la modalità JSON sotto
    }
  }

  // --- Modalità JSON: la tua logica completa (ordine, ticket, QR, ecc.) ---
  const supabase = createServiceClient();
  let orderId: string | null = null;

  try {
    const body = await req.json();
    const validation = quickBuySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { slug, package_key, email } = validation.data;

    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    if (productError || !product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    if (product.status !== 'open') {
      return NextResponse.json({ error: 'Product is not available for purchase' }, { status: 400 });
    }

    const { data: pkg, error: packageError } = await supabase
      .from('packages')
      .select('*')
      .eq('product_id', product.id)
      .eq('package_key', package_key)
      .single();
    if (packageError || !pkg) return NextResponse.json({ error: 'Package not found' }, { status: 404 });

    const clientId = getOrSetClientId(req.cookies);

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

    const { error: updateOrderStatusError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId);
    if (updateOrderStatusError) throw new Error(`Failed to update order status: ${updateOrderStatusError.message}`);

    const origin = req.nextUrl.origin;
    const ticketsToInsert: Array<{id:string;order_id:string;product_id:string;serial:string;qr_url:string;asset_url:string;}> = [];

    for (let i = 0; i < pkg.entries; i++) {
      const ticketId = uuidv4();
      const serial = `${product.slug}-${nanoid(10)}`;
      const passUrl = `${origin}/pass/${ticketId}`;
      const qrCodeBuffer = await QRCode.toBuffer(passUrl, { type: 'png' });

      const qrPath = `qr/${orderId}/${serial}.png`;
      const { error: uploadError } = await supabase.storage
        .from('digital-passes')
        .upload(qrPath, qrCodeBuffer, { contentType: 'image/png', upsert: true });
      if (uploadError) throw new Error(`Failed to upload QR code: ${uploadError.message}`);

      const { data: { publicUrl: qr_url } } =
        supabase.storage.from('digital-passes').getPublicUrl(qrPath);

      ticketsToInsert.push({
        id: ticketId,
        order_id: orderId,
        product_id: product.id,
        serial,
        qr_url,
        asset_url: product.cover_url,
      });
    }

    const { error: insertTicketsError } = await supabase.from('tickets').insert(ticketsToInsert);
    if (insertTicketsError) throw new Error(`Failed to insert tickets: ${insertTicketsError.message}`);

    const { data: currentProduct, error: readError } = await supabase
      .from('products').select('activations_count').eq('id', product.id).single();
    if (readError || !currentProduct) throw new Error('Could not read product to increment activations.');

    const newCount = currentProduct.activations_count + pkg.entries;
    const { error: updateProductError } =
      await supabase.from('products').update({ activations_count: newCount }).eq('id', product.id);
    if (updateProductError) console.error('Failed to increment product activations:', updateProductError.message);

    return NextResponse.json({ ok: true, redirect: '/wallet?success=1' });
  } catch (error: any) {
    console.error('Quick-buy process failed:', error);
    if (orderId) {
      await createServiceClient().from('orders').update({ status: 'failed' }).eq('id', orderId);
    }
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
}

// opzionale per GET
export async function GET(req: NextRequest) {
  const pid = req.nextUrl.searchParams.get('pid');
  const pkg = req.nextUrl.searchParams.get('pkg');
  return NextResponse.redirect(new URL(`/checkout?pid=${encodeURIComponent(String(pid))}&pkg=${encodeURIComponent(String(pkg))}`, req.nextUrl));
}
