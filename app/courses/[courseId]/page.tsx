'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers/auth-provider'
import {
    Clock,
    Users,
    Star,
    Award,
    BookOpen,
    CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'

// Mock course data - will be replaced with dynamic data from Supabase
const MOCK_COURSE = {
    id: '1',
    title: 'Complete Web Development Bootcamp 2024',
    description:
        'Master web development from scratch with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and deploy real-world projects.',
    category: 'Technology',
    price: 99.99,
    instructor: {
        full_name: 'Dr. Sarah Johnson',
        bio: 'Senior Software Engineer with 15+ years of experience. Former tech lead at Google and Amazon.',
        avatar_url: null,
    },
    modules: [
        {
            title: 'Introduction to Web Development',
            lessons: [
                { title: 'Welcome to the Course', type: 'video', duration: 300 },
                { title: 'Setting Up Your Environment', type: 'video', duration: 600 },
            ],
        },
        {
            title: 'HTML & CSS Fundamentals',
            lessons: [
                { title: 'HTML Basics', type: 'video', duration: 900 },
                { title: 'CSS Styling', type: 'video', duration: 1200 },
                { title: 'Responsive Design', type: 'video', duration: 800 },
            ],
        },
    ],
    learningPoints: [
        'Build responsive websites with HTML and CSS',
        'Master JavaScript and modern ES6+ features',
        'Create interactive web apps with React',
        'Build backend APIs with Node.js and Express',
        'Deploy applications to production',
    ],
}

export default function CourseDetailPage({
    params,
}: {
    params: { courseId: string }
}) {
    const router = useRouter()
    const { user } = useAuth()
    const [enrolling, setEnrolling] = useState(false)

    // ... imports

    const handleEnroll = async () => {
        if (!user) {
            router.push(`/login?redirect=/courses/${params.courseId}`)
            return
        }

        setEnrolling(true)
        // Mock enrollment
        setTimeout(() => {
            setEnrolling(false)
            toast.success('Enrolled successfully!', {
                description: 'You can now start learning.'
            })
            router.push('/dashboard')
        }, 1000)
    }

    const totalLessons = MOCK_COURSE.modules.reduce(
        (sum, module) => sum + module.lessons.length,
        0
    )
    const totalDuration = MOCK_COURSE.modules.reduce(
        (sum, module) =>
            sum +
            module.lessons.reduce((s, lesson) => s + (lesson.duration || 0), 0),
        0
    )
    const totalHours = Math.floor(totalDuration / 3600)

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-4">
                            {MOCK_COURSE.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            {MOCK_COURSE.title}
                        </h1>
                        <p className="text-xl mb-6 opacity-90">
                            {MOCK_COURSE.description}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                                <span className="font-semibold">4.8</span>
                                <span className="opacity-75">(2,150 ratings)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                <span>12,450 students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{totalHours} hours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* What You'll Learn */}
                        <section className="bg-background border border-border rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">
                                What you'll learn
                            </h2>
                            <div className="grid md:grid-cols-2 gap-3">
                                {MOCK_COURSE.learningPoints.map((point, i) => (
                                    <div key={i} className="flex gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Course Curriculum */}
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">
                                Course Curriculum
                            </h2>
                            <div className="space-y-3">
                                {MOCK_COURSE.modules.map((module, i) => (
                                    <div
                                        key={i}
                                        className="bg-background border border-border rounded-lg overflow-hidden"
                                    >
                                        <div className="p-4 bg-muted">
                                            <h3 className="font-semibold text-foreground">
                                                {module.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {module.lessons.length} lessons
                                            </p>
                                        </div>
                                        <div className="divide-y divide-border">
                                            {module.lessons.map((lesson, j) => (
                                                <div
                                                    key={j}
                                                    className="p-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-sm text-foreground">
                                                            {lesson.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {Math.floor((lesson.duration || 0) / 60)} min
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Instructor */}
                        <section className="bg-background border border-border rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">
                                Your Instructor
                            </h2>
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                    {MOCK_COURSE.instructor.full_name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-foreground mb-1">
                                        {MOCK_COURSE.instructor.full_name}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {MOCK_COURSE.instructor.bio}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar - Enrollment Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-background border border-border rounded-xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-foreground mb-4">
                                ${MOCK_COURSE.price}
                            </div>

                            <Button
                                className="w-full mb-4"
                                size="lg"
                                onClick={handleEnroll}
                                loading={enrolling}
                            >
                                Enroll Now
                            </Button>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Instructor</span>
                                    <span className="text-foreground font-medium">
                                        {MOCK_COURSE.instructor.full_name}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Total Lessons</span>
                                    <span className="text-foreground font-medium">
                                        {totalLessons}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Duration</span>
                                    <span className="text-foreground font-medium">
                                        {totalHours}h
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Certificate</span>
                                    <Award className="w-5 h-5 text-primary-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
