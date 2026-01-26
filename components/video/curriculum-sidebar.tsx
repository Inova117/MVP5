'use client'

import { useState } from 'react'
import { CheckCircle2, Lock, PlayCircle, FileText, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Lesson {
    id: string
    title: string
    type: 'video' | 'text' | 'quiz'
    duration: number
    completed: boolean
    locked: boolean
}

interface Module {
    id: string
    title: string
    lessons: Lesson[]
}

interface CurriculumSidebarProps {
    modules: Module[]
    currentLessonId: string
    onLessonSelect: (lessonId: string) => void
}

export function CurriculumSidebar({
    modules,
    currentLessonId,
    onLessonSelect,
}: CurriculumSidebarProps) {
    const [expandedModules, setExpandedModules] = useState<Set<string>>(
        new Set(modules.map((m) => m.id))
    )

    const toggleModule = (moduleId: string) => {
        const newExpanded = new Set(expandedModules)
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId)
        } else {
            newExpanded.add(moduleId)
        }
        setExpandedModules(newExpanded)
    }

    const getLessonIcon = (lesson: Lesson) => {
        if (lesson.completed) {
            return <CheckCircle2 className="w-4 h-4 text-green-500" />
        }
        if (lesson.locked) {
            return <Lock className="w-4 h-4 text-muted-foreground" />
        }
        if (lesson.type === 'video') {
            return <PlayCircle className="w-4 h-4 text-primary-600" />
        }
        if (lesson.type === 'text') {
            return <FileText className="w-4 h-4 text-primary-600" />
        }
        return <HelpCircle className="w-4 h-4 text-primary-600" />
    }

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        return `${mins} min`
    }

    return (
        <div className="h-full bg-background border-l border-border overflow-y-auto">
            <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Course Curriculum</h2>
            </div>

            <div className="divide-y divide-border">
                {modules.map((module) => (
                    <div key={module.id}>
                        {/* Module Header */}
                        <button
                            onClick={() => toggleModule(module.id)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors text-left"
                        >
                            <span className="font-medium text-foreground">
                                {module.title}
                            </span>
                            <svg
                                className={cn(
                                    'w-5 h-5 text-muted-foreground transition-transform',
                                    expandedModules.has(module.id) && 'rotate-180'
                                )}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Lessons */}
                        {expandedModules.has(module.id) && (
                            <div className="bg-muted/30">
                                {module.lessons.map((lesson) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() =>
                                            !lesson.locked && onLessonSelect(lesson.id)
                                        }
                                        disabled={lesson.locked}
                                        className={cn(
                                            'w-full px-4 py-3 flex items-start gap-3 hover:bg-muted transition-colors text-left',
                                            currentLessonId === lesson.id &&
                                            'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600',
                                            lesson.locked && 'opacity-50 cursor-not-allowed'
                                        )}
                                    >
                                        <div className="mt-0.5">{getLessonIcon(lesson)}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-foreground truncate">
                                                {lesson.title}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-0.5">
                                                {formatDuration(lesson.duration)}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
