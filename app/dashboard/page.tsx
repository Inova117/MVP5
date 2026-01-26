'use client'

import { useAuth } from '@/components/providers/auth-provider'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    BookOpen,
    Clock,
    Award,
    TrendingUp,
    Play,
    CheckCircle2,
} from 'lucide-react'
import Image from 'next/image'

// Mock enrolled courses
const MOCK_ENROLLED_COURSES = [
    {
        id: '1',
        title: 'Complete Web Development Bootcamp 2024',
        thumbnail_url: '/api/images/web-dev',
        progress: 35,
        lastLesson: 'JavaScript Fundamentals - Variables',
        lastLessonId: 'lesson-5',
        totalLessons: 42,
        completedLessons: 15,
    },
    {
        id: '2',
        title: 'Data Science Fundamentals',
        thumbnail_url: '/api/images/data-science',
        progress: 60,
        lastLesson: 'Introduction to ML',
        lastLessonId: 'lesson-5',
        totalLessons: 30,
        completedLessons: 18,
    },
    {
        id: '3',
        title: 'UI/UX Design Masterclass',
        thumbnail_url: '/api/images/ui-ux',
        progress: 100,
        lastLesson: 'Design Thinking Quiz',
        lastLessonId: 'lesson-quiz-1',
        totalLessons: 25,
        completedLessons: 25,
    },
]

export default function DashboardPage() {
    const { profile } = useAuth()

    const totalCourses = MOCK_ENROLLED_COURSES.length
    const completedCourses = MOCK_ENROLLED_COURSES.filter(
        (c) => c.progress === 100
    ).length
    const inProgressCourses = totalCourses - completedCourses
    const avgProgress =
        MOCK_ENROLLED_COURSES.reduce((sum, c) => sum + c.progress, 0) /
        totalCourses

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                        Welcome back, {profile?.full_name}! 👋
                    </h1>
                    <p className="text-muted-foreground">
                        Continue your learning journey
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-background border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <BookOpen className="w-8 h-8 text-primary-600" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {totalCourses}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Enrolled Courses
                        </div>
                    </div>

                    <div className="bg-background border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="w-8 h-8 text-secondary-600" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {inProgressCourses}
                        </div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                    </div>

                    <div className="bg-background border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Award className="w-8 h-8 text-yellow-500" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {completedCourses}
                        </div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                    </div>

                    <div className="bg-background border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Clock className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {Math.round(avgProgress)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Avg Progress</div>
                    </div>
                </div>

                {/* Continue Learning */}
                {inProgressCourses > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">
                            Continue Learning
                        </h2>
                        <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="text-sm opacity-75 mb-1">Last watched</div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {MOCK_ENROLLED_COURSES[0]?.title}
                                    </h3>
                                    <p className="opacity-90 mb-4">
                                        {MOCK_ENROLLED_COURSES[0]?.lastLesson}
                                    </p>
                                    <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                                        <div
                                            className="bg-white h-2 rounded-full transition-all"
                                            style={{
                                                width: `${MOCK_ENROLLED_COURSES[0]?.progress}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="text-sm opacity-75">
                                        {MOCK_ENROLLED_COURSES[0]?.progress}% Complete •{' '}
                                        {MOCK_ENROLLED_COURSES[0]?.completedLessons}/
                                        {MOCK_ENROLLED_COURSES[0]?.totalLessons} lessons
                                    </div>
                                </div>
                                <Link href={`/courses/${MOCK_ENROLLED_COURSES[0]?.id}/watch/${MOCK_ENROLLED_COURSES[0]?.lastLessonId}`}>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-white text-primary-600 hover:bg-gray-100"
                                    >
                                        <Play className="w-5 h-5 mr-2" />
                                        Continue
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* My Courses */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-foreground">
                            My Courses
                        </h2>
                        <Link href="/courses">
                            <Button variant="outline">Browse More Courses</Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_ENROLLED_COURSES.map((course) => (
                            <div
                                key={course.id}
                                className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-video relative bg-slate-100 dark:bg-slate-800">
                                    {course.thumbnail_url ? (
                                        <Image
                                            src={course.thumbnail_url}
                                            alt={course.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <BookOpen className="w-12 h-12 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-foreground mb-3 line-clamp-2">
                                        {course.title}
                                    </h3>

                                    {/* Progress Bar */}
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-semibold text-foreground">
                                                {course.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all ${course.progress === 100
                                                    ? 'bg-green-500'
                                                    : 'bg-primary-600'
                                                    }`}
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                        <span>
                                            {course.completedLessons}/{course.totalLessons} lessons
                                        </span>
                                        {course.progress === 100 && (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <Link href={`/courses/${course.id}/watch/${course.lastLessonId}`}>
                                        <Button
                                            variant={course.progress === 100 ? 'outline' : 'primary'}
                                            className="w-full"
                                        >
                                            {course.progress === 100 ? 'Review' : 'Continue'}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
