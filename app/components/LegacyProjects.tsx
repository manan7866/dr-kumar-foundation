"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  imageGradient: string;
  href: string;
  delay: number;
}

function ProjectCard({
  title,
  description,
  imageGradient,
  href,
  delay,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
    >
      {/* Background Image Placeholder with Gradient */}
      <div className={`absolute inset-0 ${imageGradient} transition-transform duration-700 group-hover:scale-105`} />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C2340] via-[#1C2340]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Gold Line Accent */}
        <div className="absolute top-8 left-8 right-8 h-[1px] bg-gradient-to-r from-[#C5A85C]/0 via-[#C5A85C]/40 to-[#C5A85C]/0 group-hover:via-[#C5A85C]/60 transition-colors duration-500" />

        {/* Icon */}
        <div className="absolute top-8 right-8 w-10 h-10 border border-[#C5A85C]/30 rounded-full flex items-center justify-center group-hover:border-[#C5A85C]/60 group-hover:bg-[#C5A85C]/10 transition-all duration-500">
          <svg
            className="w-4 h-4 text-[#C5A85C] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-[#C5A85C] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#AAB3CF] text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
          {description}
        </p>

        {/* Link */}
        <div className="flex items-center text-[#C5A85C] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span>Learn More</span>
          <svg
            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Border Glow on Hover */}
      <div className="absolute inset-0 border border-[#C5A85C]/0 group-hover:border-[#C5A85C]/30 rounded-2xl transition-colors duration-500" />
    </motion.div>
  );
}

export default function LegacyProjects() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Healing Initiatives",
      description: "Supporting holistic wellness programs that integrate traditional wisdom with contemporary understanding of health and wellbeing.",
      imageGradient: "bg-gradient-to-br from-[#232B52] via-[#1C2340] to-[#151A30]",
      href: "/legacy-projects/healing",
    },
    {
      title: "Environmental & Water Protection",
      description: "Preserving natural resources through community-led conservation efforts and sustainable practices rooted in ethical responsibility.",
      imageGradient: "bg-gradient-to-br from-[#1C2340] via-[#232B52] to-[#151A30]",
      href: "/legacy-projects/environment",
    },
    {
      title: "Youth & Cultural Engagement",
      description: "Nurturing the next generation through educational programs that emphasize ethical development and cultural continuity.",
      imageGradient: "bg-gradient-to-br from-[#151A30] via-[#1C2340] to-[#232B52]",
      href: "/legacy-projects/youth",
    },
    {
      title: "Sufi Music & Spiritual Media",
      description: "Preservation and dissemination of devotional and philosophical musical traditions through responsible digital media production.",
      imageGradient: "bg-gradient-to-br from-[#232B52] via-[#151A30] to-[#1C2340]",
      href: "/legacy-projects/sufi-music",
    },
    {
      title: "Sufi Commerce & Ethical Craft",
      description: "Structured economic pathways supporting heritage crafts through transparency, traceability, and digital integration.",
      imageGradient: "bg-gradient-to-br from-[#1C2340] via-[#151A30] to-[#232B52]",
      href: "/legacy-projects/sufi-ecommerce",
    },
    {
      title: "Sufi Science & Consciousness Research",
      description: "Interdisciplinary exploration connecting spiritual philosophy with structured inquiry and analytical documentation.",
      imageGradient: "bg-gradient-to-br from-[#151A30] via-[#232B52] to-[#1C2340]",
      href: "/legacy-projects/sufi-science",
    },
    {
      title: "Interfaith Program",
      description: "Fostering dialogue and understanding across religious traditions through shared spiritual principles and collaborative engagement.",
      imageGradient: "bg-gradient-to-br from-[#232B52] via-[#1C2340] to-[#232B52]",
      href: "/legacy-projects/interfaith-program",
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2;
      const newPosition = Math.max(0, scrollPosition - scrollAmount);
      scrollRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
      scrollRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="section-spacing bg-[#1C2340] relative">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Legacy Projects
          </h2>
          <div className="gold-divider long mx-auto mb-6" />
          <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            Initiatives that extend the Foundation&apos;s mission into practical
            engagement with community, environment, and cultural preservation.
          </p>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-end gap-4 mb-8">
          <button
            onClick={scrollLeft}
            disabled={scrollPosition === 0}
            className="w-12 h-12 rounded-full border border-[#C5A85C]/30 flex items-center justify-center text-[#C5A85C] hover:bg-[#C5A85C]/10 hover:border-[#C5A85C] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-[#C5A85C]/30 flex items-center justify-center text-[#C5A85C] hover:bg-[#C5A85C]/10 hover:border-[#C5A85C] transition-all duration-300"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Projects Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 mb-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.href}
              title={project.title}
              description={project.description}
              imageGradient={project.imageGradient}
              href={project.href}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          
        </motion.div>
      </div>
    </section>
  );
}
