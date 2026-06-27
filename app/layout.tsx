import type { Metadata } from 'next'
import { Merriweather, DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { ProgressProvider } from '@/components/providers/progress-provider'
import { Toaster } from 'sonner'
import { BackendFloatButton } from '@/components/backend-float-button'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tactile Academy — Learn at Your Own Pace',
    template: '%s · Tactile Academy',
  },
  description:
    'Premium online courses with HD video, real progress tracking, and certificates. A calm, focused place to master your craft.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${merriweather.variable} ${dmSans.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ProgressProvider>
              {children}
              <Toaster position="top-center" richColors />
              <BackendFloatButton />
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
