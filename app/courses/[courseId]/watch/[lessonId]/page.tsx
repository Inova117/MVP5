'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VideoPlayer } from '@/components/video/video-player'
import { CurriculumSidebar } from '@/components/video/curriculum-sidebar'
import { Button } from '@/components/ui/button'
import { CheckCircle, ChevronRight, CheckCircle2, Home } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Tag } from '@/components/ui/tag'

// Mock course data - different content for each course
const MOCK_COURSES: Record<string, any> = {
    '1': {
        id: '1',
        title: 'Complete Web Development Bootcamp 2024',
        modules: [
            {
                id: 'module-1',
                title: 'Introduction to Web Development',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'Welcome to the Course',
                        type: 'video' as const,
                        duration: 300,
                        completed: true,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        posterUrl: '/api/images/web-dev',
                    },
                    {
                        id: 'lesson-2',
                        title: 'Setting Up Your Environment',
                        type: 'video' as const,
                        duration: 600,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                        posterUrl: '/api/images/web-dev',
                    },
                ],
            },
            {
                id: 'module-2',
                title: 'HTML & CSS Fundamentals',
                lessons: [
                    {
                        id: 'lesson-3',
                        title: 'HTML Basics',
                        type: 'video' as const,
                        duration: 900,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                        posterUrl: '/api/images/web-dev',
                    },
                    {
                        id: 'lesson-4',
                        title: 'CSS Styling & Flexbox',
                        type: 'video' as const,
                        duration: 1200,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                        posterUrl: '/api/images/web-dev',
                    },
                    {
                        id: 'lesson-quiz-1',
                        title: 'CSS Knowledge Check',
                        type: 'quiz' as const,
                        duration: 300,
                        completed: false,
                        locked: false,
                        videoUrl: '',
                    },
                ],
            },
            {
                id: 'module-3',
                title: 'JavaScript Fundamentals',
                lessons: [
                    {
                        id: 'lesson-5',
                        title: 'Variables and Data Types',
                        type: 'video' as const,
                        duration: 800,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                        posterUrl: '/api/images/web-dev',
                    },
                    {
                        id: 'lesson-6',
                        title: 'Functions and Scope',
                        type: 'video' as const,
                        duration: 900,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
                        posterUrl: '/api/images/web-dev',
                    },
                ],
            },
        ],
    },
    '2': {
        id: '2',
        title: 'Data Science Fundamentals',
        modules: [
            {
                id: 'module-1',
                title: 'Introduction to Data Science',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'What is Data Science?',
                        type: 'video' as const,
                        duration: 400,
                        completed: true,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        posterUrl: '/api/images/data-science',
                    },
                    {
                        id: 'lesson-2',
                        title: 'Python Setup for Data Science',
                        type: 'video' as const,
                        duration: 700,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                        posterUrl: '/api/images/data-science',
                    },
                ],
            },
            {
                id: 'module-2',
                title: 'Python for Data Analysis',
                lessons: [
                    {
                        id: 'lesson-3',
                        title: 'NumPy Basics',
                        type: 'video' as const,
                        duration: 1000,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                        posterUrl: '/api/images/data-science',
                    },
                    {
                        id: 'lesson-4',
                        title: 'Pandas DataFrames',
                        type: 'video' as const,
                        duration: 1100,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                        posterUrl: '/api/images/data-science',
                    },
                ],
            },
            {
                id: 'module-3',
                title: 'Machine Learning Basics',
                lessons: [
                    {
                        id: 'lesson-5',
                        title: 'Introduction to ML',
                        type: 'video' as const,
                        duration: 950,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                        posterUrl: '/api/images/data-science',
                    },
                    {
                        id: 'lesson-quiz-1',
                        title: 'ML Fundamentals Quiz',
                        type: 'quiz' as const,
                        duration: 400,
                        completed: false,
                        locked: false,
                        videoUrl: '',
                    },
                ],
            },
        ],
    },
    '3': {
        id: '3',
        title: 'UI/UX Design Masterclass',
        modules: [
            {
                id: 'module-1',
                title: 'Design Principles',
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'Introduction to UI/UX',
                        type: 'video' as const,
                        duration: 500,
                        completed: true,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        posterUrl: '/api/images/ui-ux',
                    },
                    {
                        id: 'lesson-2',
                        title: 'Color Theory & Typography',
                        type: 'video' as const,
                        duration: 800,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                        posterUrl: '/api/images/ui-ux',
                    },
                ],
            },
            {
                id: 'module-2',
                title: 'Figma Fundamentals',
                lessons: [
                    {
                        id: 'lesson-3',
                        title: 'Getting Started with Figma',
                        type: 'video' as const,
                        duration: 750,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                        posterUrl: '/api/images/ui-ux',
                    },
                    {
                        id: 'lesson-4',
                        title: 'Components & Auto Layout',
                        type: 'video' as const,
                        duration: 900,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                        posterUrl: '/api/images/ui-ux',
                    },
                    {
                        id: 'lesson-5',
                        title: 'Prototyping Interactions',
                        type: 'video' as const,
                        duration: 850,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                        posterUrl: '/api/images/ui-ux',
                    },
                ],
            },
            {
                id: 'module-3',
                title: 'User Research & Testing',
                lessons: [
                    {
                        id: 'lesson-6',
                        title: 'User Interviews',
                        type: 'video' as const,
                        duration: 700,
                        completed: false,
                        locked: false,
                        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
                        posterUrl: '/api/images/ui-ux',
                    },
                    {
                        id: 'lesson-quiz-1',
                        title: 'Design Thinking Quiz',
                        type: 'quiz' as const,
                        duration: 300,
                        completed: false,
                        locked: false,
                        videoUrl: '',
                    },
                ],
            },
        ],
    },
}

export default function CourseWatchPage({
    params,
}: {
    params: { courseId: string; lessonId: string }
}) {
    const router = useRouter()
    const [currentLessonId, setCurrentLessonId] = useState(params.lessonId)
    const [lessonCompleted, setLessonCompleted] = useState(false)

    // Get the specific course for this courseId
    const MOCK_COURSE = MOCK_COURSES[params.courseId]

    // Handle course not found
    if (!MOCK_COURSE) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold text-foreground mb-3">Course not found</h1>
                    <p className="text-muted-foreground mb-6 font-sans">The course you're looking for doesn't exist.</p>
                    <Link href="/courses">
                        <Button>Browse Courses</Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Find current lesson
    const currentLesson = MOCK_COURSE.modules
        .flatMap((m: any) => m.lessons)
        .find((l: any) => l.id === currentLessonId)

    // Find next lesson
    const allLessons = MOCK_COURSE.modules.flatMap((m: any) => m.lessons)
    const currentIndex = allLessons.findIndex((l: any) => l.id === currentLessonId)
    const nextLesson = allLessons[currentIndex + 1]

    const handleLessonSelect = (lessonId: string) => {
        setCurrentLessonId(lessonId)
        setLessonCompleted(false)
        router.push(`/courses/${params.courseId}/watch/${lessonId}`)
    }

    const handleMarkComplete = () => {
        setLessonCompleted(true)
        // Mock database update
        toast.success('Lesson marked as complete!', {
            description: 'Your progress has been saved.'
        })
    }

    const handleNextLesson = () => {
        if (nextLesson) {
            handleLessonSelect(nextLesson.id)
        }
    }

    const handleProgress = (seconds: number) => {
        // TODO: Save watch progress to database
        console.log('Progress:', seconds)
    }

    const handleVideoComplete = () => {
        setLessonCompleted(true)
    }

    if (!currentLesson) {
        return <div>Lesson not found</div>
    }

    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden">
            {/* Top Bar */}
            <div className="border-b border-border p-4 bg-card/80 backdrop-blur-md z-20 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                            <Home className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-serif font-bold text-foreground line-clamp-1">
                            {MOCK_COURSE.title}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Tag className="hidden md:inline-flex">{currentLesson.type === 'video' ? 'Video Lesson' : 'Quiz'}</Tag>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Video/Content Section */}
                <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
                    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
                        {/* Content Container */}
                        <div className="mb-8">
                            {currentLesson.type === 'video' ? (
                                <div className="space-y-6">
                                    <VideoPlayer
                                        src={(currentLesson as any).videoUrl}
                                        poster={(currentLesson as any).posterUrl}
                                        onProgress={handleProgress}
                                        onComplete={handleVideoComplete}
                                    />
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div>
                                            <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                                                {currentLesson.title}
                                            </h2>
                                            <p className="text-muted-foreground font-sans text-lg">
                                                Lesson {currentIndex + 1} of {allLessons.length}
                                            </p>
                                        </div>

                                        <div className="flex gap-3 shrink-0">
                                            {!lessonCompleted ? (
                                                <Button size="lg" onClick={handleMarkComplete} className="shadow-tactile hover:shadow-lift">
                                                    <CheckCircle className="w-5 h-5 mr-2" />
                                                    Mark Complete
                                                </Button>
                                            ) : (
                                                <div className="flex items-center gap-2 text-primary font-medium px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    <span>Completed</span>
                                                </div>
                                            )}

                                            {nextLesson && (
                                                <Button variant="outline" size="lg" onClick={handleNextLesson} className="bg-card">
                                                    Next Lesson
                                                    <ChevronRight className="w-5 h-5 ml-2" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : currentLesson.type === 'quiz' ? (
                                <div className="bg-card border border-primary/10 rounded-2xl p-12 text-center py-24 shadow-tactile-lg">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6 ring-8 ring-primary/5">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-foreground mb-3">Knowledge Check</h3>
                                    <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
                                        Test your knowledge of the concepts covered in this module. Ready to begin?
                                    </p>
                                    <Button size="lg" className="h-12 px-8 text-lg" onClick={() => toast.success('Quiz feature coming soon!', { description: "We're polishing this feature for you." })}>
                                        Start Quiz
                                    </Button>
                                </div>
                            ) : (
                                <div className="bg-muted rounded-xl p-12 text-center text-muted-foreground">
                                    Content not available
                                </div>
                            )}
                        </div>

                        {/* Lesson Description/Resources (Placeholder) */}
                        <div className="prose prose-stone dark:prose-invert max-w-none">
                            <h3 className="font-serif">About this lesson</h3>
                            <p>
                                In this lesson, we dive deep into the core concepts. Make sure to download the attached resources and follow along with the exercises.
                            </p>
                            <ul>
                                <li>Understanding the basics</li>
                                <li>Applying best practices</li>
                                <li>Common pitfalls to avoid</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Curriculum Sidebar */}
                <div className="w-80 lg:w-96 flex-shrink-0 border-l border-border bg-card/30 backdrop-blur-sm hidden md:block">
                    <CurriculumSidebar
                        modules={MOCK_COURSE.modules}
                        currentLessonId={currentLessonId}
                        onLessonSelect={handleLessonSelect}
                    />
                </div>
            </div>
        </div>
    )
}
