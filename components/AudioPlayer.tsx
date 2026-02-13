"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioUrl?: string;
}

const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Default lo-fi Ghibli track - you can replace this with your own
  const defaultAudioUrl =
    audioUrl ||
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Replace with actual lo-fi Ghibli track

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => {
        console.error("Error playing audio:", err);
      });
      setIsPlaying(true);
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={defaultAudioUrl}
        loop
        preload="auto"
        muted={isMuted}
      />
      <motion.div
        className="fixed bottom-24 md:bottom-6 right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="flex flex-col gap-2">
          <motion.button
            onClick={toggleMute}
            className="cardstock-button p-3 transition-colors"
            style={{ color: "#5c4a37" }}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            <AnimatePresence mode="wait">
              {isMuted ? (
                <motion.div
                  key="muted"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                >
                  <VolumeX size={20} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="unmuted"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                >
                  <Volume2 size={20} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          {isPlaying && !isMuted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="cardstock-button px-3 py-1 text-xs text-center font-typewriter"
              style={{ color: "#5c4a37" }}
            >
              ♫ Playing
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default AudioPlayer;
