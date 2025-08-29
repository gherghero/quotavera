'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Pack = {
  package_key: string;   // 'base' | 'smart' | 'plus'
  price_eur: number;
  entries: number;
};

export default function CheckoutSheet({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [packs, setPacks] = useState<Pack[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(`/api/packages?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((j) => setPacks(j?.packages ?? []))
      .catch(() => setPacks([]))
      .finally(() => setLoading(false));
  }, [open, slug]);

  const goCheckout = (pkg: string) => {
    router.push(
      `/checkout?pid=${encodeURIComponent(slug)}&pkg=${encodeURIComponent(pkg)}`
    );
  };

  const keyLabel = (k: string) =>
    k === 'base' ? 'Base' : k === 'smart' ? 'Smart' : k === 'plus' ? 'Plus' : k;

  const fmt = (n: number) =>
    n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const entriesLabel = (n: number) => (n === 1 ? '1 accesso' : `${n} accessi`);

  return (
    <>
      {/* CTA fissa in basso */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f8f9fc] border-t border-gray-200">
        <div className="p-4">
          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center rounded-xl h-12 px-5 bg-[#081c44] text-[#f8f9fc] text-base font-bold"
          >
            Attiva Pass
          </button>
        </div>
      </div>

      {/* Overlay + Sheet */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Scegli il tuo Pass</h3>
                <button
                  aria-label="Chiudi"
                  className="p-2 -mr-2"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
              <p className="text-[11px] text-[#4e6797] mt-2">
                L’acquisto del bene digitale ti dà diritto agli accessi indicati.
                Termini e criteri di idoneità si applicano.
              </p>

              <div className="mt-4 space-y-3">
                {loading && (
                  <div className="text-sm text-[#4e6797]">Caricamento…</div>
                )}

                {!loading && packs.length === 0 && (
                  <div className="text-sm text-[#4e6797]">
                    Nessun pacchetto disponibile per questo prodotto.
                  </div>
                )}

                {!loading &&
                  packs.map((p) => (
                    <div
                      key={p.package_key}
                      className="border rounded-xl p-3 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-semibold">
                          {keyLabel(p.package_key)}
                        </div>
                        <div className="text-xs text-[#4e6797]">
                          {entriesLabel(p.entries)}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold">
                          {fmt(p.price_eur)}
                        </div>
                        <button
                          onClick={() => goCheckout(p.package_key)}
                          className="h-9 px-4 rounded-lg bg-[#081c44] text-white text-sm font-bold"
                        >
                          Procedi
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
