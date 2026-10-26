'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { loginCustomer, loginPhotographer } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [photographerMode, setPhotographerMode] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [returnToCart, setReturnToCart] = useState(false)
  useEffect(() => {
    setReturnToCart(new URLSearchParams(window.location.search).get('returnTo') === 'cart')
    setPhotographerMode(new URLSearchParams(window.location.search).get('role') === 'photographer')
  }, [])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (photographerMode) {
      if (!loginPhotographer(email, password)) { setLoginError('Those photographer credentials are not correct.'); return }
      router.push('/photographer')
      return
    }
    if (!loginCustomer(email, password)) { setLoginError('Use the demo customer credentials shown below.'); return }
    router.push(returnToCart ? '/cart' : '/')
  }
  return <main className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-5 text-[#171717]"><div className="w-full max-w-md"><Link href="/" className="block text-center font-serif text-4xl tracking-[-0.06em]">LUME<span className="text-[#a6a29a]">.</span></Link><div className="mt-10 border border-black/10 bg-[#eeece6] p-7 md:p-10"><p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">{photographerMode ? 'Photographer workspace' : 'Customer account'}</p><h1 className="mt-3 font-serif text-4xl">{photographerMode ? 'Artist sign in.' : 'Welcome back.'}</h1><p className="mt-4 text-sm leading-6 text-neutral-500">{photographerMode ? 'View sales records and collection performance.' : 'Sign in to continue to checkout. This demo uses frontend-only sign-in.'}</p><form onSubmit={submit} className="mt-8 flex flex-col gap-5"><label className="text-xs uppercase tracking-[0.15em]">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border-b border-black/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none" placeholder="you@example.com"/></label><label className="text-xs uppercase tracking-[0.15em]">Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border-b border-black/25 bg-transparent px-0 py-3 text-base normal-case tracking-normal outline-none" placeholder="••••••••"/></label>{loginError && <p className="text-sm text-red-700">{loginError}</p>}<button className="bg-[#171717] px-5 py-4 text-xs uppercase tracking-[0.18em] text-white">{photographerMode ? 'Open dashboard' : 'Continue'}</button></form><div className="mt-6 border border-black/10 bg-[#f7f5f0] p-4 text-xs leading-5 text-neutral-600"><p className="font-medium text-neutral-900">Demo {photographerMode ? 'photographer' : 'customer'} credentials</p><p className="mt-2">Email: {photographerMode ? 'photographer@lume.demo' : 'customer@lume.demo'}</p><p>Password: {photographerMode ? 'lume-artist' : 'lume-customer'}</p></div>{!photographerMode && <label className="mt-5 flex items-center gap-2 text-xs text-neutral-500"><input type="checkbox" checked={returnToCart} onChange={(e) => setReturnToCart(e.target.checked)} /> Return to my cart after signing in</label>}<div className="mt-7 flex flex-col items-center gap-4 text-center text-xs uppercase tracking-[0.15em]"><Link href={photographerMode ? '/login' : '/login?role=photographer'} className="border border-[#171717] px-5 py-3 underline underline-offset-4">{photographerMode ? 'Customer sign in' : 'Login as photographer'}</Link><Link href="/">Return home</Link></div></div></div></main>
}
