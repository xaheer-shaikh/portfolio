"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { nasalization } from "@/app/fonts";
import { selfData } from "@/constant";
import Link from "next/link";
import { LuMapPinned } from "react-icons/lu";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-60px",
    amount: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Enhanced Background Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "hsl(var(--primary) / 0.08)" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          isInView
            ? {
                scale: [0.8, 1.1, 1],
                opacity: [0, 0.4, 0.15, 0.3],
                x: [0, 40, -20, 0],
                y: [0, -15, 30, 0],
              }
            : {
                scale: 0.8,
                opacity: 0,
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "hsl(var(--secondary) / 0.06)" }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={
          isInView
            ? {
                scale: [0.6, 1, 0.9, 1],
                opacity: [0, 0.25, 0.35, 0.2],
                x: [0, -25, 15, 0],
                y: [0, 20, -15, 0],
              }
            : {
                scale: 0.6,
                opacity: 0,
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-x-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image Section */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.div
              className="relative group"
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: {
                  duration: 0.3,
                  type: "spring" as const,
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              {/* Enhanced Image Container with Glass Effect and B&W to Color Hover */}
              <div
                className="w-full max-w-md h-80 rounded-2xl overflow-hidden relative glass-card border-2 group/image"
                style={{ borderColor: "hsl(var(--glass-border))" }}
              >
                {/* Profile Image with B&W to Color Effect */}
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 1.1, opacity: 0 }
                  }
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={"/images/me.png"}
                    alt="Profile Picture"
                    width={384}
                    height={320}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out filter grayscale group-hover/image:grayscale-0 group-hover/image:scale-105"
                  />
                  
                  {/* Subtle overlay for enhanced effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-700" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Enhanced Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: "easeOut",
              }}
            >
              <h2
                className={`${nasalization.className} text-4xl md:text-5xl font-bold relative`}
                style={{ color: "hsl(120 100% 50%)" }}
              >
                About Me
              </h2>
            </motion.div>

            {/* Enhanced Paragraphs */}
            <motion.div
              className="space-y-6 leading-relaxed"
              style={{ color: "hsl(270 100% 85%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {selfData.about.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-xs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    x: 4,
                    color: "hsl(270 100% 90%)",
                    transition: { duration: 0.2 },
                  }}
                  style={{ color: "hsl(270 100% 85%)" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Enhanced Location */}
            <motion.div
              className="flex items-center gap-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                ease: "easeOut",
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`https://www.google.com/maps/place/${selfData.current_location.city}+${selfData.current_location.state}+${selfData.current_location.country}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 glass-card px-6 py-3 rounded-full hover:glass-intense group transition-all duration-300"
                >
                  <motion.div
                    animate={
                      isInView ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <LuMapPinned
                      className="w-4 h-4 transition-colors group-hover:scale-110"
                      style={{ color: "hsl(var(--primary))" }}
                    />
                  </motion.div>
                  <span
                    className="transition-colors"
                    style={{ color: "hsl(270 100% 85%)" }}
                  >
                    {selfData.current_location.city},{" "}
                    {selfData.current_location.state}
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
