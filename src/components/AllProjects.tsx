import React, { useState, useEffect } from "react";
import { useProjects } from "../hooks/useSupabase";
import NeoButton from "./NeoButton";
import ProjectCard from "./ProjectCard";
import { PROJECTS as DEFAULT_PROJECTS } from "../constants";

interface AllProjectsProps {
  onBack: () => void;
}

const AllProjects: React.FC<AllProjectsProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<string>("All");
  const { projects, loading } = useProjects();

  const actualProjects = projects.length > 0 ? projects : DEFAULT_PROJECTS;

  // Extract unique categories dynamically from all projects
  const uniqueCategories = Array.from(new Set(actualProjects.map(p => p.category).filter(Boolean)));
  const serviceCategories = ["All", ...uniqueCategories];

  const filteredProjects =
    filter === "All" ? actualProjects : actualProjects.filter((p) => p.category === filter);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // Force trigger reveal animations for elements already in view
    setTimeout(() => {
      const revealElements = document.querySelectorAll(".reveal, .slide-right");
      revealElements.forEach((el) => el.classList.add("active"));
    }, 100);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filter, filteredProjects]);

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-24 pb-24 overflow-visible">
      {/* Radical Header Section with Integrated Banner */}
      <div className="relative pt-6 sm:pt-10 md:pt-14 px-1 sm:px-0">
        <div className="bg-black text-white p-8 sm:p-12 md:p-16 lg:p-20 border-4 sm:border-8 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] sm:neo-shadow flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12 slide-right">
          <div className="space-y-6 sm:space-y-8 w-full">
            <button
              onClick={onBack}
              className="bg-lime-400 text-black font-black px-4 sm:px-5 py-2 uppercase text-[10px] sm:text-xs md:text-sm border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all mb-4 sm:mb-6 inline-flex items-center gap-2 group"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Base
            </button>
            <h2 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] sm:leading-[0.75]">
              All <br />{" "}
              <span className="text-pink-400 drop-shadow-[3px_3px_0_rgba(255,255,255,0.2)]">
                Works
              </span>
            </h2>
          </div>

          <div className="max-w-md md:text-right slide-right [animation-delay:200ms] border-l-4 md:border-l-0 md:border-r-4 border-lime-400 pl-6 md:pl-0 md:pr-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase leading-tight">
              Artifact Index v.2.5
            </p>
            <p className="font-bold text-sm sm:text-base md:text-lg opacity-70 mt-3 md:mt-4">
              A comprehensive directory of performance-first interfaces
              categorized by technical requirements and creative impact.
            </p>
          </div>
        </div>

        {/* Dynamic Scrolling Banner - Explicitly Animated */}
        <div className="bg-black text-white overflow-hidden py-4 sm:py-5 border-x-4 border-b-4 border-black whitespace-nowrap reveal shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <div className="animate-marquee inline-block font-black text-xl sm:text-3xl uppercase italic tracking-widest">
            &nbsp; FULL REPOSITORY • COMPREHENSIVE ARCHIVE • TECHNICAL
            SCHEMATICS • PROJECT INDEX • DATA ARCHIVE • PERFORMANCE LOGS •
            &nbsp; FULL REPOSITORY • COMPREHENSIVE ARCHIVE • TECHNICAL
            SCHEMATICS • PROJECT INDEX • DATA ARCHIVE • PERFORMANCE LOGS •
          </div>
        </div>
      </div>

      {/* Redesigned Adaptive Filter Interface */}
      <div className="reveal [animation-delay:400ms] max-w-6xl mx-auto w-full">
        <div className="bg-white dark:bg-[#2a2a2a] dark:text-white border-4 sm:border-8 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col overflow-hidden">
          {/* Tactical Header Bar */}
          <div className="bg-black text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center border-b-4 sm:border-b-8 border-black">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border border-black/20"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full border border-black/20"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border border-black/20"></div>
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] ml-2 hidden xs:block">
                Command_Center // Filter_Module
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] xs:hidden">
                Module_01
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end leading-none">
                <span className="text-[8px] font-black opacity-40 uppercase">
                  Registry Status
                </span>
                <span className="text-[10px] font-black uppercase text-lime-400">
                  Synchronized
                </span>
              </div>
              <div className="w-px h-6 bg-white/20 hidden sm:block"></div>
              <span className="text-[10px] sm:text-xs font-mono font-black opacity-60">
                ARC_V2.5
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-8 md:p-10 flex flex-col gap-6 sm:gap-8">
            {/* Control Subheader */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-black dark:border-white/20 border-dashed pb-4 sm:pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase italic tracking-widest text-pink-500">
                  Selection Matrix
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">
                  PROJECT CATEGORIES
                </h3>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#1a1a1a] border-2 border-black dark:border-white/20 px-4 py-2">
                <span className="text-[10px] font-black uppercase opacity-40">
                  Artifacts Found
                </span>
                <span className="text-xl sm:text-2xl font-black italic">
                  {filteredProjects.length.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Filter Buttons Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {serviceCategories.map((cat, idx) => {
                const isActive = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`
                      cursor-pointer
                      relative group flex flex-col items-start p-3 sm:p-4 border-[3px] border-black transition-all h-full
                      ${isActive
                        ? "bg-cyan-400 -translate-x-1.5 -translate-y-1.5 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                        : "bg-white dark:bg-[#3a3a3a] dark:text-white hover:bg-yellow-100 dark:hover:bg-[#4a4a4a] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
                      }
                    `}
                  >
                    <span
                      className={`text-[8px] font-black uppercase mb-1 transition-opacity ${isActive ? "opacity-100" : "opacity-30"}`}
                    >
                      CAT_0{idx}
                    </span>
                    <span className="text-sm sm:text-base font-black uppercase italic tracking-tighter leading-tight text-left">
                      {cat}
                    </span>
                    {isActive && (
                      <div className="absolute top-2 right-2">
                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Project Grid - Using unified ProjectCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 pt-4">
        {loading && projects.length === 0 ? (
          // Skeleton Loaders
          [...Array(6)].map((_, idx) => (
            <div key={idx} className="h-[400px] bg-white border-4 border-black p-6 flex flex-col gap-4 animate-pulse neo-shadow-sm">
              <div className="w-full aspect-video bg-gray-200 border-4 border-black"></div>
              <div className="flex gap-2"><div className="w-16 h-4 bg-gray-200 border-2 border-black"></div><div className="w-16 h-4 bg-gray-200 border-2 border-black"></div></div>
              <div className="w-3/4 h-8 bg-gray-200 border-black mt-2"></div>
              <div className="w-full h-12 bg-gray-200 border-black mt-auto"></div>
            </div>
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ProjectCard
              key={`${filter}-${project.title}-${idx}`}
              project={project}
              index={idx}
            />
          ))
        ) : (
          /* Enhanced Empty State */
          <div className="col-span-full py-24 sm:py-40 flex flex-col items-center justify-center text-center space-y-8 reveal bg-white dark:bg-[#2a2a2a] dark:text-white border-4 border-black dark:border-white/20 border-dashed">
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-yellow-200 border-4 border-black rounded-full flex items-center justify-center text-6xl sm:text-7xl animate-bounce shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
              🕳️
            </div>
            <div className="space-y-4 px-6">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter">
                Segment Null
              </h3>
              <p className="font-bold text-base sm:text-lg md:text-xl max-w-lg mx-auto opacity-70">
                The archives for "{filter}" are currently empty or restricted.
                Please adjust your transmission parameters from the control
                panel.
              </p>
            </div>
            <NeoButton
              variant="highlight"
              onClick={() => setFilter("All")}
              className="mt-6 text-xl px-12 py-5"
            >
              Reset Filters
            </NeoButton>
          </div>
        )}
      </div>

      {/* Final Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-12 pt-16 sm:pt-24 border-t-8 border-black dark:border-white/20 border-dashed reveal delay-500">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <div className="flex flex-col items-start leading-none uppercase">
            <span className="text-[10px] sm:text-xs font-black opacity-40 mb-1">
              Navigation Protocol
            </span>
            <span className="text-lg sm:text-xl font-black text-black dark:text-white">
              End of Project Index
            </span>
          </div>
          <NeoButton
            variant="secondary"
            onClick={onBack}
            className="w-full sm:w-auto text-xl sm:text-2xl px-12  py-5 border-4! justify-center group"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="mr-3 group-hover:-translate-x-2 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return to Base
          </NeoButton>
        </div>

        <div className="hidden md:flex flex-col items-end text-right border-r-8 border-lime-500 pr-6 py-2">
          <span className="text-[10px] font-black uppercase opacity-40">
            System Diagnostics
          </span>
          <span className="text-2xl font-black text-lime-600 italic">
            ALL SYSTEMS OPERATIONAL
          </span>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-4 h-1 bg-black"></div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AllProjects;
