-- ============================================================
-- SUPABASE DATABASE SCHEMA - Portfolio CMS
-- Jalankan SQL ini di Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. TABEL PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  tags        TEXT[] DEFAULT '{}',
  year        TEXT NOT NULL DEFAULT '2025',
  category    TEXT NOT NULL DEFAULT 'Web Development',
  color       TEXT NOT NULL DEFAULT 'bg-white',
  image       TEXT DEFAULT '',
  github_url  TEXT DEFAULT '',
  live_url    TEXT DEFAULT '',
  featured    BOOLEAN DEFAULT FALSE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL SERVICES
CREATE TABLE IF NOT EXISTS services (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name   TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT 'bg-cyan-300',
  badge       TEXT NOT NULL DEFAULT '',
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL,
  company     TEXT NOT NULL,
  text        TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT 'bg-cyan-300',
  avatar      TEXT DEFAULT '',
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL CERTIFICATES
CREATE TABLE IF NOT EXISTS certificates (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  issuer      TEXT NOT NULL,
  year        TEXT NOT NULL,
  url         TEXT DEFAULT '',
  image       TEXT DEFAULT '',
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY (RLS) - Baca publik, tulis admin
-- ============================================================
ALTER TABLE projects     ENABLE ROW LEVEL SECURITY;
ALTER TABLE services     ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Policy: Siapa saja bisa membaca (SELECT) data
CREATE POLICY "Allow public read access on projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Allow public read access on services"
  ON services FOR SELECT USING (true);

CREATE POLICY "Allow public read access on testimonials"
  ON testimonials FOR SELECT USING (true);

CREATE POLICY "Allow public read access on certificates"
  ON certificates FOR SELECT USING (true);

-- Policy: Hanya user admin (authenticated) yang bisa Create, Update, Delete
CREATE POLICY "Allow authenticated full access on projects"
  ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated full access on services"
  ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated full access on testimonials"
  ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated full access on certificates"
  ON certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- SEED DATA AWAL (data yang sekarang hardcode di dalam kode)
-- ============================================================

-- Data Projects
INSERT INTO projects (title, description, tags, year, category, color, image, github_url, live_url, featured, sort_order) VALUES
  (
    'Personal Portfolio V1',
    'A modern, highly interactive personal portfolio website built with Neo-Brutalist design principles. Features dynamic animations, fluid typography, and a unique mechanical aesthetic.',
    ARRAY['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    '2026',
    'Web Development',
    'bg-cyan-300',
    '',
    'https://github.com/ptramichsthg',
    '#',
    TRUE,
    1
  );

-- Data Services
INSERT INTO services (title, description, icon_name, color, badge, sort_order) VALUES
  ('Web Development',   'Modern, high-performance web applications built with Next.js, React, and Tailwind CSS.',                                              'FaRocket',  'bg-cyan-300',  'High Performance', 1),
  ('AI Integration',    'Intelligent chatbots, process automation, and smart screening systems powered by cutting-edge AI.',                                   'FaRobot',   'bg-pink-300',  'Future Ready',     2),
  ('Backend Systems',   'Robust APIs, database management, and scalable server-side architectures.',                                                           'FaBuilding','bg-blue-300',  'Scalable',         3),
  ('UI/UX Design',      'Intuitive, user-centric interfaces designed with Figma and implemented with pixel-perfect precision.',                                'FaFigma',   'bg-lime-300',  'Creative',         4);

-- Data Testimonials
INSERT INTO testimonials (name, role, company, text, color, avatar, sort_order) VALUES
  ('Alex Rivers',    'Product Lead',      'StreamFlow Systems', 'Putra Michael Sitohang transformed our complex dashboard into a masterpiece of utility and style. The neo-brutalist approach gave us the edge we needed.',                    'bg-lime-300',   'https://i.pravatar.cc/150?u=alex',   1),
  ('Sarah Chen',     'Founder',           'Luna AI',            'Exceeded every expectation. His ability to bridge the gap between abstract design concepts and robust code is truly rare. Conversion shot up by 40% after the redesign.',    'bg-orange-300', 'https://i.pravatar.cc/150?u=sarah',  2),
  ('Marcus Thorne',  'Creative Director', 'Vanguard Studios',   'Unapologetic design paired with flawless execution. Putra Michael Sitohang is the person you call when you want your digital presence to shout rather than whisper.',       'bg-cyan-300',   'https://i.pravatar.cc/150?u=marcus', 3);

-- Data Certificates
INSERT INTO certificates (title, issuer, year, url, image, sort_order) VALUES
  ('Belajar Back-End Pemula dengan JavaScript', 'Dicoding Indonesia', '2026', 'https://www.dicoding.com/certificates/6RPN78758X2M', '', 1),
  ('Belajar Membuat Front-End Web untuk Pemula', 'Dicoding Indonesia', '2024', 'https://www.dicoding.com/certificates/MEPJOL36WZ3V', '', 2),
  ('Belajar Dasar AI', 'Dicoding Indonesia', '2026', 'https://www.dicoding.com/certificates/KEXLQ3RVWPG2', '', 3),
  ('Memulai Pemrograman dengan Python', 'Dicoding Indonesia', '2026', 'https://www.dicoding.com/certificates/QLZ99K8N7Z5D', '', 4),
  ('Memulai Pemrograman Dengan Java', 'Dicoding Indonesia', '2024', 'https://www.dicoding.com/dicodingassets/coursecertificate/...', '', 5),
  ('Memulai Pemrograman Dengan C', 'Dicoding Indonesia', '2024', 'https://www.dicoding.com/certificates/6RPN7DK29X2M', '', 6),
  ('Belajar Dasar Pemrograman JavaScript', 'Dicoding Indonesia', '2024', '', '', 7),
  ('Belajar Dasar Pemrograman Web', 'Dicoding Indonesia', '2024', '', '', 8);

-- ============================================================
-- SETUP STORAGE BUCKET (portfolio-images)
-- ============================================================
-- 1. Create bucket if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage RLS Policies
CREATE POLICY "Public Access Storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admin Upload Storage"
  ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Admin Update Storage"
  ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admin Delete Storage"
  ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-images');

-- ============================================================
-- SELESAI! Tabel dan Storage siap digunakan.
-- ============================================================
