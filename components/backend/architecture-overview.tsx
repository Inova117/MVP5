// Architecture Overview for MVP #5 - E-Learning
'use client'

export function ArchitectureOverview() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Architecture Overview
          </h2>
          <p className="text-slate-600">
            Video-first learning platform with progress tracking
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-6 mb-6">
        <div className="mermaid">
          {`graph TB
    A[Student Portal] -->|HTTPS| B[Next.js Frontend]
    B -->|Video Player| C[@vidstack/react]
    B -->|API Routes| D[Server-Side API]
    D -->|Validates| E[Zod Schemas]
    D -->|Queries| F[(Supabase PostgreSQL)]
    D -->|Auth Check| G[Supabase Auth]
    F -->|RLS Policies| H[Row Level Security]
    F -->|Storage| I[Video Files]
    F -->|Real-time| J[Progress Sync]
    G -->|JWT Token| B
    
    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#fff9c4
    style D fill:#90caf9
    style E fill:#fff9c4
    style F fill:#c8e6c9
    style G fill:#ffccbc
    style H fill:#f8bbd0
    style I fill:#e1bee7
    style J fill:#ffccbc`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">Video Player</h3>
          </div>
          <p className="text-sm text-slate-600">
            Professional video player with HLS streaming support.
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">Progress Tracking</h3>
          </div>
          <p className="text-sm text-slate-600">
            Real-time lesson completion and course progress.
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">Course Builder</h3>
          </div>
          <p className="text-sm text-slate-600">
            Rich text editor for instructors to create content.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-3 font-medium">
          Technologies Used:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'Next.js 14',
            'TypeScript',
            'Supabase',
            '@vidstack/react',
            '@tiptap/react',
            'Tailwind CSS',
            'Zod',
            'Vercel',
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
