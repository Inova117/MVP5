# 📋 PRODUCT SPECIFICATION - MVP #5: Plataforma de E-Learning

**Responsabilidad**: Product Manager  
**Enfoque**: QUÉ construir, POR QUÉ, CUÁNDO

---

## 🎯 Business Context

### Objetivo del MVP

Crear una **plataforma blanca de e-learning** que permita a instructores/empresas monetizar contenido educativo con video streaming, tracking de progreso, y certificados.

### Problema de Negocio

- **75% de creadores** usan plataformas que cobran 20-50% comisión (Udemy, Teachable)
- **Sin control de branding**: Todo tiene logo de la plataforma
- **Sin ownership de audiencia**: Base de estudiantes es de la plataforma
- **Limitaciones técnicas**: Poca flexibilidad, features bloqueadas en tier premium

### Oportunidad

- Mercado e-learning: $325B globally (2025)
- TAM: 250K instructores/empresas pequeñas LATAM
- Competencia: cara ($299/mes Teachable) o toma comisión
- Nuestro edge: White-label + $99/mes flat + ownership completo

### Success Goal

- **100 instructores** activos en 60 días
- **Promedio 3 cursos** por instructor
- **1,000 estudiantes matriculados** en total
- **>90% completion rate** en cursos activos

**Referencia Técnica**: Ver `ENGINEERING.md` para arquitectura

---

## 👥 Target Users

### Persona 1: Carlos Martínez (Instructor/Creator)

- **Rol**: Consultor independiente, experto en marketing digital
- **Edad**: 32
- **Tech savviness**: Media
- **Pain principal**: Udemy se queda con 50% de revenue
- **Current solution**: Udemy (pero quiere migrar)
- **Willingness to pay**: $99-199/mes

### Persona 2: Ana Torres (Estudiante)

- **Rol**: Marketing Manager buscando upskilling
- **Edad**: 28
- **Uso**: Toma cursos en noches/fines de semana
- **Expectativa**: Video HD, mobile-friendly, progreso claro
- **Pain**: Plataformas lentas, mal UX

---

## 🎨 Features (MoSCoW)

### ✅ **MUST-HAVE** (Sprint 1-2)

#### Feature #1: Catálogo de Cursos

**Value**: Core discovery  
**Effort**: 2 días

**User Story**:
Como estudiante, quiero:

- Ver catálogo de cursos disponibles
- Filtrar por categoría (Tech, Business, Design, etc.)
- Buscar por keyword
- Ver preview (título, instructor, rating, duración, precio)

#### Feature #2: Video Player con Progress Tracking

**Value**: Core learning experience  
**Effort**: 4 días

**User Story**:
Como estudiante, quiero:

- Ver video en HD (720p mínimo)
- Controles: play/pause, seek, speed (1x, 1.5x, 2x), fullscreen
- Ver curriculum (lecciones completadas ✓, current, locked 🔒)
- Marcar lección como completada
- Ver progreso general del curso (%)

#### Feature #3: Dashboard Estudiante

**Value**: Engagement + retention  
**Effort**: 2 días

**User Story**:
Como estudiante, quiero:

- Ver "Mis Cursos" en progreso
- Ver % completado de cada curso
- "Continue Learning" (último curso visto)
- Ver certificados obtenidos

#### Feature #4: Dashboard Instructor

**Value**: Content management  
**Effort**: 3 días

**User Story**:
Como instructor, quiero:

- Ver stats: Total estudiantes, Revenue, Avg rating
- Listar mis cursos con metrics (enrolled, completion rate)
- Crear nuevo curso
- Ver reviews recientes

#### Feature #5: Course Builder

**Value**: Content creation  
**Effort**: 4 días

**User Story**:
Como instructor, quiero:

- Crear curso (título, descripción, precio)
- Agregar módulos (secciones)
- Agregar lecciones a módulos (video, texto, quiz)
- Drag-and-drop para reordenar
- Upload video a Supabase Storage
- Publish curso

---

### 🟡 **SHOULD-HAVE** (Post-MVP)

- Certificados automáticos (PDF generation)
- Comentarios/Q&A por lección
- Quizzes interactivos
- Drip content (unlock lecciones por fecha)
- Pagos (Stripe integration)

### 🔴 **WON'T-HAVE** (V1)

- Live classes (solo pre-recorded)
- Community forums
- Mobile app nativa
- Subtítulos automáticos (AI)

---

## ✅ Acceptance Criteria

### Feature #1: Catálogo de Cursos

**AC-1.1**: Course Listing

- [ ] GET /api/courses retorna lista
- [ ] Card muestra: thumbnail, título, instructor, rating, duración, precio
- [ ] Click card → Course detail page

**AC-1.2**: Search & Filter

- [ ] Search input filtra por título/descripción
- [ ] Filter dropdown por categoría
- [ ] Results update en tiempo real

**Implementation**: `ENGINEERING.md` → § 6.2

---

### Feature #2: Video Player

**AC-2.1**: Video Playback

- [ ] Video embeds desde Supabase Storage
- [ ] Controles: play, pause, seek, volume
- [ ] Speed options: 0.5x, 1x, 1.5x, 2x
- [ ] Fullscreen mode

**AC-2.2**: Curriculum Sidebar

- [ ] Lista módulos expandibles
- [ ] Lecciones completed tienen checkmark ✓
- [ ] Lección actual highlighted
- [ ] Lecciones futuras locked 🔒 (sequential)

**AC-2.3**: Progress Tracking

- [ ] Button "Mark as Complete"
- [ ] Progress % actualiza en DB
- [ ] Button "Next Lesson" autoplay siguiente

**Implementation**: `ENGINEERING.md` → § 6.3

---

### Feature #3: Dashboard Estudiante

**AC-3.1**: My Courses

- [ ] Lista cursos enrolled
- [ ] Progress bar por curso
- [ ] Button "Continue" va a última lección vista

**AC-3.2**: Stats

- [ ] Total courses enrolled
- [ ] % completion promedio
- [ ] Streak (días consecutivos estudiando)

**Implementation**: `ENGINEERING.md` → § 6.4

---

### Feature #4: Dashboard Instructor

**AC-4.1**: Stats Cards

- [ ] Total Students (sum de todos los cursos)
- [ ] Active Courses (published)
- [ ] Revenue This Month (si payments habilitados post-MVP)
- [ ] Avg Rating (promedio de todos los cursos)

**AC-4.2**: Courses Table

- [ ] Lista cursos creados
- [ ] Columns: Name, Students, Completion %, Actions (Edit, Analytics)
- [ ] Button "Create New Course"

**Implementation**: `ENGINEERING.md` → § 6.5

---

### Feature #5: Course Builder

**AC-5.1**: Create Course

- [ ] Form: Title, Description, Category, Price
- [ ] Upload thumbnail
- [ ] Save → curso creado (draft status)

**AC-5.2**: Add Modules

- [ ] Button "+ Add Module"
- [ ] Module tiene: title, order
- [ ] Drag-and-drop para reordenar

**AC-5.3**: Add Lessons

- [ ] Click module → Add Lesson
- [ ] Lesson types: Video, Text, Quiz
- [ ] Video: upload a Supabase Storage
- [ ] Text: Rich text editor
- [ ] Drag-and-drop lecciones

**AC-5.4**: Publish

- [ ] Button "Publish Course"
- [ ] Validation: min 1 module, min 3 lessons
- [ ] Status: draft → published

**Implementation**: `ENGINEERING.md` → § 6.6

---

## 📊 Success Metrics

### North Star Metric

**Lecciones completadas por día**  
Target: 5,000+/día (100 instructores x 10 estudiantes x 5 lecciones)

### Primary Metrics

| Metric                    | Target                | Measurement                     |
| ------------------------- | --------------------- | ------------------------------- |
| **Course Creation Rate**  | >3 cursos/instructor  | Avg courses per instructor      |
| **Student Enrollment**    | >10 estudiantes/curso | Avg enrollments                 |
| **Completion Rate**       | >60%                  | % de cursos terminados          |
| **Daily Active Students** | >500                  | Students que ven ≥1 lección/día |
| **Video Watch Time**      | >30min/sesión         | Avg session duration            |

---

## 📅 Timeline

### Sprint 1 (Semana 1)

- Día 1-2: Setup + Auth
- Día 3-4: Course catalog + detail page
- Día 5-7: Video player básico + progress tracking

### Sprint 2 (Semana 2)

- Día 8-9: Dashboard estudiante
- Día 10-11: Dashboard instructor
- Día 12-14: Course builder + video upload

---

## 👥 User Testing Plan

### Phase 1: Alpha (5 días)

- 3 instructores internos
- Crear 2 cursos c/u (min 5 lecciones)
- 10 estudiantes beta (tomar 1 curso completo)

### Phase 2: Beta (10 días)

- 20 instructores reales
- 100 estudiantes
- Feedback: ease of use, video quality, missing features

---

## ⚠️ Risks

| Risk                       | Mitigation                                          |
| -------------------------- | --------------------------------------------------- |
| **Video bandwidth costs**  | Usar Supabase Storage (incluido en plan), comprimir |
| **Slow video playback**    | CDN (Cloudflare), adaptive bitrate                  |
| **Complex course builder** | Wizard step-by-step, drag-and-drop library          |

---

**Última actualización**: 2026-01-13  
**Versión**: 1.0  
**MVP**: #5 - Plataforma de E-Learning
