// app/api/quick-buy/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { createServiceClient } from '@/lib/supabase';
import { getOrSetClientId } from '@/lib/cookies';

const quickBuySchema = z.object({
  slug: z.string(),
  package_key: z.enum(['base', 'smart', 'plus']),
  email: z.string().email().optional(),
});

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // --- Modalità FORM: redirect al checkout ---
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
      // Fallback to JSON mode
    }
  }

  // --- Modalità JSON: crea ordine e ticket ---
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
    const clientId = getOrSetClientId(req.cookies);
    const supabase = createServiceClient();

    // 1. Fetch product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, status')
      .eq('slug', slug)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    if (product.status !== 'open') {
      return NextResponse.json({ error: 'Product is not available for purchase' }, { status: 400 });
    }

    // 2. Fetch package
    const { data: pkg, error: packageError } = await supabase
      .from('packages')
      .select('id, entries, price_eur')
      .eq('product_id', product.id)
      .eq('package_key', package_key)
      .single();

    if (packageError || !pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    // 3. Create Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        product_id: product.id,
        package_key: package_key,
        entries: pkg.entries,
        amount_eur: pkg.price_eur,
        status: 'paid', // Simulate successful payment
        email: email,
        client_id: clientId,
      })
      .select('id')
      .single();

    if (orderError || !order) {
      console.error('Order creation failed:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // 4. Create Tickets
    const ticketsToInsert = Array.from({ length: pkg.entries }, () => ({
      order_id: order.id,
      product_id: product.id,
      serial: nanoid(10).toUpperCase(),
    }));

    const { error: ticketsError } = await supabase.from('tickets').insert(ticketsToInsert);

    if (ticketsError) {
      // Attempt to clean up the created order if ticket creation fails
      await supabase.from('orders').delete().eq('id', order.id);
      console.error('Ticket creation failed:', ticketsError);
      return NextResponse.json({ error: 'Failed to create tickets' }, { status: 500 });
    }

    // 5. Update activations_count on product
    const { error: updateError } = await supabase.rpc('increment_activations', {
      pid: product.id,
      count: pkg.entries,
    });

    if (updateError) {
        console.error('Failed to update activations count:', updateError);
        // This is non-critical, so we just log it and don't fail the request
    }

    return NextResponse.json({ ok: true, redirect: '/wallet?success=1' });

  } catch (error: any) {
    console.error('Quick-buy JSON mode failed:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.', details: error.message },
      { status: 500 }
    );
  }
}
