import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen bg-[#0b0b0d] text-white pb-safe">
      <header className="p-4 pb-2">
        <h1 className="font-display text-[20px] font-bold tracking-[-0.015em]">Profilo</h1>
      </header>

      <section className="p-4 space-y-3">
        <div className="rounded-xl bg-[#1c1c1e] border border-[#2a2a2b] p-4">
          <p className="font-display text-[14px] text-white/80">Accesso</p>
          <p className="font-display text-[12px] text-white/60">Autenticazione demo non abilitata.</p>
        </div>
        <div className="rounded-xl bg-[#1c1c1e] border border-[#2a2a2b] p-4">
          <p className="font-display text-[14px] text-white/80">Notifiche</p>
          <p className="font-display text-[12px] text-white/60">Impostazioni in arrivo.</p>
        </div>
      </section>

      <BottomNav active="profile" />
    </div>
  );
}
