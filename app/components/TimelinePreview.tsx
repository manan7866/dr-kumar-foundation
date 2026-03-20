"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface MilestoneProps {
  period: string;
  title: string;
  description: string;
  delay: number;
}

function Milestone({ period, title, description, delay }: MilestoneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="relative pl-12 pb-12 last:pb-0"
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 top-2 w-3 h-3 bg-[#C5A85C] rounded-full shadow-[0_0_20px_rgba(197,168,92,0.5)]" />
      
      {/* Period Label */}
      <div className="text-[#C5A85C] text-sm  tracking-widest mb-2">
        {period}
      </div>
      
      {/* Title */}
      <h3 className="font-serif text-2xl text-white mb-3">{title}</h3>
      
      {/* Description */}
      <p className="text-[#AAB3CF] leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function TimelinePreview() {
  return (
    <section className="section-spacing bg-[#1C2340] relative overflow-hidden">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340]/95 to-[#151A30]" />

      <div className="container-premium relative  z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Vertical Timeline Line */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block relative"
          >
            {/* Vertical Gold Line */}
            <div className="absolute left-[390px] top-4 bottom-0 w-[2px] h-full bg-gradient-to-b from-[#C5A85C]/50 via-[#C5A85C]/30 to-transparent" />
            
            {/* Decorative Elements */}
            <div className="space-y-40 pl-[371px] pt-4 ">
              <div className="w-10 h-10 border border-[#C5A85C]/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#C5A85C]/40 rounded-full" />
              </div>
              <div className="w-10 h-10 border border-[#C5A85C]/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#C5A85C]/40 rounded-full" />
              </div>
              <div className="w-10 h-10 border border-[#C5A85C]/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#C5A85C]/40 rounded-full" />
              </div>
              {/* <div className="w-10 h-10 border border-[#C5A85C]/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#C5A85C]/40 rounded-full" />
              </div> */}
            </div>
          </motion.div>

          {/* Right Side - Milestones */}
          <div>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
               Dr. Kumar-A Life of Spiritual Journey
              </h2>
              <div className="gold-divider mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed">
                From early formation through spiritual emergence to institutional 
                establishment—a journey of disciplined inquiry and sustained engagement.
              </p>
            </motion.div>

            {/* Milestones */}
            <div className="space-y-0">
              <Milestone
                period="1950s – 1970s"
                title="Early Formation"
                description="Born into a family of spiritual seekers, early education in traditional sciences alongside modern medical training. The seeds of inward questioning begin to form."
                delay={0.2}
              />

              <Milestone
                period="1980s – 2000s"
                title="Spiritual Emergence"
                description="A profound turning point leads to withdrawal from conventional practice. Years of solitude dedicated to deep reflection and inner discipline."
                delay={0.4}
              />

              <Milestone
                period="2010s – Present"
                title="Institutional Establishment"
                description="Return to community with clarity of purpose. Establishment of the Foundation to preserve continuity and support responsible participation."
                delay={0.6}
              />
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12"
            >
              <Link
                href="/life-and-work"
                className="group inline-flex items-center text-[#C5A85C] font-medium text-lg"
              >
                <span className="transition-all duration-300 group-hover:translate-x-2">
                  View Full Timeline
                </span>
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
