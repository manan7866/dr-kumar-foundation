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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)] h-full flex flex-col"
    >
      {/* Opening Quote Mark */}
      <div className="text-[#C5A85C]/30 text-5xl font-serif mb-4">"</div>

      {/* Quote Text */}
      <blockquote className="font-serif text-lg md:text-xl text-white leading-relaxed mb-6 flex-grow">
        {quote}
      </blockquote>

      {/* Category Tag */}
      {category && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#C5A85C]/10 text-[#C5A85C] text-xs uppercase tracking-widest rounded-full">
            {category}
          </span>
        </div>
      )}

      {/* Author Line */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#C5A85C]/10">
        <div className="w-8 h-[1px] bg-[#C5A85C]/40" />
        <span className="text-[#C5A85C] text-sm font-medium">Dr. Kumar</span>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#C5A85C]/10 rounded-tr-2xl group-hover:border-[#C5A85C]/30 transition-colors duration-500" />
    </motion.div>
  );
}
