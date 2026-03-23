"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../../components/PremiumHeader";
import PremiumFooter from "../../../components/PremiumFooter";

export default function InterfaithProgramsPage() {
  const programs = [
    { title: "Structured Dialogue Forums", description: "Facilitated interfaith dialogues bringing together participants from different religious and civic backgrounds for principled exchange.", format: "Monthly forums", participants: "20-40 per session" },
    { title: "Theological Scholarship Programs", description: "Research-based engagement with theological frameworks for coexistence, ethical scholarship, and civilizational dialogue.", format: "Quarterly seminars", participants: "Scholars, clergy" },
    { title: "Civic Roundtables", description: "Policy-aware community engagement connecting educators, community representatives, and civic voices around ethical coexistence.", format: "Bi-monthly roundtables", participants: "15-25 leaders" },
    { title: "Cross-Community Engagement", description: "Structured activities fostering mutual understanding, shared values identification, and collaborative community action.", format: "Ongoing initiatives", participants: "All community members" },
    { title: "Institutional Partner Pathways", description: "Collaboration frameworks for faith-based organizations, educational institutions, and civic bodies committed to interfaith engagement.", format: "Partnership agreements", participants: "Institutions" },
    { title: "Documentation & Position Papers", description: "Scholarly documentation of dialogue outcomes, policy recommendations, and best practices for interfaith engagement.", format: "Publications", participants: "Researchers, policymakers" },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#151A30] to-[#1C2340]">
        <div className="absolute inset-0 pattern-subtle opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 mb-6"><div className="w-10 h-[1px] bg-[#C5A85C]/40" /><span className="text-[#C5A85C] uppercase tracking-[0.2em] text-xs">Interfaith Program</span><div className="w-10 h-[1px] bg-[#C5A85C]/40" /></div>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">Interfaith<br /><span className="gradient-gold">Programs</span></h1>
            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">Structured platforms for principled interfaith exchange, theological scholarship, and civic cooperation.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Program Formats</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div key={program.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
                <h3 className="font-serif text-xl text-white mb-3">{program.title}</h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed mb-4">{program.description}</p>
                <div className="pt-4 border-t border-[#C5A85C]/10 grid grid-cols-2 gap-3 text-xs">
                  <div><p className="text-[#C5A85C] uppercase tracking-wider mb-1">Format</p><p className="text-white">{program.format}</p></div>
                  <div><p className="text-[#C5A85C] uppercase tracking-wider mb-1">Participants</p><p className="text-white">{program.participants}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#151A30]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <h2 className="font-serif text-3xl text-white mb-4">Engage in Dialogue</h2>
            <div className="gold-divider long mx-auto mb-8" />
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/engage/interfaith-program/collaboration" className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1">Collaborate</Link>
              <Link href="/legacy-projects/interfaith-program" className="px-8 py-4 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40">Back to Interfaith</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <PremiumFooter />
    </div>
  );
}
