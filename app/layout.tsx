
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from '@/components/navbar'
import { LanguageProvider } from '@/components/context/LanguageContext'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ubai | Front-End Engineer',
  description: 'Personal portfolio of Ubai.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={plusJakartaSans.className}>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
