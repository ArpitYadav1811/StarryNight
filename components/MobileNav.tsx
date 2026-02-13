"use client";

import { motion } from "framer-motion";
import { Home, Images, Puzzle, Lock } from "lucide-react";

interface MobileNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MobileNav = ({ activeSection, onNavigate }: MobileNavProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "puzzles", label: "Puzzles", icon: Puzzle },
    { id: "vault", label: "Vault", icon: Lock },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <motion.div
        className="p-3"
        style={{
          background: "#faf8f3",
          borderTop: "3px solid #8b6f47",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.2)",
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center p-2 transition-colors font-typewriter ${
                  isActive ? "" : ""
                }`}
                style={{
                  color: isActive ? "#5c4a37" : "#8b6f47",
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ opacity: 0.7 }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-xs mt-1">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
};

export default MobileNav;
