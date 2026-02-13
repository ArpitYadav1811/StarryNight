"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { triggerConfetti } from "@/lib/confetti";
import { Puzzle } from "@/types/database";
import GlassCard from "@/components/GlassCard";
import BlurUpImage from "@/components/BlurUpImage";

const PuzzlesSection = () => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<string>>(new Set());
  const [shakeInputs, setShakeInputs] = useState<Set<string>>(new Set());

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("puzzles")
          .select("*")
          .order("step_number", { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        setPuzzles(data || []);
      } catch (err) {
        console.error("Error fetching puzzles:", err);
        setError("Failed to load puzzles. Using sample data.");
        // Fallback to sample data if Supabase is not configured
        setPuzzles([
          {
            id: "1",
            step_number: 1,
            question: "What grows stronger with time?",
            correct_answer: "love",
            reward_image_url: "",
          },
          {
            id: "2",
            step_number: 2,
            question: "Invisible but always felt?",
            correct_answer: "love",
            reward_image_url: "",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPuzzles();
  }, []);

  const handleAnswerChange = (puzzleId: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [puzzleId]: answer }));
  };

  const handleSubmit = (puzzle: Puzzle) => {
    const userAnswer = userAnswers[puzzle.id] || "";
    if (!userAnswer.trim()) return;

    // Compare answers (case-insensitive, trimmed)
    const isCorrect = userAnswer.trim().toLowerCase() === puzzle.correct_answer.trim().toLowerCase();

    if (isCorrect) {
      setSolvedPuzzles((prev) => new Set([...prev, puzzle.id]));
      triggerConfetti();
      
      // Move to next puzzle after a short delay
      setTimeout(() => {
        if (currentPuzzleIndex < puzzles.length - 1) {
          setCurrentPuzzleIndex(currentPuzzleIndex + 1);
          // Clear the answer for the next puzzle
          setUserAnswers((prev) => {
            const next = { ...prev };
            delete next[puzzle.id];
            return next;
          });
        }
      }, 2000);
    } else {
      // Trigger shake animation
      setShakeInputs((prev) => new Set([...prev, puzzle.id]));
      setTimeout(() => {
        setShakeInputs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(puzzle.id);
          return newSet;
        });
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, puzzle: Puzzle) => {
    if (e.key === "Enter") {
      handleSubmit(puzzle);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-handwritten text-5xl md:text-7xl text-center mb-16 font-bold"
          style={{ color: "#5c4a37" }}
        >
          Puzzles
        </motion.h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="font-typewriter" style={{ color: "#8b6f47" }}>Loading puzzles...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-handwritten text-5xl md:text-7xl text-center mb-16 font-bold"
        style={{ color: "#5c4a37" }}
      >
        Puzzles
      </motion.h2>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-4 mb-6 text-center text-gallery-black-light font-sans"
        >
          {error}
        </motion.div>
      )}

      {puzzles.length === 0 ? (
        <div className="text-center text-gallery-black-light py-12 font-sans">
          <p className="text-sm">No puzzles yet. Add some to your database!</p>
        </div>
      ) : (
        <div className="relative w-full max-w-2xl mx-auto min-h-[500px]">
          <AnimatePresence mode="wait">
            {puzzles[currentPuzzleIndex] && (() => {
              const puzzle = puzzles[currentPuzzleIndex];
              const isSolved = solvedPuzzles.has(puzzle.id);
              const isShaking = shakeInputs.has(puzzle.id);

              return (
                <motion.div
                  key={puzzle.id}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div
                    className="photo-card p-8 text-center relative"
                    style={{
                      background: "#faf8f3",
                      border: "2px solid #8b6f47",
                      transform: `rotate(${(currentPuzzleIndex % 3) - 1}deg)`,
                    }}
                  >
                    <div className="text-center">
                      <h3 className="font-typewriter text-xl mb-4" style={{ color: "#5c4a37" }}>
                        Puzzle {puzzle.step_number || currentPuzzleIndex + 1}
                      </h3>
                      <p className="font-typewriter mb-8 text-base" style={{ color: "#8b6f47" }}>
                        {puzzle.question}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="mb-8">
                        <div className="flex justify-center gap-2">
                          {puzzles.map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-1 transition-all ${
                                idx === currentPuzzleIndex
                                  ? "w-8 bg-gallery-black-dark"
                                  : idx < currentPuzzleIndex
                                  ? "w-1 bg-gallery-gray-darker"
                                  : "w-1 bg-gallery-gray-DEFAULT"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gallery-black-light mt-3 font-sans">
                          {currentPuzzleIndex + 1} of {puzzles.length}
                        </p>
                      </div>

                    {!isSolved ? (
                      <div className="space-y-4">
                        <motion.input
                          type="text"
                          value={userAnswers[puzzle.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(puzzle.id, e.target.value)
                          }
                          onKeyPress={(e) => handleKeyPress(e, puzzle)}
                          placeholder="Type your answer..."
                          className={`w-full px-4 py-3 text-sm font-typewriter ${
                            isShaking ? "shake" : ""
                          }`}
                          style={{
                            background: "#faf8f3",
                            border: "2px solid #8b6f47",
                            color: "#5c4a37",
                          }}
                          placeholder="Type your answer..."
                          animate={
                            isShaking
                              ? {
                                  x: [-10, 10, -10, 10, -10, 10, 0],
                                }
                              : {}
                          }
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.button
                          onClick={() => handleSubmit(puzzle)}
                          className="cardstock-button w-full px-6 py-4 text-sm font-typewriter flex items-center justify-center gap-3 mx-auto"
                          style={{ color: "#5c4a37", maxWidth: "200px" }}
                          whileHover={{ opacity: 0.9 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-2xl">🔴</span>
                          <span>Seal & Submit</span>
                        </motion.button>
                      </div>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, type: "spring" }}
                          className="mt-6"
                        >
                          <p className="font-handwritten text-2xl mb-6" style={{ color: "#5c4a37" }}>
                            Correct! ✨
                          </p>
                          {puzzle.reward_image_url ? (
                            <div className="mt-6 overflow-hidden aspect-[4/3] bg-gallery-gray-light">
                              <BlurUpImage
                                src={puzzle.reward_image_url}
                                alt="Reward Image"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23F5F5F5' width='800' height='600'/%3E%3Crect fill='%23E5E5E5' x='0' y='0' width='800' height='2'/%3E%3Crect fill='%23E5E5E5' x='0' y='598' width='800' height='2'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EReward Artwork%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="glass p-12 mt-6 border border-gallery-gray-DEFAULT aspect-[4/3] flex items-center justify-center bg-gallery-gray-light">
                              <p className="text-gallery-black-light font-sans text-sm text-center">
                                Beautiful artwork would appear here
                              </p>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    )}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default PuzzlesSection;
