import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react'
import { CollectButton } from '@/components/collect-button'
import { formatINR, products } from '@/lib/data'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((item) => item.id === id)
  if (!product) notFound()
  return <main className="min-h-screen bg-[#f7f5f0] text-[#171717]"><header className="flex items-center justify-between border-b border-black/10 px-5 py-5 md:px-10"><Link href="/" className="font-serif text-3xl tracking-[-0.06em]">LUME<span className="text-[#a6a29a]">.</span></Link><Link href="/cart" aria-label="Shopping bag"><ShoppingBag size={19}/></Link></header><div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-20"><div className="bg-stone-200"><Image src={product.image} alt={product.title} width={1200} height={1400} className="max-h-[75vh] w-full object-cover" priority/></div><div className="flex flex-col justify-center"><Link href="/explore" className="mb-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em]"><ArrowLeft size={14}/> Back to collection</Link><p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">{product.category}</p><h1 className="mt-4 font-serif text-6xl tracking-[-0.06em]">{product.title}</h1><p className="mt-3 text-xs uppercase tracking-[0.16em] text-neutral-500">{product.photographer}</p><p className="mt-8 max-w-md text-base leading-7 text-neutral-600">{product.description}</p><p className="mt-8 text-xl">{formatINR(product.price)}</p><div className="mt-8 flex gap-3"><CollectButton productId={product.id}/><button aria-label="Save photograph" className="border border-black/20 px-5"><Heart size={18}/></button></div><p className="mt-5 text-xs leading-5 text-neutral-500">High-resolution digital license. Instant delivery after checkout.</p></div></div></main>
}
