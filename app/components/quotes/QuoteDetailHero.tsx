"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface QuoteDetailHeroProps {
  title?: string;
  text: string;
  author?: string;
  primaryCategory?: string;
  source?: string;
  onBack?: () => void;
  backLabel?: string;
}

export default function QuoteDetailHero({
  title,
  text,
  author = "Dr. Kumar",
  primaryCategory,
  source,
  onBack,
  backLabel = "Back to Collection",
}: QuoteDetailHeroProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb / Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          href="/teachings/quotes"
          className="inline-flex items-center gap-2 text-sm text-[#AAB3CF] hover:text-[#C5A85C] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{backLabel}</span>
        </Link>
      </motion.div>

      {/* Main Quote Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#C5A85C]/5 to-transparent rounded-2xl blur-xl" />
        
        {/* Main Card */}
        <div className="relative bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 md:p-12 lg:p-16">
          {/* Gold Corner Accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#C5A85C]/40 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#C5A85C]/40 rounded-br-2xl" />

          <div className="relative z-10">
            {/* Category Badge */}
            {primaryCategory && (
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#C5A85C]/10 text-[#C5A85C] text-xs uppercase tracking-widest rounded-full">
                  {primaryCategory}
                </span>
              </div>
            )}

            {/* Title */}
            {title && (
              <h1 className="font-serif text-2xl md:text-3xl text-white mb-6">
                {title}
              </h1>
            )}

            {/* Opening Quote Mark */}
            <div className="text-[#C5A85C]/20 text-5xl md:text-6xl font-serif mb-6">"</div>

            {/* Quote Text */}
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-[#F1F3F8] leading-relaxed mb-8">
              {text}
            </blockquote>

            {/* Closing Quote Mark */}
            <div className="text-[#C5A85C]/20 text-5xl md:text-6xl font-serif mb-8">"</div>

            {/* Attribution */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-[#C5A85C]/50" />
              <span className="text-[#C5A85C] uppercase tracking-[0.15em] text-xs font-medium">
                {author}
              </span>
            </div>

            {/* Source if available */}
            {source && (
              <div className="mt-4 text-sm text-[#AAB3CF]">
                <span className="italic">{source}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
