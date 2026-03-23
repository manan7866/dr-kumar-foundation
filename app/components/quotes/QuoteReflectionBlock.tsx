"use client";

import { motion } from "framer-motion";

interface QuoteReflectionBlockProps {
  reflection?: string;
}

export default function QuoteReflectionBlock({ reflection }: QuoteReflectionBlockProps) {
  if (!reflection) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto mt-12"
    >
      <div className="bg-[#1C2340] border border-[#C5A85C]/10 rounded-xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C5A85C]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          {/* Content */}
          <div>
            <h3 className="font-serif text-lg text-white mb-3">Reflection</h3>
            <p className="text-[#AAB3CF] leading-relaxed text-sm md:text-base">
              {reflection}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
