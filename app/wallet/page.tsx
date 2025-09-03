"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";

type Item = {
  slug: string;
  name: string;
  coverUrl: string | null;
  packageKey: "base" | "smart" | "plus";
  entries: number;
  price_eur: number;
  ts: number;
};

export default function WalletPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qv_wallet_demo");
      setItems(raw ? JSON.parse(raw) : []);
    } catch { /* ignore */ }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0b0d] text-white pb-safe">
      <header className="p-4 pb-2">
        <h1 className="font-display text-[20px] font-bold tracking-[-0.015em]">Portafoglio</h1>
      </header>

      {items.length === 0 ? (
        <p className="font-display text-white/70 px-4 pt-2">Nessun bene attivo (demo). Torna alla scheda di un bene e premi “Attiva Pass”.</p>
      ) : (
        <div className="p-4 grid grid-cols-1 gap-3">
          {items.map((it, i) => (
            <div key={i} className="rounded-xl bg-[#1c1c1e] border border-[#2a2a2b] p-3 flex gap-3">
              {it.coverUrl && <img src={it.coverUrl} alt="" className="size-16 rounded-lg object-cover" />}
              <div className="min-w-0">
                <p className="font-display text-[15px] font-semibold line-clamp-1">{it.name}</p>
                <p className="font-display text-[12px] text-white/70">
                  Pacchetto: {it.packageKey.toUpperCase()} • {it.entries} attivazioni • {it.price_eur.toLocaleString("it-IT",{style:"currency",currency:"EUR"})}
                </p>
                <p className="font-display text-[12px] text-white/60">Attivato il {new Date(it.ts).toLocaleDateString("it-IT")}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav active="wallet" />
    </div>
  );
}
