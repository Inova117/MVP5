// Database Types - Auto-generated from Supabase schema

export type UserRole = 'student' | 'instructor'
export type CourseStatus = 'draft' | 'published'
export type LessonType = 'video' | 'text' | 'quiz'

// ============================================
// PROFILES
// ============================================
export interface Profile {
    id: string
    role: UserRole
    full_name: string
    avatar_url?: string | null
    bio?: string | null
    created_at: string
    updated_at: string
}

export interface ProfileInsert {
    id: string
    role: UserRole
    full_name: string
    avatar_url?: string | null
    bio?: string | null
}

export interface ProfileUpdate {
    full_name?: string
    avatar_url?: string | null
    bio?: string | null
}

// ============================================
// COURSES
// ============================================
export interface Course {
    id: string
    instructor_id: string
    title: string
    description?: string | null
    category: string
    price: number
    thumbnail_url?: string | null
    status: CourseStatus
    created_at: string
    updated_at: string
}

export interface CourseInsert {
    instructor_id: string
    title: string
    description?: string | null
    category: string
    price?: number
    thumbnail_url?: string | null
    status?: CourseStatus
}

export interface CourseUpdate {
    title?: string
    description?: string | null
    category?: string
    price?: number
    thumbnail_url?: string | null
    status?: CourseStatus
}

// Course with instructor profile
export interface CourseWithInstructor extends Course {
    instructor: Profile
}

// ============================================
// MODULES
// ============================================
export interface Module {
    id: string
    course_id: string
    title: string
    description?: string | null
    order_index: number
    created_at: string
    updated_at: string
}

export interface ModuleInsert {
    course_id: string
    title: string
    description?: string | null
    order_index: number
}

export interface ModuleUpdate {
    title?: string
    description?: string | null
    order_index?: number
}

// Module with lessons
export interface ModuleWithLessons extends Module {
    lessons: Lesson[]
}

// ============================================
// LESSONS
// ============================================
export interface Lesson {
    id: string
    module_id: string
    title: string
    type: LessonType
    video_url?: string | null
    content?: string | null
    duration_seconds: number
    order_index: number
    created_at: string
    updated_at: string
}

export interface LessonInsert {
    module_id: string
    title: string
    type: LessonType
    video_url?: string | null
    content?: string | null
    duration_seconds?: number
    order_index: number
}

export interface LessonUpdate {
    title?: string
    type?: LessonType
    video_url?: string | null
    content?: string | null
    duration_seconds?: number
    order_index?: number
}

// Lesson with progress
export interface LessonWithProgress extends Lesson {
    progress?: LessonProgress | null
}

// ============================================
// ENROLLMENTS
// ============================================
export interface Enrollment {
    id: string
    student_id: string
    course_id: string
    progress_percent: number
    enrolled_at: string
    completed_at?: string | null
}

export interface EnrollmentInsert {
    student_id: string
    course_id: string
}

export interface EnrollmentUpdate {
    progress_percent?: number
    completed_at?: string | null
}

// Enrollment with course details
export interface EnrollmentWithCourse extends Enrollment {
    course: CourseWithInstructor
}

// ============================================
// LESSON PROGRESS
// ============================================
export interface LessonProgress {
    id: string
    enrollment_id: string
    lesson_id: string
    completed: boolean
    watch_time_seconds: number
    last_watched_at?: string | null
    created_at: string
    updated_at: string
}

export interface LessonProgressInsert {
    enrollment_id: string
    lesson_id: string
    completed?: boolean
    watch_time_seconds?: number
}

export interface LessonProgressUpdate {
    completed?: boolean
    watch_time_seconds?: number
    last_watched_at?: string | null
}

// ============================================
// COMPLEX TYPES
// ============================================

// Full course structure with modules and lessons
export interface CourseWithContent extends CourseWithInstructor {
    modules: ModuleWithLessons[]
}

// Student's enrolled course with progress
export interface EnrolledCourse extends Enrollment {
    course: Course
    total_lessons: number
    completed_lessons: number
}

// Instructor's course with stats
export interface CourseWithStats extends Course {
    total_students: number
    avg_progress: number
    total_lessons: number
}
