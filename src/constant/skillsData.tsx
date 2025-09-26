import React from "react";
import {
  FaCss3,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaLaptopCode,
  FaMobile,
  FaPython,
  FaReact,
  FaGaugeHigh,
  FaTruckMoving,
  FaWheelchair,
  FaBookOpen,
  FaCodeBranch,
  FaRobot,
  FaBootstrap,
  FaSearchengin,
  FaSquareJs,
} from "react-icons/fa6";

import {
  SiExpress,
  SiFirebase,
  SiFramer,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiPostman,
  SiReplit,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import { GiBrain } from "react-icons/gi";
import { MdApi } from "react-icons/md";
import { TbBrandCpp } from "react-icons/tb";
import { GrOracle } from "react-icons/gr";

interface LogoProps {
  title: string;
  logoComponent: React.FC;
  color?: string;
}

interface SkillsDataProps {
  title: string;
  data: LogoProps[];
}

export const skillsData: SkillsDataProps[] = [
  {
    title: "Languages & Databases",
    data: [
      { title: "C/C++", logoComponent: TbBrandCpp, color: "#00599C" },
      { title: "HTML5", logoComponent: FaHtml5, color: "#E34F26" },
      { title: "CSS3", logoComponent: FaCss3, color: "#1572B6" },
      { title: "Java", logoComponent: FaJava, color: "#007396" },
      { title: "JavaScript", logoComponent: FaSquareJs, color: "#F7DF1E" },
      { title: "TypeScript", logoComponent: SiTypescript, color: "#3178C6" },
      { title: "Python", logoComponent: FaPython, color: "#3776AB" },
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
      { title: "Oracle SQL", logoComponent: GrOracle, color: "#F80000" },
      { title: "Firebase Firestore", logoComponent: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    data: [
      { title: "Bootstrap", logoComponent: FaBootstrap, color: "#7952B3" },
      { title: "Express.js", logoComponent: SiExpress, color: "#d4d4d8" },
      { title: "Framer Motion", logoComponent: SiFramer, color: "#0055FF" },
      { title: "Next.js", logoComponent: SiNextdotjs, color: "#d4d4d8" },
      { title: "React", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
      { title: "Flutter", logoComponent: FaMobile, color: "#02569B" },
    ],
  },
  {
    title: "Dev Tools & Platforms",
    data: [
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", logoComponent: FaGithub, color: "#d4d4d8" },
      { title: "Netlify", logoComponent: SiNetlify, color: "#00C7B7" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "Replit", logoComponent: SiReplit, color: "#667881" },
      { title: "Vercel", logoComponent: SiVercel, color: "#d4d4d8" },
      { title: "Docker", logoComponent: FaLaptopCode, color: "#0db7ed" },
    ],
  },
  {
    title: "Concepts & Technologies",
    data: [
      { title: "API Design & Integration", logoComponent: MdApi, color: "#5C2D91" },
      { title: "Accessibility", logoComponent: FaWheelchair, color: "#1E88E5" },
      { title: "Machine Learning & AI", logoComponent: GiBrain, color: "#3F51B5" },
      { title: "Deep Learning", logoComponent: GiBrain, color: "#FF9800" },
      { title: "BERT / LSTM Models", logoComponent: FaBookOpen, color: "#2196F3" },
      { title: "CI/CD", logoComponent: FaTruckMoving, color: "#0A66C2" },
      { title: "Performance Optimization", logoComponent: FaGaugeHigh, color: "#388E3C" },
      { title: "Responsive Design", logoComponent: FaMobile, color: "#009688" },
      { title: "SEO Optimization", logoComponent: FaSearchengin, color: "#FF5722" },
      { title: "Software Development Practices", logoComponent: FaLaptopCode, color: "#607D8B" },
      { title: "Test Automation", logoComponent: FaRobot, color: "#9C27B0" },
      { title: "Version Control", logoComponent: FaCodeBranch, color: "#4CAF50" },
    ],
  },
];
