'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VideoPlayer } from '@/components/video/video-player'
import { CurriculumSidebar } from '@/components/video/curriculum-sidebar'
import { Button } from '@/components/ui/button'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

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
                    <h1 className="text-2xl font-bold text-foreground mb-2">Course not found</h1>
                    <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
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
        <div className="h-screen flex flex-col bg-background">
            {/* Top Bar */}
            <div className="border-b border-border p-4">
                <h1 className="text-xl font-semibold text-foreground">
                    {MOCK_COURSE.title}
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Video Section */}
                <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                    {/* Content Section */}
                    <div className="mb-6">
                        {currentLesson.type === 'video' ? (
                            <VideoPlayer
                                src={(currentLesson as any).videoUrl}
                                poster={(currentLesson as any).posterUrl}
                                onProgress={handleProgress}
                                onComplete={handleVideoComplete}
                            />
                        ) : currentLesson.type === 'quiz' ? (
                            <div className="bg-background border border-border rounded-xl p-8 text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 mb-4">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">Knowledge Check</h3>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    Test your knowledge of the concepts covered in this module.
                                </p>
                                <Button size="lg" onClick={() => toast.success('Quiz feature coming soon!')}>
                                    Start Quiz
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-muted rounded-xl p-12 text-center text-muted-foreground">
                                Content not available
                            </div>
                        )}
                    </div>

                    {/* Lesson Info */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            {currentLesson.title}
                        </h2>
                        <p className="text-muted-foreground">
                            Lesson {currentIndex + 1} of {allLessons.length}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        {!lessonCompleted ? (
                            <Button onClick={handleMarkComplete}>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Mark as Complete
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Completed ✓</span>
                            </div>
                        )}

                        {nextLesson && (
                            <Button variant="outline" onClick={handleNextLesson}>
                                Next Lesson
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Curriculum Sidebar */}
                <div className="w-96 flex-shrink-0">
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
