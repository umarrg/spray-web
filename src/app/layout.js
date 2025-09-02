import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MoneySpray - Digital Money Spraying Platform',
  description: 'Transform traditional money-spraying into an engaging digital experience for Nigerian events',
  keywords: 'money spray, digital payment, wedding, birthday, Nigerian events',
  authors: [{ name: 'MoneySpray Team' }],
  openGraph: {
    title: 'MoneySpray - Digital Money Spraying Platform',
    description: 'Make your celebrations memorable with digital money spraying',
    type: 'website',
    locale: 'en_NG',
    url: 'https://moneyspray.ng',
    siteName: 'MoneySpray',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MoneySpray Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneySpray - Digital Money Spraying',
    description: 'Transform your celebrations with digital money spraying',
    images: ['/twitter-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#8B5CF6',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            position="top-center"
            richColors
            closeButton
            duration={4000}
          />
        </Providers>
      </body>
    </html>
  )
}