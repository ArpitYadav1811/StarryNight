"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingPetals from "@/components/FloatingPetals";
import WalkingCat from "@/components/WalkingCat";
import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";
import RelationshipCounter from "@/components/RelationshipCounter";
import AudioPlayer from "@/components/AudioPlayer";
import LoginScreen from "@/components/LoginScreen";
import HomeSection from "@/components/sections/HomeSection";
import GallerySection from "@/components/sections/GallerySection";
import PuzzlesSection from "@/components/sections/PuzzlesSection";
import VaultSection from "@/components/sections/VaultSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check for authentication cookie on mount
    const { hasCookie } = require("@/lib/cookies");
    if (hasCookie("valentine_authenticated")) {
      setIsAuthenticated(true);
      setShowContent(true);
    }
    setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "gallery", "puzzles", "vault"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Set your relationship start date here (ISO format)
  // October 26, 2016
  const relationshipStartDate =
    process.env.NEXT_PUBLIC_RELATIONSHIP_START_DATE || "2016-10-26T00:00:00";

  // Extract date part for login (YYYY-MM-DD)
  const anniversaryDate = relationshipStartDate.split("T")[0];

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "#d4c4a8" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ color: "#5c4a37" }}
        >
          <div className="animate-pulse font-handwritten text-3xl">💝</div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {!isAuthenticated && (
        <LoginScreen
          onLogin={handleLogin}
          anniversaryDate={anniversaryDate}
        />
      )}

      {showContent && (
        <motion.main
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative min-h-screen"
        >
          <FloatingPetals />
          <WalkingCat />
          <DesktopNav
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />
          <AudioPlayer />

          <div className="container mx-auto px-4 py-8 md:py-16 pb-24 md:pb-16 pt-20 md:pt-24">
            <div
              id="home"
              className="min-h-screen flex flex-col items-center justify-center py-8"
            >
              <RelationshipCounter startDate={relationshipStartDate} />
              <HomeSection />
            </div>

            <div
              id="gallery"
              className="min-h-screen flex items-center justify-center py-16"
            >
              <GallerySection />
            </div>

            <div
              id="puzzles"
              className="min-h-screen flex items-center justify-center py-16"
            >
              <PuzzlesSection />
            </div>

            <div
              id="vault"
              className="min-h-screen flex items-center justify-center py-16"
            >
              <VaultSection />
            </div>
          </div>

          <MobileNav
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />
        </motion.main>
      )}
    </>
  );
}
