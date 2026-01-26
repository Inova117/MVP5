-- Seed data for development and testing

-- ============================================
-- SAMPLE PROFILES
-- ============================================
-- Note: These will need actual auth.users entries first
-- In a real scenario, users sign up through the app

-- For testing, you can manually create users in Supabase Auth UI
-- then uncomment and run these inserts with the real UUIDs

/*
-- Sample Instructors
INSERT INTO profiles (id, role, full_name, bio) VALUES
  ('instructor-uuid-1', 'instructor', 'Dr. Sarah Johnson', 'Expert in web development with 10+ years of experience'),
  ('instructor-uuid-2', 'instructor', 'Prof. Michael Chen', 'Data Science researcher and educator');

-- Sample Students
INSERT INTO profiles (id, role, full_name) VALUES
  ('student-uuid-1', 'student', 'Alice Williams'),
  ('student-uuid-2', 'student', 'Bob Martinez'),
  ('student-uuid-3', 'student', 'Carol Davis');

-- ============================================
-- SAMPLE COURSES
-- ============================================
INSERT INTO courses (id, instructor_id, title, description, category, price, status) VALUES
  (
    'course-uuid-1',
    'instructor-uuid-1',
    'Complete Web Development Bootcamp',
    'Learn HTML, CSS, JavaScript, React, and Node.js from scratch',
    'Technology',
    99.99,
    'published'
  ),
  (
    'course-uuid-2',
    'instructor-uuid-2',
    'Data Science Fundamentals',
    'Master Python, pandas, and machine learning basics',
    'Technology',
    149.99,
    'published'
  ),
  (
    'course-uuid-3',
    'instructor-uuid-1',
    'Advanced React Patterns',
    'Deep dive into React hooks, context, and performance optimization',
    'Technology',
    79.99,
    'draft'
  );

-- ============================================
-- SAMPLE MODULES
-- ============================================
-- Course 1 modules
INSERT INTO modules (course_id, title, description, order_index) VALUES
  ('course-uuid-1', 'Introduction to Web Development', 'Get started with the basics', 1),
  ('course-uuid-1', 'HTML & CSS Fundamentals', 'Build your first website', 2),
  ('course-uuid-1', 'JavaScript Essentials', 'Learn programming fundamentals', 3),
  ('course-uuid-1', 'React Framework', 'Build modern web applications', 4);

-- Course 2 modules
INSERT INTO modules (course_id, title, description, order_index) VALUES
  ('course-uuid-2', 'Python Basics', 'Introduction to Python programming', 1),
  ('course-uuid-2', 'Data Analysis with Pandas', 'Work with data efficiently', 2),
  ('course-uuid-2', 'Machine Learning Intro', 'Your first ML models', 3);

-- ============================================
-- SAMPLE LESSONS
-- ============================================
-- Module 1 lessons (Introduction to Web Development)
INSERT INTO lessons (module_id, title, type, video_url, duration_seconds, order_index)
SELECT id, 'Welcome to the Course', 'video', 'https://example.com/video1.mp4', 300, 1
FROM modules WHERE course_id = 'course-uuid-1' AND order_index = 1;

INSERT INTO lessons (module_id, title, type, content, order_index)
SELECT id, 'Course Overview', 'text', '# Course Overview\n\nThis course will teach you...', 2
FROM modules WHERE course_id = 'course-uuid-1' AND order_index = 1;

-- Module 2 lessons (HTML & CSS)
INSERT INTO lessons (module_id, title, type, video_url, duration_seconds, order_index)
SELECT id, 'HTML Basics', 'video', 'https://example.com/video2.mp4', 600, 1
FROM modules WHERE course_id = 'course-uuid-1' AND order_index = 2;

INSERT INTO lessons (module_id, title, type, video_url, duration_seconds, order_index)
SELECT id, 'CSS Styling', 'video', 'https://example.com/video3.mp4', 900, 2
FROM modules WHERE course_id = 'course-uuid-1' AND order_index = 2;

-- ============================================
-- SAMPLE ENROLLMENTS
-- ============================================
INSERT INTO enrollments (student_id, course_id, progress_percent) VALUES
  ('student-uuid-1', 'course-uuid-1', 25),
  ('student-uuid-1', 'course-uuid-2', 0),
  ('student-uuid-2', 'course-uuid-1', 50),
  ('student-uuid-3', 'course-uuid-2', 75);

-- ============================================
-- SAMPLE LESSON PROGRESS
-- ============================================
-- Student 1 progress in Course 1
INSERT INTO lesson_progress (enrollment_id, lesson_id, completed, watch_time_seconds)
SELECT 
  e.id,
  l.id,
  true,
  l.duration_seconds
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN modules m ON m.course_id = c.id
JOIN lessons l ON l.module_id = m.id
WHERE e.student_id = 'student-uuid-1' 
  AND c.id = 'course-uuid-1'
  AND m.order_index = 1;

*/

-- ============================================
-- INSTRUCTIONS
-- ============================================
-- 1. Create users through Supabase Auth (or your app's signup)
-- 2. Note their UUIDs from auth.users table
-- 3. Replace the placeholder UUIDs above with real ones
-- 4. Uncomment the INSERT statements
-- 5. Run this seed file
