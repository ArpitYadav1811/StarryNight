"use client";

import { motion } from "framer-motion";
import { Home, Images, Puzzle, Lock } from "lucide-react";

interface DesktopNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const DesktopNav = ({ activeSection, onNavigate }: DesktopNavProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "puzzles", label: "Puzzles", icon: Puzzle },
    { id: "vault", label: "Vault", icon: Lock },
  ];

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="p-4"
        style={{
          background: "#faf8f3",
          borderBottom: "3px solid #8b6f47",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-center items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 transition-colors font-typewriter text-sm ${
                  isActive ? "border-b-2" : ""
                }`}
                style={{
                  color: isActive ? "#5c4a37" : "#8b6f47",
                  borderBottomColor: isActive ? "#8b6f47" : "transparent",
                }}
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
};

export default DesktopNav;
