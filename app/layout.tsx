import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { AppProviders } from '@/components/providers/AppProviders'

export const metadata: Metadata = {
  title: 'Professional Pressure Washing Services | Pressure Washing Xperts',
  icons: {
    icon: [{ url: '/site-tab-icon.png', type: 'image/png' }],
    shortcut: ['/site-tab-icon.png'],
    apple: '/site-tab-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
