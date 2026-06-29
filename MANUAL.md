# College LA SALE - School Management & Enrollment System(SMS)
## Project Operations Manual

Welcome to the **College LA SALE** Portal operation and configuration guide. This manual outlines developer configuration, running the software locally, running inside Docker containers, and using the portal.

---

## 1. Getting Started (Developer Setup)

### Prerequisites
- **Node.js**: Version 20 or higher.
- **Docker**: Optional, for running containerized setups.
- **MongoDB**: Local or hosted MongoDB instance (needed for running without Docker).

### Configuration (`.env`)
Create a `.env` file at the root of the project (copying `.env.example` as a template):
```bash
# Gemini AI Configuration
GEMINI_API_KEY=your_google_gemini_api_key_here

# MongoDB Connection String (for running bare metal)
MONGO_URI=mongodb://localhost:27017/school_management
```

---

## 2. Command Line Operations

Run the following commands at the root of the project folder:

### Install Dependencies
```bash
npm install
```

### Start Development Server
Starts the application in watch-mode using `tsx`:
```bash
npm run dev
```

### Build for Production
Builds the static React client code via Vite and bundles the Node.js Express server via esbuild into `dist/`:
```bash
npm run build
```

### Start Production Build
```bash
npm run start
```

---

## 3. Running Containerized (Docker Compose)

The portal can be run instantly via Docker, which spins up Node, MongoDB, and Nginx.

### Start Containers
Build and run the stack in the background:
```bash
docker compose up -d --build
```

### Stop Containers
```bash
docker compose down
```

---

## 4. Portal Features Walkthrough

- **Student Portal**: Fill out the admission application wizard, upload supporting documents (Transcripts, Receipts, and Recommendation letters), crop a profile photo, and download approved student badges as PDFs.
- **Teacher Onboarding**: Register qualifications, years of experience, classes/subjects, and draft curriculum syllabi using the built-in Gemini LLM Assistant.
- **Admissions Management**: Review student applications, run AI-assisted grading audits on transcripts, and approve or reject submissions.
- **CSV/PDF Registers**: Export student and teacher data directories as CSV files or view official print preview registry sheets with the principal's signature.
