
import React, { useState, useEffect } from 'react';
import NeoButton from './NeoButton';

interface NavbarProps {
  onHomeClick?: (forceScrollTop?: boolean) => void;
  currentView?: 'home' | 'projects';
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, currentView = 'home', theme = 'light', onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = React.useMemo(() => [
    { name: 'Home', id: 'work', color: 'bg-cyan-400' },
    { name: 'Services', id: 'services', color: 'bg-yellow-400' },
    { name: 'About', id: 'about', color: 'bg-lime-400' },
    { name: 'Testimonials', id: 'testi', color: 'bg-purple-400' },
    { name: 'Contact', id: 'contact-info', color: 'bg-pink-400' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (currentView === 'home') {
      navLinks.forEach((link) => {
        const element = document.getElementById(link.id);
        if (element) observer.observe(element);
      });
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [currentView, navLinks]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogoClick = () => {
    if (onHomeClick) onHomeClick(true);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
    setIsMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    if (currentView !== 'home' && onHomeClick) {
      onHomeClick(false);
    }

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const elementPosition = element.offsetTop - offset;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });

        setActiveSection(id);
      }
    }, currentView !== 'home' ? 150 : 0);

    setIsMenuOpen(false);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-100 px-2 sm:px-4 transition-all duration-500 flex justify-center ${isScrolled ? 'pt-1 sm:pt-2' : 'pt-4 sm:pt-6'
      }`}>
<div className={`
        w-full max-w-7xl border-[3px] sm:border-4 border-black transition-all duration-500 relative
        ${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'}
        ${isScrolled
          ? 'shadow-[4px_4px_0_0_rgba(0,0,0,1)] py-1.5 sm:py-2'
          : 'shadow-[8px_8px_0_0_rgba(0,0,0,1)] py-2 sm:py-4'
        }
      `}>
        <header className="px-3 sm:px-4 md:px-8 flex items-center justify-between">

          {/* Logo / Name Block */}
          <div
            className="cursor-pointer group relative"
            onClick={handleLogoClick}
          >
<div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
            <div className={`relative border-2 border-black px-2 py-1 flex items-center gap-2 sm:gap-3 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
              <h1 className={`text-sm sm:text-base md:text-xl font-black tracking-tighter uppercase leading-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Putra Michael Sitohang
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="relative group">
<button
                      onClick={() => scrollTo(link.id)}
                      className={`
                        cursor-pointer relative z-10 font-black uppercase italic tracking-tighter transition-all px-2 xl:px-3 py-1.5 border-2 border-black text-[10px] xl:text-xs
                        ${isActive
                          ? `${link.color} -translate-x-0.5 -translate-y-0.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)]`
                          : `${theme === 'dark' ? 'bg-[#2a2a2a] text-white hover:bg-yellow-900' : 'bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-yellow-50'}`
                        }
                      `}
                    >
                      {link.name}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="h-8 w-0.5 bg-black mx-1 opacity-20"></div>

<NeoButton
              variant="secondary"
              onClick={() => scrollTo('contact-info')}
              className="py-2! px-4! text-[10px] xl:text-xs group border-2!"
            >
              <span>Uplink</span>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </NeoButton>

            <button
              onClick={onToggleTheme}
              className="cursor-pointer p-2 border-2 border-black transition-all bg-yellow-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
          </nav>

{/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={onToggleTheme}
              className="cursor-pointer p-2 sm:p-2.5 border-2 border-black transition-all bg-yellow-400 active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
            <div className="hidden xs:flex flex-col items-end leading-none mr-1">
              <span className="text-[7px] sm:text-[8px] font-black uppercase opacity-50 italic">System</span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-lime-600">Active</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
className={`
                cursor-pointer p-2 sm:p-2.5 border-2 border-black transition-all relative z-101 touch-manipulation
                ${isMenuOpen
                  ? 'bg-pink-400 rotate-90 shadow-none'
                  : `${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'} shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5`
                }
              `}
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`
              fixed inset-0 bg-black/60 backdrop-blur-md z-90 lg:hidden transition-all duration-300
              ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
            onClick={() => setIsMenuOpen(false)}
          >
<div
              className={`
                absolute top-0 right-0 h-full w-full xs:w-[85%] sm:w-[70%] max-w-md border-l-[6px] sm:border-l-8 border-black p-5 xs:p-6 sm:p-8 flex flex-col gap-6 xs:gap-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Title Section */}
              <div className="space-y-1 sm:space-y-2 pt-12 xs:pt-16">
                <div className="flex items-center gap-2">
                  <span className="bg-black text-white px-2 py-0.5 text-[8px] xs:text-[10px] font-black uppercase tracking-[0.2em]">Registry</span>
                  <div className={`flex-1 h-px opacity-20 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
                </div>
                <h2 className={`text-4xl xs:text-5xl sm:text-6xl font-black uppercase italic tracking-tighter leading-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Menu</h2>
              </div>

              {/* Scrollable Nav Items */}
              <nav className="flex flex-col gap-2 xs:gap-3 overflow-y-auto pr-2 custom-scrollbar flex-1 py-2">
                {navLinks.map((link, idx) => (
<button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`
                      group flex items-center justify-between border-[3px] border-black p-3 xs:p-4 transition-all hover:-translate-x-1 active:bg-yellow-400
                      ${activeSection === link.id ? 'bg-cyan-400 -translate-x-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)]' : `${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'} shadow-[2px_2px_0_0_rgba(0,0,0,1)]`}
                    `}
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
<div className="flex flex-col items-start">
                      <span className={`text-[8px] font-black uppercase opacity-30 leading-none mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Channel_0{idx + 1}</span>
                      <span className={`text-xl xs:text-2xl sm:text-3xl font-black uppercase italic tracking-tighter leading-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{link.name}</span>
                    </div>
                    <div className="w-8 h-8 xs:w-10 xs:h-10 border-[3px] border-black flex items-center justify-center bg-black text-white group-active:bg-white group-active:text-black shrink-0">
                      <svg width="16" height="16" className="xs:w-5 xs:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <path d="M7 17l10-10M7 7h10v10" />
                      </svg>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Bottom Sticky Section */}
              <div className="mt-auto space-y-4 xs:space-y-6 pt-4 border-t-[3px] border-black border-dashed">
                <NeoButton
                  variant="secondary"
                  onClick={() => scrollTo('contact-info')}
                  className="w-full justify-center text-lg xs:text-2xl py-4 xs:py-5 sm:py-6 border-[3px]! shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                >
                  Get in Touch
                </NeoButton>

<div className="flex items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <span className={`text-[8px] xs:text-[10px] font-black uppercase opacity-40 leading-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Global Operations</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse border border-black/20"></span>
                      <span className={`text-xs xs:text-sm sm:text-lg font-black uppercase italic leading-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}>West Bandung Regency // Active</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] xs:text-[18px] font-black font-mono opacity-20 leading-none block">v.2.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </header>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: black;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
