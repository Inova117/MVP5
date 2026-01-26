# API Specification - MVP #5: Plataforma de E-Learning

**Version**: 1.0

---

## Endpoints

### Courses

#### GET /api/courses

List published courses (catalog).

**Query Params**:

- `category`: Filter by category
- `search`: Search by title/description

**Response 200**:

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Advanced React",
      "instructor_name": "Carlos Martínez",
      "category": "Tech",
      "price": 49.99,
      "rating": 4.7,
      "thumbnail_url": "https://..."
    }
  ]
}
```

---

#### POST /api/enrollments

Enroll in course.

**Request**:

```json
{
  "course_id": "uuid"
}
```

**Response 201**:

```json
{
  "data": {
    "id": "uuid",
    "course_id": "uuid",
    "enrolled_at": "2024-01-15T10:00:00Z"
  }
}
```

---

### Lessons

#### GET /api/courses/[id]/curriculum

Get course structure (modules + lessons).

**Response 200**:

```json
{
  "data": {
    "modules": [
      {
        "id": "uuid",
        "title": "Module 1: Introduction",
        "lessons": [
          {
            "id": "uuid",
            "title": "Lesson 1: Welcome",
            "type": "video",
            "duration_seconds": 450,
            "completed": true
          }
        ]
      }
    ]
  }
}
```

---

#### POST /api/lesson-progress

Mark lesson as complete.

**Request**:

```json
{
  "enrollment_id": "uuid",
  "lesson_id": "uuid",
  "completed": true,
  "watch_time_seconds": 420
}
```

**Response 200**:

```json
{
  "data": {
    "completed": true,
    "course_progress_percent": 35
  }
}
```

---

### Instructor

#### POST /api/courses

Create course (instructor).

**Request**:

```json
{
  "title": "Web Development Bootcamp",
  "description": "...",
  "category": "Tech",
  "price": 99.99
}
```

---

#### POST /api/courses/[id]/modules

Create module.

**Request**:

```json
{
  "title": "Module 1: Basics",
  "order_index": 0
}
```

---

#### POST /api/modules/[id]/lessons

Create lesson.

**Request**:

```json
{
  "title": "Intro to HTML",
  "type": "video",
  "video_url": "https://storage.../video.mp4",
  "duration_seconds": 600,
  "order_index": 0
}
```

---

**Last Updated**: 2026-01-13
