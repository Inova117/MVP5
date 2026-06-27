import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Learn',
    links: [
      { label: 'Browse courses', href: '/courses' },
      { label: 'My learning', href: '/dashboard' },
      { label: 'Categories', href: '/courses' },
    ],
  },
  {
    title: 'Teach',
    links: [
      { label: 'Become an instructor', href: '/signup' },
      { label: 'Instructor studio', href: '/instructor' },
      { label: 'Create a course', href: '/instructor/courses/create' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Backend & architecture', href: '/backend' },
      { label: 'Sign in', href: '/login' },
      { label: 'Get started', href: '/signup' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-tactile">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-serif text-lg font-bold text-foreground">
                Tactile<span className="text-primary"> Academy</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A calm, focused place to learn. Premium courses with progress
              tracking, certificates, and instructors who care about your craft.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Tactile Academy. Crafted for focused learning.</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            Demo experience — fully interactive
          </p>
        </div>
      </div>
    </footer>
  )
}
