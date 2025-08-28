import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserClient } from '@/lib/supabase';
import { TicketWithProduct } from '@/lib/types';
import ShareButton from '@/components/ShareButton';

export const revalidate = 0;

type Props = {
  params: { id: string };
};

export default async function PassPage({ params }: Props) {
  const { id } = params;
  const supabase = createBrowserClient();

  const { data: ticket, error } = await supabase
    .from('tickets')
    .select(`
      *,
      products (name, cover_url)
    `)
    .eq('id', id)
    .single();

  if (error || !ticket) {
    notFound();
  }

  const typedTicket = ticket as TicketWithProduct;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] font-sans">
      {/* Header */}
      <div className="flex items-center p-4">
        <Link href="/wallet" className="text-[#0e121b] p-2 -ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-center flex-1 pr-6">
          {typedTicket.products?.name || 'Pass Digitale'}
        </h1>
      </div>

      <div className="p-4 space-y-6 flex flex-col items-center">
        {/* Asset Image */}
        <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={typedTicket.asset_url}
            alt={typedTicket.products?.name || 'Product Image'}
            width={500}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Serial Number */}
        <div className="text-center">
          <p className="text-sm text-[#4e6797]">Seriale</p>
          <p className="font-mono text-lg font-bold bg-gray-200 px-4 py-1 rounded-md">
            {typedTicket.serial}
          </p>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <p className="text-sm text-[#4e6797] mb-2">QR Code</p>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src={typedTicket.qr_url}
              alt={`QR Code for serial ${typedTicket.serial}`}
              width={256}
              height={256}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm flex gap-4 pt-4">
          <a
            href={typedTicket.qr_url}
            download={`${typedTicket.serial}.png`}
            className="flex-1 flex items-center justify-center rounded-xl h-12 px-5 bg-[#081c44] text-[#f8f9fc] text-base font-bold text-center"
          >
            Download
          </a>
          <ShareButton
            title={`Pass per ${typedTicket.products?.name || 'un prodotto'}`}
            text={`Ecco il tuo pass: ${typedTicket.serial}`}
          />
        </div>
      </div>
    </div>
  );
}
