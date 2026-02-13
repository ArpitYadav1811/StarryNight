"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import BlurUpImage from "./BlurUpImage";

interface FlipCardProps {
  realImageUrl: string;
  ghibliImageUrl: string;
  caption: string;
  category?: string;
}

const FlipCard = ({
  realImageUrl,
  ghibliImageUrl,
  caption,
  category,
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side - Phone Photo */}
        <motion.div
          className="backface-hidden absolute inset-0 w-full h-full"
          style={{ transform: "rotateY(0deg)" }}
        >
          <div className="bg-[#faf8f3] p-0 relative">
            <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden">
              <BlurUpImage
                src={realImageUrl || "/placeholder-phone.jpg"}
                alt={caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error("❌ Image failed to load:", realImageUrl);
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23faf8f3' width='800' height='600'/%3E%3Ctext fill='%238b6f47' font-family='monospace' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EPhoto%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="px-4 pb-4">
              <div className="mb-3">
                <p className="text-xs font-typewriter mb-1" style={{ color: "#8b6f47" }}>{category?.toUpperCase() || "MEMORY"}</p>
                <p className="font-typewriter text-sm leading-tight" style={{ color: "#5c4a37" }}>{caption}</p>
              </div>
              <motion.button
                onClick={() => setIsFlipped(true)}
                className="w-full cardstock-button py-2 px-3 text-sm flex items-center justify-center gap-2 font-typewriter"
                style={{ color: "#5c4a37" }}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={12} />
                <span>Flip</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Back side - AI Ghibli Edit */}
        <motion.div
          className="backface-hidden absolute inset-0 w-full h-full"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="bg-[#faf8f3] p-0 relative">
            <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden">
              <BlurUpImage
                src={ghibliImageUrl || "/placeholder-ghibli.jpg"}
                alt={`${caption} - Ghibli Style`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error("❌ Ghibli image failed to load:", ghibliImageUrl);
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23faf8f3' width='800' height='600'/%3E%3Ctext fill='%238b6f47' font-family='monospace' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EGhibli Edit%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="px-4 pb-4">
              <div className="mb-3">
                <p className="text-xs font-typewriter mb-1" style={{ color: "#8b6f47" }}>{category?.toUpperCase() || "MEMORY"}</p>
                <p className="font-typewriter text-sm leading-tight" style={{ color: "#5c4a37" }}>{caption}</p>
              </div>
              <motion.button
                onClick={() => setIsFlipped(false)}
                className="w-full cardstock-button py-2 px-3 text-sm flex items-center justify-center gap-2 font-typewriter"
                style={{ color: "#5c4a37" }}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={12} />
                <span>Flip Back</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
