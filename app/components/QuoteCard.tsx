"use client";

import { motion } from "framer-motion";

interface QuoteCardProps {
  quote: string;
  category?: string;
  delay?: number;
}

export default function QuoteCard({ quote, category, delay = 0 }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -3 }}
      className="group relative bg-[#232B52] border border-[#C5A85C]/10 rounded-lg p-5 hover:border-[#C5A85C]/30 transition-all duration-500 h-full flex flex-col"
    >
      {/* Opening Quote Mark */}
      <div className="text-[#C5A85C]/25 text-3xl font-serif mb-2.5">"</div>

      {/* Quote Text */}
      <blockquote className="font-serif text-sm md:text-base text-[#F1F3F8] leading-relaxed mb-3 flex-grow">
        {quote}
      </blockquote>

      {/* Category Tag */}
      {category && (
        <div className="mb-3">
          <span className="inline-block px-2 py-0.5 bg-[#C5A85C]/8 text-[#C5A85C] text-[10px] uppercase tracking-widest rounded-full">
            {category}
          </span>
        </div>
      )}

      {/* Author Line */}
      <div className="flex items-center gap-2 pt-2.5 border-t border-[#C5A85C]/8">
        <div className="w-5 h-[1px] bg-[#C5A85C]/30" />
        <span className="text-[#C5A85C] text-xs font-medium">Dr. Kumar</span>
      </div>
    </motion.div>
  );
}
