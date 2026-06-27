'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useAuth } from '@/components/providers/auth-provider'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { INSTRUCTOR_COURSES } from '@/lib/mock-data'
import {
  Users,
  BookOpen,
  DollarSign,
  Star,
  MoreVertical,
  Plus,
  TrendingUp,
} from 'lucide-react'

// Client-only chart (avoids zero-size SSR render warning during prerender)
const RevenueChart = dynamic(
  () => import('@/components/instructor/revenue-chart').then((m) => m.RevenueChart),
  {
    ssr: false,
    loading: () => <div className="h-64 w-full animate-pulse rounded-xl bg-muted/50" />,
  }
)

const REVENUE_TREND = [
  { month: 'Jan', revenue: 9800 },
  { month: 'Feb', revenue: 12400 },
  { month: 'Mar', revenue: 11200 },
  { month: 'Apr', revenue: 15600 },
  { month: 'May', revenue: 18900 },
  { month: 'Jun', revenue: 22400 },
]

export default function InstructorPage() {
  const { profile } = useAuth()

  const totalStudents = INSTRUCTOR_COURSES.reduce((s, c) => s + c.students, 0)
  const activeCourses = INSTRUCTOR_COURSES.filter(
    (c) => c.status === 'published'
  ).length
  const totalRevenue = INSTRUCTOR_COURSES.reduce((s, c) => s + c.revenue, 0)
  const rated = INSTRUCTOR_COURSES.filter((c) => c.rating > 0)
  const avgRating = rated.length
    ? rated.reduce((s, c) => s + c.rating, 0) / rated.length
    : 0

  const stats = [
    {
      icon: Users,
      value: totalStudents.toLocaleString(),
      label: 'Total students',
      tone: 'bg-primary/10 text-primary',
      trend: '+12.4%',
    },
    {
      icon: BookOpen,
      value: String(activeCourses),
      label: 'Active courses',
      tone: 'bg-secondary-200/70 text-secondary-800',
    },
    {
      icon: DollarSign,
      value: `$${totalRevenue.toLocaleString()}`,
      label: 'Total revenue',
      tone: 'bg-emerald-100 text-emerald-700',
      trend: '+18.6%',
    },
    {
      icon: Star,
      value: avgRating.toFixed(1),
      label: 'Average rating',
      tone: 'bg-amber-100 text-amber-700',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow mb-2">Instructor studio</span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
              Welcome, {profile?.full_name?.split(' ')[0] || 'Instructor'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here&apos;s how your courses are performing this month.
            </p>
          </div>
          <Link href="/instructor/courses/create">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create new course
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-6 shadow-tactile-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.tone}`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                {s.trend && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {s.trend}
                  </span>
                )}
              </div>
              <div className="font-serif text-3xl font-bold text-foreground">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-6 shadow-tactile-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">
                Revenue overview
              </h2>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <div className="text-right">
              <div className="font-serif text-2xl font-bold text-foreground">
                ${REVENUE_TREND.reduce((s, m) => s + m.revenue, 0).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total earned</div>
            </div>
          </div>
          <RevenueChart data={REVENUE_TREND} />
        </div>

        {/* Courses table */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
            Your courses
          </h2>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-tactile-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/60">
                  <tr>
                    {['Course', 'Status', 'Students', 'Completion', 'Revenue', 'Rating', ''].map(
                      (h, i) => (
                        <th
                          key={h || i}
                          className={`px-6 py-3.5 text-sm font-semibold text-foreground ${
                            i === 6 ? 'text-right' : 'text-left'
                          }`}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {INSTRUCTOR_COURSES.map((course) => (
                    <tr
                      key={course.id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">
                          {course.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            course.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              course.status === 'published'
                                ? 'bg-emerald-500'
                                : 'bg-amber-500'
                            }`}
                          />
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {course.students.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {course.status === 'published' ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${course.completionRate}%` }}
                              />
                            </div>
                            <span className="text-sm text-foreground">
                              {course.completionRate}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        ${course.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {course.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-foreground">{course.rating}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-muted-foreground transition-colors hover:text-foreground">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}
