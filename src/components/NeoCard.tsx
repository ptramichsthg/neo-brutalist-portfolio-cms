import React from "react";

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  noShadow?: boolean;
  // Updated onClick signature to include React.MouseEvent to support event propagation control
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// NeoCard component featuring neo-brutalist styling with a bold border and shadow.
// Updated to include onClick support to resolve prop-type mismatch in Services.tsx.
const NeoCard: React.FC<NeoCardProps> = ({
  children,
  className = "",
  color = "bg-white",
  noShadow = false,
  onClick,
}) => {
  // bg-white → dark bg (#2a2a2a) with white text
  // vibrant colors → keep bright bg, force dark text (white text on bright = unreadable)
  const darkClass = color === "bg-white"
    ? "dark:bg-[#2a2a2a] dark:text-white dark:border-white/20"
    : "dark:text-black";

  return (
    <div
      onClick={onClick}
      className={`
      border-4 border-black 
      ${color} 
      ${darkClass}
      ${noShadow ? "" : "neo-shadow"} 
      p-6 
      ${className}
      ${onClick ? "cursor-pointer" : ""}
    `}
    >
      {children}
    </div>
  );
};

export default NeoCard;
