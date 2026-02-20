# FOY Focus Engine (MVP)

A mobile-first Next.js app that helps creators pick one lane for the next 90 days.

## Features

- Landing page with CTA
- Guided multi-step questionnaire
- Results page with:
  - Primary Creator Lane
  - Support Revenue Engine suggestion
  - 90-day Distraction Kill Rule statement
  - 12 weekly milestones (90-day plan)
- Required email capture before revealing full results
- Data persistence with Prisma + SQLite (`email + answers + results`)
- Admin route (`/admin`) protected by `ADMIN_PASSWORD`
  - Lead table
  - CSV export

## Tech Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Prisma + SQLite
- Zod

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy env file and set values:

   ```bash
   cp .env.example .env
   ```

3. Generate Prisma client and create DB schema:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

5. Open:
   - App: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin`

## Environment Variables

- `DATABASE_URL` — SQLite connection string (default: `file:./dev.db`)
- `ADMIN_PASSWORD` — password required to unlock `/admin`

## Notes

- Full results are only shown after email capture + successful submission.
- CSV export is available in admin once authenticated.
