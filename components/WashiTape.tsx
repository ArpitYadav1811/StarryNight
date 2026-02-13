"use client";

import { ReactNode } from "react";

interface WashiTapeProps {
  color?: "pink" | "blue" | "yellow" | "green";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  rotation?: number;
}

const WashiTape = ({ 
  color = "pink", 
  position = "top-left",
  rotation = -5 
}: WashiTapeProps) => {
  const colors = {
    pink: "rgba(255,182,193,0.6)",
    blue: "rgba(173,216,230,0.6)",
    yellow: "rgba(255,255,153,0.6)",
    green: "rgba(144,238,144,0.6)",
  };

  const positions = {
    "top-left": { top: "-8px", left: "10px" },
    "top-right": { top: "-8px", right: "10px" },
    "bottom-left": { bottom: "-8px", left: "10px" },
    "bottom-right": { bottom: "-8px", right: "10px" },
  };

  return (
    <div
      className="absolute w-16 h-5 z-10"
      style={{
        ...positions[position],
        background: `linear-gradient(135deg, ${colors[color]} 0%, ${colors[color].replace('0.6', '0.4')} 100%)`,
        transform: `rotate(${rotation}deg)`,
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        border: `1px solid ${colors[color].replace('0.6', '0.3')}`,
      }}
    >
      <div
        className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-50"
        style={{ transform: "translateY(-50%)" }}
      />
    </div>
  );
};

export default WashiTape;
