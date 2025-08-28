// app/api/quick-buy/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { createServiceClient } from '@/lib/supabase';
import { getOrGenerateClientId } from '@/lib/cookies';

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
        req.url
      );
      return NextResponse.redirect(url, 307);
    } catch {
      // se fallisce, si continua con la modalità JSON sotto
    }
  }

  // --- Modalità JSON: la tua logica completa (ordine, ticket, QR, ecc.) ---
  const supabase = createServiceClient();
  let orderId: string | null = null;
  const { clientId, isNew } = getOrGenerateClientId(req.cookies);
  let response: NextResponse;

  try {
    const body = await req.json();
    const validation = quickBuySchema.safeParse(body);

    if (!validation.success) {
      response = NextResponse.json(
        { error: 'Invalid request body', details: validation.error.flatten() },
        { status: 400 }
      );
    } else {
      const { slug, package_key, email } = validation.data;

      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (productError || !product) {
        response = NextResponse.json({ error: 'Product not found' }, { status: 404 });
      } else if (product.status !== 'open') {
        response = NextResponse.json({ error: 'Product is not available for purchase' }, { status: 400 });
      } else {
        const { data: pkg, error: packageError } = await supabase
          .from('packages')
          .select('*')
          .eq('product_id', product.id)
          .eq('package_key', package_key)
          .single();

        if (packageError || !pkg) {
          response = NextResponse.json({ error: 'Package not found' }, { status: 404 });
        } else {
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
            response = NextResponse.json({ error: 'Could not create order' }, { status: 500 });
          } else {
            orderId = newOrder.id;

            const { error: updateOrderStatusError } = await supabase
              .from('orders')
              .update({ status: 'paid' })
              .eq('id', orderId);
            if (updateOrderStatusError) throw new Error(`Failed to update order status: ${updateOrderStatusError.message}`);

            const origin = req.nextUrl.origin;
            const ticketsToInsert: Array<{id:string;order_id:string;product_id:string;serial:string;qr_url:string;asset_url:string;}> = [];

            if (!orderId) {
              throw new Error('Order ID is not available after creation.');
            }

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

            response = NextResponse.json({ ok: true, redirect: '/wallet?success=1' });
          }
        }
      }
    }
  } catch (error: any) {
    console.error('Quick-buy process failed:', error);
    if (orderId) {
      await createServiceClient().from('orders').update({ status: 'failed' }).eq('id', orderId);
    }
    response = NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }

  if (isNew) {
    const COOKIE_NAME = process.env.NEXT_PUBLIC_CLIENT_COOKIE || 'quotavera_client_id';
    const oneYearInSeconds = 365 * 24 * 60 * 60;
    response.cookies.set(COOKIE_NAME, clientId, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: oneYearInSeconds,
    });
  }

  return response;
}
