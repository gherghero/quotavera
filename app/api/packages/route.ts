import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'missing slug' }, { status: 400 });
  }

  const supabase = createServerSupabase();

  const { data: product, error: pErr } = await supabase
    .from('products')
    .select('id')
    .eq('slug', slug)
    .single();

  if (pErr || !product) {
    return NextResponse.json({ error: 'product not found' }, { status: 404 });
  }

  const { data: rows, error } = await supabase
    .from('packages')
    .select('package_key, price_eur, entries')
    .eq('product_id', product.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const order = ['base', 'smart', 'plus'];
  const packages = (rows ?? []).sort(
    (a: any, b: any) => order.indexOf(a.package_key) - order.indexOf(b.package_key)
  );

  return NextResponse.json({ packages });
}
