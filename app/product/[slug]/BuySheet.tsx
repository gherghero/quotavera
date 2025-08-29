'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type Pkg = {
  package_key: 'base' | 'smart' | 'plus' | string;
  price_eur: number;
  entries: number;
};

type Props = {
  slug: string;
  packages: Pkg[];
};

function labelFor(key: string) {
  switch (key) {
    case 'base':  return 'Base';
    case 'smart': return 'Smart';
    case 'plus':  return 'Plus';
    default:      return key;
  }
}

export default function BuySheet({ slug, packages }: Props) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const onChoose = (key: string) => {
    // Vai direttamente alla pagina checkout con path relativo (niente https/localhost)
    router.push(`/checkout?pid=${encodeURIComponent(slug)}&pkg=${encodeURIComponent(key)}`);
  };

  return (
    <>
      {/* CTA fissa in basso */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f8f9fc] border-t border-gray-200">
        <div className="p-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center rounded-xl h-12 px-5 bg-[#081c44] text-[#f8f9fc] text-base font-bold"
          >
            Attiva Pass
          </button>
        </div>
      </div>

      {/* Bottom Sheet semplice */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          {/* sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Scegli il tuo Pass</h3>
              <button
                className="p-2 text-gray-500"
                onClick={() => setOpen(false)}
                aria-label="Chiudi"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {packages?.map((pkg) => (
                <button
                  key={pkg.package_key}
                  onClick={() => onChoose(pkg.package_key)}
                  className="w-full text-left border rounded-xl p-4 hover:bg-gray-50 focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold">{labelFor(pkg.package_key)}</div>
                      <div className="text-sm text-[#4e6797]">
                        {pkg.entries} accesso{pkg.entries === 1 ? '' : 'i'} al concorso
                      </div>
                    </div>
                    <div className="text-base font-bold">
                      {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(pkg.price_eur)}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-[12px] text-[#4e6797]">
              L’acquisto del bene digitale ti dà diritto agli accessi indicati. Termini e criteri di idoneità si applicano.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
