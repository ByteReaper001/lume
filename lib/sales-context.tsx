'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Sale = {
  id: string
  productId: string
  title: string
  photographer: string
  quantity: number
  total: number
  buyerEmail: string
  date: string
}

type SalesContextValue = { sales: Sale[]; recordSale: (sale: Omit<Sale, 'id' | 'date'>) => void }
const SalesContext = createContext<SalesContextValue | null>(null)
const SALES_KEY = 'lume-sales'

export function SalesProvider({ children }: { children: React.ReactNode }) {
  const [sales, setSales] = useState<Sale[]>([])
  useEffect(() => {
    const raw = window.localStorage.getItem(SALES_KEY)
    if (raw) {
      try { setSales(JSON.parse(raw)) } catch { window.localStorage.removeItem(SALES_KEY) }
    }
  }, [])
  const value = useMemo(() => ({
    sales,
    recordSale: (sale: Omit<Sale, 'id' | 'date'>) => setSales((current) => {
      const next = [{ ...sale, id: crypto.randomUUID(), date: new Date().toISOString() }, ...current]
      window.localStorage.setItem(SALES_KEY, JSON.stringify(next))
      return next
    }),
  }), [sales])
  return <SalesContext.Provider value={value}>{children}</SalesContext.Provider>
}

export function useSales() {
  const context = useContext(SalesContext)
  if (!context) throw new Error('useSales must be used inside SalesProvider')
  return context
}
