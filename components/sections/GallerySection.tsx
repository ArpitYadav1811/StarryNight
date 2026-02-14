"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Memory } from "@/types/database";
import FlipCard from "@/components/FlipCard";
import WashiTape from "@/components/WashiTape";

const GallerySection = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: fetchError } = await supabase
          .from("memories")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) {
          console.error("❌ Supabase error:", fetchError);
          throw fetchError;
        }

        setMemories(data || []);
      } catch (err) {
        console.error("❌ Error fetching memories:", err);
        setError(`Failed to load memories: ${err instanceof Error ? err.message : "Unknown error"}`);
        // Don't set fallback data - show error instead
        setMemories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-handwritten text-5xl md:text-7xl text-center mb-16 font-bold"
          style={{ color: "#5c4a37" }}
        >
          Our Memories
        </motion.h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="font-typewriter" style={{ color: "#8b6f47" }}>Loading memories...</div>
        </div>
      </div>
    );
  }

  // Generate random positions for scattered layout
  const getRandomPosition = (index: number, total: number) => {
    const positions = [
      { left: "5%", top: "10%", rotate: -1.5 },
      { left: "45%", top: "8%", rotate: 2 },
      { left: "15%", top: "35%", rotate: -2.5 },
      { left: "60%", top: "30%", rotate: 1.8 },
      { left: "8%", top: "60%", rotate: -1.2 },
      { left: "50%", top: "55%", rotate: 2.3 },
      { left: "25%", top: "80%", rotate: -1.8 },
      { left: "65%", top: "75%", rotate: 1.5 },
    ];
    return positions[index % positions.length] || { left: `${(index * 20) % 60}%`, top: `${(index * 25) % 70}%`, rotate: (index % 5) - 2 };
  };

  const washiColors: Array<"pink" | "blue" | "yellow" | "green"> = ["pink", "blue", "yellow", "green"];

  return (
    <div className="w-full relative min-h-screen py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-handwritten text-5xl md:text-7xl text-center mb-16 font-bold"
        style={{ color: "#5c4a37" }}
      >
        Our Memories
      </motion.h2>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="photo-card p-4 mb-6 text-center font-typewriter max-w-md mx-auto"
          style={{ color: "#8b6f47", background: "#faf8f3", border: "2px solid #8b6f47" }}
        >
          <p className="font-bold mb-2">⚠️ {error}</p>
          <p className="text-xs mt-2">
            Check browser console (F12) for details. Make sure:
            <br />1. Data is in Supabase database
            <br />2. Supabase credentials are set in .env.local
            <br />3. RLS policies allow public read access
          </p>
        </motion.div>
      )}

      {memories.length === 0 ? (
        <div className="text-center py-12 font-typewriter" style={{ color: "#8b6f47" }}>
          <p className="text-sm">No memories yet. Add some to your database!</p>
        </div>
      ) : (
        <div className="relative w-full" style={{ minHeight: "2000px" }}>
          {memories.map((memory, index) => {
            const position = getRandomPosition(index, memories.length);
            return (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, scale: 0.8, rotate: position.rotate }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="absolute"
                style={{
                  left: position.left,
                  top: position.top,
                  width: "300px",
                  maxWidth: "90%",
                  transform: `rotate(${position.rotate}deg)`,
                }}
              >
                <div className="photo-card torn-edge p-4 relative">
                  <WashiTape 
                    color={washiColors[index % washiColors.length]}
                    position={index % 2 === 0 ? "top-left" : "top-right"}
                    rotation={position.rotate + (index % 2 === 0 ? -8 : 8)}
                  />
                  <FlipCard
                    realImageUrl={memory.real_image_url}
                    ghibliImageUrl={memory.ghibli_image_url}
                    caption={memory.caption || "Beautiful Memory"}
                    category={memory.category || "adventure"}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GallerySection;
