import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CourseCard } from '@/components/courses/course-card'
import {
  getPublishedCourses,
  categoryStyle,
  CATEGORIES,
} from '@/lib/mock-data'
import {
  GraduationCap,
  PlayCircle,
  TrendingUp,
  Award,
  Star,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Quote,
} from 'lucide-react'

const STATS = [
  { value: '50k+', label: 'Active learners' },
  { value: '1,200+', label: 'Expert-led courses' },
  { value: '4.8/5', label: 'Average rating' },
  { value: '120+', label: 'Verified instructors' },
]

const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Expert instructors',
    body: 'Learn from practitioners who ship real work — not just theory.',
  },
  {
    icon: PlayCircle,
    title: 'HD video, your pace',
    body: 'Adjustable playback, resume where you left off, on any device.',
  },
  {
    icon: TrendingUp,
    title: 'Real progress tracking',
    body: 'Every lesson you finish is saved and reflected across your dashboard.',
  },
  {
    icon: Award,
    title: 'Earn certificates',
    body: 'Complete a course and earn a shareable certificate of completion.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Find your course',
    body: 'Browse a curated catalog across technology, design, business and marketing.',
  },
  {
    n: '02',
    title: 'Learn by doing',
    body: 'Follow project-based lessons with HD video and knowledge checks.',
  },
  {
    n: '03',
    title: 'Track & complete',
    body: 'Watch your progress climb, finish the course, and earn your certificate.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'The progress tracking actually kept me coming back. I finished my first course in two weeks.',
    name: 'Marcus Bell',
    role: 'Career switcher → Frontend Developer',
  },
  {
    quote:
      'Calm, focused, and beautifully made. It feels less like homework and more like a craft.',
    name: 'Priya Nair',
    role: 'Product Designer',
  },
  {
    quote:
      'As an instructor, publishing a course took an afternoon. The studio is genuinely a joy to use.',
    name: 'Dr. Sarah Johnson',
    role: 'Instructor · 60k+ students',
  },
]

export default function HomePage() {
  const featured = getPublishedCourses().slice(0, 3)
  const categories = CATEGORIES.filter((c) => c !== 'All')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-secondary-300/30 blur-3xl" />

        <div className="container relative mx-auto grid items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
          {/* Copy */}
          <div>
            <span className="eyebrow mb-5">
              <Sparkles className="h-4 w-4" />
              Monetize your knowledge
            </span>
            <h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn at your own pace, in a space built for{' '}
              <span className="text-primary">focus.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Premium online courses with HD video, real progress tracking, and
              certificates. Join thousands of learners mastering their craft —
              one calm, deliberate lesson at a time.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup">
                <Button size="lg">
                  Get started free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg">
                  Browse courses
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['from-primary-400 to-primary-600', 'from-secondary-400 to-secondary-600', 'from-primary-600 to-secondary-500', 'from-secondary-500 to-primary-400'].map(
                  (g, i) => (
                    <span
                      key={i}
                      className={`h-9 w-9 rounded-full border-2 border-background bg-gradient-to-br ${g}`}
                    />
                  )
                )}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  Loved by <span className="font-semibold text-foreground">50,000+</span> learners
                </p>
              </div>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative">
            <div className="absolute inset-0 -rotate-3 rounded-3xl bg-gradient-to-br from-primary/15 to-secondary-300/20" />
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-tactile-lg">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Continue learning</span>
                <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  In progress
                </span>
              </div>

              <div className="mt-5 flex gap-4">
                <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 font-serif text-3xl text-white">
                  ⌘
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-serif text-lg font-bold text-foreground">
                    Web Development Bootcamp
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Module 2 · CSS Styling & Flexbox
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary">36%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[36%] rounded-full bg-primary" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: PlayCircle, label: '14 lessons' },
                  { icon: TrendingUp, label: '8h content' },
                  { icon: Award, label: 'Certificate' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-border/70 bg-background/60 px-2 py-3 text-center"
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating certificate chip */}
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-tactile-lg sm:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-sm font-bold text-foreground">
                  Certificate earned
                </p>
                <p className="text-xs text-muted-foreground">UI/UX Masterclass</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Stats band ───────────── */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Featured courses ───────────── */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow mb-3">Hand-picked</span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Featured courses
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Start with a few of our most-loved courses across every discipline.
            </p>
          </div>
          <Link href="/courses">
            <Button variant="outline">
              View all courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* ───────────── Categories ───────────── */}
      <section className="border-y border-border bg-card/40">
        <div className="container mx-auto px-4 py-16">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-foreground">
            Explore by category
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const style = categoryStyle(category)
              return (
                <Link
                  key={category}
                  href="/courses"
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br font-serif text-2xl text-white ${style.gradient}`}
                  >
                    {style.glyph}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {category}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────────── Features ───────────── */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-3">Why Tactile Academy</span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Everything you need to actually finish
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-tactile transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-bold text-foreground">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── How it works ───────────── */}
      <section className="border-y border-border bg-card/40">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow mb-3">How it works</span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              From curious to certified in three steps
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="relative">
                <div className="font-serif text-5xl font-bold text-primary/15">
                  {step.n}
                </div>
                <h3 className="mt-3 font-serif text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Testimonials ───────────── */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-3">Loved by learners</span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Don&apos;t just take our word for it
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-tactile"
            >
              <Quote className="h-7 w-7 text-primary/30" />
              <blockquote className="mt-4 flex-1 text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  {t.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                </span>
                <div>
                  <div className="font-serif font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-lift">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Ready to start learning?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/85">
              Create your free account and pick up your first lesson today. No
              credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="border-none bg-white text-primary hover:bg-white/90"
                >
                  Create free account
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  Explore catalog
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              {['No credit card', 'Cancel anytime', 'Certificate included'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
