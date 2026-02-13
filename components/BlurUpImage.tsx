"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BlurUpImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const BlurUpImage = ({
  src,
  alt,
  className = "",
  placeholder,
  onError,
}: BlurUpImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  // Generate a blur placeholder if not provided - gallery aesthetic
  const blurPlaceholder =
    placeholder ||
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23F5F5F5' width='800' height='600'/%3E%3Crect fill='%23E5E5E5' x='0' y='0' width='800' height='2'/%3E%3Crect fill='%23E5E5E5' x='0' y='598' width='800' height='2'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage%3C/text%3E%3C/svg%3E`;

  return (
    <div className={`relative overflow-hidden ${className} bg-gallery-gray-light`}>
      {/* Blurred placeholder */}
      <motion.img
        src={blurPlaceholder}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Actual image */}
      <motion.img
        src={hasError ? blurPlaceholder : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default BlurUpImage;
