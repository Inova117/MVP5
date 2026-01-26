# Database Schema - MVP #5: Plataforma de E-Learning

## ERD

```mermaid
erDiagram
    auth_users ||--|| profiles : "extends"
    profiles ||--o{ courses : "creates"
    profiles ||--o{ enrollments : "enrolls"
    courses ||--|{ modules : "contains"
    modules ||--|{ lessons : "contains"
    courses ||--o{ enrollments : "has"
    lessons ||--o{ lesson_progress : "tracks"
    enrollments ||--|{ lesson_progress : "has"

    profiles {
        uuid id PK
        text role "student|instructor"
        text full_name
    }

    courses {
        uuid id PK
        uuid instructor_id FK
        text title
        text description
        text category
        decimal price
        text status "draft|published"
    }

    modules {
        uuid id PK
        uuid course_id FK
        text title
        integer order_index
    }

    lessons {
        uuid id PK
        uuid module_id FK
        text title
        text type "video|text|quiz"
        text video_url
        text content
        integer duration_seconds
        integer order_index
    }

    enrollments {
        uuid id PK
        uuid student_id FK
        uuid course_id FK
        integer progress_percent
        timestamp enrolled_at
    }

    lesson_progress {
        uuid id PK
        uuid enrollment_id FK
        uuid lesson_id FK
        boolean completed
        integer watch_time_seconds
    }
```

## Tables

### 1. `courses`

- `id`: UUID PRIMARY KEY
- `instructor_id`: UUID REFERENCES profiles(id)
- `title`: TEXT NOT NULL
- `description`: TEXT
- `category`: TEXT
- `price`: DECIMAL(10,2)
- `thumbnail_url`: TEXT
- `status`: TEXT CHECK (IN 'draft', 'published') DEFAULT 'draft'
- `created_at`: TIMESTAMP

**Indexes**: `idx_courses_instructor`, `idx_courses_status`

### 2. `modules`

- `id`: UUID PRIMARY KEY
- `course_id`: UUID REFERENCES courses(id) ON DELETE CASCADE
- `title`: TEXT NOT NULL
- `order_index`: INTEGER NOT NULL
- Unique (course_id, order_index)

### 3. `lessons`

- `id`: UUID PRIMARY KEY
- `module_id`: UUID REFERENCES modules(id) ON DELETE CASCADE
- `title`: TEXT NOT NULL
- `type`: TEXT CHECK (IN 'video', 'text', 'quiz')
- `video_url`: TEXT
- `content`: TEXT (for text lessons)
- `duration_seconds`: INTEGER
- `order_index`: INTEGER NOT NULL

### 4. `enrollments`

- `id`: UUID PRIMARY KEY
- `student_id`: UUID REFERENCES profiles(id)
- `course_id`: UUID REFERENCES courses(id)
- `progress_percent`: INTEGER DEFAULT 0
- `enrolled_at`: TIMESTAMP DEFAULT NOW()
- Unique (student_id, course_id)

### 5. `lesson_progress`

- `id`: UUID PRIMARY KEY
- `enrollment_id`: UUID REFERENCES enrollments(id) ON DELETE CASCADE
- `lesson_id`: UUID REFERENCES lessons(id)
- `completed`: BOOLEAN DEFAULT false
- `watch_time_seconds`: INTEGER DEFAULT 0
- Unique (enrollment_id, lesson_id)

## RLS Policies

```sql
-- Courses: Public read, instructor manage
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (status = 'published');

CREATE POLICY "Instructors can manage own courses"
  ON courses FOR ALL
  USING (instructor_id = auth.uid());

-- Enrollments: Student-scoped
CREATE POLICY "Students can view own enrollments"
  ON enrollments FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Students can enroll"
  ON enrollments FOR INSERT
  WITH CHECK (student_id = auth.uid());

-- Lesson progress: Enrollment-scoped
CREATE POLICY "Students can manage own progress"
  ON lesson_progress FOR ALL
  USING (
    enrollment_id IN (
      SELECT id FROM enrollments WHERE student_id = auth.uid()
    )
  );
```

**Last Updated**: 2026-01-13
