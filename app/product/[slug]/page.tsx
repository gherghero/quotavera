import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import { formatCurrencyEUR, progressPct } from '@/lib/format';

// Re-enable caching after data is dynamic
export const revalidate = 0;

type Props = {
  params: { slug: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params;
  const supabase = createBrowserClient();

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (productError || !product) {
    console.error(`Product with slug "${slug}" not found.`, productError);
    notFound();
  }

  const progress = progressPct(product.activations_count, product.target_activations);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between font-sans">
      <div className="pb-32">
        {/* Header */}
        <div className="flex items-center p-4">
          <Link href="/" className="text-[#0e121b] p-2 -ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-center flex-1 pr-6">{product.name}</h1>
        </div>

        {/* Image Gallery */}
        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" style={{ backgroundImage: `url("${product.cover_url}")` }}></div>

        <div className="p-4 space-y-4">
          {/* Product Info */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-[#4e6797]">Valore Stimato</p>
              <p className="font-bold text-lg">{formatCurrencyEUR(product.est_value_eur)}</p>
            </div>
            <div>
              <p className="text-sm text-[#4e6797]">Consegna Stimata</p>
              <p className="font-bold text-lg">{product.eta_low_days}-{product.eta_high_days} giorni</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <h3 className="font-bold text-lg mb-2">Progresso</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-center mt-2">
              {product.activations_count} / {product.target_activations} attivazioni ({Math.round(progress)}%)
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-lg mb-2">Descrizione</h3>
            <p className="text-[#4e6797]">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f8f9fc] border-t border-gray-200">
        <div className="p-4">
          <Link
            href={`/product/${slug}/buy`}
            className="flex w-full items-center justify-center rounded-xl h-12 px-5 bg-[#081c44] text-[#f8f9fc] text-base font-bold"
          >
            Attiva Pass
          </Link>
        </div>
      </div>
    </div>
  );
}