import React from "react";
import { PROJECTS } from "../constants";
import ProjectCard from "./ProjectCard";
import NeoButton from "./NeoButton";

interface WorksProps {
  onViewAll?: () => void;
}

const Works: React.FC<WorksProps> = ({ onViewAll }) => {
  // Show only first 3 on home, ensuring variety
  const featuredProjects = PROJECTS.filter((proj) => proj.featured);

  return (
    <section id="work" className="space-y-12 sm:space-y-16">
      {/* Header Block with improved mobile scaling */}
      <div className="relative reveal px-2 sm:px-0">
        {/* Background shadow box - hidden on very small screens to save space */}
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full bg-cyan-400 border-[3px] sm:border-4 border-black -z-10 hidden xs:block"></div>

        <div className="bg-white dark:bg-[#2a2a2a] dark:text-white border-4 sm:border-8 border-black p-6 sm:p-8 md:p-12 relative overflow-hidden">
          {/* Subtle background text for radical look */}
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none hidden md:block">
            <span className="text-[120px] font-black italic uppercase leading-none">
              WORKS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
            <div className="space-y-3 sm:space-y-4">
              <span className="bg-pink-400 text-black font-black px-2 sm:px-3 py-1 uppercase text-[10px] sm:text-sm border-2 border-black neo-shadow-sm inline-block">
                Archive Vol. 1
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] sm:leading-[0.8]">
                Selected <br className="hidden sm:block" />{" "}
                <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  Artifacts
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:text-right">
              <p className="font-black text-lg sm:text-xl md:text-2xl leading-tight border-l-4 sm:border-l-8 lg:border-l-0 lg:border-r-8 border-black pl-4 sm:pl-6 lg:pl-0 lg:pr-6">
                A curated selection of <span className="bg-yellow-300 px-1 dark:text-black">AI-powered and Modern Web Products</span> built for <span className="bg-lime-400 px-1 dark:text-black">real-World Impact</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout - 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {featuredProjects.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </div>

      {/* Call to Action with improved spacing and responsiveness */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 py-10 sm:py-16 border-y-[6px] sm:border-y-8 border-black dark:border-white/20 border-dashed reveal delay-500">
        <div className="space-y-1 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic">
            Hungry for more?
          </h3>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60">
            Full index available on the next terminal
          </p>
        </div>

        <NeoButton
          variant="highlight"
          className="cursor-pointer text-lg sm:text-xl px-8! sm:px-12! w-full sm:w-auto justify-center"
          onClick={onViewAll}
        >
          View All Projects
        </NeoButton>
      </div>
    </section>
  );
};

export default Works;
