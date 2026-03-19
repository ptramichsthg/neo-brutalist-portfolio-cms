import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Key is missing. Check your .env file.');
}

// Single supabase client for React
export const supabase = createClient(supabaseUrl, supabaseKey);

// ===== DATABASE TYPES =====
export interface DbProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  category: string;
  color: string;
  image: string;
  github_url: string;
  live_url: string;
  featured: boolean;
  sort_order: number;
}

export interface DbService {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color: string;
  badge: string;
  sort_order: number;
}

export interface DbTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  color: string;
  avatar: string;
  sort_order: number;
}

export interface DbCertificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url: string;
  image: string;
  sort_order: number;
}

