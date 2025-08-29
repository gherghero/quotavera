import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase-server';
import { formatCurrencyEUR, progressPct } from '@/lib/format';
import BuySheet from './BuySheet';

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

type Pkg = {
  package_key: string;
  price_eur: number;
  entries: number;
};

// Render “descrizione” in paragrafi e liste
function renderDescription(desc: string) {
  const lines = (desc ?? '').split('\n');
  const blocks: React.ReactNode[] = [];
  let listBuf: string[] = [];
  let inList = false;

  const pushList = () => {
    if (listBuf.length) {
      const idx = blocks.length;
      blocks.push(
        <ul key={`ul-${idx}`} className="list-disc pl-6 space-y-1 text-[#4e6797]">
          {listBuf.map((item, i) => (
            <li key={`li-${idx}-${i}`}>{item}</li>
          ))}
        </ul>
      );
      listBuf = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    const isBullet = line.startsWith('•') || line.startsWith('- ');
    if (isBullet) {
      inList = true;
      listBuf.push(line.replace(/^•\s?/, '').replace(/^-+\s?/, '').trim());
      continue;
    }
    if (inList) {
      pushList();
      inList = false;
    }
    if (line.length) {
      const idx = blocks.length;
      blocks.push(
        <p key={`p-${idx}`} className="text-[#4e6797] mb-3">
          {line}
        </p>
      );
    } else {
      // Riga vuota = spazio tra paragrafi
      blocks.push(<div key={`sp-${blocks.length}`} className="h-2" />);
    }
  }
  if (inList) pushList();
  return <>{blocks}</>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params;
  const supabase = createServerSupabase();

  const { data: productRaw, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (productError || !productRaw) {
    console.error(`Product with slug "${slug}" not found.`, productError);
    notFound();
  }

  const product = productRaw as Product;
  const progress = progressPct(product.activations_count, product.target_activations);

  // Recupera i pacchetti dal DB (base/smart/plus)
  const { data: packagesData, error: packagesError } = await supabase
    .from('packages')
    .select('package_key, price_eur, entries')
    .eq('product_id', product.id)
    .order('price_eur', { ascending: true });

  if (packagesError) {
    console.error('Packages load error:', packagesError);
  }
  const packages = (packagesData ?? []) as Pkg[];

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
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover"
          style={{ backgroundImage: `url("${product.cover_url}")` }}
          role="img"
          aria-label={product.name}
        />

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
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
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
            {renderDescription(product.description)}
          </div>
        </div>
      </div>

      {/* Bottom sheet con i pacchetti */}
      <BuySheet slug={product.slug} packages={packages} />
    </div>
  );
}
