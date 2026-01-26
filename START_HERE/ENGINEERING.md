# 🔧 ENGINEERING GUIDE - MVP #5: Plataforma de E-Learning

**Responsabilidad**: Tech Lead / Senior Engineer  
**Enfoque**: CÓMO construir, arquitectura, implementación

---

## Cross-Reference to Product Spec

| Feature (PRODUCT.md)             | Implementation (Este doc) |
| -------------------------------- | ------------------------- |
| Feature #1: Catálogo             | § 6.2                     |
| Feature #2: Video Player         | § 6.3                     |
| Feature #3: Dashboard Estudiante | § 6.4                     |
| Feature #4: Dashboard Instructor | § 6.5                     |
| Feature #5: Course Builder       | § 6.6                     |

---

## Setup

Ver `docs/SETUP_GUIDE.md` para setup completo.

**Dependencias adicionales**:

```bash
# Video player
npm install @vidstack/react

# Rich text editor
npm install @tiptap/react @tiptap/starter-kit

# File upload
npm install react-dropzone
```

---

## Database

Ver `docs/DATABASE_SCHEMA.md` para schema completo (courses, modules, lessons, enrollments, lesson_progress).

---

## Feature Implementation

### 6.2 Course Catalog

**`app/courses/page.tsx`**:

```typescript
export default async function CoursesPage() {
  const supabase = createServerComponentClient({ cookies })

  const { data: courses } = await supabase
    .from('courses')
    .select('*, profiles(full_name)')
    .eq('status', 'published')

  return (
    <div className="grid grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
```

---

### 6.3 Video Player

**`components/video-player.tsx`**:

```typescript
'use client'

import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { useState } from 'react'

export function VideoPlayer({ lesson, onComplete }) {
  return (
    <MediaPlayer
      src={lesson.video_url}
      onEnd={() => onComplete()}
    >
      <MediaProvider />
      <Controls />
    </MediaPlayer>
  )
}
```

**Progress Tracking**:

```typescript
async function markLessonComplete(enrollmentId, lessonId) {
  const { data } = await supabase.from('lesson_progress').upsert({
    enrollment_id: enrollmentId,
    lesson_id: lessonId,
    completed: true,
  })

  // Recalculate course progress
  await updateCourseProgress(enrollmentId)
}

async function updateCourseProgress(enrollmentId) {
  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('enrollment_id', enrollmentId)

  const completed = progress.filter((p) => p.completed).length
  const total = progress.length
  const percent = Math.round((completed / total) * 100)

  await supabase
    .from('enrollments')
    .update({ progress_percent: percent })
    .eq('id', enrollmentId)
}
```

---

### 6.4-6.5 Dashboards

Similar implementation to MVP #4 (stats cards, tables).

---

### 6.6 Course Builder

**`app/instructor/courses/create/page.tsx`**:

```typescript
'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function CourseBuilder() {
  const [modules, setModules] = useState([])

  async function uploadVideo(file) {
    const { data } = await supabase.storage
      .from('course-videos')
      .upload(`${uuid()}.mp4`, file)

    return data.path
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <ModuleList modules={modules} />
      <LessonEditor uploadVideo={uploadVideo} />
    </div>
  )
}
```

---

**Last Updated**: 2026-01-13
