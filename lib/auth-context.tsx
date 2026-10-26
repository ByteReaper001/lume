'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type AuthContextValue = {
  isLoggedIn: boolean
  role: 'customer' | 'photographer' | null
  email: string | null
  loginCustomer: (email: string, password: string) => boolean
  loginPhotographer: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const AUTH_KEY = 'lume-auth'
const PHOTOGRAPHER_EMAIL = 'photographer@lume.demo'
const PHOTOGRAPHER_PASSWORD = 'lume-artist'
const CUSTOMER_EMAIL = 'customer@lume.demo'
const CUSTOMER_PASSWORD = 'lume-customer'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<{ role: 'customer' | 'photographer'; email: string } | null>(null)

  useEffect(() => {
    const raw = window.localStorage.getItem(AUTH_KEY)
    if (raw) {
      try { setSession(JSON.parse(raw)) } catch { window.localStorage.removeItem(AUTH_KEY) }
    }
  }, [])

  const value = useMemo(() => ({
    isLoggedIn: session !== null,
    role: session?.role ?? null,
    email: session?.email ?? null,
    loginCustomer: (email: string, password: string) => {
      if (email.trim().toLowerCase() !== CUSTOMER_EMAIL || password !== CUSTOMER_PASSWORD) return false
      const next = { role: 'customer' as const, email: email.trim() }
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(next))
      setSession(next)
      return true
    },
    loginPhotographer: (email: string, password: string) => {
      if (email.trim().toLowerCase() !== PHOTOGRAPHER_EMAIL || password !== PHOTOGRAPHER_PASSWORD) return false
      const next = { role: 'photographer' as const, email: PHOTOGRAPHER_EMAIL }
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(next))
      setSession(next)
      return true
    },
    logout: () => {
      window.localStorage.removeItem(AUTH_KEY)
      setSession(null)
    },
  }), [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
