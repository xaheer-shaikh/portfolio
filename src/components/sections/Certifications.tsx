"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { nasalization } from "@/app/fonts";

export const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px",
    amount: 0.1,
  });

  // Certification data
  const certificationsData = [
    {
      category: "Certifications",
      items: [
        "Certified Ethical Hacker (CEH) – Currently enrolled",
        "HackerRank / LeetCode Certificates – Problem Solving, Data Structures & Algorithms",
        "Flutter & Dart Development Course – Completed online projects and apps",
        "AI & Machine Learning Workshops – Hugging Face, OpenAI API, LangChain"
      ]
    },
    {
      category: "Achievements",
      items: [
        "Developed Google Gemini Clone as a capstone project",
        "Built ZenTrade and ZenMusic apps with full-stack functionality",
        "Successfully published multiple projects on GitHub with active usage and contributions",
        "Recognized as a top performer in college-level programming challenges"
      ]
    },
    {
      category: "Volunteer Work",
      items: [
        "Assisted in coding workshops for students at local schools and colleges",
        "Volunteered for AIKTC Fashion Society as a Graphic Designer for events",
        "Participated in community tech events and hackathons"
      ]
    },
    {
      category: "Research",
      items: [
        "Participated in AI-related research projects involving LLMs and test-case generation",
        "Explored machine learning algorithms for automating software testing and productivity tools"
      ]
    },
    {
      category: "Publications",
      items: [
        "Maintained a personal blog / GitHub documentation for projects: tutorials, walkthroughs, and project demos",
        "Technical writing on AI integrations and full-stack project development"
      ]
    },
    {
      category: "Languages",
      items: [
        "Programming Languages: C, C++, Java, Python, JavaScript, TypeScript, Dart (Flutter), SQL, Rust, Go",
        "Human Languages: English (Fluent), Hindi (Native), German (Intermediate)"
      ]
    },
    {
      category: "Interests",
      items: [
        "Software development, AI & ML, Chess, Web & Mobile App Design",
        "Exploring new technologies, creating open-source projects, problem solving, and trading"
      ]
    },
    {
      category: "Courses",
      items: [
        "Full-stack development with React, Node.js, Next.js",
        "AI & Machine Learning integration using OpenAI API, Hugging Face, LangChain",
        "Ethical hacking and cybersecurity fundamentals (CEH)",
        "Mobile app development with Flutter & Dart"
      ]
    }
  ];

  return (
    <section
      ref={ref}
      id="certifications"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={
          isInView
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 20, 0],
              }
            : { scale: 1, opacity: 0 }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"
        animate={
          isInView
            ? {
                scale: [0.8, 1.1, 0.8],
                opacity: [0.1, 0.15, 0.1],
                x: [0, -15, 0],
              }
            : { scale: 0.8, opacity: 0 }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2
            className={`${nasalization.className} text-4xl md:text-5xl font-bold`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "hsl(120 100% 50%)" }}
          >
            Certifications & More
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {certificationsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="glass-card rounded-2xl p-6 border"
              style={{
                background: "hsl(var(--glass-bg))",
                borderColor: "hsl(var(--glass-border))",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.1 }}
              whileHover={{
                y: -5,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
            >
              <h3
                className={`${nasalization.className} text-2xl font-bold mb-4`}
                style={{ color: "hsl(270 100% 90%)" }}
              >
                {category.category}
              </h3>
              
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-start text-sm"
                    style={{ color: "hsl(270 100% 85%)" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.5 + categoryIndex * 0.1 + itemIndex * 0.05 }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: "hsl(var(--accent))" }}
                    />
                    <span className="font-inter leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};