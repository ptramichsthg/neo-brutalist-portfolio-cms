
import React from 'react';
import NeoCard from './NeoCard';
import { useTestimonials } from '../hooks/useSupabase';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const { testimonials, loading } = useTestimonials();
  const displayTestimonials = testimonials.length > 0 ? testimonials : TESTIMONIALS;
  return (
    <section id="testi" className="space-y-16">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 border-b-8 border-black dark:border-white/20 pb-12 reveal">
        <div className="relative group">
          <div className="absolute -inset-2 bg-black -rotate-1 group-hover:rotate-1 transition-transform"></div>
          <div className="relative bg-lime-400 border-4 border-black p-6 md:p-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black">
              Wall of <br /> <span className="bg-white dark:bg-[#2a2a2a] dark:text-white px-2 text-black">Proof</span>
            </h2>
          </div>
          <div className="absolute -top-6 -right-6 bg-yellow-300 border-2 border-black p-2 font-black text-[10px] uppercase rotate-12 animate-bounce">
            5/5 Rating
          </div>
        </div>
        <div className="max-w-md text-center md:text-right space-y-4">
          <div className="inline-block bg-pink-400 border-2 border-black px-4 py-1 font-black uppercase text-sm -rotate-2 dark:text-black">
            Social Intel
          </div>
          <p className="text-xl md:text-2xl font-black leading-[1.1] dark:text-gray-200">
            Unfiltered feedback from <span className="bg-cyan-300 px-1 dark:text-black">pioneers</span> who demand excellence in every pixel.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading && testimonials.length === 0 ? (
          // Skeleton Loaders
          [...Array(3)].map((_, idx) => (
            <div key={idx} className={`relative group reveal delay-${(idx + 1) * 200} ${idx === 1 ? 'md:mt-8' : idx === 2 ? 'lg:mt-16' : ''}`}>
              <div className="h-[320px] bg-white border-4 border-black p-6 flex flex-col gap-4 animate-pulse neo-shadow-sm">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-gray-200 border-4 border-black"></div>
                  <div className="flex-1 space-y-2 mt-2">
                    <div className="w-3/4 h-5 bg-gray-200 border-black"></div>
                    <div className="w-1/2 h-4 bg-gray-200"></div>
                  </div>
                </div>
                <div className="w-full h-full bg-gray-200 border-l-4 border-black p-4 mt-4"></div>
              </div>
            </div>
          ))
        ) : (
          displayTestimonials.map((t, idx) => (
            <div key={idx} className={`relative group reveal delay-${(idx + 1) * 200} ${idx === 1 ? 'md:mt-8' : idx === 2 ? 'lg:mt-16' : ''}`}>
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
              <NeoCard
                color={t.color}
                noShadow
                className="h-full flex flex-col gap-6 relative overflow-hidden transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 bg-black text-white px-2 py-0.5 text-[8px] font-black font-mono">
                  REF-00{idx + 1}
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 border-4 border-black bg-white dark:bg-[#2a2a2a] dark:border-white/20 overflow-hidden group-hover:rotate-3 transition-transform">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-lime-400 border-2 border-black flex items-center justify-center text-[10px] font-black">
                      ✓
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-black uppercase text-lg leading-tight tracking-tighter">{t.name}</h4>
                    <p className="text-[10px] font-black uppercase opacity-60">{t.role} @ {t.company}</p>
                  </div>
                </div>

                <div className="relative flex-1 bg-white/20 dark:bg-white/10 border-l-4 border-black dark:border-white/40 p-4 mt-2">
                  <span className="absolute -top-4 -left-2 text-6xl font-black opacity-10 select-none">"</span>
                  <p className="text-lg font-black leading-tight relative z-10">
                    {t.text}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div className="border-2 border-black dark:border-white/40 border-dashed px-3 py-1 -rotate-6 group-hover:rotate-0 transition-transform">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Highly Recommended</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-black border border-white"></div>
                    ))}
                  </div>
                </div>
              </NeoCard>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 sm:mt-8 mx-auto w-fit border-4 border-black bg-white dark:bg-[#2a2a2a] neo-shadow flex flex-col md:flex-row divide-y-4 md:divide-y-0 md:divide-x-4 divide-black overflow-hidden relative z-10">
        {[
          { label: 'Client Satisfaction', val: '98%', color: 'bg-cyan-300' },
          { label: 'Projects Shipped', val: '50+', color: 'bg-pink-300' },
          { label: 'On-Time Rate', val: '100%', color: 'bg-yellow-300' },
          { label: 'Lines of Code', val: '1M+', color: 'bg-lime-300' }
        ].map((stat, i) => (
          <div key={i} className={`p-6 sm:p-8 lg:p-10 min-w-[220px] lg:min-w-[250px] flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-default ${stat.color} dark:text-black hover:brightness-110`}>
            <span className="text-4xl lg:text-5xl font-black italic group-hover:scale-110 transition-transform">{stat.val}</span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-70 mt-2">{stat.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Testimonials;
