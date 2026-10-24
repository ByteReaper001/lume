'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'
import { Heart, Search, ShoppingBag } from 'lucide-react'
import { categories, formatINR, products } from '@/lib/data'

function ExplorePageContent() {
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('search') ?? '')
  const [category, setCategory] = useState(params.get('category') ?? 'All work')
  const [saved, setSaved] = useState<string[]>([])
  const filtered = useMemo(() => products.filter((p) => (category === 'All work' || p.category === category) && (!query || `${p.title} ${p.photographer} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))), [category, query])
  return <main className="min-h-screen bg-[#f7f5f0] text-[#171717]">
    <header className="border-b border-black/10 px-5 py-5 md:px-10"><div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6"><Link href="/" className="font-serif text-3xl tracking-[-0.06em]">LUME<span className="text-[#a6a29a]">.</span></Link><div className="flex items-center gap-4"><Link href="/" aria-label="Wishlist"><Heart size={19} strokeWidth={1.4}/></Link><Link href="/cart" aria-label="Shopping bag"><ShoppingBag size={19} strokeWidth={1.4}/></Link></div></div></header>
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-20"><p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">The collection</p><h1 className="mt-3 font-serif text-6xl tracking-[-0.06em]">Explore photography.</h1><div className="mt-10 flex flex-col gap-4 border-y border-black/10 py-5 md:flex-row"><label className="flex flex-1 items-center gap-3 border-b border-black/20 pb-2 md:border-b-0"><Search size={16}/><span className="sr-only">Search photographs</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, artist, or mood" className="w-full bg-transparent text-sm outline-none"/></label><select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent text-sm outline-none md:w-64"><option>All work</option>{categories.map((c) => <option key={c.name}>{c.name}</option>)}</select></div><p className="mt-6 text-sm text-neutral-500">{filtered.length} photographs</p>{filtered.length ? <div className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((p) => <article key={p.id}><div className="group relative overflow-hidden bg-stone-200"><Image src={p.image} alt={p.title} width={800} height={900} className="aspect-[4/5] object-cover transition duration-700 group-hover:scale-105"/><button aria-label={`Save ${p.title}`} onClick={() => setSaved((items) => items.includes(p.id) ? items.filter((id) => id !== p.id) : [...items, p.id])} className="absolute right-3 top-3 grid size-9 place-items-center bg-white/85"><Heart size={16} className={saved.includes(p.id) ? 'fill-current' : ''}/><span className="sr-only">Save</span></button><Link href={`/product/${p.id}`} className="absolute inset-x-3 bottom-3 bg-white px-4 py-3 text-center text-xs uppercase tracking-[0.18em] opacity-0 transition group-hover:opacity-100">View photograph</Link></div><div className="flex justify-between gap-3 pt-4"><div><h2 className="font-serif text-xl">{p.title}</h2><p className="mt-1 text-xs uppercase tracking-[0.14em] text-neutral-500">{p.photographer}</p></div><span className="text-sm">{formatINR(p.price)}</span></div></article>)}</div> : <div className="border border-dashed border-black/20 py-20 text-center"><p className="font-serif text-2xl">No photographs found.</p><button onClick={() => { setQuery(''); setCategory('All work') }} className="mt-5 text-xs uppercase tracking-[0.18em] underline">Clear filters</button></div>}</div>
  </main>
}

export default function ExplorePage() {
  return <Suspense fallback={<main className="min-h-screen bg-[#f7f5f0] p-10 text-sm">Loading collection…</main>}><ExplorePageContent /></Suspense>
}
