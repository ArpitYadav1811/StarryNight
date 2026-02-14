"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Heart } from "lucide-react";
import { setCookie, hasCookie } from "@/lib/cookies";

interface LoginScreenProps {
  onLogin: () => void;
  anniversaryDate: string; // ISO date string, e.g., "2020-02-14"
}

const LoginScreen = ({ onLogin, anniversaryDate }: LoginScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // This component only shows if not authenticated, so just set checking to false
    setIsChecking(false);
  }, []);

  const formatDateForPassword = (dateString: string): string[] => {
    // Parse date string (YYYY-MM-DD format)
    const [year, month, day] = dateString.split("-").map(Number);
    
    // Format as YYYY-MM-DD or MM/DD/YYYY or DD-MM-YYYY
    // Try multiple formats with proper padding
    const monthStr = String(month).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const yearStr = String(year);
    
    const formats = [
      `${yearStr}-${monthStr}-${dayStr}`, // YYYY-MM-DD
      `${monthStr}/${dayStr}/${yearStr}`, // MM/DD/YYYY
      `${dayStr}-${monthStr}-${yearStr}`, // DD-MM-YYYY
      `${monthStr}-${dayStr}-${yearStr}`, // MM-DD-YYYY
      `${dayStr}/${monthStr}/${yearStr}`, // DD/MM/YYYY
      `${yearStr}/${monthStr}/${dayStr}`, // YYYY/MM/DD
    ];
    return formats;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Parse anniversary date (should be in YYYY-MM-DD format)
    const validFormats = formatDateForPassword(anniversaryDate);

    // Normalize input (remove spaces, handle different separators)
    // Also normalize separators: convert / and - to a standard format for comparison
    const normalizeInput = (input: string): string => {
      return input
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "") // Remove all spaces
        .replace(/[\/\-\.]/g, "-"); // Normalize separators (/, -, .) to dash
    };

    const normalizedInput = normalizeInput(password);
    const normalizedFormats = validFormats.map((f) => normalizeInput(f));
    
    // Debug in development (remove in production if needed)
    if (process.env.NODE_ENV === 'development') {
      console.log('Anniversary date:', anniversaryDate);
      console.log('User input:', password);
      console.log('Normalized input:', normalizedInput);
      console.log('Valid formats:', normalizedFormats);
    }

    // Check if password matches any valid format
    const isValid = normalizedFormats.some((format: string) => normalizedInput === format);

    if (isValid) {
      // Save authentication cookie
      setCookie("valentine_authenticated", "true", 365);

      // Trigger zoom-in animation
      setIsZooming(true);

      // Wait for animation, then call onLogin
      setTimeout(() => {
        onLogin();
      }, 800);
    } else {
      setError("Incorrect date. Try again with our anniversary date.");
      setPassword("");
    }
  };

  if (isChecking) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "#d4c4a8" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ color: "#5c4a37" }}
        >
          <Heart className="animate-pulse" size={48} />
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={isZooming ? { scale: 10, opacity: 0 } : { scale: 1, opacity: 1 }}
        exit={{ scale: 10, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: "#d4c4a8" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md px-6"
        >
          <div
            className="photo-card p-10 text-center relative"
            style={{
              background: "#faf8f3",
              border: "2px solid #8b6f47",
              transform: "rotate(-1deg)",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="mb-6"
            >
              <Lock
                size={48}
                className="mx-auto mb-6"
                strokeWidth={1.5}
                style={{ color: "#5c4a37" }}
              />
              <h1 className="font-handwritten text-5xl md:text-6xl mb-3 font-bold" style={{ color: "#5c4a37" }}>
                Welcome
              </h1>
              <p className="font-typewriter text-sm" style={{ color: "#8b6f47" }}>
                Enter our anniversary date to continue
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="YYYY-MM-DD or MM/DD/YYYY"
                  className="w-full px-4 py-3 text-sm font-typewriter focus:outline-none"
                  style={{
                    background: "#faf8f3",
                    border: "2px solid #8b6f47",
                    color: "#5c4a37",
                  }}
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-700 text-xs mt-2 font-typewriter"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                className="cardstock-button w-full py-3 px-6 text-sm font-typewriter"
                style={{ color: "#5c4a37" }}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
              >
                Enter
              </motion.button>
            </form>

            <p className="text-xs mt-6 font-typewriter" style={{ color: "#8b6f47" }}>
              Try formats like: YYYY-MM-DD, MM/DD/YYYY, or DD-MM-YYYY
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginScreen;
