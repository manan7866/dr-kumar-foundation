"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../../components/PremiumHeader";
import PremiumFooter from "../../../components/PremiumFooter";

export default function YouthPathwaysPage() {
  const pathways = [
    { title: "Cultural Identity Circles", description: "Youth-led discussions on cultural heritage, identity formation, and belonging in contemporary contexts.", participants: "Ages 16-25", duration: "8 weeks" },
    { title: "Ethical Formation Workshops", description: "Structured learning on ethical decision-making, moral reasoning, and values-based leadership.", participants: "Ages 18-30", duration: "6 weeks" },
    { title: "Mentorship Tracks", description: "One-on-one and small-group mentorship pairing youth with experienced community leaders and professionals.", participants: "Ages 16-25", duration: "6 months" },
    { title: "Leadership Labs", description: "Hands-on leadership development through project design, team coordination, and community engagement.", participants: "Ages 18-30", duration: "10 weeks" },
    { title: "Youth Service Projects", description: "Community service initiatives designed and led by youth participants to address local needs.", participants: "All youth", duration: "Ongoing" },
    { title: "Community Participation Pathways", description: "Structured opportunities for youth voice in community decision-making and civic engagement.", participants: "Ages 16-30", duration: "Ongoing" },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#151A30] to-[#1C2340]">
        <div className="absolute inset-0 pattern-subtle opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 mb-6"><div className="w-10 h-[1px] bg-[#C5A85C]/40" /><span className="text-[#C5A85C] uppercase tracking-[0.2em] text-xs">Youth Engagement</span><div className="w-10 h-[1px] bg-[#C5A85C]/40" /></div>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">Youth<br /><span className="gradient-gold">Pathways</span></h1>
            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">Structured pathways for youth development, leadership formation, and meaningful community engagement.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Youth Engagement Pathways</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathways.map((pathway, index) => (
              <motion.div key={pathway.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
                <h3 className="font-serif text-xl text-white mb-3">{pathway.title}</h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed mb-4">{pathway.description}</p>
                <div className="pt-4 border-t border-[#C5A85C]/10 grid grid-cols-2 gap-3 text-xs">
                  <div><p className="text-[#C5A85C] uppercase tracking-wider mb-1">Participants</p><p className="text-white">{pathway.participants}</p></div>
                  <div><p className="text-[#C5A85C] uppercase tracking-wider mb-1">Duration</p><p className="text-white">{pathway.duration}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#151A30]">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <h2 className="font-serif text-3xl text-white mb-4">Begin Your Youth Journey</h2>
            <div className="gold-divider long mx-auto mb-8" />
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/engage/youth-engagement/collaboration" className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1">Collaborate</Link>
              <Link href="/legacy-projects/youth" className="px-8 py-4 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40">Back to Youth</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <PremiumFooter />
    </div>
  );
}
