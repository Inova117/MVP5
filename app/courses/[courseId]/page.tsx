'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { useAuth } from '@/components/providers/auth-provider'
import { useProgress } from '@/components/providers/progress-provider'
import {
  getCourse,
  courseStats,
  allLessons,
  formatLessonLength,
  categoryStyle,
  type MockLesson,
} from '@/lib/mock-data'
import {
  Clock,
  Users,
  Star,
  Award,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
  Globe,
  BarChart3,
  Lock,
  Play,
} from 'lucide-react'
import { toast } from 'sonner'

function lessonIcon(lesson: MockLesson) {
  if (lesson.type === 'video') return PlayCircle
  if (lesson.type === 'text') return FileText
  return HelpCircle
}

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string }
}) {
  const router = useRouter()
  const { user } = useAuth()
  const { isComplete, progressFor, enrolledCourseIds } = useProgress()
  const [enrolling, setEnrolling] = useState(false)

  const course = getCourse(params.courseId)

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="mb-3 font-serif text-3xl font-bold text-foreground">
              Course not found
            </h1>
            <p className="mb-6 text-muted-foreground">
              The course you&apos;re looking for doesn&apos;t exist or has been
              unpublished.
            </p>
            <Link href="/courses">
              <Button>Browse courses</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const stats = courseStats(course)
  const lessons = allLessons(course)
  const style = categoryStyle(course.category)
  const isEnrolled = enrolledCourseIds.includes(course.id)
  const { percent } = progressFor(course.id)
  const firstLesson = lessons[0]!
  const resumeLesson =
    lessons.find((l) => !isComplete(course.id, l.id)) ?? firstLesson
  const previewLesson = lessons.find((l) => l.preview) ?? firstLesson

  const handleEnroll = () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${course.id}`)
      return
    }
    if (isEnrolled) {
      router.push(`/courses/${course.id}/watch/${resumeLesson.id}`)
      return
    }
    setEnrolling(true)
    setTimeout(() => {
      setEnrolling(false)
      toast.success('Enrolled successfully!', {
        description: 'Your first lesson is ready.',
      })
      router.push(`/courses/${course.id}/watch/${firstLesson.id}`)
    }, 900)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-700 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="container relative mx-auto px-4 py-14">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                {course.category}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                {course.level}
              </span>
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              {course.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="h-5 w-5 fill-amber-300 text-amber-300" />
                <span className="font-semibold">{course.rating.toFixed(1)}</span>
                <span className="text-white/70">
                  ({course.ratingsCount.toLocaleString()} ratings)
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-5 w-5" />
                {course.studentsCount.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-5 w-5" />
                {stats.totalHours} hours
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-5 w-5" />
                {course.language}
              </span>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Created by{' '}
              <span className="font-medium text-white">
                {course.instructor.full_name}
              </span>{' '}
              · Updated {course.lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-8 lg:col-span-2">
            {/* What you'll learn */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-tactile-sm">
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                What you&apos;ll learn
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {course.learningPoints.map((point, i) => (
                  <div key={i} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <div className="mb-4 flex items-end justify-between">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Course curriculum
                </h2>
                <p className="text-sm text-muted-foreground">
                  {stats.moduleCount} modules · {stats.totalLessons} lessons ·{' '}
                  {stats.totalHours}h
                </p>
              </div>

              <div className="space-y-3">
                {course.modules.map((module, i) => (
                  <div
                    key={module.id}
                    className="overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <div className="flex items-center justify-between bg-muted/60 px-5 py-3.5">
                      <h3 className="font-serif font-bold text-foreground">
                        <span className="mr-2 text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {module.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {module.lessons.length} lessons
                      </span>
                    </div>
                    <div className="divide-y divide-border/70">
                      {module.lessons.map((lesson) => {
                        const Icon = lessonIcon(lesson)
                        const done = isComplete(course.id, lesson.id)
                        const watchable = isEnrolled || lesson.preview
                        return (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-muted/40"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              {done ? (
                                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                              ) : watchable ? (
                                <Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                              ) : (
                                <Lock className="h-4 w-4 flex-shrink-0 text-muted-foreground/70" />
                              )}
                              <span className="truncate text-sm text-foreground">
                                {lesson.title}
                              </span>
                              {lesson.preview && !isEnrolled && (
                                <Tag variant="secondary" className="hidden sm:inline-flex">
                                  Preview
                                </Tag>
                              )}
                            </div>
                            <span className="ml-3 flex-shrink-0 text-xs text-muted-foreground">
                              {formatLessonLength(lesson.duration)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Instructor */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-tactile-sm">
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                Your instructor
              </h2>
              <div className="flex gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-2xl font-bold text-white">
                  {course.instructor.full_name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {course.instructor.full_name}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-primary">
                    {course.instructor.title}
                  </p>
                  <p className="text-muted-foreground">{course.instructor.bio}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-border bg-card shadow-tactile-lg">
              {/* Cover */}
              <div className="relative aspect-video bg-muted">
                {course.thumbnail_url ? (
                  <Image
                    src={course.thumbnail_url}
                    alt={course.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className={`flex h-full items-center justify-center bg-gradient-to-br font-serif text-6xl text-white ${style.gradient}`}
                  >
                    {style.glyph}
                  </div>
                )}
                <Link
                  href={`/courses/${course.id}/watch/${previewLesson.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </span>
                </Link>
              </div>

              <div className="p-6">
                {isEnrolled ? (
                  <div className="mb-4">
                    <div className="mb-1.5 flex items-center justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Your progress</span>
                      <span className="text-primary">{percent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-foreground">
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                )}

                <Button
                  className="mb-3 w-full"
                  size="lg"
                  onClick={handleEnroll}
                  loading={enrolling}
                >
                  {isEnrolled ? 'Continue learning' : 'Enroll now'}
                </Button>

                {!isEnrolled && (
                  <Link href={`/courses/${course.id}/watch/${previewLesson.id}`}>
                    <Button variant="outline" className="mb-5 w-full">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Watch free preview
                    </Button>
                  </Link>
                )}

                <ul className="space-y-3 text-sm">
                  <SidebarStat icon={BarChart3} label="Level" value={course.level} />
                  <SidebarStat
                    icon={PlayCircle}
                    label="Lessons"
                    value={String(stats.totalLessons)}
                  />
                  <SidebarStat
                    icon={Clock}
                    label="Total length"
                    value={`${stats.totalHours}h`}
                  />
                  <SidebarStat icon={Globe} label="Language" value={course.language} />
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Award className="h-4 w-4" />
                      Certificate
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

function SidebarStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="font-medium text-foreground">{value}</span>
    </li>
  )
}
