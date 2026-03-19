
import React from 'react';
import NeoCard from './NeoCard';
import { useServices } from '../hooks/useSupabase';
import { SITE_SETTINGS, SERVICES } from '../constants';
import { FaRocket, FaBuilding, FaFigma, FaRobot } from 'react-icons/fa';

// Map icon_name strings (stored in DB) to React components
const ICON_MAP: Record<string, React.ElementType> = {
  FaRocket,
  FaBuilding,
  FaFigma,
  FaRobot,
};

const Services: React.FC = () => {
  const { services, loading } = useServices();

  const handleInquire = (serviceTitle: string) => {
    const phoneNumber = SITE_SETTINGS.phone.replace(/\D/g, '');
    const firstName = SITE_SETTINGS.full_name.split(' ')[0] || 'there';
    const message = encodeURIComponent(`Hello ${firstName}, I'm interested in your ${serviceTitle} service. Can we discuss further?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const normalizedServices = services.length > 0 
    ? services.map(s => ({
        id: s.id,
        title: s.title,
        desc: s.description,
        IconComp: ICON_MAP[s.icon_name || 'FaRocket'],
        color: s.color || 'bg-white',
        badge: s.badge || ''
      }))
    : SERVICES.map((s, i) => ({
        id: `fallback-${i}`,
        title: s.title,
        desc: s.desc,
        IconComp: s.icon,
        color: s.color,
        badge: s.badge
      }));

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
        {loading && services.length === 0 ? (
          // Skeleton Loaders
          [...Array(4)].map((_, idx) => (
            <div key={idx} className="h-[300px] bg-white border-4 border-black p-8 flex flex-col gap-6 animate-pulse neo-shadow-sm">
               <div className="flex justify-between w-full">
                 <div className="w-16 h-16 bg-gray-200 border-4 border-black rounded-full"></div>
                 <div className="w-24 h-6 bg-gray-200 border-2 border-black"></div>
               </div>
               <div className="space-y-3 mt-4">
                 <div className="w-3/4 h-8 bg-gray-200 border-black"></div>
                 <div className="w-4/5 h-4 bg-gray-200"></div>
                 <div className="w-2/3 h-4 bg-gray-200"></div>
               </div>
            </div>
          ))
        ) : (
          normalizedServices.map((s, idx) => {
            const IconComp = s.IconComp;
            return (
              <NeoCard
                key={s.id}
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
                      {IconComp ? <IconComp /> : null}
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
            );
          })
        )}
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
