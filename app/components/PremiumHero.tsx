"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PremiumHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

      {/* Subtle Radial Gold Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A85C]/10 rounded-full blur-[120px]"
      />

      {/* Subtle Particle Texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(197, 168, 92, 0.4) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Mouse-follow Parallax Effect */}
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

      {/* Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            {/* Animated Gold Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto lg:mx-0 mb-8"
            />

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-6"
            >
              Dr. Kumar Foundation
              <br />
              <span className="gradient-gold">A Living Spiritual and Institutional Mission</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-[#AAB3CF] text-base md:text-lg lg:text-xl leading-relaxed mb-8"
            >
              Advancing the teachings, service, knowledge, and sacred responsibility inspired and guided by Dr. Kumar.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <Link
                href="/foundation"
                className="group relative px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1 w-full sm:w-auto"
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
            </motion.div>
          </div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative w-full max-w-md lg:max-w-full mx-auto lg:mx-0"
          >
            {/* Video Container with Responsive Aspect Ratio */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-[#C5A85C]/20 border border-[#C5A85C]/20">
              {/* Video with optimized attributes */}
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

              {/* Overlay Gradient for Better Text Contrast (if needed) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2340]/20 via-transparent to-transparent pointer-events-none" />

              {/* Gold Border Glow Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#C5A85C]/30 pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#C5A85C]/30 rounded-tr-3xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#C5A85C]/30 rounded-bl-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#C5A85C]/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-[#C5A85C] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
