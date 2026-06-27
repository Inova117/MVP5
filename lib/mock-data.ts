// ============================================================================
// Centralized demo dataset for the e-learning platform.
//
// Every page (catalog, course detail, watch, student dashboard, instructor
// dashboard) reads from this single source so module counts, durations,
// progress and stats stay consistent across the whole app.
// ============================================================================

export type Level = 'Beginner' | 'Intermediate' | 'Advanced'
export type LessonKind = 'video' | 'text' | 'quiz'
export type CourseStatus = 'published' | 'draft'

export interface MockInstructor {
  id: string
  full_name: string
  title: string
  bio: string
  avatar_url?: string | null
}

export interface MockLesson {
  id: string
  title: string
  type: LessonKind
  /** duration in seconds */
  duration: number
  videoUrl?: string
  /** free preview lesson, watchable before enrolling */
  preview?: boolean
}

export interface MockModule {
  id: string
  title: string
  lessons: MockLesson[]
}

export interface MockCourse {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  level: Level
  price: number
  /** optional pre-discount price, used to show savings */
  originalPrice?: number
  /** real cover image path, or null to render a branded gradient cover */
  thumbnail_url: string | null
  rating: number
  ratingsCount: number
  studentsCount: number
  language: string
  lastUpdated: string
  status: CourseStatus
  instructor: MockInstructor
  learningPoints: string[]
  modules: MockModule[]
}

// ---------------------------------------------------------------------------
// Categories + branded visual identity (used by gradient cover fallback)
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  'All',
  'Technology',
  'Design',
  'Business',
  'Marketing',
] as const

/** Tailwind gradient + emoji per category — keeps fallback covers on-brand. */
export const CATEGORY_STYLE: Record<
  string,
  { gradient: string; glyph: string }
> = {
  Technology: { gradient: 'from-primary-600 to-primary-800', glyph: '⌘' },
  Design: { gradient: 'from-secondary-500 to-secondary-700', glyph: '◍' },
  Business: { gradient: 'from-primary-700 to-secondary-700', glyph: '◆' },
  Marketing: { gradient: 'from-secondary-600 to-primary-700', glyph: '➜' },
}

export function categoryStyle(category: string) {
  return (
    CATEGORY_STYLE[category] ?? {
      gradient: 'from-primary-500 to-primary-700',
      glyph: '✦',
    }
  )
}

// ---------------------------------------------------------------------------
// Instructors
// ---------------------------------------------------------------------------

const SARAH: MockInstructor = {
  id: 'instructor-1',
  full_name: 'Dr. Sarah Johnson',
  title: 'Senior Software Engineer · Ex-Google',
  bio: 'Senior software engineer with 15+ years building products at Google and Amazon. Sarah has taught web development to over 60,000 students and focuses on the fundamentals that actually stick.',
  avatar_url: null,
}

const MICHAEL: MockInstructor = {
  id: 'instructor-2',
  full_name: 'Prof. Michael Chen',
  title: 'Data Science Lead · PhD, Stanford',
  bio: 'Data scientist and researcher specializing in applied machine learning. Michael translates dense statistical theory into practical, project-driven lessons.',
  avatar_url: null,
}

const ELENA: MockInstructor = {
  id: 'instructor-3',
  full_name: 'Elena Ruiz',
  title: 'Principal Product Designer',
  bio: 'Principal designer who has shipped design systems for fintech and healthcare. Elena teaches design as a craft grounded in research, not just aesthetics.',
  avatar_url: null,
}

const DAVID: MockInstructor = {
  id: 'instructor-4',
  full_name: 'David Okafor',
  title: 'Growth & Marketing Strategist',
  bio: 'Former head of growth at two venture-backed startups. David teaches marketing as a measurable, repeatable system rather than guesswork.',
  avatar_url: null,
}

// ---------------------------------------------------------------------------
// Sample video pool (royalty-free demo clips)
// ---------------------------------------------------------------------------

const VIDEO = {
  bunny:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  dream:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  blazes:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  sintel:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  steel:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  gti:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
}

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

export const COURSES: MockCourse[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2024',
    description:
      'Go from zero to job-ready full-stack developer with HTML, CSS, JavaScript, React, and Node.js.',
    longDescription:
      'Master web development from scratch with this comprehensive, project-based bootcamp. You will build real applications as you learn HTML, CSS, JavaScript, React, and Node.js — and finish with a portfolio you can show employers.',
    category: 'Technology',
    level: 'Beginner',
    price: 99.99,
    originalPrice: 199.99,
    thumbnail_url: '/images/courses/web-dev.png',
    rating: 4.8,
    ratingsCount: 2150,
    studentsCount: 12450,
    language: 'English',
    lastUpdated: 'May 2024',
    status: 'published',
    instructor: SARAH,
    learningPoints: [
      'Build responsive websites with semantic HTML and modern CSS',
      'Master JavaScript and ES6+ features used in production',
      'Create interactive single-page apps with React',
      'Build and secure backend APIs with Node.js and Express',
      'Work with databases and authentication',
      'Deploy full-stack applications to production',
    ],
    modules: [
      {
        id: '1-m1',
        title: 'Introduction to Web Development',
        lessons: [
          { id: '1-l1', title: 'Welcome to the Course', type: 'video', duration: 300, videoUrl: VIDEO.bunny, preview: true },
          { id: '1-l2', title: 'How the Web Works', type: 'video', duration: 600, videoUrl: VIDEO.dream, preview: true },
          { id: '1-l3', title: 'Setting Up Your Environment', type: 'video', duration: 540, videoUrl: VIDEO.blazes },
        ],
      },
      {
        id: '1-m2',
        title: 'HTML & CSS Fundamentals',
        lessons: [
          { id: '1-l4', title: 'HTML Document Structure', type: 'video', duration: 900, videoUrl: VIDEO.sintel },
          { id: '1-l5', title: 'CSS Styling & Flexbox', type: 'video', duration: 1200, videoUrl: VIDEO.steel },
          { id: '1-l6', title: 'Responsive Design with Grid', type: 'video', duration: 800, videoUrl: VIDEO.gti },
          { id: '1-l7', title: 'CSS Knowledge Check', type: 'quiz', duration: 300 },
        ],
      },
      {
        id: '1-m3',
        title: 'JavaScript Fundamentals',
        lessons: [
          { id: '1-l8', title: 'Variables and Data Types', type: 'video', duration: 800, videoUrl: VIDEO.bunny },
          { id: '1-l9', title: 'Functions and Scope', type: 'video', duration: 900, videoUrl: VIDEO.dream },
          { id: '1-l10', title: 'Working with the DOM', type: 'video', duration: 1000, videoUrl: VIDEO.blazes },
        ],
      },
      {
        id: '1-m4',
        title: 'React & Modern Frontend',
        lessons: [
          { id: '1-l11', title: 'Thinking in Components', type: 'video', duration: 950, videoUrl: VIDEO.sintel },
          { id: '1-l12', title: 'State and Props', type: 'video', duration: 1100, videoUrl: VIDEO.steel },
          { id: '1-l13', title: 'Hooks in Practice', type: 'video', duration: 1250, videoUrl: VIDEO.gti },
          { id: '1-l14', title: 'React Knowledge Check', type: 'quiz', duration: 360 },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Data Science Fundamentals with Python',
    description:
      'Master Python, pandas, and the core machine-learning workflow through hands-on projects.',
    longDescription:
      'Build a practical foundation in data science. You will learn Python for data analysis, manipulate real datasets with NumPy and pandas, visualize insights, and train your first machine-learning models.',
    category: 'Technology',
    level: 'Intermediate',
    price: 149.99,
    originalPrice: 229.99,
    thumbnail_url: '/images/courses/data-science.png',
    rating: 4.7,
    ratingsCount: 1840,
    studentsCount: 8920,
    language: 'English',
    lastUpdated: 'April 2024',
    status: 'published',
    instructor: MICHAEL,
    learningPoints: [
      'Write clean, idiomatic Python for data work',
      'Manipulate and clean data with NumPy and pandas',
      'Visualize data to communicate insights',
      'Understand the end-to-end machine-learning workflow',
      'Train and evaluate your first ML models',
    ],
    modules: [
      {
        id: '2-m1',
        title: 'Introduction to Data Science',
        lessons: [
          { id: '2-l1', title: 'What is Data Science?', type: 'video', duration: 400, videoUrl: VIDEO.bunny, preview: true },
          { id: '2-l2', title: 'Python Setup for Data Science', type: 'video', duration: 700, videoUrl: VIDEO.dream },
        ],
      },
      {
        id: '2-m2',
        title: 'Python for Data Analysis',
        lessons: [
          { id: '2-l3', title: 'NumPy Essentials', type: 'video', duration: 1000, videoUrl: VIDEO.blazes },
          { id: '2-l4', title: 'Pandas DataFrames', type: 'video', duration: 1100, videoUrl: VIDEO.sintel },
          { id: '2-l5', title: 'Cleaning Messy Data', type: 'video', duration: 950, videoUrl: VIDEO.steel },
        ],
      },
      {
        id: '2-m3',
        title: 'Machine Learning Basics',
        lessons: [
          { id: '2-l6', title: 'Introduction to ML', type: 'video', duration: 950, videoUrl: VIDEO.gti },
          { id: '2-l7', title: 'Your First Model', type: 'video', duration: 1200, videoUrl: VIDEO.bunny },
          { id: '2-l8', title: 'ML Fundamentals Quiz', type: 'quiz', duration: 400 },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description:
      'Learn Figma, design principles, and a research-driven process to create interfaces people love.',
    longDescription:
      'Design interfaces with intention. This masterclass covers core design principles, color and typography, the full Figma workflow, prototyping, and the user research that separates good products from beautiful mockups.',
    category: 'Design',
    level: 'Beginner',
    price: 79.99,
    originalPrice: 149.99,
    thumbnail_url: '/images/courses/ui-ux.png',
    rating: 4.9,
    ratingsCount: 3120,
    studentsCount: 15680,
    language: 'English',
    lastUpdated: 'June 2024',
    status: 'published',
    instructor: ELENA,
    learningPoints: [
      'Apply core principles of visual and interaction design',
      'Build a confident color and typography system',
      'Master the end-to-end Figma workflow',
      'Create interactive prototypes that feel real',
      'Run lightweight user research and usability tests',
    ],
    modules: [
      {
        id: '3-m1',
        title: 'Design Principles',
        lessons: [
          { id: '3-l1', title: 'Introduction to UI/UX', type: 'video', duration: 500, videoUrl: VIDEO.bunny, preview: true },
          { id: '3-l2', title: 'Color Theory & Typography', type: 'video', duration: 800, videoUrl: VIDEO.dream },
        ],
      },
      {
        id: '3-m2',
        title: 'Figma Fundamentals',
        lessons: [
          { id: '3-l3', title: 'Getting Started with Figma', type: 'video', duration: 750, videoUrl: VIDEO.blazes },
          { id: '3-l4', title: 'Components & Auto Layout', type: 'video', duration: 900, videoUrl: VIDEO.sintel },
          { id: '3-l5', title: 'Prototyping Interactions', type: 'video', duration: 850, videoUrl: VIDEO.steel },
        ],
      },
      {
        id: '3-m3',
        title: 'User Research & Testing',
        lessons: [
          { id: '3-l6', title: 'User Interviews', type: 'video', duration: 700, videoUrl: VIDEO.gti },
          { id: '3-l7', title: 'Usability Testing', type: 'video', duration: 820, videoUrl: VIDEO.bunny },
          { id: '3-l8', title: 'Design Thinking Quiz', type: 'quiz', duration: 300 },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Digital Marketing & Growth Systems',
    description:
      'Turn marketing into a measurable system: SEO, content, paid acquisition, and analytics.',
    longDescription:
      'Stop guessing and start growing. This course gives you a repeatable system for acquiring and retaining customers across SEO, content, email, and paid channels — all measured with real analytics.',
    category: 'Marketing',
    level: 'Intermediate',
    price: 89.99,
    originalPrice: 159.99,
    thumbnail_url: null,
    rating: 4.6,
    ratingsCount: 980,
    studentsCount: 6240,
    language: 'English',
    lastUpdated: 'March 2024',
    status: 'published',
    instructor: DAVID,
    learningPoints: [
      'Build a full-funnel growth strategy',
      'Rank with modern, sustainable SEO',
      'Run profitable paid acquisition campaigns',
      'Design email flows that convert',
      'Measure everything with clear analytics',
    ],
    modules: [
      {
        id: '4-m1',
        title: 'Growth Foundations',
        lessons: [
          { id: '4-l1', title: 'The Growth Mindset', type: 'video', duration: 480, videoUrl: VIDEO.bunny, preview: true },
          { id: '4-l2', title: 'Mapping Your Funnel', type: 'video', duration: 720, videoUrl: VIDEO.dream },
        ],
      },
      {
        id: '4-m2',
        title: 'Acquisition Channels',
        lessons: [
          { id: '4-l3', title: 'Sustainable SEO', type: 'video', duration: 900, videoUrl: VIDEO.blazes },
          { id: '4-l4', title: 'Paid Acquisition That Pays Back', type: 'video', duration: 1050, videoUrl: VIDEO.sintel },
          { id: '4-l5', title: 'Channel Strategy Quiz', type: 'quiz', duration: 300 },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Product Management Essentials',
    description:
      'Learn to discover, prioritize, and ship products users love — the modern PM toolkit.',
    longDescription:
      'Become the PM teams want to work with. Learn product discovery, prioritization frameworks, roadmapping, and how to work with engineering and design to ship outcomes, not just features.',
    category: 'Business',
    level: 'Beginner',
    price: 109.99,
    originalPrice: 189.99,
    thumbnail_url: null,
    rating: 4.7,
    ratingsCount: 1320,
    studentsCount: 7410,
    language: 'English',
    lastUpdated: 'May 2024',
    status: 'published',
    instructor: ELENA,
    learningPoints: [
      'Run effective product discovery',
      'Prioritize with frameworks that scale',
      'Build roadmaps stakeholders trust',
      'Collaborate with design and engineering',
      'Measure product outcomes',
    ],
    modules: [
      {
        id: '5-m1',
        title: 'Product Discovery',
        lessons: [
          { id: '5-l1', title: 'What Great PMs Actually Do', type: 'video', duration: 540, videoUrl: VIDEO.bunny, preview: true },
          { id: '5-l2', title: 'Talking to Users', type: 'video', duration: 760, videoUrl: VIDEO.dream },
        ],
      },
      {
        id: '5-m2',
        title: 'Prioritization & Delivery',
        lessons: [
          { id: '5-l3', title: 'Prioritization Frameworks', type: 'video', duration: 880, videoUrl: VIDEO.blazes },
          { id: '5-l4', title: 'Roadmapping in Practice', type: 'video', duration: 940, videoUrl: VIDEO.sintel },
          { id: '5-l5', title: 'PM Essentials Quiz', type: 'quiz', duration: 300 },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getCourse(courseId: string): MockCourse | undefined {
  return COURSES.find((c) => c.id === courseId)
}

export function getPublishedCourses(): MockCourse[] {
  return COURSES.filter((c) => c.status === 'published')
}

export interface CourseStats {
  totalLessons: number
  totalSeconds: number
  totalHours: number
  totalMinutes: number
  moduleCount: number
}

export function courseStats(course: MockCourse): CourseStats {
  const lessons = course.modules.flatMap((m) => m.lessons)
  const totalSeconds = lessons.reduce((s, l) => s + l.duration, 0)
  return {
    totalLessons: lessons.length,
    totalSeconds,
    totalHours: Math.round((totalSeconds / 3600) * 10) / 10,
    totalMinutes: Math.round(totalSeconds / 60),
    moduleCount: course.modules.length,
  }
}

export function allLessons(course: MockCourse): MockLesson[] {
  return course.modules.flatMap((m) => m.lessons)
}

export function formatLessonLength(seconds: number): string {
  const mins = Math.round(seconds / 60)
  return `${mins} min`
}

// ---------------------------------------------------------------------------
// Student enrollments (drives the student dashboard + watch progress)
// ---------------------------------------------------------------------------

export interface Enrollment {
  courseId: string
  /** ids of lessons the student has completed */
  completedLessonIds: string[]
  /** id of the most recently watched lesson */
  lastLessonId: string
}

export const ENROLLMENTS: Enrollment[] = [
  {
    courseId: '1',
    completedLessonIds: ['1-l1', '1-l2', '1-l3', '1-l4', '1-l5'],
    lastLessonId: '1-l6',
  },
  {
    courseId: '2',
    completedLessonIds: ['2-l1', '2-l2', '2-l3', '2-l4', '2-l5'],
    lastLessonId: '2-l6',
  },
  {
    courseId: '3',
    completedLessonIds: ['3-l1', '3-l2', '3-l3', '3-l4', '3-l5', '3-l6', '3-l7', '3-l8'],
    lastLessonId: '3-l8',
  },
]

export interface EnrolledCourseView {
  course: MockCourse
  progress: number
  completedLessons: number
  totalLessons: number
  lastLessonId: string
  lastLessonTitle: string
}

export function getEnrolledCourses(): EnrolledCourseView[] {
  return ENROLLMENTS.map((enrollment) => {
    const course = getCourse(enrollment.courseId)!
    const lessons = allLessons(course)
    const completed = enrollment.completedLessonIds.length
    const total = lessons.length
    const lastLesson =
      lessons.find((l) => l.id === enrollment.lastLessonId) ?? lessons[0]!
    return {
      course,
      progress: Math.round((completed / total) * 100),
      completedLessons: completed,
      totalLessons: total,
      lastLessonId: lastLesson.id,
      lastLessonTitle: lastLesson.title,
    }
  })
}

// ---------------------------------------------------------------------------
// Instructor dashboard (single logged-in instructor view)
// ---------------------------------------------------------------------------

export const INSTRUCTOR_PROFILE = SARAH

export interface InstructorCourseRow {
  id: string
  title: string
  status: CourseStatus
  students: number
  completionRate: number
  revenue: number
  rating: number
}

export const INSTRUCTOR_COURSES: InstructorCourseRow[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2024',
    status: 'published',
    students: 12450,
    completionRate: 68,
    revenue: 124300,
    rating: 4.8,
  },
  {
    id: '6',
    title: 'Advanced React Patterns',
    status: 'published',
    students: 3856,
    completionRate: 72,
    revenue: 68300,
    rating: 4.9,
  },
  {
    id: '7',
    title: 'TypeScript for Professionals',
    status: 'published',
    students: 2140,
    completionRate: 64,
    revenue: 32100,
    rating: 4.7,
  },
  {
    id: '8',
    title: 'Node.js Masterclass',
    status: 'draft',
    students: 0,
    completionRate: 0,
    revenue: 0,
    rating: 0,
  },
]
