'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [returnToCart, setReturnToCart] = useState(false)
  useEffect(() => {
    setReturnToCart(new URLSearchParams(window.location.search).get('returnTo') === 'cart')
  }, [])

  return <main className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-5 text-[#171717]"><div className="w-full max-w-md"><Link href="/" className="block text-center font-serif text-4xl tracking-[-0.06em]">LUME<span className="text-[#a6a29a]">.</span></Link><div className="mt-10 border border-black/10 bg-[#eeece6] p-7 md:p-10"><p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">Your account</p><h1 className="mt-3 font-serif text-4xl">Welcome back.</h1><p className="mt-4 text-sm leading-6 text-neutral-500">Sign in to continue to checkout. This demo uses frontend-only sign-in.</p><form onSubmit={(e) => { e.preventDefault(); login(email); router.push(returnToCart ? '/cart' : '/') }} className="mt-8 flex flex-col gap-5"><label className="text-xs uppercase tracking-[0.15em]">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border-b border-black/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none" placeholder="you@example.com"/></label><button className="bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.18em] text-white">Continue</button></form><label className="mt-5 flex items-center gap-2 text-xs text-neutral-500"><input type="checkbox" checked={returnToCart} onChange={(e) => setReturnToCart(e.target.checked)} /> Return to my cart after signing in</label><Link href="/" className="mt-7 block text-center text-xs uppercase tracking-[0.15em] underline underline-offset-4">Return home</Link></div></div></main>
}
