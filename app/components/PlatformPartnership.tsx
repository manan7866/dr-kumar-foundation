"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PlatformPartnershipProps {
  platformTitle: string;
  platformSubtitle: string;
  description: string[];
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  delay?: number;
}

export default function PlatformPartnership({
  platformTitle,
  platformSubtitle,
  description,
  primaryButton,
  secondaryButton,
  delay = 0,
}: PlatformPartnershipProps) {
  return (
    <section className="section-spacing bg-[#151A30] relative">
      <div className="container-premium">
        {/* Gold Divider Above Section */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "12rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay }}
          className="gold-divider long mx-auto mb-12"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.1 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
              {platformTitle}
            </h2>
            
            <p className="text-[#C5A85C] text-lg mb-6 font-medium">
              {platformSubtitle}
            </p>

            <div className="space-y-4 text-[#AAB3CF] leading-relaxed">
              {description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href={primaryButton.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                <span>{primaryButton.text}</span>
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>

              {secondaryButton && (
                <Link
                  href={secondaryButton.href}
                  className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
                >
                  {secondaryButton.text}
                </Link>
              )}
            </div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className="relative"
          >
            <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 relative overflow-hidden">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />

              {/* Platform Icon */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 mb-6 rounded-full bg-[#C5A85C]/10 border border-[#C5A85C]/30 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>

                <h3 className="font-serif text-xl text-white mb-2 text-center">
                  Specialized Platform
                </h3>
                <p className="text-[#AAB3CF] text-sm text-center leading-relaxed">
                  Operating at scale to serve global audiences while maintaining
                  institutional integrity
                </p>

                {/* Connection Line */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A85C]/30 to-transparent my-6" />

                <p className="text-[#C5A85C] text-xs uppercase tracking-widest text-center">
                  Part of Dr. Kumar Foundation Legacy Ecosystem
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
