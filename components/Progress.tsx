import React from 'react';

export default function Progress({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="mt-2">
      <div className="h-1.5 rounded-full bg-white/10">
        <div
          className="h-1.5 rounded-full bg-[var(--qv-brand)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-white/60 mt-1 text-right">{pct}% completato</p>
    </div>
  );
}
