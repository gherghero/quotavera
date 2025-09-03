import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'missing slug' }, { status: 400 });
  }

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('slug, activations_count, target_activations')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  return NextResponse.json({
    slug: data.slug,
    activations_count: data.activations_count ?? 0,
    target_activations: data.target_activations ?? 0,
  });
}
