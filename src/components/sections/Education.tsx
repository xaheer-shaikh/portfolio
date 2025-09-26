"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { educationData } from "@/constant";
import { ExperienceCard } from "../Cards";
import { nasalization } from "@/app/fonts";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px",
    amount: 0.1,
  });

  // Use dedicated education data
  // educationData is already imported and contains all education entries

  return (
    <section
      ref={ref}
      id="education"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/3 right-0 w-56 h-56 bg-accent/5 rounded-full blur-3xl"
        animate={
          isInView
            ? {
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.25, 0.1],
                y: [0, -20, 0],
              }
            : { scale: 1, opacity: 0 }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
        animate={
          isInView
            ? {
                scale: [0.9, 1.2, 0.9],
                opacity: [0.1, 0.2, 0.1],
                y: [0, 15, 0],
              }
            : { scale: 0.9, opacity: 0 }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.h2
            className={`${nasalization.className} text-4xl md:text-5xl font-bold`}
            style={{ color: "hsl(120 100% 50%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Education
          </motion.h2>
          <motion.p
            className="text-xs max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ color: "hsl(270 100% 85%)" }}
          >
            My academic journey and qualifications
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent"
            style={{ height: `${educationData.length * 200}px` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <div className="space-y-12">
            {educationData.map((edu: any, index: number) => (
              <ExperienceCard
                key={`${edu.company}-${index}`}
                role={edu.role}
                year={edu.year}
                description={edu.description}
                company={edu.company}
                technologies={edu.technologies}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}