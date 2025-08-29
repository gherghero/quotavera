import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { createServiceClient } from '@/lib/supabase';
import { getOrSetClientId } from '@/lib/cookies';

const quickBuySchema = z.object({
  slug: z.string().min(1),
  package_key: z.enum(['base', 'smart', 'plus']),
  email: z.string().email().optional(),
});

async function parseBody(req: NextRequest) {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
    const form = await req.formData();
    return {
      mode: 'form' as const,
      data: {
        slug: String(form.get('slug') ?? ''),
        package_key: String(form.get('package_key') ?? '') as 'base' | 'smart' | 'plus',
        email: form.get('email') ? String(form.get('email')) : undefined,
      },
    };
  }
  // default: JSON
  const json = await req.json().catch(() => null);
  return { mode: 'json' as const, data: json };
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  let orderId: string | null = null;

  const { mode, data } = await parseBody(req);
  const validation = quickBuySchema.safeParse(data);

  const redirect = (pathname: string) => NextResponse.redirect(new URL(pathname, req.url), 303);

  if (!validation.success) {
    if (mode === 'form') return redirect('/wallet?error=invalid');
    return NextResponse.json(
      { error: 'Invalid request body', details: validation.error.flatten() },
      { status: 400 }
    );
  }

  const { slug, package_key, email } = validation.data;

  try {
    // 1. Product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (productError || !product) {
      return mode === 'form'
        ? redirect('/wallet?error=product_not_found')
        : NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    if (product.status !== 'open') {
      return mode === 'form'
        ? redirect('/wallet?error=product_closed')
        : NextResponse.json({ error: 'Product is not available' }, { status: 400 });
    }

    // 2. Package
    const { data: pkg, error: packageError } = await supabase
      .from('packages')
      .select('*')
      .eq('product_id', product.id)
      .eq('package_key', package_key)
      .single();

    if (packageError || !pkg) {
      return mode === 'form'
        ? redirect('/wallet?error=package_not_found')
        : NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    // 3. Client ID da cookie
    const clientId = getOrSetClientId(req.cookies);

    // 4. Crea ordine (pending)
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
      return mode === 'form'
        ? redirect('/wallet?error=create_order')
        : NextResponse.json({ error: 'Could not create order' }, { status: 500 });
    }
    orderId = newOrder.id;

    // 5. Simula pagamento → paid
    const { error: updateOrderStatusError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId);

    if (updateOrderStatusError) {
      throw new Error(`Failed to update order status: ${updateOrderStatusError.message}`);
    }

    // 6. Genera ticket + QR e carica su Storage
    const origin = req.nextUrl.origin;
    const ticketsToInsert: Array<{
      id: string;
      order_id: string;
      product_id: string;
      serial: string;
      qr_url: string;
      asset_url: string | null;
    }> = [];

    for (let i = 0; i < pkg.entries; i++) {
      const ticketId = uuidv4();
      const serial = `${product.slug}-${nanoid(10)}`;
      const passUrl = `${origin}/pass/${ticketId}`;

      const qrCodeBuffer = await QRCode.toBuffer(passUrl, { type: 'png' });

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

      const {
        data: { publicUrl: qr_url },
      } = supabase.storage.from('digital-passes').getPublicUrl(qrPath);

      ticketsToInsert.push({
        id: ticketId,
        order_id: orderId,
        product_id: product.id,
        serial,
        qr_url,
        asset_url: product.cover_url || null,
      });
    }

    const { error: insertTicketsError } = await supabase
      .from('tickets')
      .insert(ticketsToInsert);

    if (insertTicketsError) {
      throw new Error(`Failed to insert tickets: ${insertTicketsError.message}`);
    }

    // 7. Aggiorna contatore attivazioni (best-effort)
    const { data: currentProduct } = await supabase
      .from('products')
      .select('activations_count')
      .eq('id', product.id)
      .single();

    if (currentProduct) {
      const newCount = (currentProduct.activations_count || 0) + pkg.entries;
      await supabase.from('products').update({ activations_count: newCount }).eq('id', product.id);
    }

    // 8. Risposta finale
    if (mode === 'form') return redirect('/wallet?success=1');
    return NextResponse.json({ ok: true, order_id: orderId });
  } catch (error: any) {
    console.error('Quick-buy process failed:', error);
    if (orderId) {
      await createServiceClient().from('orders').update({ status: 'failed' }).eq('id', orderId);
    }
    if (mode === 'form') return NextResponse.redirect(new URL('/wallet?error=1', req.url), 303);
    return NextResponse.json({ error: 'Unexpected error', details: error?.message }, { status: 500 });
  }
}
