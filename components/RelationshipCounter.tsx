"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

interface RelationshipCounterProps {
  startDate: string; // ISO date string, e.g., "2020-02-14T00:00:00"
}

const RelationshipCounter = ({ startDate }: RelationshipCounterProps) => {
  const [time, setTime] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = now - start;

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ years, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const timeUnits = [
    { label: "Year", value: time.years, plural: "Years" },
    { label: "Day", value: time.days, plural: "Days" },
    { label: "Hour", value: time.hours, plural: "Hours" },
    { label: "Minute", value: time.minutes, plural: "Minutes" },
    { label: "Second", value: time.seconds, plural: "Seconds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto px-4 mb-8"
    >
      <div
        className="photo-card py-12 px-8 relative mx-auto max-w-4xl"
        style={{
          background: "#faf8f3",
          border: "2px solid #8b6f47",
          transform: "rotate(0.5deg)",
        }}
      >
        <div className="text-center">
          <h2 className="font-handwritten text-4xl md:text-5xl mb-12" style={{ color: "#5c4a37" }}>
            Together For
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-3 font-typewriter" style={{ color: "#5c4a37" }}>
                  {unit.value}
                </div>
                <div className="h-0.5 w-12 mx-auto mb-2" style={{ background: "#8b6f47" }}></div>
                <div className="text-xs md:text-sm font-typewriter uppercase tracking-wider" style={{ color: "#8b6f47" }}>
                  {unit.value === 1 ? unit.label : unit.plural}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RelationshipCounter;
