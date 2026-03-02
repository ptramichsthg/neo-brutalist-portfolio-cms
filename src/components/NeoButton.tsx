
import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'highlight' | 'white';
}

const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  variant = 'primary',
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-[#FFEE58]",
    secondary: "bg-[#FF80AB]",
    accent: "bg-[#26C6DA]",
    highlight: "bg-[#D4E157]",
    white: "bg-white dark:bg-[#3a3a3a] dark:text-white"
  };

  return (
    <button
      className={`
        border-4 border-black 
        ${variants[variant]} 
        neo-shadow-sm 
        neo-shadow-active 
        transition-all 
        px-6 py-3 
        font-black 
        uppercase 
        tracking-tighter 
        inline-flex items-center gap-2
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeoButton;
