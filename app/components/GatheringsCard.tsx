"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Gathering {
  id: string;
  year: number;
  location_city: string;
  location_country: string;
  description?: string;
}

interface GatheringsCardProps {
  region: string;
  gatherings: Gathering[];
  delay?: number;
}

export default function GatheringsCard({ region, gatherings, delay = 0 }: GatheringsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedGatherings = [...gatherings].sort((a, b) => b.year - a.year);
  const latestGathering = sortedGatherings[0];
  const remainingGatherings = sortedGatherings.slice(1);

  if (!latestGathering) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="group relative bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)]"
    >
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#C5A85C]/10 rounded-tr-2xl group-hover:border-[#C5A85C]/30 transition-colors duration-500" />

      {/* Region Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#C5A85C]/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-serif text-[#C5A85C]">{region}</h3>
      </div>

      {/* Latest Gathering (Always Visible) */}
      <div className="space-y-4 mb-6">
        <div className="bg-[#1C2340] rounded-lg p-4 border border-[#C5A85C]/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-3 py-1 bg-[#C5A85C] text-[#1C2340] text-xs font-medium rounded-full">
              {latestGathering.year}
            </span>
          </div>
          <p className="text-white font-medium mb-1">{latestGathering.location_city}, {latestGathering.location_country}</p>
          {latestGathering.description && (
            <p className="text-[#AAB3CF] text-sm leading-relaxed">{latestGathering.description}</p>
          )}
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && remainingGatherings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 mb-6 overflow-hidden"
          >
            {remainingGatherings.map((gathering, index) => (
              <motion.div
                key={gathering.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1C2340]/50 rounded-lg p-4 border border-[#C5A85C]/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 bg-[#C5A85C]/20 text-[#C5A85C] text-xs font-medium rounded-full">
                    {gathering.year}
                  </span>
                </div>
                <p className="text-white font-medium mb-1">{gathering.location_city}, {gathering.location_country}</p>
                {gathering.description && (
                  <p className="text-[#AAB3CF] text-sm leading-relaxed">{gathering.description}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand/Collapse Button */}
      {remainingGatherings.length > 0 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-[#C5A85C]/20 text-[#C5A85C] hover:bg-[#C5A85C]/10 transition-all duration-300 group/btn"
        >
          <span className="text-sm font-medium">
            {isExpanded ? "Show Less" : `Show ${remainingGatherings.length} More`}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Bottom Gold Line */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-8 h-[1px] bg-[#C5A85C]/20" />
        <div className="w-1 h-1 rounded-full bg-[#C5A85C]/40" />
        <div className="w-1 h-1 rounded-full bg-[#C5A85C]/40" />
        <div className="w-8 h-[1px] bg-[#C5A85C]/20" />
      </div>
    </motion.div>
  );
}
