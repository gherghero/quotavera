import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { slug, packageKey, payMethod } = body || {};
    if (!slug || !packageKey || !payMethod) {
      return NextResponse.json({ error: 'missing fields' }, { status: 400 });
    }

    // finta latenza
    await new Promise((r) => setTimeout(r, 500));

    const supabase = createServerSupabase();

    // prendo il prodotto
    const { data: p, error: findErr } = await supabase
      .from('products')
      .select('id, activations_count, target_activations')
      .eq('slug', slug)
      .single();

    if (findErr || !p) {
      return NextResponse.json({ error: 'product not found' }, { status: 404 });
    }

    // +1 attivazione (demo)
    const newCount = (p.activations_count ?? 0) + 1;

    const { error: updErr } = await supabase
      .from('products')
      .update({ activations_count: newCount })
      .eq('id', p.id);

    if (updErr) {
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      activations_count: newCount,
      target_activations: p.target_activations ?? 0,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'error' }, { status: 500 });
  }
}
