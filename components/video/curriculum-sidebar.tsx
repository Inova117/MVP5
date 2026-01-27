'use client'

import { useState } from 'react'
import { CheckCircle2, Lock, PlayCircle, FileText, HelpCircle, ChevronRight } from 'lucide-react'
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
            return <CheckCircle2 className="w-4 h-4 text-primary" />
        }
        if (lesson.locked) {
            return <Lock className="w-4 h-4 text-muted-foreground" />
        }
        if (lesson.type === 'video') {
            return <PlayCircle className="w-4 h-4 text-foreground/70" />
        }
        if (lesson.type === 'text') {
            return <FileText className="w-4 h-4 text-foreground/70" />
        }
        return <HelpCircle className="w-4 h-4 text-foreground/70" />
    }

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        return `${mins} min`
    }

    return (
        <div className="h-full bg-card/50 border-l border-border overflow-y-auto custom-scrollbar">
            <div className="p-6 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
                <h2 className="font-serif font-bold text-lg text-foreground">Course Curriculum</h2>
                <p className="text-xs text-muted-foreground mt-1 font-sans">
                    {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                </p>
            </div>

            <div className="p-4 space-y-4">
                {modules.map((module) => (
                    <div key={module.id} className="rounded-xl overflow-hidden bg-white/50 border border-primary/5 transition-all duration-300 hover:shadow-tactile-sm">
                        {/* Module Header */}
                        <button
                            onClick={() => toggleModule(module.id)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/80 transition-colors text-left group"
                        >
                            <span className="font-serif font-semibold text-foreground text-sm">
                                {module.title}
                            </span>
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center bg-transparent transition-all duration-300",
                                expandedModules.has(module.id) ? "bg-primary/10 rotate-90" : "group-hover:bg-muted"
                            )}>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </button>

                        {/* Lessons */}
                        <div className={cn(
                            "grid transition-all duration-300 ease-in-out",
                            expandedModules.has(module.id) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}>
                            <div className="overflow-hidden">
                                <div className="px-2 pb-2 space-y-1">
                                    {module.lessons.map((lesson) => {
                                        const isActive = currentLessonId === lesson.id
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => !lesson.locked && onLessonSelect(lesson.id)}
                                                disabled={lesson.locked}
                                                className={cn(
                                                    'w-full px-3 py-2.5 flex items-start gap-3 rounded-lg transition-all duration-200 text-left border border-transparent',
                                                    isActive
                                                        ? 'bg-primary text-primary-foreground shadow-tactile-sm scale-[1.02]'
                                                        : 'hover:bg-secondary/80 hover:border-primary/5 text-muted-foreground hover:text-foreground',
                                                    lesson.locked && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:border-transparent hover:text-muted-foreground'
                                                )}
                                            >
                                                <div className={cn(
                                                    "mt-0.5",
                                                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                                                )}>
                                                    {getLessonIcon(lesson)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={cn(
                                                        "text-sm font-medium truncate",
                                                        isActive ? "text-primary-foreground" : "text-foreground"
                                                    )}>
                                                        {lesson.title}
                                                    </div>
                                                    <div className={cn(
                                                        "text-xs mt-0.5",
                                                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                                                    )}>
                                                        {formatDuration(lesson.duration)}
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
