import Link from 'next/link'
import Image from 'next/image'
import type { CourseWithInstructor } from '@/types/database'
import { Clock, Users, Star } from 'lucide-react'

interface CourseCardProps {
    course: CourseWithInstructor
}

export function CourseCard({ course }: CourseCardProps) {
    // Calculate total duration (sum of all lesson durations)
    const totalHours = 24 // Placeholder - will calculate from lessons in real implementation

    return (
        <Link
            href={`/courses/${course.id}`}
            className="group block bg-background rounded-xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary-600/20 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
                {course.thumbnail_url ? (
                    <Image
                        src={course.thumbnail_url}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-4xl">📚</span>
                    </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border">
                    {course.category}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-sm text-muted-foreground mb-3">
                    {course.instructor.full_name}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">4.5</span>
                        <span className="text-xs">(120)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>1.2k</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{totalHours}h</span>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    {course.price > 0 ? (
                        <span className="text-2xl font-bold text-foreground">
                            ${course.price}
                        </span>
                    ) : (
                        <span className="text-xl font-bold text-primary-600">Free</span>
                    )}

                    {/* Hover arrow */}
                    <div className="text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                    </div>
                </div>
            </div>
        </Link>
    )
}
