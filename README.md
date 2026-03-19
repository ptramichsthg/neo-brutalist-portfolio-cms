# Putra Michael Sitohang Portfolio 2026

## Overview
A modern, dynamic personal portfolio website built with a Neo-Brutalist design philosophy. This project serves as both a high-performance frontend showcase and a fully functional content management system (CMS). It allows for real-time updates of projects, services, testimonials, and certificates without requiring any code deployment.

## Key Features
- **Neo-Brutalist Interface:** High contrast, bold typography, and distinct hard-shadow elements prioritizing extreme legibility and raw structural aesthetics.
- **Custom Admin Dashboard:** A dedicated, authenticated route for managing the entire portfolio content on the fly.
- **Supabase Integration:** Utilizes Supabase for database storage, image uploads (bucket storage), and secure user authentication.
- **Zero-Empty-State Fallback:** The application intelligently falls back to hardcoded default data (pulled directly from GitHub) if the Supabase database is empty, preventing broken or blank UI layouts.
- **Fully Responsive:** Carefully calibrated CSS rules ensuring that complex grid layouts adapt flawlessly to mobile, tablet, and desktop screens.

## Tech Stack
- Frontend Framework: React.js (via Vite)
- Language: TypeScript
- Styling: Tailwind CSS
- Backend & Database: Supabase
- Hosting & Deployment: Vercel / Netlify (Recommended)

## Project Structure
- `/src/components`: Contains modular UI elements like reusable cards, buttons, and individual sections of the landing page.
- `/src/pages/admin`: Houses the protected CMS dashboard and login logic for managing content blocks.
- `/src/lib/supabase.ts`: Handles the connection string and client configuration for the Supabase backend.
- `/src/hooks`: Custom React hooks for fetching and caching database tables.
- `/src/constants.ts`: Contains structural types and static fallback data.

## Setting Up Locally

1. Clone the repository.
   ```bash
   git clone https://github.com/ptramichsthg/neo-brutalist-portfolio-cms.git
   ```

2. Install dependencies.
   ```bash
   npm install
   ```

3. Configure Environment Variables.
   Create a `.env` file in the root directory and add your Supabase credentials.
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-anon-key
   ```

4. Run the development server.
   ```bash
   npm run dev
   ```

## Database Schema (Supabase)
To fully utilize the CMS, ensure your Supabase project contains the following tables with open read policies and authenticated write permissions:
- `projects`
- `services`
- `testimonials`
- `certificates`
And a storage bucket named `portfolio-images` for asset handling.