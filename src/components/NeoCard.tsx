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


  return (
    <div
      onClick={onClick}
      className={`
      border-4 border-black dark:border-white/80
      ${color}
      ${noShadow ? "" : "neo-shadow dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]"}
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
