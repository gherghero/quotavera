import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase';
import Image from 'next/image';
import { formatCurrencyEUR, progressPct } from '@/lib/format';

// Disabilita cache per dati dinamici
export const revalidate = 0;

type Props = {
  params: { slug: string };
};

type Product = {
  id: string;
  slug: string;
  name: string;
  cover_url: string;
  est_value_eur: number;
  eta_low_days: number;
  eta_high_days: number;
  activations_count: number;
  target_activations: number;
  description: string;
  status: string;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params;
  const supabase = createServerClient();

  const { data: productRaw, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single(); // ← niente <Product> qui (causava il parse error in TSX)

  if (productError || !productRaw) {
    console.error(`Product with slug "${slug}" not found.`, productError);
    notFound();
  }

  const product = productRaw as Product;
  const progress = progressPct(product.activations_count, product.target_activations);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between font-sans">
      <div className="pb-32">
        {/* Header */}
        <div className="flex items-center p-4">
          <Link href="/" className="text-[#0e121b] p-2 -ml-2" aria-label="Torna alla home">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-center flex-1 pr-6">{product.name}</h1>
        </div>

        {/* Immagine */}
        <div className="w-full aspect-[4/3] relative">
            <Image
                src={product.cover_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />
        </div>

        <div className="p-4 space-y-4">
          {/* Info prodotto */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-[#4e6797]">Valore Stimato</p>
              <p className="font-bold text-lg">{formatCurrencyEUR(product.est_value_eur)}</p>
            </div>
            <div>
              <p className="text-sm text-[#4e6797]">Consegna Stimata</p>
              <p className="font-bold text-lg">
                {product.eta_low_days}-{product.eta_high_days} giorni
              </p>
            </div>
          </div>

          {/* Barra di progresso */}
          <div>
            <h3 className="font-bold text-lg mb-2">Progresso</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#081c44] h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
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
      </div>

      {/* CTA fissa in basso */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <form action="/api/quick-buy" method="POST">
            <input type="hidden" name="slug" value={product.slug} />
            <input type="hidden" name="package_key" value="base" />
            <button type="submit" className="w-full h-12 bg-[#081c44] text-white rounded-lg font-bold">
                Attiva Pass
            </button>
        </form>
      </div>
    </div>
  );
}
