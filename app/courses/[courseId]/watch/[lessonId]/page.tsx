'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { VideoPlayer } from '@/components/video/video-player'
import { CurriculumSidebar } from '@/components/video/curriculum-sidebar'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { useProgress } from '@/components/providers/progress-provider'
import { getCourse, allLessons } from '@/lib/mock-data'
import {
  CheckCircle,
  ChevronRight,
  CheckCircle2,
  Home,
} from 'lucide-react'
import { toast } from 'sonner'

export default function CourseWatchPage({
  params,
}: {
  params: { courseId: string; lessonId: string }
}) {
  const router = useRouter()
  const { isComplete, markComplete, progressFor } = useProgress()

  const course = getCourse(params.courseId)

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-3 font-serif text-3xl font-bold text-foreground">
            Course not found
          </h1>
          <p className="mb-6 text-muted-foreground">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/courses">
            <Button>Browse courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  const lessons = allLessons(course)
  const currentLesson =
    lessons.find((l) => l.id === params.lessonId) ?? lessons[0]!
  const currentIndex = lessons.findIndex((l) => l.id === currentLesson.id)
  const nextLesson = lessons[currentIndex + 1]
  const lessonCompleted = isComplete(course.id, currentLesson.id)
  const { completed, total, percent } = progressFor(course.id)

  // Map modules into the shape the sidebar expects, deriving completion live.
  const sidebarModules = course.modules.map((m) => ({
    id: m.id,
    title: m.title,
    lessons: m.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      type: l.type,
      duration: l.duration,
      completed: isComplete(course.id, l.id),
      locked: false,
    })),
  }))

  const goToLesson = (lessonId: string) => {
    router.push(`/courses/${course.id}/watch/${lessonId}`)
  }

  const handleMarkComplete = () => {
    if (!lessonCompleted) {
      markComplete(course.id, currentLesson.id)
      toast.success('Lesson marked as complete!', {
        description: 'Your progress has been saved.',
      })
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top bar */}
      <header className="z-20 flex shrink-0 items-center justify-between gap-4 border-b border-border bg-card/80 px-4 py-3 backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <div className="min-w-0">
            <Link
              href={`/courses/${course.id}`}
              className="line-clamp-1 font-serif text-base font-bold text-foreground hover:text-primary"
            >
              {course.title}
            </Link>
            <p className="text-xs text-muted-foreground">
              Lesson {currentIndex + 1} of {lessons.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Course progress */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {completed}/{total}
            </span>
          </div>
          <Tag className="hidden md:inline-flex">
            {currentLesson.type === 'video'
              ? 'Video lesson'
              : currentLesson.type === 'quiz'
                ? 'Quiz'
                : 'Reading'}
          </Tag>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <div className="custom-scrollbar flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-5xl p-6 md:p-10">
            <div className="mb-8">
              {currentLesson.type === 'video' && currentLesson.videoUrl ? (
                <div className="space-y-6">
                  <VideoPlayer
                    src={currentLesson.videoUrl}
                    poster={course.thumbnail_url ?? undefined}
                    onComplete={handleMarkComplete}
                  />
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                    <div>
                      <h2 className="mb-2 font-serif text-3xl font-bold text-foreground">
                        {currentLesson.title}
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        Lesson {currentIndex + 1} of {lessons.length}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-3">
                      {!lessonCompleted ? (
                        <Button
                          size="lg"
                          onClick={handleMarkComplete}
                          className="shadow-tactile hover:shadow-lift"
                        >
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Mark complete
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-medium text-primary">
                          <CheckCircle2 className="h-5 w-5" />
                          <span>Completed</span>
                        </div>
                      )}

                      {nextLesson && (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => goToLesson(nextLesson.id)}
                        >
                          Next lesson
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : currentLesson.type === 'quiz' ? (
                <div className="rounded-2xl border border-primary/10 bg-card p-12 py-24 text-center shadow-tactile-lg">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mb-3 font-serif text-3xl font-bold text-foreground">
                    {currentLesson.title}
                  </h3>
                  <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                    Test your knowledge of the concepts covered in this module.
                    Ready to begin?
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button
                      size="lg"
                      onClick={() =>
                        toast.success('Quiz feature coming soon!', {
                          description: "We're polishing this feature for you.",
                        })
                      }
                    >
                      Start quiz
                    </Button>
                    {!lessonCompleted && (
                      <Button variant="outline" size="lg" onClick={handleMarkComplete}>
                        Mark complete
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-muted p-12 text-center text-muted-foreground">
                  Content not available
                </div>
              )}
            </div>

            {/* Lesson notes */}
            <div className="prose prose-stone max-w-none dark:prose-invert">
              <h3 className="font-serif">About this lesson</h3>
              <p>
                In this lesson, we dive deep into the core concepts. Make sure to
                download the attached resources and follow along with the
                exercises for the best results.
              </p>
              <ul>
                <li>Understanding the fundamentals</li>
                <li>Applying best practices in real projects</li>
                <li>Common pitfalls and how to avoid them</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="hidden w-80 flex-shrink-0 border-l border-border bg-card/30 backdrop-blur-sm md:block lg:w-96">
          <CurriculumSidebar
            modules={sidebarModules}
            currentLessonId={currentLesson.id}
            onLessonSelect={goToLesson}
          />
        </div>
      </div>
    </div>
  )
}
