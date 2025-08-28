import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import { formatCurrencyEUR, progressPct } from '@/lib/format';
import BottomNav from '@/components/BottomNav';

// Re-enable caching after data is dynamic
export const revalidate = 0;

export default async function HomePage() {
  const supabase = createBrowserClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, name, est_value_eur, target_activations, activations_count, cover_url')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    // Render an error state or return null
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load products: {error.message}
      </div>
    );
  }

  const featuredProducts = products?.slice(0, 3) || [];
  const allProducts = products || [];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between group/design-root overflow-x-hidden font-sans">
      <div className="pb-24">
        <div className="flex items-center bg-[#f8f9fc] p-4 pb-2 justify-between">
          <h2 className="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            QuotaVera
          </h2>
        </div>
        <h2 className="text-[#0e121b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          In evidenza
        </h2>
        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-3">
            {featuredProducts.map((product) => (
              <Link href={`/product/${product.slug}`} key={product.id} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
                  style={{ backgroundImage: `url("${product.cover_url}")` }}
                ></div>
                <div>
                  <p className="text-[#0e121b] text-base font-medium leading-normal">{product.name}</p>
                  <p className="text-[#4e6797] text-sm font-normal leading-normal">
                    Valore stimato: {formatCurrencyEUR(product.est_value_eur)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Category filters (static for now) */}
        <div className="flex gap-3 p-3 overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#e7ebf3] px-4">
            <p className="text-[#0e121b] text-sm font-medium leading-normal">Tutti</p>
          </div>
        </div>

        <div className="flex flex-col">
          {allProducts.map((product) => {
            const progress = progressPct(product.activations_count, product.target_activations);
            return (
              <Link href={`/product/${product.slug}`} key={product.id} className="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2 border-b border-gray-200">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url("${product.cover_url}")` }}
                ></div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-[#0e121b] text-base font-medium leading-normal line-clamp-1">{product.name}</p>
                  <p className="text-[#4e6797] text-sm font-normal leading-normal line-clamp-2">
                    Valore stimato: {formatCurrencyEUR(product.est_value_eur)}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                   <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% completato</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[#4e6797] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
          Nota legale: I concorsi a premi sono soggetti a termini e condizioni. Si prega di giocare responsabilmente.
        </p>
        <BottomNav />
      </div>
    </div>
  );
}