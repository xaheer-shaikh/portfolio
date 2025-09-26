"use client";

import { Fragment, useState, useEffect } from "react";

import { Navbar, Footer } from "@/components/common";
import {
  Hero,
  About,
  Skills,
  Experience,
  Education,
  Projects,
  Certifications,
  Contact,
} from "@/components/sections";
import { PreLoader, Background } from "@/components/common";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  if (loading) return <PreLoader />;

  return (
    <div className="min-h-screen relative">
      <Background />
      <Fragment>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </Fragment>

      {/* Content */}
    </div>
  );
}
