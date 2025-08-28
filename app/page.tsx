import Link from 'next/link';
import Image from 'next/image';
import { createServerClient } from '@/lib/supabase';
import { formatCurrencyEUR, progressPct } from '@/lib/format';
import BottomNav from '@/components/BottomNav';

export const revalidate = 0;

export default async function Home({ searchParams }: { searchParams: { cat?: string } }) {
  const cat = searchParams?.cat;
  const supabase = createServerClient();

  let query = supabase
    .from('products')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (cat) {
    query = query.eq('category', cat);
  }

  const { data: products, error } = await query;

  if (error) {
    return <div className="p-4 text-red-500">Errore caricamento prodotti: {error.message}</div>;
  }

  const filters = [
    { label: 'Tutti', v: undefined },
    { label: 'Orologi', v: 'orologi' },
    { label: 'Auto', v: 'auto' },
    { label: 'Borse', v: 'borse' },
    { label: 'Case', v: 'case' },
    { label: 'Altro', v: 'altro' },
  ];

  return (
    <div className="pb-20">
      <header className="p-4">
        <h1 className="text-2xl font-bold text-[#0e121b] text-center">QuotaVera</h1>
      </header>

      <div className="px-4 pb-4 flex gap-2 overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.v ? `/?cat=${f.v}` : '/'}
            className={`px-4 h-9 rounded-full flex items-center justify-center text-sm font-medium whitespace-nowrap ${
              cat === f.v || (!cat && !f.v)
                ? 'bg-[#081c44] text-white'
                : 'bg-[#e7ebf3] text-[#0e121b]'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <main className="px-4 space-y-4">
        {products?.map((p) => {
          const pct = progressPct(p.activations_count, p.target_activations);
          return (
            <Link key={p.id} href={`/product/${p.slug}`} className="block bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <Image
                  src={p.cover_url}
                  alt={p.name}
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-lg">{p.name}</h2>
                <p className="text-sm text-gray-600">
                  Valore stimato: {formatCurrencyEUR(p.est_value_eur)}
                </p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#081c44] h-2 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-right text-gray-500 mt-1">
                    {p.activations_count}/{p.target_activations} ({Math.round(pct)}%)
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </main>

      <div className="fixed bottom-0 left-0 right-0">
        <BottomNav active="home" />
      </div>
    </div>
  );
}