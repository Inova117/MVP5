'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import {
  GraduationCap,
  LayoutDashboard,
  Compass,
  PenSquare,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react'

interface NavLink {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the user menu on outside click / route change.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const links: NavLink[] = [{ href: '/courses', label: 'Browse', icon: Compass }]
  if (user) {
    links.push({ href: '/dashboard', label: 'My Learning', icon: LayoutDashboard })
    if (profile?.role === 'instructor') {
      links.push({ href: '/instructor', label: 'Teach', icon: PenSquare })
    }
  }

  const initials =
    profile?.full_name
      ?.split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U'

  const handleSignOut = async () => {
    setMenuOpen(false)
    await signOut()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-tactile">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg font-bold text-foreground">
            Tactile<span className="text-primary"> Academy</span>
          </span>
        </Link>

        {/* Primary nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-2 transition-colors hover:bg-muted"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {initials}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform',
                    menuOpen && 'rotate-180'
                  )}
                />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-card shadow-tactile-lg"
                >
                  <div className="border-b border-border/70 px-4 py-3">
                    <p className="truncate font-serif font-semibold text-foreground">
                      {profile?.full_name || 'Demo User'}
                    </p>
                    <p className="mt-0.5 text-xs capitalize text-muted-foreground">
                      {profile?.role ?? 'student'} account
                    </p>
                  </div>
                  <div className="p-1.5">
                    <MenuItem href="/dashboard" icon={LayoutDashboard} label="My Learning" />
                    {profile?.role === 'instructor' && (
                      <MenuItem href="/instructor" icon={PenSquare} label="Instructor Studio" />
                    )}
                    <MenuItem href="/courses" icon={Compass} label="Browse Courses" />
                  </div>
                  <div className="border-t border-border/70 p-1.5">
                    <button
                      type="button"
                      onClick={() => void handleSignOut()}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-destructive-foreground/90 transition-colors hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">
                  <User className="mr-1.5 h-4 w-4" />
                  Get started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function MenuItem({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      {label}
    </Link>
  )
}
