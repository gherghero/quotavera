import { getOrSetClientId } from '@/lib/cookies';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';

export const revalidate = 0;

export default function ProfilePage() {
  const id = getOrSetClientId();

  const links = [
      { href: "/termini", label: "Termini e Condizioni" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/contatti", label: "Contatti" },
  ];

  return (
    <div className="pb-20">
        <header className="p-4">
            <h1 className="text-2xl font-bold text-[#0e121b] text-center">Profilo</h1>
        </header>

        <main className="p-4 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-sm text-gray-500 mb-1">Il tuo Client ID</h2>
                <p className="font-mono text-xs break-all">{id}</p>
            </div>

            <div className="bg-white rounded-lg shadow divide-y">
                {links.map(link => (
                    <Link key={link.href} href={link.href} className="flex justify-between items-center p-4 hover:bg-gray-50">
                        <span>{link.label}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </Link>
                ))}
            </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0">
            <BottomNav active="profile" />
        </div>
    </div>
  );
}