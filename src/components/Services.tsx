
import React from 'react';
import { SERVICES } from '../constants';
import NeoCard from './NeoCard';

const Services: React.FC = () => {
  const handleInquire = (serviceTitle: string) => {
    const phoneNumber = "6282285598500";
    const message = encodeURIComponent(`Hello Putra, I'm interested in your ${serviceTitle} service. Can we discuss further?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="services" className="space-y-16">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b-8 border-black dark:border-white/20 pb-8">
        <div className="space-y-2">
          <span className="bg-pink-400 text-black font-black px-3 py-1 uppercase text-sm border-2 border-black neo-shadow-sm">What I Do</span>
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none dark:text-white">
            Services
          </h2>
        </div>
        <p className="font-bold text-xl md:text-2xl max-w-md leading-tight dark:text-gray-200">
          Modern web development and  <span className="bg-yellow-300 px-1 dark:text-black">AI Integration</span> for scalable digital products.
        </p>
      </div>

      <div className="bg-black text-white overflow-hidden py-6 border-t-4 border-b-4 border-black whitespace-nowrap -mx-4 md:-mx-8">
        <div className="animate-marquee inline-block font-black text-3xl uppercase italic tracking-widest">
          &nbsp; WEB DEVELOPMENT • SEO OPTIMIZATION • UI ARCHITECTURE • RESPONSIVE DESIGN • BRAND IDENTITY • PERFORMANCE TUNING •
          &nbsp; WEB DEVELOPMENT • SEO OPTIMIZATION • UI ARCHITECTURE • RESPONSIVE DESIGN • BRAND IDENTITY • PERFORMANCE TUNING •
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {SERVICES.map((s, idx) => (
          <NeoCard
            key={idx}
            color={s.color}
            className="group relative flex flex-col gap-6 p-8 h-full transition-all hover:-translate-y-2 neo-shadow-hover overflow-hidden cursor-pointer"
            onClick={() => handleInquire(s.title)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
              <span className="text-9xl font-black italic">{idx + 1}</span>
            </div>

            <div className="relative z-10 flex flex-col h-full gap-4">
              <div className="flex items-center justify-between">
                <span className="text-6xl md:text-7xl group-hover:rotate-12 transition-transform duration-300">
                  <s.icon />
                </span>
                {s.badge && (
                  <span className="bg-white dark:bg-[#2a2a2a] dark:text-white border-2 border-black px-4 py-1 text-xs font-black uppercase neo-shadow-sm">
                    {s.badge}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">{s.title}</h3>
                <p className="text-lg font-bold leading-snug">{s.desc}</p>
              </div>

              <div className="mt-auto pt-6 border-t-4 border-black dark:border-black/50 border-dashed flex items-center justify-between">
                <span className="font-black italic uppercase text-sm group-hover:text-black transition-colors">Inquire Now</span>
                <div className="w-10 h-10 border-4 border-black bg-white dark:bg-[#2a2a2a] dark:border-black/40 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
              </div>
            </div>
          </NeoCard>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Services;
