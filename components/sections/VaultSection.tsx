"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVault } from "@/hooks/useVault";
import Typewriter from "@/components/Typewriter";

const VaultSection = () => {
  const { messages, loading, error } = useVault();
  const [openedMessages, setOpenedMessages] = useState<Set<string>>(new Set());

  const handleOpenMessage = (messageId: string) => {
    setOpenedMessages((prev) => new Set([...prev, messageId]));
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
          Message Vault
        </motion.h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="font-typewriter" style={{ color: "#8b6f47" }}>Loading messages...</div>
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
        Message Vault
      </motion.h2>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="photo-card p-4 mb-6 text-center font-typewriter max-w-md mx-auto"
          style={{ color: "#8b6f47" }}
        >
          {error}
        </motion.div>
      )}

      {messages.length === 0 ? (
        <div className="text-center py-12 font-typewriter" style={{ color: "#8b6f47" }}>
          <p className="text-sm">No messages yet. Add some to your database!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {messages.map((message, index) => {
            const isOpened = openedMessages.has(message.id);

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative max-w-md mx-auto"
                style={{ transform: `rotate(${(index % 3) - 1}deg)` }}
              >
                {/* Envelope */}
                {!isOpened ? (
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="photo-card p-6 cursor-pointer relative"
                      style={{
                        background: "linear-gradient(135deg, #d4c4a8 0%, #c4b498 100%)",
                        border: "2px solid #8b6f47",
                      }}
                      onClick={() => handleOpenMessage(message.id)}
                    >
                      {/* Envelope flap */}
                      <div
                        className="absolute top-0 left-0 right-0 h-16"
                        style={{
                          background: "linear-gradient(135deg, #c4b498 0%, #b4a488 100%)",
                          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                          borderTop: "2px solid #8b6f47",
                        }}
                      />
                      <div className="mt-12 text-center">
                        <div className="text-4xl mb-3">✉️</div>
                        <h3 className="font-typewriter text-lg mb-2" style={{ color: "#5c4a37" }}>
                          Open When...
                        </h3>
                        {message.unlock_date && (
                          <p className="text-xs font-typewriter mb-4" style={{ color: "#8b6f47" }}>
                            {new Date(message.unlock_date).toLocaleDateString()}
                          </p>
                        )}
                        <div
                          className="cardstock-button inline-block px-6 py-2 text-sm font-typewriter"
                          style={{ color: "#5c4a37" }}
                        >
                          {message.mood_tag}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: -50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="photo-card p-8 relative"
                      style={{
                        background: "#faf8f3",
                        border: "1px solid #8b6f47",
                      }}
                    >
                      {/* Letter content */}
                      <div className="text-center mb-6">
                        <h3 className="font-handwritten text-2xl mb-4" style={{ color: "#5c4a37" }}>
                          Open When {message.mood_tag}
                        </h3>
                        <div className="h-px w-24 bg-[#8b6f47] mx-auto mb-6"></div>
                      </div>
                      <div className="font-typewriter text-sm leading-relaxed" style={{ color: "#5c4a37" }}>
                        <Typewriter text={message.message_content} speed={30} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VaultSection;

