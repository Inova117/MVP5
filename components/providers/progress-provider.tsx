'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { COURSES, ENROLLMENTS, allLessons } from '@/lib/mock-data'

const STORAGE_KEY = 'demo_progress_v1'

type ProgressMap = Record<string, string[]>

interface ProgressContextType {
  /** completed lesson ids for a course */
  completedFor: (courseId: string) => string[]
  isComplete: (courseId: string, lessonId: string) => boolean
  markComplete: (courseId: string, lessonId: string) => void
  toggleComplete: (courseId: string, lessonId: string) => void
  /** { completed, total, percent } for a course */
  progressFor: (courseId: string) => {
    completed: number
    total: number
    percent: number
  }
  /** course ids the demo user is enrolled in */
  enrolledCourseIds: string[]
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

// Seed deterministically from ENROLLMENTS so server + first client render match.
function seedFromEnrollments(): ProgressMap {
  const map: ProgressMap = {}
  for (const e of ENROLLMENTS) {
    map[e.courseId] = [...e.completedLessonIds]
  }
  return map
}

const ENROLLED_IDS = ENROLLMENTS.map((e) => e.courseId)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(seedFromEnrollments)

  // Hydrate any persisted progress on the client only (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setProgress(JSON.parse(raw) as ProgressMap)
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  const completedFor = useCallback(
    (courseId: string) => progress[courseId] ?? [],
    [progress]
  )

  const isComplete = useCallback(
    (courseId: string, lessonId: string) =>
      (progress[courseId] ?? []).includes(lessonId),
    [progress]
  )

  const markComplete = useCallback(
    (courseId: string, lessonId: string) => {
      setProgress((prev) => {
        const current = prev[courseId] ?? []
        if (current.includes(lessonId)) return prev
        const next = { ...prev, [courseId]: [...current, lessonId] }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    []
  )

  const toggleComplete = useCallback(
    (courseId: string, lessonId: string) => {
      setProgress((prev) => {
        const current = prev[courseId] ?? []
        const next = {
          ...prev,
          [courseId]: current.includes(lessonId)
            ? current.filter((id) => id !== lessonId)
            : [...current, lessonId],
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    []
  )

  const progressFor = useCallback(
    (courseId: string) => {
      const course = COURSES.find((c) => c.id === courseId)
      const total = course ? allLessons(course).length : 0
      const completed = (progress[courseId] ?? []).length
      return {
        completed,
        total,
        percent: total ? Math.round((completed / total) * 100) : 0,
      }
    },
    [progress]
  )

  return (
    <ProgressContext.Provider
      value={{
        completedFor,
        isComplete,
        markComplete,
        toggleComplete,
        progressFor,
        enrolledCourseIds: ENROLLED_IDS,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (ctx === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return ctx
}
