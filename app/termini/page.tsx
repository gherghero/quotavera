import Link from 'next/link';

export default function TerminiPage() {
    return (
        <div className="p-4">
            <header className="flex items-center mb-4">
                <Link href="/profile" className="p-2 -ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </Link>
                <h1 className="text-xl font-bold text-center flex-1">Termini e Condizioni</h1>
            </header>
            <main>
                <p>Contenuto placeholder per Termini e Condizioni.</p>
            </main>
        </div>
    );
}
