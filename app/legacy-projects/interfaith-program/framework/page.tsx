"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../../components/PremiumHeader";
import PremiumFooter from "../../../components/PremiumFooter";

export default function InterfaithFrameworkPage() {
  const pillars = [
    { title: "Structured Dialogue Platforms", description: "Building stable platforms for principled interfaith exchange through rigorous facilitation and documentation." },
    { title: "Ethical & Theological Scholarship", description: "Deepening engagement through research-based ethical discourse and scholarly documentation." },
    { title: "Civic & Policy Interface", description: "Translating dialogue into civic cooperation through structured roundtables and policy-aware engagement." },
    { title: "Community Stabilization", description: "Fostering cross-community trust, mutual understanding, and shared civic responsibilities." },
  ];

  const process = [
    { title: "Tradition", description: "Grounding dialogue in deep understanding of religious and philosophical traditions, their teachings, and ethical frameworks." },
    { title: "Dialogue", description: "Facilitating principled exchange that honors differences while identifying shared values and common concerns." },
    { title: "Documentation", description: "Recording insights, outcomes, and best practices to build institutional memory and inform future engagement." },
    { title: "Integration", description: "Applying dialogue outcomes to civic cooperation, policy development, and community stabilization efforts." },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#151A30] to-[#1C2340]">
        <div className="absolute inset-0 pattern-subtle opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 mb-6"><div className="w-10 h-[1px] bg-[#C5A85C]/40" /><span className="text-[#C5A85C] uppercase tracking-[0.2em] text-xs">Interfaith Program</span><div className="w-10 h-[1px] bg-[#C5A85C]/40" /></div>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">Interfaith<br /><span className="gradient-gold">Framework</span></h1>
            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">A principled approach to interfaith engagement grounded in scholarly rigor, civic responsibility, and community stabilization.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />
              <div className="relative z-10">
                <div className="text-[#C5A85C]/20 text-5xl font-serif mb-4">"</div>
                <blockquote className="font-serif text-xl md:text-2xl text-white leading-relaxed mb-6">Sustainable coexistence requires more than tolerance; it demands principled dialogue, scholarly engagement, and shared civic responsibility.</blockquote>
                <div className="flex items-center gap-3"><div className="w-10 h-[1px] bg-[#C5A85C]/50" /><span className="text-[#C5A85C] uppercase tracking-widest text-xs">Foundational Principle</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Four Core Pillars</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 text-center">
                <h3 className="font-serif text-lg text-[#C5A85C] mb-3">{pillar.title}</h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Engagement Process</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-4">
            {process.map((step, index) => (
              <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#C5A85C]/20 rounded-full flex items-center justify-center text-[#C5A85C] font-serif font-bold flex-shrink-0">{index + 1}</div>
                <div className="flex-1 bg-[#232B52] border border-[#C5A85C]/10 rounded-xl p-5">
                  <h3 className="font-serif text-xl text-white mb-2">{step.title}</h3>
                  <p className="text-[#AAB3CF] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#151A30]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <h2 className="font-serif text-3xl text-white mb-4">Explore Interfaith Programs</h2>
            <div className="gold-divider long mx-auto mb-8" />
            <Link href="/legacy-projects/interfaith-program/programs" className="inline-flex px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1">View Programs</Link>
          </motion.div>
        </div>
      </section>
      <PremiumFooter />
    </div>
  );
}
