import React, { useEffect, useState, useRef } from "react";
import type { DbProject } from "../lib/supabase";
import NeoCard from "./NeoCard";
import NeoButton from "./NeoButton";

interface ProjectCardProps {
  project: DbProject;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = project.live_url;
    if (url && url !== "#") {
      window.open(url, "_blank");
    } else {
      alert("Case study coming soon!");
    }
  };

  const cardBg = project.color || "bg-white";
  // Extract the base color class to apply it specifically on group-hover
  const hoverBgClass = cardBg.startsWith("bg-")
    ? `group-hover:${cardBg}`
    : "group-hover:bg-black";

  return (
    <div 
      ref={cardRef}
      className={`reveal delay-${((index % 3) + 1) * 100} h-full ${isVisible ? 'active' : ''}`}
    >
      <NeoCard
        color={cardBg}
        className="flex flex-col gap-4 sm:gap-6 group cursor-pointer neo-shadow-hover transition-all duration-300 h-full p-4 sm:p-6"
        onClick={handleAction}
      >
        {/* Dynamic Image Container */}
        <div className="relative border-[3px] sm:border-4 border-black overflow-hidden bg-black aspect-16/10 sm:aspect-video shrink-0">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-70 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100">
              <span className="text-5xl sm:text-7xl font-black italic opacity-20 uppercase tracking-tighter">IMG</span>
            </div>
          )}
          {/* Floating Year Badge */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white dark:bg-[#2a2a2a] dark:text-white border-2 sm:border-4 border-black px-1.5 sm:px-2 py-0.5 font-black text-[9px] sm:text-xs z-20 uppercase tracking-tighter shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            YR / {project.year}
          </div>

          {/* Category tag overlay */}
          <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-0.5 text-[8px] sm:text-[10px] font-black uppercase tracking-widest z-20 border border-white/20">
            {project.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3 sm:space-y-4 flex flex-col flex-1">
          {/* Tags - Better wrapping for mobile */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-black text-white border-[1.5px] sm:border-2 border-black px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-widest leading-none"
              >
                {tag}
              </span>
            ))}
            {project.tags && project.tags.length > 3 && (
              <span className="bg-white dark:bg-[#2a2a2a] dark:text-white text-black border-[1.5px] sm:border-2 border-black px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-widest leading-none">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2 flex-1">
            <h3 className="font-black uppercase tracking-tighter leading-none text-2xl sm:text-3xl lg:text-4xl group-hover:translate-x-1 transition-transform">
              {project.title}
            </h3>
            <p className="font-bold leading-tight text-xs sm:text-sm md:text-base opacity-90">
              {project.description}
            </p>
          </div>

          {/* Action Row - Adaptive Button Sizing */}
          <div className="pt-2 sm:pt-4 flex items-stretch gap-2 sm:gap-4 mt-auto">
            <NeoButton
              variant="white"
              className="cursor-pointer flex-1 justify-center py-2.5! sm:py-4! text-xs sm:text-base group-hover:bg-black group-hover:text-white transition-colors border-[3px]! sm:border-4!"
              onClick={handleAction}
            >
              Explore Case
            </NeoButton>
            {/* Arrow background is white initially, then follows card color on hover */}
            <div
              className={`w-10 h-10 sm:w-14 sm:h-14 border-[3px] sm:border-4 border-black bg-white dark:bg-[#2a2a2a] dark:text-white flex items-center justify-center shrink-0 ${hoverBgClass} transition-all duration-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="sm:w-7 sm:h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </NeoCard>
    </div>
  );
};

export default ProjectCard;
