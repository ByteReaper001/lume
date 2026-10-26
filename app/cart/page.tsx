'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Check } from 'lucide-react'
import { formatINR } from '@/lib/data'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { useSales } from '@/lib/sales-context'

export default function CartPage() {
  const { lines, count, update, remove, clear, getProduct } = useCart()
  const { isLoggedIn, email } = useAuth()
  const { recordSale } = useSales()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const items = lines.map((line) => ({ ...line, product: getProduct(line.productId) })).filter((item) => item.product)
  const subtotal = items.reduce((total, item) => total + (item.product?.price ?? 0) * item.quantity, 0)

  const proceedToCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }
    setShowLoginPrompt(false)
    setIsPaying(true)
    window.setTimeout(() => {
      items.forEach(({ product, quantity }) => {
        if (product) recordSale({ productId: product.id, title: product.title, photographer: product.photographer, quantity, total: product.price * quantity, buyerEmail: email ?? 'customer@lume.demo' })
      })
      clear()
      setIsPaying(false)
      setPaid(true)
    }, 1400)
  }

  return <main className="min-h-screen bg-[#f7f5f0] px-5 py-8 text-[#171717] md:px-10"><header className="mx-auto flex max-w-[1200px] items-center justify-between"><Link href="/" className="font-serif text-3xl tracking-[-0.06em]">LUME<span className="text-[#a6a29a]">.</span></Link><div className="flex items-center gap-6"><Link href="/login" className="text-[10px] uppercase tracking-[0.18em] underline">{isLoggedIn ? 'Signed in' : 'Log in'}</Link><Link href="/explore" className="text-[10px] uppercase tracking-[0.18em] underline">Continue exploring</Link></div></header><section className="mx-auto max-w-[1200px] py-16 md:py-24"><div className="flex items-end justify-between border-b border-black/15 pb-6"><div><p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">Your collection · {count} {count === 1 ? 'work' : 'works'}</p><h1 className="mt-3 font-serif text-5xl tracking-[-0.06em] md:text-7xl">Your selection.</h1></div>{items.length > 0 && <button onClick={clear} className="text-[10px] uppercase tracking-[0.16em] underline">Clear collection</button>}</div>{paid ? <div className="py-24 text-center"><div className="payment-check mx-auto grid size-16 place-items-center rounded-full bg-[#3d4937] text-white"><Check size={28} strokeWidth={1.5}/></div><h2 className="mt-7 font-serif text-4xl">Payment complete.</h2><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">Your photographs are ready. A download link would be sent to your inbox in the full LUME experience.</p><Link href="/explore" className="mt-8 inline-flex bg-[#171717] px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-white">Continue exploring</Link></div> : items.length === 0 ? <div className="py-24 text-center"><ShoppingBag className="mx-auto" strokeWidth={1}/><h2 className="mt-6 font-serif text-4xl">Nothing here yet.</h2><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500">Choose a photograph to add it to your collection. Your selection will stay here while you explore.</p><Link href="/explore" className="mt-8 inline-flex bg-[#171717] px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-white">Explore photography</Link></div> : <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]"><div className="flex flex-col gap-6">{items.map(({ product, quantity }) => product && <article key={product.id} className="grid grid-cols-[100px_1fr_auto] gap-4 border-b border-black/10 pb-6 sm:grid-cols-[140px_1fr_auto]"><Image src={product.image} alt={product.title} width={280} height={340} className="aspect-[4/5] object-cover"/><div><p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">{product.category}</p><h2 className="mt-2 font-serif text-2xl">{product.title}</h2><p className="mt-1 text-xs uppercase tracking-[0.14em] text-neutral-500">{product.photographer}</p><p className="mt-4 text-sm">{formatINR(product.price)}</p></div><div className="flex flex-col items-end justify-between"><button onClick={() => remove(product.id)} aria-label={`Remove ${product.title}`}><Trash2 size={16} strokeWidth={1.5}/></button><div className="flex items-center border border-black/20"><button onClick={() => update(product.id, quantity - 1)} className="grid size-8 place-items-center" aria-label="Decrease quantity"><Minus size={13}/></button><span className="w-7 text-center text-sm">{quantity}</span><button onClick={() => update(product.id, quantity + 1)} className="grid size-8 place-items-center" aria-label="Increase quantity"><Plus size={13}/></button></div></div></article>)}</div><aside className="h-fit bg-[#eeece6] p-6 md:p-8"><h2 className="font-serif text-3xl">Summary</h2><div className="mt-8 flex justify-between border-b border-black/10 pb-4 text-sm"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div><div className="flex justify-between py-4 text-xs text-neutral-500"><span>Delivery</span><span>Included</span></div><div className="flex justify-between border-t border-black/15 pt-4 text-lg"><span>Total</span><span>{formatINR(subtotal)}</span></div><button onClick={proceedToCheckout} disabled={isPaying} className="mt-8 flex w-full items-center justify-center gap-3 bg-[#171717] px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-white disabled:cursor-wait disabled:opacity-60">{isPaying ? 'Completing payment…' : 'Proceed to checkout'} {!isPaying && <ArrowRight size={14}/>}</button>{showLoginPrompt && <div className="mt-4 border border-black/15 bg-[#f7f5f0] p-4 text-sm leading-6"><p>Log in before checkout to keep your collection attached to your account.</p>  <Link href="/login?returnTo=cart" className="mt-3 inline-block text-[10px] uppercase tracking-[0.16em] underline">Log in and return to cart →</Link></div>}<p className="mt-4 text-center text-[10px] leading-5 text-neutral-500">Secure checkout · High-resolution digital license · Instant delivery</p></aside></div>}</section></main>
}
