
import React from 'react';
import { SKILLS, CERTIFICATIONS } from '../constants';
import NeoCard from './NeoCard';
import { FaQuestion, FaGitAlt, FaBolt, FaFigma, FaRocket } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <section id="about" className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24">
      {/* Header Section with Fluid Typography */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start md:items-center border-b-8 border-black dark:border-white/20 pb-8 lg:pb-12 reveal">
        <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] sm:leading-[0.85] dark:text-white">
          Full <br /> <span className="text-pink-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Stack</span> <br /> Developer
        </h2>
        <div className="flex-1 max-w-2xl">
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-black leading-tight border-l-4 sm:border-l-8 border-cyan-400 pl-4 sm:pl-8 dark:text-gray-200">
            Modern Web Applications, built <span className="bg-yellow-300 px-1 dark:text-black">With AI</span>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-stretch">
        {/* Profile / Story Column */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 reveal delay-200 h-full">
          <NeoCard color="bg-white" className="space-y-6 h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 dark:bg-[#2a2a2a]">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black text-white flex items-center justify-center font-black text-xl sm:text-3xl border-2 sm:border-4 border-black shrink-0">
                  <FaQuestion />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic tracking-tighter dark:text-white">Who is Putra Michael Sitohang?</h3>
              </div>

              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl font-bold leading-snug dark:text-gray-200">
                <p className="text-xl sm:text-2xl font-black leading-tight dark:text-white">
                  I'm a <span className="bg-lime-400 px-1 dark:text-black">full-stack developer</span> specializing in AI-powered web applications.
                </p>
                <p className="opacity-80 text-base sm:text-lg dark:text-gray-300">
                  With expertise in React, Next.js, and AI integration, I build intelligent solutions that automate business processes and enhance user experiences.
                </p>
              </div>
            </div>

            <div className="space-y-6 mt-6 sm:mt-10">
              <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t-4 border-black dark:border-white/20 border-dashed">
                <div className="bg-lime-300 dark:text-black border-[3px] sm:border-4 border-black p-3 sm:p-5 neo-shadow-sm group hover:bg-black hover:text-white transition-colors">
                  <div className="text-3xl sm:text-5xl font-black italic">05+</div>
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mt-1">Experience Years</div>
                </div>
                <div className="bg-cyan-300 dark:text-black border-[3px] sm:border-4 border-black p-3 sm:p-5 neo-shadow-sm group hover:bg-black hover:text-white transition-colors">
                  <div className="text-3xl sm:text-5xl font-black italic">50+</div>
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mt-1">Digital Products</div>
                </div>
              </div>
            </div>
          </NeoCard>
        </div>

        {/* Technical Arsenal / Skills Column */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col">
          {/* Section Subheader */}
          <div className="relative reveal delay-300 shrink-0">
            <div className="absolute -inset-1 sm:-inset-2 bg-black -z-10"></div>
            <div className="bg-yellow-400 border-[3px] sm:border-4 border-black p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black flex items-center justify-center shrink-0">
                  <svg width="18" height="18" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <h3 className="font-black uppercase italic tracking-widest text-lg sm:text-2xl">Skills & Technologies</h3>
              </div>
              {/* STK removed */}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-4 flex-1">
            <div className="text-center sm:text-left font-bold text-sm sm:text-base opacity-90 hidden sm:block">
              Tools and technologies I work with to bring ideas to life
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {SKILLS.flatMap(category => category.skills).map((skill, idx) => {
                const cardColors = [
                  'hover:bg-cyan-300', 'hover:bg-yellow-300', 'hover:bg-pink-300',
                  'hover:bg-lime-300', 'hover:bg-purple-300', 'hover:bg-orange-300',
                  'hover:bg-blue-300', 'hover:bg-red-300',
                ];
                const hoverColor = cardColors[idx % cardColors.length];
                return (
                  <div
                    key={idx}
                    className={`group relative border-[3px] sm:border-4 border-black p-3 sm:p-4 bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] transition-all duration-200 cursor-default flex flex-col items-center justify-center gap-3 sm:gap-4 aspect-square sm:aspect-auto sm:h-32 ${hoverColor} dark:bg-[#2a2a2a] dark:border-white dark:text-black`}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] sm:text-[10px] font-black uppercase px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-1 pointer-events-none z-10">
                      {skill.name}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black"></div>
                    </div>

                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 group-hover:scale-125 group-hover:-rotate-6">
                      <skill.icon />
                    </div>

                    {/* Name */}
                    <span className="font-black text-[10px] sm:text-xs uppercase tracking-tighter text-center leading-tight dark:text-white group-hover:dark:text-black">
                      {skill.name}
                    </span>

                    {/* Bottom bar accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-1 bg-black transition-all duration-200"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Tech Footer */}
          <div className="relative group reveal delay-500 mt-2 sm:mt-0">
            <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3 group-hover:translate-x-1 sm:group-hover:translate-y-1 transition-transform"></div>
            <div className="relative bg-white dark:bg-[#2a2a2a] dark:text-white border-[3px] sm:border-4 border-black p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <div className="bg-pink-400 border-2 border-black p-2 sm:p-3 font-black text-[10px] sm:text-xs uppercase -rotate-3 group-hover:rotate-0 transition-transform shrink-0">
                  Add-ons+
                </div>
                <p className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-tight leading-tight">
                  Fully operational with <span className="bg-yellow-300 px-1 dark:text-black">Git</span>, <span className="bg-cyan-300 px-1 dark:text-black">Supabase</span>, & <span className="bg-lime-300 px-1 dark:text-black">Figma</span> system integration.
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end border-t-2 sm:border-t-0 sm:border-l-4 border-black pt-4 sm:pt-0 sm:pl-6 border-dashed sm:border-solid">
                <div className="flex -space-x-2 sm:-space-x-3">
                  <div key={1} className="w-8 h-8 sm:w-11 sm:h-11 border-2 sm:border-4 border-black rounded-full bg-gray-50 dark:bg-[#3a3a3a] dark:text-white flex items-center justify-center text-sm sm:text-xl font-black group-hover:-translate-y-2 transition-transform shadow-[2px_2px_0_0_rgba(0,0,0,1)]" style={{ transitionDelay: '100ms' }}>
                    <FaGitAlt />
                  </div>
                  <div key={2} className="w-8 h-8 sm:w-11 sm:h-11 border-2 sm:border-4 border-black rounded-full bg-gray-50 dark:bg-[#3a3a3a] dark:text-white flex items-center justify-center text-sm sm:text-xl font-black group-hover:-translate-y-2 transition-transform shadow-[2px_2px_0_0_rgba(0,0,0,1)]" style={{ transitionDelay: '200ms' }}>
                    <FaBolt />
                  </div>
                  <div key={3} className="w-8 h-8 sm:w-11 sm:h-11 border-2 sm:border-4 border-black rounded-full bg-gray-50 dark:bg-[#3a3a3a] dark:text-white flex items-center justify-center text-sm sm:text-xl font-black group-hover:-translate-y-2 transition-transform shadow-[2px_2px_0_0_rgba(0,0,0,1)]" style={{ transitionDelay: '300ms' }}>
                    <FaFigma />
                  </div>
                </div>
                <div className="hidden xs:flex flex-col items-end leading-none">
                  <span className="text-[8px] font-black uppercase opacity-50">Integrity</span>
                  <span className="text-[10px] font-black uppercase text-lime-600">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >


      {/* Certifications Section - Centered */}
      < div className="space-y-8 sm:space-y-12 reveal delay-500 pt-8 sm:pt-16 border-t-8 border-black dark:border-white/20" >
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter leading-none">
            Licenses & <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-cyan-500">Certifications</span>
          </h3>
          <p className="font-bold text-sm sm:text-lg max-w-2xl">
            Verified technical expertise and professional qualifications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {CERTIFICATIONS.map((cert, idx) => (
            <NeoCard key={idx} color="bg-white" className="flex flex-col justify-between gap-0 h-full hover:-translate-y-2 transition-transform overflow-hidden p-0!">
              {/* Certificate Image Preview */}
              {cert.image ? (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden border-b-4 border-black">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ aspectRatio: '4/3' }}
                  />
                  {/* View overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-[#2a2a2a] dark:text-white border-2 border-black px-3 py-1.5 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Verify
                    </span>
                  </div>
                </a>
              ) : null}

              {/* Card Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between gap-4 flex-1">
                <div>
                  <h4 className="font-black text-lg sm:text-xl uppercase leading-tight mb-2">{cert.title}</h4>
                  <p className="font-bold text-xs sm:text-sm opacity-70 uppercase tracking-widest">{cert.issuer}</p>
                </div>
                <div className="flex justify-between items-center border-t-2 border-black dark:border-white/20 border-dashed pt-4 mt-2">
                  <span className="bg-black text-white px-2 py-1 text-[10px] sm:text-xs font-black uppercase">
                    {cert.year}
                  </span>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                      <FaRocket />
                    </a>
                  ) : (
                    <span className="text-xl sm:text-2xl opacity-40"><FaRocket /></span>
                  )}
                </div>
              </div>
            </NeoCard>
          ))}
        </div>
      </div >
    </section >
  );
};

export default About;
