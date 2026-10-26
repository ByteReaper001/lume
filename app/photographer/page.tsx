'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ArrowLeft, Camera, LogOut, TrendingUp } from 'lucide-react'
import { formatINR } from '@/lib/data'
import { useAuth } from '@/lib/auth-context'
import { useSales } from '@/lib/sales-context'

export default function PhotographerDashboard() {
  const router = useRouter()
  const { role, email, logout } = useAuth()
  const { sales, clearSales } = useSales()
  useEffect(() => { if (role && role !== 'photographer') router.replace('/login?role=photographer') }, [role, router])
  if (role !== 'photographer') return <main className="grid min-h-screen place-items-center bg-[#f7f5f0] text-sm text-neutral-500">Opening photographer sign in…</main>

  const mine = sales.filter((sale) => sale.photographer === 'Chaitanya Kherdikar')
  const revenue = mine.reduce((total, sale) => total + sale.total, 0)
  const units = mine.reduce((total, sale) => total + sale.quantity, 0)
  return <main className="min-h-screen bg-[#f7f5f0] px-5 py-8 text-[#171717] md:px-10"><header className="mx-auto flex max-w-[1200px] items-center justify-between"><Link href="/" className="font-serif text-3xl tracking-[-0.06em]">LUME<span className="text-[#a6a29a]">.</span></Link><div className="flex items-center gap-5"><span className="hidden text-xs text-neutral-500 sm:block">{email}</span><button onClick={() => { logout(); router.push('/') }} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]"><LogOut size={14}/> Sign out</button></div></header><section className="mx-auto max-w-[1200px] py-16 md:py-24"><Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em]"><ArrowLeft size={14}/> Back to LUME</Link><div className="mt-10 flex items-end justify-between border-b border-black/15 pb-6"><div><p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">Artist workspace</p><h1 className="mt-3 font-serif text-5xl tracking-[-0.06em] md:text-7xl">Your studio.</h1></div><Camera className="hidden text-[#3d4937] md:block" size={40} strokeWidth={1}/></div><div className="mt-10 grid gap-4 sm:grid-cols-3"><article className="bg-[#eeece6] p-6"><p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Total sales</p><p className="mt-4 font-serif text-4xl">{formatINR(revenue)}</p></article><article className="bg-[#eeece6] p-6"><p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Photos licensed</p><p className="mt-4 font-serif text-4xl">{units}</p></article><article className="bg-[#3d4937] p-6 text-white"><p className="text-[10px] uppercase tracking-[0.18em] text-[#c7cabe]">Orders</p><p className="mt-4 font-serif text-4xl">{mine.length}</p><TrendingUp className="mt-3 text-[#c7cabe]" size={18}/></article></div><section className="mt-14"><div className="flex items-center justify-between gap-5"><h2 className="font-serif text-3xl">Sales records</h2>{mine.length > 0 && <button aria-label="Clear all sales records" onClick={() => { if (window.confirm('Clear all demo sales history?')) clearSales() }} className="border border-black/20 px-3 py-2 text-[9px] uppercase tracking-[0.16em] transition hover:bg-[#eeece6]">Clear</button>}</div>{mine.length === 0 ? <p className="mt-5 border-t border-black/10 pt-5 text-sm text-neutral-500">Sales from your collection will appear here after a customer completes checkout.</p> : <div className="mt-6 overflow-x-auto border-t border-black/10"><table className="w-full min-w-[650px] text-left text-sm"><thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-[0.16em] text-neutral-500"><th className="py-4 pr-4">Photograph</th><th className="py-4 pr-4">Buyer</th><th className="py-4 pr-4">Quantity</th><th className="py-4 pr-4">Date</th><th className="py-4 text-right">Total</th></tr></thead><tbody>{mine.map((sale) => <tr key={sale.id} className="border-b border-black/10"><td className="py-4 pr-4 font-medium">{sale.title}</td><td className="py-4 pr-4 text-neutral-500">{sale.buyerEmail}</td><td className="py-4 pr-4">{sale.quantity}</td><td className="py-4 pr-4 text-neutral-500">{new Date(sale.date).toLocaleDateString()}</td><td className="py-4 text-right">{formatINR(sale.total)}</td></tr>)}</tbody></table></div>}</section></section></main>
}
