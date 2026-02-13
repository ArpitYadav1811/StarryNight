"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const Typewriter = ({ text, speed = 30, onComplete }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <div className="min-h-[100px]">
      <AnimatePresence mode="wait">
        <motion.p
          key={displayedText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="leading-relaxed whitespace-pre-wrap font-typewriter text-sm"
          style={{ color: "#5c4a37" }}
        >
          {displayedText}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-4 ml-1"
              style={{ background: "#8b6f47" }}
            />
          )}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default Typewriter;
