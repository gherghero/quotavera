import { cookies } from 'next/headers';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import BottomNav from '@/components/BottomNav';

export const revalidate = 0;

type OrderWithDetails = {
  id: string;
  created_at: string;
  products: { name: string; cover_url: string; } | null;
  tickets: { id: string; serial: string; }[];
};

export default async function WalletPage() {
  const cookieStore = cookies();
  const clientId = cookieStore.get(process.env.NEXT_PUBLIC_CLIENT_COOKIE || 'quotavera_client_id')?.value;

  if (!clientId) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between font-sans">
        <div className="text-center p-10 flex-grow flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Portafoglio Vuoto</h2>
          <p className="text-[#4e6797]">Non abbiamo trovato nessuna attivazione.</p>
          <Link href="/" className="mt-6 inline-block bg-[#081c44] text-white py-3 px-6 rounded-lg font-bold">
            Scopri i beni
          </Link>
        </div>
        <div className="sticky bottom-0 left-0 right-0">
          <BottomNav active="wallet" />
          <div className="h-5 bg-[#f8f9fc]"></div>
        </div>
      </div>
    );
  }

  const supabase = createBrowserClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      id,
      created_at,
      products (name, cover_url),
      tickets (id, serial)
    `)
    .eq('client_id', clientId)
    .eq('status', 'paid')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wallet data:', error);
  }

  const typedOrders = orders as OrderWithDetails[] | null;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] justify-between font-sans">
      <div className="flex-grow">
        <div className="flex items-center bg-[#f8f9fc] p-4 pb-2 justify-between">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Portafoglio</h2>
        </div>
        <h2 className="text-[#0e121b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Le tue Attivazioni</h2>

        <div className="pb-24">
          {typedOrders && typedOrders.length > 0 ? (
            typedOrders.map((order) => {
              if (!order.products || order.tickets.length === 0) return null;
              const firstTicket = order.tickets[0];

              return (
                <div key={order.id} className="p-4">
                  <div className="flex flex-col items-stretch justify-start rounded-xl shadow-lg overflow-hidden bg-white">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                      style={{ backgroundImage: `url("${order.products.cover_url}")` }}
                    ></div>
                    <div className="p-4">
                      <p className="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em]">
                        {order.products.name}
                      </p>
                      <div className="flex items-end gap-3 justify-between mt-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-[#4e6797] text-base font-normal leading-normal">
                            {order.tickets.length} Attivazion{order.tickets.length > 1 ? 'i' : 'e'}
                          </p>
                          <p className="text-[#4e6797] text-sm font-normal leading-normal">
                            Seriale: {firstTicket.serial}
                          </p>
                        </div>
                        <Link
                          href={`/pass/${firstTicket.id}`}
                          className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-5 bg-[#081c44] text-[#f8f9fc] text-sm font-bold"
                        >
                          <span className="truncate">Apri</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-10">
              <p className="text-[#4e6797]">Nessuna attivazione trovata.</p>
              <Link href="/" className="mt-4 inline-block text-blue-600 underline">
                Inizia ad esplorare
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0">
        <BottomNav active="wallet" />
        <div className="h-5 bg-[#f8f9fc]"></div>
      </div>
    </div>
  );
}