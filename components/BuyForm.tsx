'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Package } from '@/lib/types';
import { formatCurrencyEUR } from '@/lib/format';

type Props = {
  product: Product;
  packages: Package[];
};

const packageLabels: Record<string, string> = {
  base: 'Base',
  smart: 'Smart',
  plus: 'Plus',
};

export default function BuyForm({ product, packages }: Props) {
  const router = useRouter();
  const [selectedPackageKey, setSelectedPackageKey] = useState<string>(packages[0]?.package_key || '');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPackage = packages.find(p => p.package_key === selectedPackageKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/quick-buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: product.slug,
          package_key: selectedPackageKey,
          email: email || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      if (result.redirect) {
        router.push(result.redirect);
      } else {
        // Fallback if no redirect URL is provided
        router.push('/wallet?success=1');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
      <div>
        <h1 className="text-[#0e121b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
          Seleziona il Tuo Pacchetto
        </h1>
        <div className="flex flex-col gap-3 p-4">
          {packages.map((pkg) => (
            <label key={pkg.package_key} className="flex items-center gap-4 rounded-xl border border-solid border-[#d0d7e7] p-[15px] flex-row-reverse cursor-pointer">
              <input
                type="radio"
                name="pack"
                value={pkg.package_key}
                checked={selectedPackageKey === pkg.package_key}
                onChange={(e) => setSelectedPackageKey(e.target.value)}
                className="h-5 w-5 border-2 border-[#d0d7e7] bg-transparent text-transparent checked:border-[#081c44] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0"
              />
              <div className="flex grow flex-col">
                <p className="text-[#0e121b] text-sm font-medium leading-normal">{packageLabels[pkg.package_key]}</p>
                <p className="text-[#4e6797] text-sm font-normal leading-normal">{pkg.entries} attivazioni</p>
              </div>
              <p className="text-[#0e121b] text-sm font-bold">{formatCurrencyEUR(pkg.price_eur)}</p>
            </label>
          ))}
        </div>
        <div className="px-4 pt-2">
            <label htmlFor="email" className="text-[#0e121b] text-sm font-medium">Email (Opzionale)</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Per ricevere la ricevuta"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div className="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-14 justify-between mt-4">
          <p className="text-[#0e121b] text-base font-normal leading-normal flex-1 truncate">Totale</p>
          <div className="shrink-0">
            <p className="text-[#0e121b] text-base font-bold">
              {selectedPackage ? formatCurrencyEUR(selectedPackage.price_eur) : 'Seleziona un pacchetto'}
            </p>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm px-4 mt-2">{error}</p>}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading || !selectedPackage}
          className="flex w-full items-center justify-center rounded-xl h-12 px-5 bg-[#081c44] text-[#f8f9fc] text-base font-bold disabled:bg-gray-400"
        >
          {isLoading ? 'Processing...' : 'Procedi al Pagamento'}
        </button>
      </div>
    </form>
  );
}
