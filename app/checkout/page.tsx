// app/checkout/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase-server';
import BuyForm from '@/components/BuyForm';

export const revalidate = 0;

type Search = { pid?: string; pkg?: 'base' | 'smart' | 'plus' };

export default async function CheckoutPage({ searchParams }: { searchParams: Search }) {
  const slug = searchParams?.pid;
  if (!slug) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold mb-2">Checkout</h1>
        <p className="text-sm text-gray-600">Parametro mancante: pid.</p>
        <Link href="/" className="text-blue-600 underline mt-4 inline-block">Torna ai beni</Link>
      </main>
    );
  }

  const supabase = createServerSupabase();

  const { data: product, error: pErr } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (pErr || !product) notFound();

  const { data: packages, error: kErr } = await supabase
    .from('packages')
    .select('package_key, entries, price_eur')
    .eq('product_id', product.id)
    .order('price_eur', { ascending: true });

  if (kErr || !packages?.length) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold mb-2">Checkout</h1>
        <p className="text-sm text-gray-600">Pacchetti non disponibili per questo bene.</p>
        <Link href={`/product/${slug}`} className="text-blue-600 underline mt-4 inline-block">Torna al bene</Link>
      </main>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f8f9fc] justify-between font-sans">
      <div>
        <div className="flex items-center p-4">
          <Link href={`/product/${slug}`} className="text-[#0e121b] p-2 -ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-center flex-1 pr-6">Checkout</h1>
        </div>

        <div className="p-4">
          <div className="rounded-xl border border-[#d0d7e7] bg-white p-4 flex gap-4 items-center">
            <div
              className="bg-center bg-cover rounded-lg w-28 h-20 shrink-0"
              style={{ backgroundImage: `url("${product.cover_url}")` }}
            />
            <div className="flex-1">
              <p className="text-[#0e121b] font-semibold">{product.name}</p>
              <p className="text-[#4e6797] text-sm">Valore stimato: {Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(product.est_value_eur)}</p>
            </div>
          </div>
        </div>

        <BuyForm
          slug={slug}
          packages={packages as any}
          defaultPkg={searchParams?.pkg}
        />
      </div>
    </div>
  );
}