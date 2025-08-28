import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST() {
  const s = createServiceClient();

  // Check if products exist
  const { data: existingProducts, error: countError } = await s.from('products').select('id').limit(1);
  if (countError) {
      // This will fail if the table doesn't exist, which is a good indicator to proceed.
      console.log("Probably table not found, proceeding with seeding...");
  }
  if (existingProducts && existingProducts.length > 0) {
    return NextResponse.json({ ok: true, skipped: true, message: 'Database already seeded.' });
  }

  // Define schema and seed data
  const products = [
    { name: 'Rolex Daytona', slug: 'rolex-daytona', category: 'orologi', cover_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop', est_value_eur: 100000, target_activations: 1000, activations_count: 127, status: 'open', eta_low_days: 7, eta_high_days: 14, description: 'Orologio di lusso iconico, simbolo di precisione e stile. Perfetto per collezionisti e appassionati.' },
    { name: 'Porsche 996 Carrera', slug: 'porsche-996-carrera', category: 'auto', cover_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop', est_value_eur: 50000, target_activations: 500, activations_count: 250, status: 'open', eta_low_days: 10, eta_high_days: 20, description: 'Un classico moderno che offre un\'esperienza di guida pura e coinvolgente. Motore boxer, design senza tempo.' },
    { name: 'Hermès Birkin 30', slug: 'hermes-birkin-30', category: 'borse', cover_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', est_value_eur: 200000, target_activations: 2000, activations_count: 880, status: 'open', eta_low_days: 15, eta_high_days: 30, description: 'La borsa più desiderata al mondo, realizzata a mano dai migliori artigiani. Un investimento in eleganza.' }
  ];

  const { data: insData, error: insError } = await s.from('products').insert(products).select('id,slug');
  if (insError) return NextResponse.json({ error: `Product insert failed: ${insError.message}` }, { status: 500 });

  const ids = insData!;
  const findId = (slug: string) => ids.find(x => x.slug === slug)?.id!;

  const packages = [
    { product_id: findId('rolex-daytona'), package_key: 'base', entries: 1, price_eur: 15 },
    { product_id: findId('rolex-daytona'), package_key: 'smart', entries: 3, price_eur: 40 },
    { product_id: findId('rolex-daytona'), package_key: 'plus', entries: 10, price_eur: 120 },
    { product_id: findId('porsche-996-carrera'), package_key: 'base', entries: 1, price_eur: 10 },
    { product_id: findId('porsche-996-carrera'), package_key: 'smart', entries: 3, price_eur: 25 },
    { product_id: findId('porsche-996-carrera'), package_key: 'plus', entries: 10, price_eur: 80 },
    { product_id: findId('hermes-birkin-30'), package_key: 'base', entries: 1, price_eur: 20 },
    { product_id: findId('hermes-birkin-30'), package_key: 'smart', entries: 3, price_eur: 55 },
    { product_id: findId('hermes-birkin-30'), package_key: 'plus', entries: 10, price_eur: 150 },
  ];

  const { error: insPkgError } = await s.from('packages').insert(packages);
  if (insPkgError) return NextResponse.json({ error: `Package insert failed: ${insPkgError.message}` }, { status: 500 });

  return NextResponse.json({ ok: true, seeded: true });
}
