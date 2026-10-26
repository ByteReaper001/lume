'use client'

import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function CollectButton({ productId }: { productId: string }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  return <button onClick={() => { add(productId); setAdded(true); setTimeout(() => setAdded(false), 1800) }} className="flex flex-1 items-center justify-center gap-2 bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.18em] text-white">{added ? <><Check size={14}/> Added to collection</> : <><ShoppingBag size={14}/> Collect photograph</>}</button>
}
