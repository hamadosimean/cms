# Technical Documentation
## College LA SALE School Management System

This document outlines the internal architecture, database schema layout, integrations, and deployment configurations of the system.

---

## 1. System Architecture Diagram

```
                 [ Reverse Proxy: Nginx (Port 80) ]
                     /                         \
        /index.html /assets             /api/*  \
                   /                             \
    [ Frontend Static Build ]           [ Express Node.js Backend ]
    React 18 / Tailwind / Vite                      |
                                            [ Mongoose ORM ]
                                                    |
                                            [ MongoDB Database ]
```

---

## 2. Technology Stack

### Frontend
- **React 18**: Single-page user interface application.
- **Vite**: Ultra-fast frontend bundler tool.
- **Tailwind CSS**: Styling utility framework.
- **Framer Motion & Lucide Icons**: UI animations and modern iconography.

### Backend & Database
- **Node.js & Express**: High-performance HTTP server handling API requests.
- **Mongoose / MongoDB**: Scalable NoSQL document database representing school configurations, student states, and transaction histories.
- **PDF-Lib**: Low-level Javascript library generating client-side and server-side PDF cards and official reports dynamically.
- **Google Gemini AI SDK (`@google/genai`)**: LLM integration analyzing transcript files and automating course draft layouts.

---

## 3. Database Schemas (Mongoose)

Defined inside `server/models.js`:

### A. UserModel
Stores system account credentials.
- `id` (String, unique): Custom ID (e.g. `usr_...`).
- `email` (String, unique): User email.
- `password` (String): Stored securely.
- `role` (String): One of `admin`, `principal`, `teacher`, `student`.

### B. ApplicationModel
Stores student enrollment details.
- `id` (String): Application ID.
- `student_id` (String): ID of the student.
- `target_class` (String): Grade class requested.
- `last_school_name` (String): Previous institution.
- `last_general_grade` (Number): GPA grade average.
- `transcript_file_name` / `transcript_base64` (String): Uploaded grade details.
- `payment_receipt_name` / `payment_receipt_base64` (String): Enrollment bank details.
- `recommendation_letter_name` / `recommendation_letter_base64` (String): Recommendation files.
- `status` (String): `pending`, `approved`, `rejected`.
- `rejection_reason` (String): Optional description of rejection.

---

## 4. Key Integration Logic

### A. Dynamic Document Previews (`/api/documents/preview`)
- Decodes base64 file payloads dynamically.
- Detects the original format of files (PDF, PNG, JPG) and automatically assigns appropriate `Content-Type` headers.
- If base64 content is missing (e.g., seeded student records), a fallback document is created on the fly using `pdf-lib` containing the school's registrar seal.

### B. Principal Signature Canvas
- An interactive settings canvas allows the Principal (**Hamado Simean**) to draw an electronic signature.
- Stored as a high-density Base64 data URL and embedded dynamically into student badge PDFs and official printed reports.
