# MediConnect Lite (MVP)

Simple hospital management MVP for small clinics in Nigeria/Africa.

## Tech Stack
- **Frontend:** React + Tailwind (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt
- **Video Consultation:** Jitsi meeting link generation

## Core Features Implemented
- Patient/Doctor registration and login
- Role-based access (patient vs doctor)
- Patient appointment booking (doctor/date/time)
- Doctor appointment acceptance/rejection and schedule view
- Jitsi meeting link attached to appointments
- Basic EMR: doctor adds diagnosis/prescription/notes
- Patient medical history view + prescription download

## Project Structure
- `backend/` Express API
- `frontend/` React app

## Run Locally

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`
Backend default URL: `http://localhost:5000`

## Main API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/appointments/doctors`
- `POST /api/appointments`
- `GET /api/appointments`
- `PATCH /api/appointments/:id/status`
- `POST /api/records`
- `GET /api/records`

## Notes
- For production: enforce HTTPS, stronger validation, audit logs, encryption-at-rest, and 2FA.
