'use client'

import { useState, useMemo } from 'react'
import { CourseCard } from '@/components/courses/course-card'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { getPublishedCourses, CATEGORIES, type Level } from '@/lib/mock-data'

const LEVELS: (Level | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced']
const ALL_COURSES = getPublishedCourses()

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedLevel, setSelectedLevel] = useState<string>('All')

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return ALL_COURSES.filter((course) => {
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.instructor.full_name.toLowerCase().includes(q)
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory
      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel
      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [searchQuery, selectedCategory, selectedLevel])

  const hasFilters =
    !!searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All'

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedLevel('All')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page header */}
      <div className="border-b border-border bg-card/40">
        <div className="container mx-auto px-4 py-12">
          <span className="eyebrow mb-3">Course catalog</span>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
            Explore courses
          </h1>
          <p className="mt-2 max-w-xl text-lg text-muted-foreground">
            Discover your next learning adventure across technology, design,
            business and marketing.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search + category chips */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-full border border-border bg-card pl-12 pr-4 text-foreground shadow-tactile-sm transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-tactile-sm'
                    : 'border border-border bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Level filter + results count */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Level:</span>
            {LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              {filteredCourses.length} course
              {filteredCourses.length !== 1 && 's'}
            </span>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 font-medium text-primary hover:underline"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              No courses match your filters yet.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  )
}
