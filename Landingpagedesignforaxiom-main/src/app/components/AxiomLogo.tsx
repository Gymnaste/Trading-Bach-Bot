import React from 'react';
import axiomLogo from "figma:asset/1f3a0e5267444aae09b6170c62bf00ebb9f85851.png";

export function AxiomLogo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <img 
        src={axiomLogo} 
        alt="AXIOM" 
        className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] mix-blend-screen" 
      />
    </div>
  );
}
