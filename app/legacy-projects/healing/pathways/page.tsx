"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../../components/PremiumHeader";
import PremiumFooter from "../../../components/PremiumFooter";

export default function HealingPathwaysPage() {
  const pathways = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "Guided Reflection Circles",
      description: "Facilitated group sessions for collective healing through shared dialogue, spiritual grounding, and compassionate listening.",
      participants: "Individuals, Families, Community Groups",
      duration: "6-8 weeks",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Spiritual Guidance Sessions",
      description: "One-on-one support grounded in spiritual wisdom, ethical reflection, and compassionate accompaniment through life challenges.",
      participants: "Individuals",
      duration: "Ongoing",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Psychological Resilience Workshops",
      description: "Structured learning on emotional regulation, stress management, coping strategies, and building inner stability through evidence-based practices.",
      participants: "Community Members, Care Providers",
      duration: "4-6 weeks",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Community Counseling Formats",
      description: "Small-group counseling sessions focused on interpersonal care, ethical support, self-awareness, and responsible community dialogue.",
      participants: "Small Groups (8-12)",
      duration: "8-10 weeks",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Ethical Support Tracks",
      description: "Principled guidance for navigating moral distress, ethical dilemmas, and value-based decision-making in personal and professional contexts.",
      participants: "Professionals, Community Leaders",
      duration: "6 weeks",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Grief Support Spaces",
      description: "Compassionate accompaniment for individuals and families navigating loss, bereavement, and the healing journey through grief.",
      participants: "Individuals, Families",
      duration: "Ongoing",
    },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#151A30] to-[#1C2340]">
        <div className="absolute inset-0 pattern-subtle opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#C5A85C]/40" />
              <span className="text-[#C5A85C] uppercase tracking-[0.2em] text-xs">
                Healing Initiatives
              </span>
              <div className="w-10 h-[1px] bg-[#C5A85C]/40" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Healing Support
              <br />
              <span className="gradient-gold">Pathways</span>
            </h1>

            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Structured approaches to healing grounded in spiritual wisdom, psychological understanding, and compassionate community care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who It Serves */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl text-white mb-4">Who It Serves</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Individuals",
                description: "Those seeking personal healing, spiritual grounding, or support through life transitions and challenges.",
              },
              {
                title: "Families",
                description: "Families navigating grief, distress, or seeking to strengthen their collective resilience and communication.",
              },
              {
                title: "Community Groups",
                description: "Local communities, care providers, and organizations committed to healing-centered engagement.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6 text-center"
              >
                <h3 className="font-serif text-xl text-[#C5A85C] mb-3">{item.title}</h3>
                <p className="text-[#AAB3CF] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Healing Pathways
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto">
              Six structured approaches to healing, each designed to meet different needs while maintaining ethical grounding and compassionate care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathways.map((pathway, index) => (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 hover:border-[#C5A85C]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-[#C5A85C]/10 rounded-full flex items-center justify-center text-[#C5A85C] mb-4">
                  {pathway.icon}
                </div>
                <h3 className="font-serif text-xl text-white mb-3">{pathway.title}</h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed mb-4">{pathway.description}</p>
                <div className="pt-4 border-t border-[#C5A85C]/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#AAB3CF]">
                    <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{pathway.participants}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#AAB3CF]">
                    <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{pathway.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Support Is Accessed */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl text-white mb-4">How Support Is Accessed</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                { step: "1", title: "Initial Inquiry", description: "Reach out through our collaboration, support, or inquiry forms to express interest in healing services." },
                { step: "2", title: "Needs Assessment", description: "A facilitator will connect with you to understand your specific needs, context, and preferred pathway." },
                { step: "3", title: "Pathway Matching", description: "Based on your needs, you'll be matched with the most appropriate healing pathway and facilitator." },
                { step: "4", title: "Engagement Begins", description: "Begin your healing journey with structured support, compassionate guidance, and ethical care." },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 bg-[#C5A85C]/20 rounded-full flex items-center justify-center text-[#C5A85C] font-serif font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white mb-1">{item.title}</h3>
                    <p className="text-[#AAB3CF] text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl text-white mb-4">Begin Your Healing Journey</h2>
            <div className="gold-divider long mx-auto mb-8" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto mb-10">
              Whether you're seeking personal support, community healing, or want to refer someone in need, we're here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/engage/healing-initiatives/collaboration"
                className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                Collaborate
              </Link>
              <Link
                href="/engage/healing-initiatives/support"
                className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
              >
                Request Support
              </Link>
              <Link
                href="/legacy-projects/healing"
                className="px-8 py-4 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                Back to Healing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
