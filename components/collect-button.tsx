'use client'

import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

export function CollectButton({ productId }: { productId: string }) {
  const { add } = useCart()
  const { role } = useAuth()
  const [added, setAdded] = useState(false)
  const [warning, setWarning] = useState(false)
  return <div className="flex flex-1 flex-col gap-2"><button onClick={() => { if (role === 'photographer') { setWarning(true); return }; add(productId); setAdded(true); setTimeout(() => setAdded(false), 1800) }} className="flex flex-1 items-center justify-center gap-2 bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.18em] text-white">{added ? <><Check size={14}/> Added to collection</> : <><ShoppingBag size={14}/> Collect photograph</>}</button>{warning && <p role="alert" className="text-xs leading-5 text-red-800">Photographers cannot buy their own work. Log out and sign in as a customer to purchase.</p>}</div>
}
