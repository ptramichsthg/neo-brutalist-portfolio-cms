import React, { useState } from "react";
import NeoCard from "./NeoCard";
import NeoButton from "./NeoButton";
import { SITE_SETTINGS } from "../constants";

const Hero: React.FC = () => {
  const [showCvToast, setShowCvToast] = useState(false);

  const heroData = {
    title: SITE_SETTINGS.hero_title,
    subtitle: SITE_SETTINGS.hero_subtitle,
    location: SITE_SETTINGS.location_text,
    status: SITE_SETTINGS.status_text,
    fullName: SITE_SETTINGS.full_name,
    jobTitle: SITE_SETTINGS.job_title,
    profileImage: SITE_SETTINGS.hero_image_url,
    proBadge: SITE_SETTINGS.pro_badge_text,
    cvUrl: SITE_SETTINGS.cv_url,
  };

  const handleDownloadCV = () => {
    if (!heroData.cvUrl) {
      setShowCvToast(true);
      setTimeout(() => setShowCvToast(false), 4000);
      return;
    }
    const link = document.createElement("a");
    link.href = heroData.cvUrl;
    link.download = "CV-Putra-Michael-Sitohang.pdf";
    link.click();
  };

  return (
<section className="space-y-4 sm:space-y-6 md:space-y-12 pt-2 sm:pt-4 md:pt-8">
      {/* Main Hero Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-stretch">
        {/* Left Content Card */}
        <div className="lg:col-span-7 flex flex-col h-full order-1">
          <NeoCard
            color="bg-[#FFEE58]"
            className="relative overflow-hidden flex flex-col justify-center gap-68 h-full min md:gap--h-100 sm:min-h-112.5 md:min-h-137.5 group neo-pop p-5 sm:p-8 md:p-12"
          >
            {/* Background Decorative Element */}
            <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-40 sm:h-40 bg-pink-400 border-4 border-black rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-4 md:gap-6">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 slide-right [animation-delay:200ms]">
                <span className="bg-black text-white font-black px-2 sm:px-4 py-1 uppercase text-[9px] sm:text-xs tracking-widest border-2 border-black">
                  {heroData.location}
                </span>
                <span className="bg-lime-400 text-black font-black px-2 sm:px-4 py-1 uppercase text-[9px] sm:text-xs tracking-widest border-2 border-black animate-pulse">
                  • {heroData.status}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] sm:leading-[0.95] tracking-tighter uppercase italic wrap-break-word slide-right [animation-delay:400ms]">
                {heroData.title.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    <span className="block">
                      {line.split(" ").map((word, j) => (
                        <span key={j} className="inline-block mr-2 sm:mr-3 lg:mr-4">
                          {word}
                        </span>
                      ))}
                    </span>
                  </React.Fragment>
                ))}
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-xl font-bold max-w-2xl leading-tight border-l-4 md:border-l-8 border-black pl-4 md:pl-6 my-2 sm:my-3 md:my-5 slide-right [animation-delay:600ms]">
                {heroData.subtitle}
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-2 md:mt-4 slide-right [animation-delay:800ms]">
                <NeoButton
                  variant="secondary"
                  className="cursor-pointer text-lg md:text-2xl px-6! md:px-8! w-full sm:w-auto justify-center"
                  onClick={() =>
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View My Project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    className="ml-2"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </NeoButton>

                <NeoButton
                  variant="white"
                  className="cursor-pointer text-lg md:text-2xl px-6! md:px-8! w-full sm:w-auto justify-center"
                  onClick={() =>
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  About Me
                </NeoButton>

                {/* Download CV Button */}
                <button
                  onClick={handleDownloadCV}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-[3px] md:border-4 border-black bg-black text-white font-black text-lg md:text-2xl uppercase tracking-tighter transition-all duration-200 shadow-[4px_4px_0_0_rgba(255,238,88,1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(255,238,88,1)] active:translate-x-0 active:translate-y-0 active:shadow-none w-full sm:w-auto cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" className="group-hover:animate-bounce">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </button>
              </div>
            </div>
          </NeoCard>
        </div>

        {/* Right Profile Card */}
        <div className="lg:col-span-5 order-2">
          <NeoCard
            color="bg-cyan-300"
            className="h-full relative overflow-hidden group p-0 border-4 sm:border-[6px] md:border-8 neo-pop [animation-delay:400ms] aspect-4/5 sm:aspect-square lg:aspect-auto min-h-75 sm:min-h-100 md:min-h-full"
          >
            <img
              src={heroData.profileImage}
              alt={heroData.fullName}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            />

            {/* Profile info overlay */}
            <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 md:top-6 md:left-6 md:right-6 bg-white border-[3px] md:border-4 border-black p-3 sm:p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:translate-y-2 dark:bg-[#2a2a2a] dark:text-white">
              <div className="font-black italic uppercase text-xl sm:text-2xl md:text-4xl tracking-tighter leading-none">
                {heroData.fullName}
              </div>
              <div className="font-bold text-[8px] sm:text-[10px] md:text-xs uppercase opacity-70 tracking-widest mt-1">
                {heroData.jobTitle}
              </div>
            </div>
          </NeoCard>
        </div>
      </div>

      {/* CV Notification - Centered Modal */}
      {showCvToast && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] px-10 py-8 flex flex-col items-center gap-4 dark:bg-[#2a2a2a] dark:text-white">
            <div className="w-12 h-12 bg-yellow-400 border-2 border-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="font-black uppercase text-xl tracking-tight text-center">CV is Being Made</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
