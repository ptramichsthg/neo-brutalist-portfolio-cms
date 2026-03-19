import { ImageHero, CertDicodingBackendJs, CertDicodingFrontendJs, CertDicodingDasarAI, CertDicodingPython, CertDicodingJava, CertDicodingC } from "./assets/images";
import type { Project, SkillCategory, CertificationItem } from "./types";
import type { DbProject, DbCertificate } from "./lib/supabase";
import { FaRocket, FaBuilding, FaNodeJs, FaJava, FaGitAlt, FaGithub, FaFigma, FaNpm, FaRobot, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiGoogle, SiNextdotjs, SiHtml5, SiCss3, SiJavascript, SiReact, SiExpress, SiMysql, SiMongodb, SiVercel, SiSupabase } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export interface ExtendedProject extends Project {
  year: string;
  featured?: boolean;
  category: string;
}

export const SITE_SETTINGS = {
  hero_title: "Full Stack Developer\n& UI Design",
  hero_subtitle:
    "Building Modern, Scalable, and Beautiful Web Applications.",
  location_text: "West Bandung Regency, Indonesia",
  status_text: "Available for Work",
  hero_image_url: ImageHero,
  full_name: "Putra Michael Sitohang",
  job_title: "Full Stack Developer / UI Design",
  pro_badge_text: "PRO DEV",
  cv_url: "",
  email: "ptramichsthg@gmail.com",
  phone: "+62 853 1838 6400",
};

export const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/ptramichsthg", icon: FaGithub },
  { name: "LinkedIn", url: "https://linkedin.com/in/putra-michael-sitohang-021707290", icon: FaLinkedin },
  { name: "Email", url: "mailto:ptramichsthg@gmail.com", icon: FaEnvelope },
  { name: "WhatsApp", url: "https://wa.me/6285318386400", icon: FaWhatsapp },
];

export const CERTIFICATIONS: CertificationItem[] = [
  { title: "Belajar Back-End Pemula dengan JavaScript", issuer: "Dicoding Indonesia", year: "2026", url: "https://www.dicoding.com/certificates/6RPN78758X2M", image: CertDicodingBackendJs },
  { title: "Belajar Membuat Front-End Web untuk Pemula", issuer: "Dicoding Indonesia", year: "2024", url: "https://www.dicoding.com/certificates/MEPJOL36WZ3V", image: CertDicodingFrontendJs },
  { title: "Belajar Dasar AI", issuer: "Dicoding Indonesia", year: "2026", url: "https://www.dicoding.com/certificates/KEXLQ3RVWPG2", image: CertDicodingDasarAI },
  { title: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", year: "2026", url: "https://www.dicoding.com/certificates/QLZ99K8N7Z5D", image: CertDicodingPython },
  { title: "Memulai Pemrograman Dengan Java", issuer: "Dicoding Indonesia", year: "2024", url: "https://www.dicoding.com/dicodingassets/coursecertificate/dd415d600708d1083330fef2cd331b828a2e2f3b/view", image: CertDicodingJava },
  { title: "Memulai Pemrograman Dengan C", issuer: "Dicoding Indonesia", year: "2024", url: "https://www.dicoding.com/certificates/6RPN7DK29X2M", image: CertDicodingC },
  { title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding Indonesia", year: "2024" },
  { title: "Belajar Dasar Pemrograman Web", issuer: "Dicoding Indonesia", year: "2024" },
];

export const SERVICES = [
  {
    title: "Web Development",
    desc: "Modern, high-performance web applications built with Next.js, React, and Tailwind CSS.",
    icon: FaRocket,
    color: "bg-cyan-300",
    badge: "High Performance",
  },
  {
    title: "AI Integration",
    desc: "Intelligent chatbots, process automation, and smart screening systems powered by cutting-edge AI.",
    icon: FaRobot,
    color: "bg-pink-300",
    badge: "Future Ready",
  },
  {
    title: "Backend Systems",
    desc: "Robust APIs, database management, and scalable server-side architectures.",
    icon: FaBuilding,
    color: "bg-blue-300",
    badge: "Scalable",
  },
  {
    title: "UI/UX Design",
    desc: "Intuitive, user-centric interfaces designed with Figma and implemented with pixel-perfect precision.",
    icon: FaFigma,
    color: "bg-lime-300",
    badge: "Creative",
  },
];

export const PROJECTS: DbProject[] = [
  {
    id: "portofolio-cms",
    title: "Portofolio-CMS",
    description: "Personal portfolio website with a Neo-Brutalist design, powered by a custom Supabase CMS.",
    tags: ["TypeScript", "React", "Supabase"],
    category: "Web Development",
    year: "2026",
    featured: true,
    github_url: "https://github.com/ptramichsthg/Portofolio-CMS",
    live_url: "#",
    color: "bg-cyan-300",
    image: "",
    sort_order: 1
  },
  {
    id: "kedai-kopi-pariban",
    title: "Kedai Kopi Pariban",
    description: "Website Kedai Kopi Pariban - Coffee Shop Website with React, TypeScript, and Tailwind CSS",
    tags: ["React", "TypeScript", "Tailwind"],
    category: "Landing Page",
    year: "2026",
    featured: true,
    github_url: "https://github.com/ptramichsthg/kedai-kopi-pariban",
    live_url: "https://kedai-kopi-pariban.vercel.app",
    color: "bg-yellow-300",
    image: "",
    sort_order: 2
  },
  {
    id: "anisa-butik",
    title: "Anisa Butik",
    description: "Modern e-commerce landing page and product showcase for a boutique business.",
    tags: ["TypeScript", "Frontend"],
    category: "E-Commerce",
    year: "2026",
    featured: true,
    github_url: "https://github.com/ptramichsthg/anisa-butik",
    live_url: "https://anisa-butik.vercel.app",
    color: "bg-pink-300",
    image: "",
    sort_order: 3
  },
  {
    id: "chocolate-sales",
    title: "Chocolate Sales",
    description: "Interactive sales dashboard and inventory management interface for chocolate products.",
    tags: ["JavaScript", "Web App"],
    category: "Web Application",
    year: "2026",
    featured: true,
    github_url: "https://github.com/ptramichsthg/chocolate-sales",
    live_url: "https://chocolate-sales.vercel.app",
    color: "bg-orange-300",
    image: "",
    sort_order: 4
  },
  {
    id: "muslimah-bride",
    title: "Muslimah Bride",
    description: "Elegant portfolio and booking system for a bridal makeup and dress service.",
    tags: ["TypeScript", "React"],
    category: "Landing Page",
    year: "2026",
    featured: true,
    github_url: "https://github.com/ptramichsthg/Muslimah-Bride",
    live_url: "https://muslimah-bride-gamma.vercel.app",
    color: "bg-lime-300",
    image: "",
    sort_order: 5
  }
];

export const CERTIFICATES: DbCertificate[] = [
  {
    id: "cert-1",
    title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "2024",
    url: "https://www.dicoding.com/certificates/NVP790YQOZR0",
    image: CertDicodingBackendJs,
    sort_order: 1
  },
  {
    id: "cert-2",
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "2024",
    url: "https://www.dicoding.com/certificates/6VWZDOKDOPRG",
    image: CertDicodingFrontendJs,
    sort_order: 2
  },
  {
    id: "cert-3",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    year: "2024",
    url: "https://www.dicoding.com/certificates/98XWVR8VKPM3",
    image: CertDicodingDasarAI,
    sort_order: 3
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Technology Stack",
    skills: [
      { name: "HTML5", level: "Advanced", icon: SiHtml5 },
      { name: "CSS3", level: "Advanced", icon: SiCss3 },
      { name: "JavaScript", level: "Advanced", icon: SiJavascript },
      { name: "TypeScript", level: "Advanced", icon: SiTypescript },
      { name: "React.js", level: "Advanced", icon: SiReact },
      { name: "Next.js", level: "Advanced", icon: SiNextdotjs },
      { name: "Tailwind CSS", level: "Advanced", icon: SiTailwindcss },
      { name: "AI Integration", level: "Advanced", icon: SiGoogle },
      { name: "Node.js", level: "Advanced", icon: FaNodeJs },
      { name: "Express.js", level: "Advanced", icon: SiExpress },
      { name: "Java", level: "Intermediate", icon: FaJava },
      { name: "MySQL", level: "Advanced", icon: SiMysql },
      { name: "MongoDB", level: "Intermediate", icon: SiMongodb },
      { name: "Supabase", level: "Advanced", icon: SiSupabase },
      { name: "Git", level: "Advanced", icon: FaGitAlt },
      { name: "GitHub", level: "Advanced", icon: FaGithub },
      { name: "Vercel", level: "Advanced", icon: SiVercel },
      { name: "Figma", level: "Intermediate", icon: FaFigma },
      { name: "npm", level: "Advanced", icon: FaNpm },
      { name: "VS Code", level: "Advanced", icon: VscVscode },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Alex Rivers",
    role: "Product Lead",
    company: "StreamFlow Systems",
    text: "Putra Michael Sitohang transformed our complex dashboard into a masterpiece of utility and style. The neo-brutalist approach gave us the edge we needed to stand out in a crowded market.",
    color: "bg-lime-300",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    role: "Founder",
    company: "Luna AI",
    text: "Exceeded every expectation. His ability to bridge the gap between abstract design concepts and robust code is truly rare. Our landing page conversion shot up by 40% after the redesign.",
    color: "bg-orange-300",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Marcus Thorne",
    role: "Creative Director",
    company: "Vanguard Studios",
    text: "Unapologetic design paired with flawless execution. Putra Michael Sitohang is the person you call when you want your digital presence to shout rather than whisper.",
    color: "bg-cyan-300",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
];



export const THEME_COLORS = {
  primary: "bg-[#FFEE58]", // Bright Yellow
  secondary: "bg-[#FF80AB]", // Punchy Pink
  accent: "bg-[#26C6DA]", // Bright Cyan
  highlight: "bg-[#D4E157]", // Lime Green
  dark: "bg-black",
  light: "bg-white",
};
