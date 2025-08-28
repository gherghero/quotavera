import { createServiceClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import BuyForm from '@/components/BuyForm'
import { Product, Package } from '@/lib/types'
import Html from '@/components/Html'
import Link from 'next/link'

type CheckoutPageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 0

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const slug = searchParams.pid as string
  const initialPackageKey = searchParams.pkg as string
  const email = searchParams.email as string | undefined

  if (!slug) {
    notFound()
  }

  const supabase = createServiceClient()

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (productError || !product) {
    notFound()
  }

  const { data: packages, error: packagesError } = await supabase
    .from('packages')
    .select('*')
    .eq('product_id', product.id)
    .order('price_eur', { ascending: true })

  if (packagesError || !packages) {
    notFound()
  }

  return (
    <Html>
        <div className="flex items-center bg-[#f8f9fc] p-4 pb-2 justify-between">
            <Link href={`/product/${slug}`} className="text-[#0e121b] p-2 -ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </Link>
            <h2 className="text-[#0e121b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Checkout</h2>
        </div>
        <div className="w-full max-w-md mx-auto">
          <BuyForm
            product={product as Product}
            packages={packages as Package[]}
            initialPackageKey={initialPackageKey}
            initialEmail={email}
          />
        </div>
    </Html>
  )
}