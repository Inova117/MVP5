'use client'

import { useState, useMemo } from 'react'
import { CourseCard } from '@/components/courses/course-card'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

// Mock data - will be replaced with Supabase query
const MOCK_COURSES = [
    {
        id: '1',
        instructor_id: 'instructor-1',
        title: 'Complete Web Development Bootcamp 2024',
        description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch',
        category: 'Technology',
        price: 99.99,
        thumbnail_url: '/api/images/web-dev',
        status: 'published' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        instructor: {
            id: 'instructor-1',
            role: 'instructor' as const,
            full_name: 'Dr. Sarah Johnson',
            avatar_url: null,
            bio: 'Expert in web development',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    },
    {
        id: '2',
        instructor_id: 'instructor-2',
        title: 'Data Science Fundamentals with Python',
        description: 'Master Python, pandas, and machine learning basics',
        category: 'Technology',
        price: 149.99,
        thumbnail_url: '/api/images/data-science',
        status: 'published' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        instructor: {
            id: 'instructor-2',
            role: 'instructor' as const,
            full_name: 'Prof. Michael Chen',
            avatar_url: null,
            bio: 'Data Science researcher',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    },
    {
        id: '3',
        instructor_id: 'instructor-1',
        title: 'UI/UX Design Masterclass',
        description: 'Learn Figma, design principles, and create stunning interfaces',
        category: 'Design',
        price: 79.99,
        thumbnail_url: '/api/images/ui-ux',
        status: 'published' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        instructor: {
            id: 'instructor-1',
            role: 'instructor' as const,
            full_name: 'Dr. Sarah Johnson',
            avatar_url: null,
            bio: 'Expert in web development',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    },
]

const CATEGORIES = ['All', 'Technology', 'Design', 'Business', 'Marketing']

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    // Filter courses based on search and category
    const filteredCourses = useMemo(() => {
        return MOCK_COURSES.filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory =
                selectedCategory === 'All' || course.category === selectedCategory

            return matchesSearch && matchesCategory
        })
    }, [searchQuery, selectedCategory])

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold text-foreground mb-2">
                        Explore Courses
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Discover your next learning adventure
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-600"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 overflow-x-auto">
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'primary' : 'outline'}
                                size="md"
                                onClick={() => setSelectedCategory(category)}
                                className="whitespace-nowrap"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 text-sm text-muted-foreground">
                    {filteredCourses.length} course{filteredCourses.length !== 1 && 's'}{' '}
                    found
                </div>

                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-lg text-muted-foreground mb-4">
                            No courses found matching your criteria
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery('')
                                setSelectedCategory('All')
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
