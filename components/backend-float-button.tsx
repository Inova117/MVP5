// Floating Button to Access Backend / Architecture Documentation
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code2 } from 'lucide-react'

export function BackendFloatButton() {
  const pathname = usePathname()

  // Don't show on the backend console itself
  if (pathname === '/backend') return null

  return (
    <Link
      href="/backend"
      className="group fixed bottom-6 right-6 z-50"
      title="View backend & architecture"
    >
      <div className="flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2.5 text-foreground shadow-tactile-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Code2 className="h-4 w-4" />
        </span>
        <span className="hidden text-sm font-medium sm:inline">
          Backend &amp; architecture
        </span>
      </div>
    </Link>
  )
}
