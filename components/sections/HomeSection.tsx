"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";

const HomeSection = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-handwritten text-6xl md:text-8xl mb-4 font-bold" style={{ color: "#5c4a37" }}>
          Happy Valentine&apos;s Day
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg mb-16 font-typewriter"
          style={{ color: "#8b6f47" }}
        >
          A magical journey awaits...
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
        <motion.div
          initial={{ opacity: 0, rotate: -2 }}
          animate={{ opacity: 1, rotate: -1 }}
          transition={{ delay: 0.3 }}
          className="photo-card p-8 relative"
          style={{
            background: "#faf8f3",
            border: "2px solid #8b6f47",
            transform: "rotate(-1deg)",
          }}
        >
          <div className="aspect-[4/3] mb-6 flex items-center justify-center" style={{ background: "#e8ddd0" }}>
            <div className="text-center">
              <div className="text-6xl mb-4">💝</div>
              <div className="h-1 w-16 mx-auto" style={{ background: "#8b6f47" }}></div>
            </div>
          </div>
          <h2 className="font-handwritten text-3xl mb-4" style={{ color: "#5c4a37" }}>
            Love & Magic
          </h2>
          <p className="font-typewriter text-sm leading-relaxed" style={{ color: "#8b6f47" }}>
            Hello love,Happiest Valentines, Btw Its always Valentines with You.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 2 }}
          animate={{ opacity: 1, rotate: 1 }}
          transition={{ delay: 0.4 }}
          className="photo-card p-8 relative"
          style={{
            background: "#faf8f3",
            border: "2px solid #8b6f47",
            transform: "rotate(1deg)",
          }}
        >
          <div className="aspect-[4/3] mb-6 flex items-center justify-center" style={{ background: "#e8ddd0" }}>
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <div className="h-1 w-16 mx-auto" style={{ background: "#8b6f47" }}></div>
            </div>
          </div>
          <h2 className="font-handwritten text-3xl mb-4" style={{ color: "#5c4a37" }}>
            Memories
          </h2>
          <p className="font-typewriter text-sm leading-relaxed" style={{ color: "#8b6f47" }}>
            Is it a Cute Ruchi Moment??or Sakshi Moment??or Both??
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeSection;
