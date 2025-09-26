"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { selfData } from "@/constant";

import { quentine, mono, nasalization } from "@/app/fonts";

export const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px",
    amount: 0.1,
  });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-start px-6 relative overflow-hidden"
    >
      {/* Enhanced floating orb */}
      <motion.div
        className="absolute bottom-20 left-20 w-20 h-20 rounded-full blur-xl"
        style={{ backgroundColor: "hsl(var(--secondary) / 0.15)" }}
        animate={
          isInView
            ? {
                y: [15, -15, 15],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }
            : {
                y: 15,
                rotate: 0,
                scale: 1,
              }
        }
        transition={{
          duration: 8,
          repeat: isInView ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Additional ambient elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full blur-lg"
        style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
        animate={
          isInView
            ? {
                y: [0, -10, 0],
                x: [0, 5, 0],
                opacity: [0.3, 0.6, 0.3],
              }
            : { y: 0, x: 0, opacity: 0 }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="max-w-full sm:max-w-7xl mx-auto w-full relative z-10 overflow-x-hidden">
        <motion.div
          className="max-w-4xl space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="space-y-6">
            <motion.h1
              className={`${nasalization.className} text-5xl md:text-7xl lg:text-8xl font-bold`}
              style={{ color: "hsl(120 100% 50%)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              {selfData.name}
            </motion.h1>

            <motion.p
              className={`${mono.className} text-lg md:text-xl`}
              style={{ color: "hsl(330 100% 50%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {selfData.roles[0]}
            </motion.p>

            <motion.p
              className="text-base md:text-lg max-w-2xl leading-relaxed"
              style={{ color: "hsl(270 100% 85%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              {selfData.bio}
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="relative group overflow-hidden btn-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/resume">
                  {/* Enhanced shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30"
                    style={{ background: "var(--glass-shimmer)" }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <span className={`relative z-10 font-medium ${nasalization.className} font-bold`}>View Resume</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};