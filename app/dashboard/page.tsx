'use client'

import { useAuth } from '@/components/providers/auth-provider'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
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
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-foreground mb-3 tracking-tight">
                            Welcome back, {profile?.full_name?.split(' ')[0] || 'Scholar'}
                        </h1>
                        <p className="text-muted-foreground text-lg font-sans">
                            Your personal sanctuary for learning and growth.
                        </p>
                    </div>
                    <div className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full inline-flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                    <Card className="border-none shadow-tactile-sm bg-card hover:translate-y-0 hover:shadow-tactile-sm cursor-default">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-serif font-bold text-foreground mb-1">
                                {totalCourses}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Enrolled
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-tactile-sm bg-card hover:translate-y-0 hover:shadow-tactile-sm cursor-default">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 text-primary-700">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-serif font-bold text-foreground mb-1">
                                {inProgressCourses}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                In Progress
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-tactile-sm bg-card hover:translate-y-0 hover:shadow-tactile-sm cursor-default">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4 text-yellow-700">
                                <Award className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-serif font-bold text-foreground mb-1">
                                {completedCourses}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Completed
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-tactile-sm bg-card hover:translate-y-0 hover:shadow-tactile-sm cursor-default">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-700">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-serif font-bold text-foreground mb-1">
                                {Math.round(avgProgress)}%
                            </div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Avg. Progress
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Continue Learning - Hero Card */}
                {inProgressCourses > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-serif font-bold text-foreground">
                                Continue Learning
                            </h2>
                        </div>

                        <Card className="relative overflow-hidden bg-primary text-primary-foreground border-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                            <CardContent className="p-8 relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="flex-1 space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            Last Active
                                        </div>

                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                                                {MOCK_ENROLLED_COURSES[0]?.title}
                                            </h3>
                                            <p className="text-primary-foreground/80 text-lg">
                                                {MOCK_ENROLLED_COURSES[0]?.lastLesson}
                                            </p>
                                        </div>

                                        <div className="max-w-md">
                                            <div className="flex items-center justify-between text-sm mb-2 opacity-90">
                                                <span>{MOCK_ENROLLED_COURSES[0]?.progress}% Complete</span>
                                                <span>{MOCK_ENROLLED_COURSES[0]?.completedLessons}/{MOCK_ENROLLED_COURSES[0]?.totalLessons} lessons</span>
                                            </div>
                                            <div className="w-full bg-black/20 rounded-full h-2">
                                                <div
                                                    className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                                                    style={{ width: `${MOCK_ENROLLED_COURSES[0]?.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shrink-0">
                                        <Link href={`/courses/${MOCK_ENROLLED_COURSES[0]?.id}/watch/${MOCK_ENROLLED_COURSES[0]?.lastLessonId}`}>
                                            <Button
                                                variant="secondary"
                                                size="lg"
                                                className="bg-white text-primary hover:bg-white/90 shadow-lg border-none h-14 px-8 text-lg"
                                            >
                                                <Play className="w-5 h-5 mr-2 fill-current" />
                                                Resume Course
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {/* My Courses Grid */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-serif font-bold text-foreground">
                            My Courses
                        </h2>
                        <Link href="/courses">
                            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                                Browse Library
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOCK_ENROLLED_COURSES.map((course) => (
                            <Card key={course.id} className="overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                                {/* Thumbnail */}
                                <div className="aspect-video relative bg-muted">
                                    {course.thumbnail_url ? (
                                        <Image
                                            src={course.thumbnail_url}
                                            alt={course.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                                        </div>
                                    )}
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <CardContent className="p-5">
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                        <h3 className="font-serif font-bold text-lg leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                            {course.title}
                                        </h3>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="text-primary">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ease-out ${course.progress === 100 ? 'bg-green-500' : 'bg-primary'
                                                    }`}
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                        </div>
                                        {course.progress === 100 && (
                                            <div className="flex items-center gap-1 text-green-600 font-medium">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                <span>Completed</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>

                                {/* Footer Action */}
                                <CardFooter className="p-5 pt-0">
                                    <Link href={`/courses/${course.id}/watch/${course.lastLessonId || 'lesson-1'}`} className="w-full">
                                        <Button
                                            variant={course.progress === 100 ? 'outline' : 'primary'}
                                            className="w-full"
                                        >
                                            {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
