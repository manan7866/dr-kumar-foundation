"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function PremiumHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A85C]/10 rounded-full blur-[120px]"
        style={{
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(197, 168, 92, 0.4) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {!isMobile && (
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#C5A85C]/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#C5A85C]/5 rounded-full blur-[80px]" />
        </motion.div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="sm:text-center lg:text-left">
            <AnimatedSection animation="fade-in" delay={0.3}>
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent sm:mx-auto xl:mx-0 lg:mx-0 mb-8" style={{ width: "6rem" }} />
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.5}>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-6">
                Dr. Kumar Foundation USA
                <br />
                <span className="gradient-gold">A Living Spiritual and Institutional Mission</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.8}>
              <p className="text-[#AAB3CF] text-base md:text-lg lg:text-xl leading-relaxed mb-8">
                The official institutional expression of Dr. Ghulam Mohammad Kumar's continuing mission in knowledge, service, and ethical stewardship.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={1.1}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link
                  href="/foundation"
                  className="group relative px-8 py-4 text-center bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1 w-full sm:w-auto"
                >
                  <span className="relative z-10">Explore the Mission</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
                </Link>

                <Link
                  href="/life-and-work"
                  className="group px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C] hover:-translate-y-1 w-full sm:w-auto text-center"
                >
                  Discover His Life
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-up" delay={0.6}>
            <div className="relative w-full max-w-md lg:max-w-full mx-auto lg:mx-0">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-[#C5A85C]/20 border border-[#C5A85C]/20">
                <video
                  src="/hero-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/hero-video-poster.jpg"
                >
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2340]/20 via-transparent to-transparent pointer-events-none" />

                <div className="absolute inset-0 rounded-2xl border-2 border-[#C5A85C]/30 pointer-events-none" />
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#C5A85C]/30 rounded-tr-3xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#C5A85C]/30 rounded-bl-3xl" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      <AnimatedSection animation="fade-in" delay={2}>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <div
            className="w-6 h-10 border-2 border-[#C5A85C]/30 rounded-full flex justify-center pt-2"
            style={{ animation: "float 2s ease-in-out infinite" }}
          >
            <div
              className="w-1.5 h-1.5 bg-[#C5A85C] rounded-full"
              style={{ animation: "fadeIn 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
