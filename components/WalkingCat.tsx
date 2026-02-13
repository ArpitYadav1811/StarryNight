"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WalkingCat = () => {
  const [position, setPosition] = useState({ x: -100, y: 50 });

  useEffect(() => {
    const moveCat = () => {
      setPosition((prev) => {
        const newX = prev.x >= window.innerWidth + 100 ? -100 : prev.x + 2;
        const newY = prev.y + Math.sin(prev.x / 50) * 0.5;
        return { x: newX, y: Math.max(20, Math.min(80, newY)) };
      });
    };

    const interval = setInterval(moveCat, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}%`,
      }}
      animate={{
        rotate: position.x % 20 < 10 ? 0 : 180,
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="text-4xl"
        style={{
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
          textShadow: "0 0 0 2px white, 0 0 0 4px rgba(0,0,0,0.1)",
        }}
      >
        🐱
      </div>
    </motion.div>
  );
};

export default WalkingCat;
