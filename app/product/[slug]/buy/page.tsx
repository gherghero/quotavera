import { notFound } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';
import BuyForm from '@/components/BuyForm';
import Link from 'next/link';

// Re-enable caching after data is dynamic
export const revalidate = 0;

type Props = {
  params: { slug: string };
};

export default async function BuyPage({ params }: Props) {
  const { slug } = params;
  const supabase = createBrowserClient();

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (productError || !product) {
    notFound();
  }

  const { data: packages, error: packagesError } = await supabase
    .from('packages')
    .select('*')
    .eq('product_id', product.id)
    .order('entries', { ascending: true });

  if (packagesError || !packages || packages.length === 0) {
    // A product must have packages to be purchasable
    notFound();
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] font-sans">
      {/* Background overlay */}
      <Link href={`/product/${slug}`} className="absolute inset-0 bg-black/40 z-0" />

      {/* Content Sheet */}
      <div className="relative z-10 flex flex-col h-full mt-auto">
        <div className="flex-grow" />
        <div className="bg-[#f8f9fc] rounded-t-2xl flex flex-col h-[85vh] max-h-[700px]">
           <Link href={`/product/${slug}`} className="flex h-5 w-full items-center justify-center pt-3">
            <div className="h-1 w-9 rounded-full bg-[#d0d7e7]"></div>
          </Link>
          <BuyForm product={product} packages={packages} />
        </div>
      </div>
    </div>
  );
}