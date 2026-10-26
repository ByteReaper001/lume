'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products, type Product } from '@/lib/data'

type CartLine = { productId: string; quantity: number }
type CartContextValue = { lines: CartLine[]; count: number; add: (productId: string) => void; remove: (productId: string) => void; update: (productId: string, quantity: number) => void; clear: () => void; getProduct: (productId: string) => Product | undefined }
const CartContext = createContext<CartContextValue | null>(null)
const COOKIE = 'lume-cart'

function readCart(): CartLine[] {
  if (typeof document === 'undefined') return []
  const raw = document.cookie.split('; ').find((part) => part.startsWith(`${COOKIE}=`))?.split('=')[1]
  try { return raw ? JSON.parse(decodeURIComponent(raw)) : [] } catch { return [] }
}
function saveCart(lines: CartLine[]) { document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(lines))}; path=/; max-age=2592000; SameSite=Lax` }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  useEffect(() => setLines(readCart()), [])
  useEffect(() => { if (lines.length || document.cookie.includes(`${COOKIE}=`)) saveCart(lines) }, [lines])
  const value = useMemo(() => ({
    lines,
    count: lines.reduce((total, line) => total + line.quantity, 0),
    add: (productId: string) => setLines((current) => { const found = current.find((line) => line.productId === productId); return found ? current.map((line) => line.productId === productId ? { ...line, quantity: Math.min(line.quantity + 1, 10) } : line) : [...current, { productId, quantity: 1 }] }),
    remove: (productId: string) => setLines((current) => current.filter((line) => line.productId !== productId)),
    update: (productId: string, quantity: number) => setLines((current) => quantity < 1 ? current.filter((line) => line.productId !== productId) : current.map((line) => line.productId === productId ? { ...line, quantity: Math.min(quantity, 10) } : line)),
    clear: () => setLines([]),
    getProduct: (productId: string) => products.find((product) => product.id === productId),
  }), [lines])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error('useCart must be used inside CartProvider'); return context }
