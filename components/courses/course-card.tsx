import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, Star, BookOpen } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Tag } from '@/components/ui/tag'
import { categoryStyle, courseStats, type MockCourse } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  course: MockCourse
}

export function CourseCard({ course }: CourseCardProps) {
  const stats = courseStats(course)
  const style = categoryStyle(course.category)

  return (
    <Link href={`/courses/${course.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden border-none bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
        {/* Cover */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            // Branded gradient cover for courses without bespoke art
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center bg-gradient-to-br text-white',
                style.gradient
              )}
            >
              <span className="font-serif text-6xl opacity-90 drop-shadow-sm">
                {style.glyph}
              </span>
              <span className="absolute bottom-3 left-4 font-serif text-sm font-semibold tracking-wide text-white/90">
                {course.category}
              </span>
            </div>
          )}

          {/* Level + category badges */}
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
            <Tag
              variant="default"
              className="border-white/30 bg-white/90 text-primary-900 shadow-sm backdrop-blur-sm dark:bg-card/90"
            >
              {course.category}
            </Tag>
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {course.level}
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Body */}
        <CardContent className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 line-clamp-2 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
            {course.title}
          </h3>

          <p className="mb-4 text-sm text-muted-foreground">
            By{' '}
            <span className="font-medium text-foreground">
              {course.instructor.full_name}
            </span>
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-foreground">{course.rating.toFixed(1)}</span>
              <span className="opacity-70">
                ({course.ratingsCount.toLocaleString()})
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {course.studentsCount > 999
                ? `${(course.studentsCount / 1000).toFixed(1)}k`
                : course.studentsCount}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {stats.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {stats.totalHours}h
            </span>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="mt-auto flex items-center justify-between border-t border-border/60 p-5 pt-4">
          <div className="flex items-baseline gap-2">
            {course.price > 0 ? (
              <>
                <span className="font-serif text-xl font-bold text-foreground">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${course.originalPrice}
                  </span>
                )}
              </>
            ) : (
              <span className="font-serif text-xl font-bold text-primary">Free</span>
            )}
          </div>

          <span className="flex items-center gap-1 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
            View details →
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
