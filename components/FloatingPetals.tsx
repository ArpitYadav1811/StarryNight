"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "flower" | "sprite";
}

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const createPetals = () => {
      const newPetals: Petal[] = [];
      const petalCount = 15;

      for (let i = 0; i < petalCount; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * 100,
          y: 100 + Math.random() * 20,
          size: 20 + Math.random() * 30,
          duration: 15 + Math.random() * 20,
          delay: Math.random() * 5,
          type: Math.random() > 0.5 ? "flower" : "sprite",
        });
      }

      setPetals(newPetals);
    };

    createPetals();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          initial={{
            x: `${petal.x}vw`,
            y: `${petal.y}vh`,
            opacity: 0.6,
            rotate: 0,
          }}
          animate={{
            y: "-20vh",
            x: `${petal.x + (Math.random() - 0.5) * 10}vw`,
            opacity: [0.6, 0.8, 0.4, 0.6],
            rotate: 360,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: `${petal.size}px`,
            height: `${petal.size}px`,
          }}
        >
          {petal.type === "flower" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full"
              style={{ color: "#8b6f47", opacity: 0.4 }}
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full"
              style={{ color: "#8b6f47", opacity: 0.3 }}
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                fill="currentColor"
              />
              <circle cx="10" cy="10" r="2" fill="#d4c4a8" opacity="0.8" />
              <circle cx="14" cy="10" r="2" fill="#d4c4a8" opacity="0.8" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPetals;
