'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/providers/auth-provider'
import { useProgress } from '@/components/providers/progress-provider'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  getCourse,
  allLessons,
  categoryStyle,
  type MockCourse,
} from '@/lib/mock-data'
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  CheckCircle2,
} from 'lucide-react'

interface EnrolledView {
  course: MockCourse
  completed: number
  total: number
  percent: number
  resumeId: string
  resumeTitle: string
}

export default function DashboardPage() {
  const { profile } = useAuth()
  const { enrolledCourseIds, progressFor, isComplete } = useProgress()

  const enrolled: EnrolledView[] = enrolledCourseIds
    .map((id) => getCourse(id))
    .filter((c): c is MockCourse => Boolean(c))
    .map((course) => {
      const { completed, total, percent } = progressFor(course.id)
      const lessons = allLessons(course)
      const resume =
        lessons.find((l) => !isComplete(course.id, l.id)) ??
        lessons[lessons.length - 1]!
      return {
        course,
        completed,
        total,
        percent,
        resumeId: resume.id,
        resumeTitle: resume.title,
      }
    })

  const totalCourses = enrolled.length
  const completedCourses = enrolled.filter((e) => e.percent === 100).length
  const inProgressCourses = totalCourses - completedCourses
  const avgProgress = totalCourses
    ? Math.round(enrolled.reduce((s, e) => s + e.percent, 0) / totalCourses)
    : 0

  const continueLearning =
    enrolled.find((e) => e.percent < 100) ?? enrolled[0]

  const stats = [
    {
      icon: BookOpen,
      value: totalCourses,
      label: 'Enrolled',
      tone: 'bg-primary/10 text-primary',
    },
    {
      icon: TrendingUp,
      value: inProgressCourses,
      label: 'In Progress',
      tone: 'bg-secondary-200/70 text-secondary-800',
    },
    {
      icon: Award,
      value: completedCourses,
      label: 'Completed',
      tone: 'bg-amber-100 text-amber-700',
    },
    {
      icon: CheckCircle2,
      value: `${avgProgress}%`,
      label: 'Avg. Progress',
      tone: 'bg-emerald-100 text-emerald-700',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="mb-2 font-serif text-4xl font-bold tracking-tight text-foreground">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Scholar'}
            </h1>
            <p className="text-lg text-muted-foreground">
              Your personal sanctuary for learning and growth.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Clock className="h-4 w-4" />
            <span>
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s) => (
            <Card
              key={s.label}
              className="cursor-default border-none bg-card shadow-tactile-sm hover:translate-y-0 hover:shadow-tactile-sm"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${s.tone}`}
                >
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mb-1 font-serif text-3xl font-bold text-foreground">
                  {s.value}
                </div>
                <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue learning */}
        {continueLearning && continueLearning.percent < 100 && (
          <section className="mb-16">
            <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
              Continue learning
            </h2>

            <Card className="relative overflow-hidden border-none bg-primary text-primary-foreground">
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              <CardContent className="relative z-10 p-8">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                      Last active
                    </div>
                    <div>
                      <h3 className="mb-2 font-serif text-2xl font-bold md:text-3xl">
                        {continueLearning.course.title}
                      </h3>
                      <p className="text-lg text-primary-foreground/80">
                        Up next · {continueLearning.resumeTitle}
                      </p>
                    </div>
                    <div className="max-w-md">
                      <div className="mb-2 flex items-center justify-between text-sm opacity-90">
                        <span>{continueLearning.percent}% complete</span>
                        <span>
                          {continueLearning.completed}/{continueLearning.total}{' '}
                          lessons
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-black/20">
                        <div
                          className="h-2 rounded-full bg-white transition-all duration-500 ease-out"
                          style={{ width: `${continueLearning.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Link
                      href={`/courses/${continueLearning.course.id}/watch/${continueLearning.resumeId}`}
                    >
                      <Button
                        variant="secondary"
                        size="lg"
                        className="h-14 border-none bg-white px-8 text-lg text-primary shadow-lg hover:bg-white/90"
                      >
                        <Play className="mr-2 h-5 w-5 fill-current" />
                        Resume course
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* My courses */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              My courses
            </h2>
            <Link href="/courses">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                Browse library
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {enrolled.map(({ course, percent, completed, total, resumeId }) => {
              const style = categoryStyle(course.category)
              const done = percent === 100
              return (
                <Card
                  key={course.id}
                  className="group overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-video bg-muted">
                    {course.thumbnail_url ? (
                      <Image
                        src={course.thumbnail_url}
                        alt={course.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`flex h-full items-center justify-center bg-gradient-to-br font-serif text-5xl text-white ${style.gradient}`}
                      >
                        {style.glyph}
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <CardContent className="p-5">
                    <h3 className="mb-3 line-clamp-2 font-serif text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                      {course.title}
                    </h3>

                    <div className="mb-4">
                      <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary">{percent}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ease-out ${
                            done ? 'bg-emerald-500' : 'bg-primary'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {completed}/{total} lessons
                        </span>
                      </div>
                      {done && (
                        <div className="flex items-center gap-1 font-medium text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0">
                    <Link
                      href={`/courses/${course.id}/watch/${resumeId}`}
                      className="w-full"
                    >
                      <Button
                        variant={done ? 'outline' : 'primary'}
                        className="w-full"
                      >
                        {done ? 'Review course' : 'Continue learning'}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}
