import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase-server';
import { formatCurrencyEUR } from '@/lib/format';

export const revalidate = 0;

type SearchParams = {
  pid?: string; // product slug
  pkg?: string; // pre-selezione opzionale: base | smart | plus
};

type Product = {
  id: string;
  slug: string;
  name: string;
  cover_url: string;
  est_value_eur: number;
};

type Pkg = {
  package_key: 'base' | 'smart' | 'plus' | string;
  price_eur: number;
  entries: number;
};

function humanLabel(key: string): string {
  switch (key) {
    case 'base': return 'Base';
    case 'smart': return 'Smart';
    case 'plus': return 'Plus';
    default: return key;
  }
}

export default async function CheckoutPage({ searchParams }: { searchParams: SearchParams }) {
  const pid = searchParams.pid;
  if (!pid) redirect('/');

  const supabase = createServerSupabase();

  const { data: product, error: pErr } = await supabase
    .from('products')
    .select('id, slug, name, cover_url, est_value_eur')
    .eq('slug', pid)
    .single();

  if (pErr || !product) {
    console.error('Checkout: prodotto non trovato', pErr);
    notFound();
  }

  const { data: pkgsRaw, error: kErr } = await supabase
    .from('packages')
    .select('package_key, price_eur, entries')
    .eq('product_id', product.id)
    .order('price_eur', { ascending: true });

  if (kErr) {
    console.error('Checkout: errore caricando pacchetti', kErr);
  }

  const packages: Pkg[] = pkgsRaw ?? [];
  if (packages.length === 0) {
    // fallback: mostra info minime
    return (
      <div className="min-h-screen bg-[#f8f9fc]">
        <div className="flex items-center p-4">
          <Link href="/" className="text-[#0e121b] p-2 -ml-2" aria-label="Torna alla home">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-center flex-1 pr-6">Checkout</h1>
        </div>
        <div className="p-4 space-y-4">
          <div className="rounded-xl bg-white p-4 shadow">
            <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                 style={{ backgroundImage: `url("${product.cover_url}")` }} />
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p className="text-[#4e6797]">Valore stimato: {formatCurrencyEUR(product.est_value_eur)}</p>
            <p className="text-sm text-red-600 mt-2">Nessun pacchetto configurato per questo prodotto.</p>
          </div>
        </div>
      </div>
    );
  }

  const initialKey = (searchParams.pkg as string) || packages[0]?.package_key || 'base';

  // Render server + piccola logica client via <script> inline per la selezione/submit JSON
  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Header */}
      <div className="flex items-center p-4">
        <Link href="/" className="text-[#0e121b] p-2 -ml-2" aria-label="Torna alla home">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-center flex-1 pr-6">Checkout</h1>
      </div>

      <div className="p-4 space-y-5 pb-28">
        {/* Riepilogo prodotto */}
        <div className="rounded-2xl bg-white p-4 shadow">
          <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
               style={{ backgroundImage: `url("${product.cover_url}")` }} />
          <h2 className="text-xl font-bold mt-4">{product.name}</h2>
          <p className="text-[#4e6797]">Valore stimato: {formatCurrencyEUR(product.est_value_eur)}</p>
        </div>

        {/* Selettore pacchetti */}
        <div className="space-y-3" id="pkg-list">
          <h3 className="font-bold text-lg">Scegli il pacchetto</h3>

          {packages.map((pk) => (
            <button
              key={pk.package_key}
              type="button"
              data-pkg={pk.package_key}
              className="pkg-card w-full text-left rounded-2xl border border-gray-200 bg-white p-4 shadow hover:border-[#081c44] focus:outline-none"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-bold">{humanLabel(pk.package_key)}</div>
                  <div className="text-sm text-[#4e6797]">Include {pk.entries} ingresso{pk.entries > 1 ? 'i' : ''}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold">{formatCurrencyEUR(pk.price_eur)}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA fissa */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f8f9fc] border-t border-gray-200">
        <div className="p-4 flex gap-3">
          <Link
            href={`/product/${encodeURIComponent(product.slug)}`}
            className="flex-1 h-12 rounded-xl border border-gray-300 bg-white text-[#081c44] font-semibold flex items-center justify-center"
          >
            Indietro
          </Link>
          <button
            id="confirmBtn"
            type="button"
            className="flex-[2] h-12 rounded-xl bg-[#081c44] text-white font-bold"
            data-initial={initialKey}
            data-slug={product.slug}
          >
            Conferma e attiva
          </button>
        </div>
      </div>

      {/* Script leggero per selezione e submit JSON a /api/quick-buy */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  const pkgCards = Array.from(document.querySelectorAll('.pkg-card'));
  const confirmBtn = document.getElementById('confirmBtn');
  let selected = confirmBtn?.getAttribute('data-initial') || '${initialKey}';

  function updateSelection() {
    pkgCards.forEach(el => {
      const key = el.getAttribute('data-pkg');
      if (key === selected) {
        el.classList.add('ring-2','ring-[#081c44]','border-[#081c44]');
      } else {
        el.classList.remove('ring-2','ring-[#081c44]','border-[#081c44]');
      }
    });
  }

  pkgCards.forEach(el => {
    el.addEventListener('click', () => {
      selected = el.getAttribute('data-pkg') || selected;
      updateSelection();
    });
  });

  updateSelection();

  async function submitJSON() {
    const slug = confirmBtn?.getAttribute('data-slug');
    if (!slug) return;

    confirmBtn.setAttribute('disabled','true');
    confirmBtn.textContent = 'Attivazione...';

    try {
      const res = await fetch('/api/quick-buy', {
        method: 'POST',
        headers: { 'content-type':'application/json' },
        body: JSON.stringify({ slug, package_key: selected })
      });

      const out = await res.json().catch(() => ({}));
      if (out && out.redirect) {
        window.location.href = out.redirect;
        return;
      }
      if (out && out.ok && out.wallet_url) {
        window.location.href = out.wallet_url;
        return;
      }
      // fallback
      alert('Richiesta inviata. Verifica il wallet.');
      window.location.href = '/wallet';
    } catch (e) {
      console.error(e);
      alert('Si è verificato un errore, riprova.');
    } finally {
      confirmBtn.removeAttribute('disabled');
      confirmBtn.textContent = 'Conferma e attiva';
    }
  }

  confirmBtn?.addEventListener('click', submitJSON);
})();
          `,
        }}
      />
    </div>
  );
}
