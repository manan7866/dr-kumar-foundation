"use client";

import { motion } from "framer-motion";

export default function EcosystemConnection() {
  return (
    <section className="section-spacing bg-[#151A30] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340]/95 to-[#151A30]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Institutional Ecosystem
          </h2>
          <div className="gold-divider long mx-auto mb-6" />
          <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            The Foundation operates within a network of complementary initiatives,
            each contributing to the preservation and dissemination of spiritual wisdom.
          </p>
        </motion.div>

        {/* Connection Diagram */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Central Node - DKF */}
            <div className="relative z-10">
              <div className="bg-[#232B52] border border-[#C5A85C]/30 rounded-2xl p-8 text-center glow-gold">
                <div className="w-16 h-16 border border-[#C5A85C]/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C5A85C] font-serif text-2xl font-bold">D</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-2">
                  Dr. Ghulam Mohammad Kumar Foundation
                </h3>
                <p className="text-[#AAB3CF] text-sm">
                  Core institutional body for preservation and governance
                </p>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-[#C5A85C]/50 to-[#C5A85C]/20" />

            {/* Second Node - Sufi Science Center */}
            <div className="relative z-10 mt-16">
              <div className="bg-[#232B52]/80 border border-[#C5A85C]/20 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 border border-[#C5A85C]/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white mb-2">
                  Sufi Science Center
                </h3>
                <p className="text-[#AAB3CF] text-sm">
                  Research and documentation of contemplative traditions
                </p>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="absolute top-[calc(100%+4rem)] left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-[#C5A85C]/30 to-[#C5A85C]/10" />

            {/* Third Node - SufiPulse Media */}
            <div className="relative z-10 mt-16">
              <div className="bg-[#232B52]/60 border border-[#C5A85C]/15 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 border border-[#C5A85C]/25 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white mb-2">
                  SufiPulse Media
                </h3>
                <p className="text-[#AAB3CF] text-sm">
                  Digital platforms for cultural engagement and outreach
                </p>
              </div>
            </div>
          </motion.div>

          {/* Explanatory Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-[#AAB3CF] leading-relaxed max-w-2xl mx-auto">
              This interconnected structure allows for specialized focus while
              maintaining alignment with core principles. Each entity operates
              with autonomy while contributing to the shared mission of preserving
              and disseminating spiritual wisdom through structured engagement.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
