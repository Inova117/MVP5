'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, GripVertical, Trash2, Check } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Module {
    id: string
    title: string
    lessons: Lesson[]
}

interface Lesson {
    id: string
    title: string
    type: 'video' | 'text' | 'quiz'
    duration: number
}

export default function CourseCreatePage() {
    const router = useRouter()
    const [step, setStep] = useState(1)

    // Step 1: Course Basics
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Technology')
    const [price, setPrice] = useState('99.99')

    // Step 2: Curriculum
    const [modules, setModules] = useState<Module[]>([])

    // Step 3: Publish


    const addModule = () => {
        const newModule: Module = {
            id: `module-${Date.now()}`,
            title: 'New Module',
            lessons: [],
        }
        setModules([...modules, newModule])
    }

    const addLesson = (moduleId: string) => {
        const newLesson: Lesson = {
            id: `lesson-${Date.now()}`,
            title: 'New Lesson',
            type: 'video',
            duration: 600,
        }
        setModules(
            modules.map((m) =>
                m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
            )
        )
    }

    const removeModule = (moduleId: string) => {
        setModules(modules.filter((m) => m.id !== moduleId))
    }

    const removeLesson = (moduleId: string, lessonId: string) => {
        setModules(
            modules.map((m) =>
                m.id === moduleId
                    ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
                    : m
            )
        )
    }

    const handlePublish = () => {
        // Mock DB save
        toast.success('Course published successfully!', {
            description: 'Your course is now live for students.'
        })
        router.push('/instructor')
    }

    const handleSaveDraft = () => {
        // Mock DB save
        toast.success('Draft saved successfully', {
            description: 'You can come back and edit this later.'
        })
        router.push('/instructor')
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/instructor">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-display font-bold text-foreground">
                                Create New Course
                            </h1>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex items-center gap-2">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`flex items-center justify-center w-8 h-8 rounded-full ${step === s
                                        ? 'bg-primary-600 text-white'
                                        : step > s
                                            ? 'bg-green-500 text-white'
                                            : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {step > s ? <Check className="w-5 h-5" /> : s}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Step 1: Course Basics */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-4">
                                Course Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Course Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Complete Web Development Bootcamp"
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        placeholder="Describe what students will learn..."
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600"
                                        >
                                            <option>Technology</option>
                                            <option>Design</option>
                                            <option>Business</option>
                                            <option>Marketing</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Price (USD)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                onClick={() => setStep(2)}
                                disabled={!title || !description}
                            >
                                Next: Curriculum
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Curriculum */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-foreground">
                                Course Curriculum
                            </h2>
                            <Button onClick={addModule} variant="outline">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Module
                            </Button>
                        </div>

                        {modules.length === 0 ? (
                            <div className="bg-muted rounded-lg p-12 text-center">
                                <p className="text-muted-foreground mb-4">
                                    No modules yet. Add your first module to start building your
                                    course.
                                </p>
                                <Button onClick={addModule}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Module
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {modules.map((module) => (
                                    <div
                                        key={module.id}
                                        className="bg-background border border-border rounded-lg overflow-hidden"
                                    >
                                        {/* Module Header */}
                                        <div className="bg-muted p-4 flex items-center gap-3">
                                            <GripVertical className="w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={module.title}
                                                onChange={(e) => {
                                                    setModules(
                                                        modules.map((m) =>
                                                            m.id === module.id
                                                                ? { ...m, title: e.target.value }
                                                                : m
                                                        )
                                                    )
                                                }}
                                                className="flex-1 px-2 py-1 bg-background rounded border border-border text-foreground"
                                            />
                                            <button
                                                onClick={() => addLesson(module.id)}
                                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                            >
                                                + Lesson
                                            </button>
                                            <button
                                                onClick={() => removeModule(module.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Lessons */}
                                        <div className="divide-y divide-border">
                                            {module.lessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className="p-3 flex items-center gap-3"
                                                >
                                                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                                                    <input
                                                        type="text"
                                                        value={lesson.title}
                                                        onChange={(e) => {
                                                            setModules(
                                                                modules.map((m) =>
                                                                    m.id === module.id
                                                                        ? {
                                                                            ...m,
                                                                            lessons: m.lessons.map((l) =>
                                                                                l.id === lesson.id
                                                                                    ? { ...l, title: e.target.value }
                                                                                    : l
                                                                            ),
                                                                        }
                                                                        : m
                                                                )
                                                            )
                                                        }}
                                                        className="flex-1 px-2 py-1 bg-background rounded border border-border text-foreground text-sm"
                                                    />
                                                    <select
                                                        value={lesson.type}
                                                        className="px-2 py-1 bg-background rounded border border-border text-foreground text-sm"
                                                    >
                                                        <option value="video">Video</option>
                                                        <option value="text">Text</option>
                                                        <option value="quiz">Quiz</option>
                                                    </select>
                                                    <button
                                                        onClick={() => removeLesson(module.id, lesson.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setStep(1)}>
                                Back
                            </Button>
                            <Button onClick={() => setStep(3)} disabled={modules.length === 0}>
                                Next: Preview & Publish
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Preview & Publish */}
                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-foreground">
                            Review & Publish
                        </h2>

                        <div className="bg-background border border-border rounded-lg p-6 space-y-4">
                            <div>
                                <h3 className="font-semibold text-foreground text-lg mb-1">
                                    {title}
                                </h3>
                                <p className="text-muted-foreground">{description}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <div className="text-muted-foreground">Category</div>
                                    <div className="font-medium text-foreground">{category}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">Price</div>
                                    <div className="font-medium text-foreground">${price}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">Content</div>
                                    <div className="font-medium text-foreground">
                                        {modules.length} modules,{' '}
                                        {modules.reduce((sum, m) => sum + m.lessons.length, 0)}{' '}
                                        lessons
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setStep(2)}>
                                Back
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={handleSaveDraft}>
                                    Save as Draft
                                </Button>
                                <Button onClick={handlePublish}>Publish Course</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
