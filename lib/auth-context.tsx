'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type AuthContextValue = {
  isLoggedIn: boolean
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const AUTH_KEY = 'lume-auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem(AUTH_KEY) === 'true')
  }, [])

  const value = useMemo(() => ({
    isLoggedIn,
    login: (email: string) => {
      if (!email.trim()) return
      window.localStorage.setItem(AUTH_KEY, 'true')
      setIsLoggedIn(true)
    },
    logout: () => {
      window.localStorage.removeItem(AUTH_KEY)
      setIsLoggedIn(false)
    },
  }), [isLoggedIn])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
