import React from 'react';

/**
 * BackgroundDecor
 * Renders floating, rotating neo-brutalist decorative shapes behind main content.
 * Matches the aesthetic of the AdminLogin background.
 * pointer-events-none ensures no interaction with content.
 */
const BackgroundDecor: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* TOP-LEFT cluster */}
      <div
        className="absolute top-10 left-8 w-28 h-28 bg-cyan-400 border-4 border-black opacity-25 dark:opacity-10"
        style={{ transform: 'rotate(12deg)', animation: 'floatA 8s ease-in-out infinite' }}
      />
      <div
        className="absolute top-28 left-32 w-12 h-12 bg-pink-400 border-4 border-black opacity-30 dark:opacity-10"
        style={{ transform: 'rotate(-20deg)', animation: 'floatB 6s ease-in-out infinite 1s' }}
      />

      {/* TOP-RIGHT cluster */}
      <div
        className="absolute top-16 right-16 w-20 h-20 bg-yellow-300 border-4 border-black opacity-30 dark:opacity-10"
        style={{ transform: 'rotate(-8deg)', animation: 'floatC 7s ease-in-out infinite 0.5s' }}
      />
      <div
        className="absolute top-6 right-52 w-10 h-10 bg-lime-400 border-4 border-black opacity-20 dark:opacity-[0.08]"
        style={{ transform: 'rotate(35deg)', animation: 'floatA 10s ease-in-out infinite 2s' }}
      />

      {/* MID-LEFT */}
      <div
        className="absolute top-1/2 left-4 w-16 h-16 bg-yellow-300 border-4 border-black opacity-25 dark:opacity-10"
        style={{ transform: 'rotate(45deg) translateY(-50%)', animation: 'floatB 9s ease-in-out infinite 1.5s' }}
      />
      <div
        className="absolute top-[40%] left-24 w-8 h-8 bg-purple-400 border-4 border-black opacity-20 dark:opacity-[0.08]"
        style={{ transform: 'rotate(-15deg)', animation: 'floatC 11s ease-in-out infinite 3s' }}
      />

      {/* MID-RIGHT */}
      <div
        className="absolute top-[35%] right-6 w-24 h-24 bg-pink-300 border-4 border-black opacity-20 dark:opacity-[0.08]"
        style={{ transform: 'rotate(20deg)', animation: 'floatA 12s ease-in-out infinite 0.8s' }}
      />

      {/* BOTTOM-LEFT cluster */}
      <div
        className="absolute bottom-32 left-12 w-20 h-20 bg-lime-400 border-4 border-black opacity-25 dark:opacity-10"
        style={{ transform: 'rotate(-12deg)', animation: 'floatB 7.5s ease-in-out infinite 2.5s' }}
      />
      <div
        className="absolute bottom-16 left-44 w-10 h-10 bg-cyan-300 border-4 border-black opacity-20 dark:opacity-[0.08]"
        style={{ transform: 'rotate(30deg)', animation: 'floatC 9s ease-in-out infinite 0.3s' }}
      />

      {/* BOTTOM-RIGHT cluster */}
      <div
        className="absolute bottom-24 right-10 w-36 h-36 bg-pink-400 border-4 border-black opacity-20 dark:opacity-[0.08]"
        style={{ transform: 'rotate(-6deg)', animation: 'floatA 10s ease-in-out infinite 1.2s' }}
      />
      <div
        className="absolute bottom-8 right-52 w-14 h-14 bg-yellow-400 border-4 border-black opacity-25 dark:opacity-10"
        style={{ transform: 'rotate(18deg)', animation: 'floatB 8s ease-in-out infinite 0.7s' }}
      />

      {/* CENTER-BOTTOM */}
      <div
        className="absolute bottom-10 left-1/3 w-16 h-16 bg-lime-300 border-4 border-black opacity-20 dark:opacity-[0.08]"
        style={{ transform: 'rotate(-20deg)', animation: 'floatC 11s ease-in-out infinite 1.8s' }}
      />

      {/* Keyframe styles */}
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: rotate(12deg) translateY(0px); }
          50% { transform: rotate(16deg) translateY(-14px); }
        }
        @keyframes floatB {
          0%, 100% { transform: rotate(-20deg) translateY(0px); }
          50% { transform: rotate(-24deg) translateY(-10px); }
        }
        @keyframes floatC {
          0%, 100% { transform: rotate(45deg) translateY(0px); }
          50% { transform: rotate(40deg) translateY(-18px); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundDecor;
