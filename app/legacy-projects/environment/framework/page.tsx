"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../../components/PremiumHeader";
import PremiumFooter from "../../../components/PremiumFooter";

export default function EnvironmentFrameworkPage() {
  const pillars = [
    { title: "Water Protection", description: "Safeguarding water resources through watershed stewardship, spring revival, and household conservation." },
    { title: "Ecological Awareness", description: "Building understanding of environmental challenges and the ethical imperative for responsible action." },
    { title: "Sustainable Responsibility", description: "Promoting ethical approaches to resource use grounded in long-term thinking and community welfare." },
    { title: "Community Conservation", description: "Empowering local communities to take ownership of environmental stewardship and restoration." },
  ];

  const actionFlow = [
    { title: "Awareness", description: "Building understanding of environmental challenges and the ethical imperative for responsible action." },
    { title: "Community Action", description: "Mobilizing local communities to take ownership of conservation initiatives and sustainable practices." },
    { title: "Resource Preservation", description: "Implementing concrete measures for water protection, waste reduction, and ecological restoration." },
    { title: "Long-Term Sustainability", description: "Establishing systems and practices that ensure environmental stewardship continues across generations." },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#151A30] to-[#1C2340]">
        <div className="absolute inset-0 pattern-subtle opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#C5A85C]/40" />
              <span className="text-[#C5A85C] uppercase tracking-[0.2em] text-xs">Environmental Programs</span>
              <div className="w-10 h-[1px] bg-[#C5A85C]/40" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Conservation<br /><span className="gradient-gold">Framework</span>
            </h1>
            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              A principled approach to environmental stewardship grounded in community action, ethical responsibility, and long-term sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Foundational Principle */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />
              <div className="relative z-10">
                <div className="text-[#C5A85C]/20 text-5xl font-serif mb-4">"</div>
                <blockquote className="font-serif text-xl md:text-2xl text-white leading-relaxed mb-6">
                  Environmental responsibility is not optional. It is an ethical imperative grounded in recognition of our interdependence with the natural world.
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[1px] bg-[#C5A85C]/50" />
                  <span className="text-[#C5A85C] uppercase tracking-widest text-xs">Foundational Principle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four Pillars */}
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

      {/* Action Flow */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Action Flow</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {actionFlow.map((step, index) => (
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
        </div>
      </section>

      {/* Monitoring & Implementation */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Monitoring & Implementation</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
              <h3 className="font-serif text-xl text-[#C5A85C] mb-4">Community Implementation</h3>
              <ul className="space-y-3 text-[#AAB3CF] text-sm">
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg><span>Local leadership identification and training</span></li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg><span>Resource allocation and coordination</span></li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg><span>Regular community meetings and progress reviews</span></li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg><span>Peer accountability and mutual support</span></li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
              <h3 className="font-serif text-xl text-[#C5A85C] mb-4">Monitoring & Accountability</h3>
              <ul className="space-y-3 text-[#AAB3CF] text-sm">
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg><span>Environmental outcome tracking and documentation</span></li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg><span>Community engagement and participation metrics</span></li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg><span>Regular reporting and transparency to stakeholders</span></li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg><span>Continuous improvement based on feedback</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1C2340]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <h2 className="font-serif text-3xl text-white mb-4">Explore Environmental Programs</h2>
            <div className="gold-divider long mx-auto mb-8" />
            <Link href="/legacy-projects/environment/programs" className="inline-flex px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1">View Programs</Link>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
