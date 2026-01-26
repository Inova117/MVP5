'use client'

import { useAuth } from '@/components/providers/auth-provider'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Users,
    BookOpen,
    DollarSign,
    Star,
    MoreVertical,
    Plus,
    TrendingUp,
} from 'lucide-react'

// Mock instructor courses
const MOCK_INSTRUCTOR_COURSES = [
    {
        id: '1',
        title: 'Complete Web Development Bootcamp 2024',
        status: 'published' as const,
        students: 1245,
        completionRate: 68,
        revenue: 12340,
        rating: 4.8,
    },
    {
        id: '2',
        title: 'Advanced React Patterns',
        status: 'published' as const,
        students: 856,
        completionRate: 72,
        revenue: 6830,
        rating: 4.9,
    },
    {
        id: '3',
        title: 'Node.js Masterclass',
        status: 'draft' as const,
        students: 0,
        completionRate: 0,
        revenue: 0,
        rating: 0,
    },
]

export default function InstructorPage() {
    const { profile } = useAuth()

    const totalStudents = MOCK_INSTRUCTOR_COURSES.reduce(
        (sum, c) => sum + c.students,
        0
    )
    const activeCourses = MOCK_INSTRUCTOR_COURSES.filter(
        (c) => c.status === 'published'
    ).length
    const totalRevenue = MOCK_INSTRUCTOR_COURSES.reduce(
        (sum, c) => sum + c.revenue,
        0
    )
    const avgRating =
        MOCK_INSTRUCTOR_COURSES.filter((c) => c.rating > 0).reduce(
            (sum, c) => sum + c.rating,
            0
        ) / MOCK_INSTRUCTOR_COURSES.filter((c) => c.rating > 0).length

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                            Instructor Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Welcome, {profile?.full_name}! 👨‍🏫
                        </p>
                    </div>
                    <Link href="/instructor/courses/create">
                        <Button size="lg">
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Course
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-background border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Users className="w-8 h-8 text-primary-600" />
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {totalStudents.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Students</div>
                    </div>

                    <div className="bg-background border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <BookOpen className="w-8 h-8 text-secondary-600" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {activeCourses}
                        </div>
                        <div className="text-sm text-muted-foreground">Active Courses</div>
                    </div>

                    <div className="bg-background border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <DollarSign className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            ${totalRevenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </div>

                    <div className="bg-background border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {avgRating.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                </div>

                {/* Courses Table */}
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        Your Courses
                    </h2>

                    <div className="bg-background border border-border rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-foreground">
                                            Course
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-foreground">
                                            Status
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-foreground">
                                            Students
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-foreground">
                                            Completion
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-foreground">
                                            Revenue
                                        </th>
                                        <th className="text-left px-6 py-3 text-sm font-medium text-foreground">
                                            Rating
                                        </th>
                                        <th className="text-right px-6 py-3 text-sm font-medium text-foreground">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {MOCK_INSTRUCTOR_COURSES.map((course) => (
                                        <tr
                                            key={course.id}
                                            className="hover:bg-muted/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-foreground">
                                                    {course.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === 'published'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                        }`}
                                                >
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-foreground">
                                                {course.students.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {course.status === 'published' ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 bg-muted rounded-full h-2 w-20">
                                                            <div
                                                                className="bg-primary-600 h-2 rounded-full"
                                                                style={{ width: `${course.completionRate}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm text-foreground">
                                                            {course.completionRate}%
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-foreground">
                                                ${course.revenue.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {course.rating > 0 ? (
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-foreground">
                                                            {course.rating}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-muted-foreground hover:text-foreground">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
