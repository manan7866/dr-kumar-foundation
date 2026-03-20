"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  delay: number;
}

function PillarCard({ icon, title, description, href, delay }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)]"
    >
      {/* Icon Container */}
      <div className="w-14 h-14 mb-6 flex items-center justify-center text-[#C5A85C] group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl text-white mb-4 group-hover:text-[#C5A85C] transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#AAB3CF] leading-relaxed mb-6">{description}</p>

      {/* Link */}
      <Link
        href={href}
        className="inline-flex items-center text-[#C5A85C] font-medium group/link"
      >
        <span className="transition-all duration-300 group-hover/link:translate-x-2">
          Explore
        </span>
        <svg
          className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1"
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
      </Link>

      {/* Corner Accent */}
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-[#C5A85C]/0 group-hover:border-[#C5A85C]/20 rounded-br-2xl transition-colors duration-500" />
    </motion.div>
  );
}

export default function InstitutionalPillars() {
  return (
    <section className="section-spacing bg-[#151A30] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pattern-subtle opacity-30" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Institutional Pillars
          </h2>
          <div className="gold-divider long mx-auto mb-6" />
          <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            Five foundational principles that guide our work in preserving 
            spiritual heritage and fostering ethical development.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PillarCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Self-Awareness"
            description="Cultivating conscious observation of thoughts, emotions, and patterns as the foundation for all inner development."
            href="/core-principles/self-awareness"
            delay={0.1}
          />

          <PillarCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            }
            title="Inner Discipline"
            description="Developing consistent practices of attention and refinement through sustained effort and understanding."
            href="/core-principles/inner-discipline"
            delay={0.2}
          />

          <PillarCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
            title="Sacred Knowledge"
            description="Preserving and sharing spiritual wisdom as a sacred trust through disciplined study, thoughtful reflection, and ethical transmission."
            href="/foundation"
            delay={0.3}
          />

          <PillarCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
            title="Ethical Conduct"
            description="Living in alignment with understood principles through responsibility, integrity, and conscious action."
            href="/core-principles/ethical-conduct"
            delay={0.4}
          />

          <PillarCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title="Shared Responsibility"
            description="Fostering accountability within community through documented engagement and mutual support."
            href="/the-circle"
            delay={0.5}
          />

          <PillarCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Global Presence"
            description="Connecting individuals across regions through structured documentation and cultural exchange."
            href="/global-presence"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}
