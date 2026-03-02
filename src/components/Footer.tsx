import React from "react";
import NeoButton from "./NeoButton";
import { SOCIAL_LINKS, SITE_SETTINGS } from "../constants";

interface FooterProps {
  // Updated to include optional forceScrollTop boolean argument
  onHomeClick?: (forceScrollTop?: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ onHomeClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Removed hardcoded socials array, using SOCIAL_LINKS from constants */

  const links = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "work" },
    { name: "Services", id: "services" },
    { name: "About Me", id: "about" },
    { name: "Testimonials", id: "testi" },
    { name: "Contact", id: "contact-info" },
  ];

  return (
    <footer className="mt-24 space-y-12 pb-8 sm:pb-12">
      {/* High-Impact Marquee */}
      <div className="bg-lime-400 text-black overflow-hidden py-3 sm:py-5 border-y-4 sm:border-y-8 border-black whitespace-nowrap -mx-4 md:-mx-8 reveal">
        <div className="animate-marquee inline-block font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase italic tracking-tighter">
          &nbsp; READY TO SHIP • NO COMPROMISE • HIGH PERFORMANCE •
          NEO-BRUTALIST ARCHITECTURE • SCALE READY • &nbsp; READY TO SHIP • NO
          COMPROMISE • HIGH PERFORMANCE • NEO-BRUTALIST ARCHITECTURE • SCALE
          READY •
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        {/* Branding Matrix Block */}
        <div className="lg:col-span-5 space-y-8 reveal delay-100">
          <div className="bg-white border-4 sm:border-8 border-black p-6 sm:p-10 neo-shadow relative group overflow-hidden dark:bg-[#2a2a2a]">
            {/* Background Tech Decor */}
            <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <svg width="300" height="300" viewBox="0 0 24 24" fill="black" className="dark:fill-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="inline-block bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">
                Identity: PMS-09
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter leading-none uppercase dark:text-white">
                {SITE_SETTINGS.full_name}
              </h2>
              <p className="font-bold text-sm sm:text-base md:text-lg uppercase leading-tight max-w-sm dark:text-gray-300">
                Building Modern Web and AI-Powered Projects since 2023. Informatics Engineering Student •{" "}
                <span className="bg-yellow-300 px-1 dark:text-black">{SITE_SETTINGS.location_text}</span>.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t-4 border-black border-dashed flex flex-wrap gap-3">
              <div className="bg-black text-white px-3 py-1.5 font-black uppercase text-[9px] sm:text-xs border-2 border-black flex items-center gap-2">
                <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></span>
                Status: Available
              </div>
              <div className="bg-white border-2 border-black px-3 py-1.5 font-black uppercase text-[9px] sm:text-xs dark:bg-[#2a2a2a] dark:text-white">
                Uptime: 99.9%
              </div>
            </div>
          </div>
        </div>

        {/* Link Columns Wrapper */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
          {/* Internal Index */}
          <div className="space-y-6 reveal delay-200">
            <h3 className="font-black uppercase text-xs sm:text-sm italic tracking-widest text-pink-500 bg-black w-fit px-2 py-0.5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      // Fix: onHomeClick now accepts the optional boolean argument
                      if (onHomeClick && link.id === "home") {
                        onHomeClick(true);
                        return;
                      }
                      const el = document.getElementById(link.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                      else if (onHomeClick) onHomeClick(false);
                    }}
                    className="font-black uppercase tracking-tighter text-xl sm:text-2xl hover:translate-x-2 transition-transform hover:text-cyan-500 block text-left dark:text-white"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Matrix */}
          <div className="space-y-6 reveal delay-300">
            <h3 className="font-black uppercase text-xs sm:text-sm italic tracking-widest text-cyan-400 bg-black w-fit px-2 py-0.5">
              Uplink
            </h3>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-black uppercase tracking-tighter text-xl sm:text-2xl hover:translate-x-2 transition-transform hover:text-lime-500 flex items-center gap-2 dark:text-white"
                  >
                    <social.icon />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location / Tech Column (Hidden on smallest mobile, visible on sm+) */}
          <div className="hidden sm:flex flex-col space-y-6 reveal delay-400">
            <h3 className="font-black uppercase text-xs sm:text-sm italic tracking-widest text-yellow-400 bg-black w-fit px-2 py-0.5">
              Registry
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase opacity-40 block dark:text-gray-400">
                  Origin
                </span>
                <span className="font-black text-sm uppercase dark:text-white">
                  {SITE_SETTINGS.location_text}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase opacity-40 block dark:text-gray-400">
                  Stack
                </span>
                <span className="font-black text-sm uppercase dark:text-white">
                  React / Next / Gemini
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase opacity-40 block dark:text-gray-400">
                  Local Time
                </span>
                <span className="font-black text-sm uppercase dark:text-white">
                  {new Date().toLocaleTimeString("en-ID", {
                    timeZone: "Asia/Jakarta",
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  Bandung
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radical Bottom Bar */}
      <div className="pt-10 border-t-8 border-black dark:border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 reveal delay-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10">
          <div className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter leading-none dark:text-white">
            © {new Date().getFullYear()} PUTRA MICHAEL SITOHANG
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-[9px] font-black uppercase bg-black text-white px-2">
              Design: NEO-BRUTALIST
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <NeoButton
            variant="highlight"
            onClick={scrollToTop}
            className="w-full md:w-auto justify-center group py-4! px-8! border-4!"
          >
            <span className="text-lg">RETURN TO SUMMIT</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="ml-2 group-hover:-translate-y-2 transition-transform"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </NeoButton>
        </div>
      </div>

      {/* Bible Verse */}
      <div className="border-t-4 border-black dark:border-white/20 border-dashed pt-6 mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest shrink-0">
            Isaiah 41:10
          </div>
          <p className="font-bold text-xs sm:text-sm italic opacity-70 leading-relaxed dark:text-gray-300">
            "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand."
          </p>
        </div>
      </div>

      {/* Decorative Final Line */}
      <div className="flex justify-between items-center h-4 sm:h-6 opacity-20">
        <div className="flex gap-2 h-full">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 bg-black dark:bg-white"></div>
          ))}
        </div>
        <span className="text-[8px] font-black uppercase tracking-[0.5em] hidden xs:block dark:text-white">
          End of Portfolio // Artifact Registry
        </span>
        <div className="flex gap-2 h-full">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 bg-black dark:bg-white"></div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
