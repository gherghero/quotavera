'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type PkgKey = 'base' | 'smart' | 'plus';
type Pkg = { package_key: PkgKey; entries: number; price_eur: number };

type Props = {
  slug: string;
  packages: Pkg[];
  defaultPkg?: PkgKey;
};

export default function BuyForm({ slug, packages, defaultPkg = 'base' }: Props) {
  const [pkg, setPkg] = useState<PkgKey>(defaultPkg);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const selected = packages.find((p) => p.package_key === pkg);
  const total = selected?.price_eur ?? 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/quick-buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          package_key: pkg,
          email: email || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Ordine non riuscito');
      if (data?.redirect) router.push(data.redirect);
      else router.push('/wallet?success=1');
    } catch (err: any) {
      setError(err.message || 'Errore inatteso');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="p-4 space-y-4">
      <fieldset className="space-y-3">
        {(['base', 'smart', 'plus'] as PkgKey[])
          .filter((k) => packages.some((p) => p.package_key === k))
          .map((k) => {
            const p = packages.find((x) => x.package_key === k)!;
            return (
              <label key={k} className="flex items-center gap-4 rounded-xl border border-[#d0d7e7] p-4">
                <input
                  type="radio"
                  name="package"
                  className="h-5 w-5"
                  checked={pkg === k}
                  onChange={() => setPkg(k)}
                />
                <div className="flex grow items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[#0e121b] text-sm font-medium leading-normal">
                      {k === 'base' ? 'Base' : k === 'smart' ? 'Smart' : 'Plus'}
                    </p>
                    <p className="text-[#4e6797] text-sm leading-normal">{p.entries} attivazione{p.entries > 1 ? 'i' : ''}</p>
                  </div>
                  <div className="text-[#0e121b] text-sm font-medium">{p.price_eur.toFixed(2)} €</div>
                </div>
              </label>
            );
          })}
      </fieldset>

      <div className="space-y-2">
        <label className="block text-sm text-[#0e121b]">Email (opzionale)</label>
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl h-12 p-3 bg-[#e7ebf3] text-[#0e121b] outline-none border-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-base">Totale</p>
        <p className="text-base font-semibold">{total.toFixed(2)} €</p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !selected}
        className="flex w-full items-center justify-center rounded-xl h-12 px-5 bg-[#081c44] text-[#f8f9fc] text-base font-bold disabled:opacity-60"
      >
        {loading ? 'Attivazione…' : 'Paga e attiva'}
      </button>

      <p className="text-[#4e6797] text-xs text-center">
        Procedendo, accetti Termini &amp; Condizioni del concorso. Il bene digitale è incluso con l’acquisto.
      </p>
    </form>
  );
}
