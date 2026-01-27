import Link from 'next/link'
import Image from 'next/image'
import type { CourseWithInstructor } from '@/types/database'
import { Clock, Users, Star } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Tag } from '@/components/ui/tag'

interface CourseCardProps {
    course: CourseWithInstructor
}

export function CourseCard({ course }: CourseCardProps) {
    // Calculate total duration (sum of all lesson durations)
    const totalHours = 24 // Placeholder - will calculate from lessons in real implementation

    return (
        <Link href={`/courses/${course.id}`} className="block h-full">
            <Card className="h-full overflow-hidden hover:-translate-y-1 hover:shadow-lift transition-all duration-300 group border-none bg-card">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                    {course.thumbnail_url ? (
                        <Image
                            src={course.thumbnail_url}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 bg-secondary/30">
                            <span className="text-4xl">📚</span>
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                        <Tag variant="default" className="bg-white/90 backdrop-blur-sm border-white/20 shadow-sm">
                            {course.category}
                        </Tag>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <CardContent className="p-5">
                    {/* Title */}
                    <h3 className="font-serif font-bold text-xl text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>

                    {/* Instructor */}
                    <p className="text-sm text-muted-foreground mb-4 font-sans">
                        By <span className="text-foreground font-medium">{course.instructor.full_name}</span>
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                        <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-full">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-foreground">{4.5}</span>
                            <span className="opacity-70">(120)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>1.2k</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{totalHours}h</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                    {course.price > 0 ? (
                        <span className="text-xl font-bold font-serif text-foreground">
                            ${course.price}
                        </span>
                    ) : (
                        <span className="text-xl font-bold font-serif text-primary">Free</span>
                    )}

                    <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                        View Details →
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
}
