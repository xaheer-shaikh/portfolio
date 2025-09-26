"use client";

import { useEffect, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { useTheme } from "@/context/ThemeContext";

export const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseEnter = () => {
      // Future: Add mouse interaction animations
    };
    const handleMouseLeave = () => {
      // Future: Add mouse interaction animations
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Define colors based on theme
  const primaryColors = theme === "dark" 
    ? ["#0a0014", "#4b0082", "#1a0033", "#800080", "#4b0082"] 
    : ["#1a0033", "#800080", "#0a0014", "#4b0082", "#1a0033"];
    
  const secondaryColors = theme === "dark"
    ? ["#0a0014", "#1a0033", "#800080", "#0a0014"]
    : ["#0a0014", "#0a0014", "#800080", "#0a0014"];

  return (
    <div
      ref={containerRef}
      className="top-0 fixed -z-10 h-full w-full overflow-hidden"
    >
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter
            id="glass-effect"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="0.2 0 0 0 0.1
                      0 0 0 0 0
                      0 0 0.5 0 0.3
                      0 0 0 1 0"
              result="tint"
            />
          </filter>
          <filter
            id="gooey-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={primaryColors}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60"
        colors={secondaryColors}
        speed={0.2}
      />
    </div>
  );
};