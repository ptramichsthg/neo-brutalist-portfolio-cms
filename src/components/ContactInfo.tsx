
import React, { useState } from 'react';
import NeoCard from './NeoCard';
import { SITE_SETTINGS, SOCIAL_LINKS } from '../constants';

const ContactInfo: React.FC = () => {
  const [copyStatus, setCopyStatus] = useState('COPY_EMAIL');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_SETTINGS.email);
    setCopyStatus('COPIED!');
    setTimeout(() => setCopyStatus('COPY_EMAIL'), 2000);
  };

  return (
    <section id="contact-info" className="px-2 sm:px-0">
      <div className="max-w-4xl mx-auto reveal">
        <NeoCard color="bg-white" className="p-0 relative group overflow-hidden border-4 sm:border-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] sm:shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:bg-[#2a2a2a]">
          {/* Tactical Command Bar */}
          <div className="bg-black text-white px-4 sm:px-5 py-3 sm:py-4 flex justify-between items-center border-b-4 sm:border-b-8 border-black">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-lime-500 rounded-full border-2 border-white animate-pulse"></div>
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">NODE_BDG_001_UPLINK</span>
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 bg-white opacity-20"></div>)}
            </div>
          </div>

          <div className="p-6 sm:p-12 md:p-16 space-y-10 sm:space-y-16">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:justify-between">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-yellow-300 translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2"></div>
                  <div className="relative w-12 h-12 sm:w-20 sm:h-20 bg-black text-white flex items-center justify-center border-[3px] sm:border-4 border-black group-hover:rotate-12 transition-transform">
                    <svg width="24" height="24" className="sm:w-[36px] sm:h-[36px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
                  </div>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="text-3xl sm:text-6xl font-black uppercase italic tracking-tighter leading-none dark:text-white">Inbound</h3>
                  <span className="text-[9px] sm:text-[11px] font-black uppercase text-pink-500 tracking-widest sm:tracking-[0.2em]">Communication Channels</span>
                </div>
              </div>

              <div className="hidden md:block text-right">
                <span className="text-[9px] sm:text-[10px] font-mono opacity-30 uppercase tracking-[0.3em] sm:tracking-[0.4em] block">Latency: 14ms</span>
                <span className="text-[9px] sm:text-[10px] font-mono opacity-30 uppercase tracking-[0.3em] sm:tracking-[0.4em] block">Status: Online</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
              {/* Email Link Package */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="bg-black text-white px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase">Channel_01</span>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase opacity-40 tracking-widest dark:text-gray-400">Global_Relay</span>
                </div>
                <div className="flex flex-col gap-4 sm:gap-5">
                  <a href={`mailto:${SITE_SETTINGS.email}`} className="text-xl xs:text-2xl sm:text-4xl font-black uppercase tracking-tighter hover:text-cyan-500 transition-colors break-all leading-tight border-b-4 sm:border-b-8 border-lime-300 w-fit dark:text-white">
                    {SITE_SETTINGS.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="bg-white border-[3px] sm:border-4 border-black px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-black uppercase shadow-[3px_3px_0_0_rgba(0,0,0,1)] sm:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:bg-yellow-300 transition-all shrink-0 w-fit dark:bg-[#2a2a2a] dark:text-white"
                  >
                    {copyStatus}
                  </button>
                </div>
              </div>

              {/* Location Package */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="bg-black text-white px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase">Channel_02</span>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase opacity-40 tracking-widest dark:text-gray-400">Base_Operations</span>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <p className="text-2xl xs:text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none dark:text-white">WEST BANDUNG REGENCY, ID</p>
                  <span className="text-[9px] sm:text-[10px] font-mono opacity-50 bg-gray-100 px-2 sm:px-3 py-1 border-2 border-black/10 w-fit dark:bg-[#2a2a2a] dark:text-gray-300"> - </span>
                </div>
              </div>
            </div>

            {/* Mechanical Social Matrix */}
            <div className="pt-8 sm:pt-12 border-t-4 border-black dark:border-white/20 border-dashed space-y-6 sm:space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[11px] font-black uppercase opacity-50 tracking-[0.2em] sm:tracking-[0.4em]">Social_Matrix_Override</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 h-3 sm:h-4 bg-black/10"></div>)}
                </div>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                {SOCIAL_LINKS.map((social, idx) => {
                  const colors = ['hover:bg-purple-400', 'hover:bg-blue-400', 'hover:bg-pink-400', 'hover:bg-green-400', 'hover:bg-yellow-400', 'hover:bg-cyan-400'];
                  const color = colors[idx % colors.length];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 sm:gap-3 border-[3px] sm:border-4 border-black p-3 sm:p-4 bg-white dark:bg-[#2a2a2a] dark:text-white dark:border-white/20 font-black uppercase text-[10px] sm:text-sm transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] sm:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 ${color} group/btn`}
                    >
                      <span className="text-xl sm:text-2xl group-hover/btn:rotate-12 transition-transform">
                        <social.icon />
                      </span>
                      <span className="truncate">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Diagnostic Panel */}
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 sm:p-5 border-t-[6px] sm:border-t-8 border-black flex items-center justify-between overflow-hidden">
            <div className="flex gap-1.5 sm:gap-2 shrink-0">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className={`w-1.5 sm:w-2 h-4 sm:h-5 ${i % 3 === 0 ? 'bg-pink-400' : 'bg-black'}`}></div>)}
            </div>
            <span className="text-[8px] sm:text-[11px] font-black opacity-30 uppercase tracking-[0.3em] sm:tracking-[0.6em] truncate ml-3 sm:ml-4">SYSTEM_UPLINK_READY_FOR_ENGAGEMENT</span>
          </div>
        </NeoCard>
      </div>
    </section>
  );
};

export default ContactInfo;
