'use client';
export default function ProgressBar({ percent }: { percent: number }) {
  const p = Math.max(0, Math.min(100, percent || 0));
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="h-2.5 rounded-full bg-[#081c44]" style={{ width: `${p}%` }} />
      </div>
      <p className="text-[11px] text-[#4e6797] mt-1">{Math.round(p)}% completato</p>
    </div>
  );
}
