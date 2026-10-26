import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'

export const metadata: Metadata = {
  title: 'LUME — Photography, collected.',
  description: 'Discover extraordinary photography by independent artists.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f7f5f0' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased"><CartProvider>{children}</CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
