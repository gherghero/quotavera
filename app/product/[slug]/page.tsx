import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import { formatCurrencyEUR, progressPct } from '@/lib/format';

export const revalidate = 0;

type Props = { params: { slug: string } };

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
    <div className="bg-[#f8f9fc] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-center text-[#081c44]">{product.name}</h1>
      </div>

      {/* Image */}
      <img
        src={product.cover_url}
        alt={product.name}
        className="w-full aspect-square object-cover"
      />

      <div className="p-4 space-y-4">
        {/* Info */}
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

        {/* Progress */}
        <div>
          <h3 className="font-bold text-lg mb-2">Progresso</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-center mt-2">
            {product.activations_count} / {product.target_activations} attivazioni ({Math.round(progress)}%)
          </p>
        </div>

        {/* Descrizione */}
        <div>
          <h3 className="font-bold text-lg mb-2">Descrizione</h3>
          <p className="text-[#4e6797]">{product.description}</p>
        </div>
      </div>

      {/* Bottom Action Button -> POST form */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f8f9fc] border-t border-gray-200">
        <form action="/api/quick-buy" method="POST" className="p-4 flex w-full">
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="package_key" value="base" />
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl h-12 px-5 bg-[#081c44] text-[#f8f9fc] text-base font-bold"
          >
            Attiva Pass
          </button>
        </form>
      </div>
    </div>
  );
}
