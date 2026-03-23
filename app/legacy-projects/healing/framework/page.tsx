"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../../components/PremiumHeader";
import PremiumFooter from "../../../components/PremiumFooter";

export default function HealingFrameworkPage() {
  const pillars = [
    {
      title: "Spiritual Guidance",
      description: "Grounding healing in spiritual wisdom, ethical reflection, and the recognition of human interconnectedness.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Psychological Resilience",
      description: "Building emotional regulation, stress management, and inner stability through evidence-based practices.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Community Counseling",
      description: "Small-group support focused on interpersonal care, ethical dialogue, and shared healing journeys.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Ethical Support",
      description: "Principled guidance for navigating moral distress, ethical dilemmas, and value-based decision-making.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const progressionSteps = [
    {
      title: "Awareness",
      description: "Recognizing the need for healing, acknowledging distress, and opening to support with honesty and courage.",
    },
    {
      title: "Understanding",
      description: "Exploring the roots of suffering, patterns of response, and the interconnected nature of personal and collective healing.",
    },
    {
      title: "Practice",
      description: "Engaging in structured healing activities, developing new coping strategies, and building resilience through guided support.",
    },
    {
      title: "Integration",
      description: "Incorporating healing insights into daily life, sustaining practices independently, and potentially supporting others on their journey.",
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
              <span className="gradient-gold">Framework</span>
            </h1>

            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              A principled approach to healing grounded in spiritual wisdom, psychological understanding, and ethical community care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Foundational Principle */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />

              <div className="relative z-10">
                <div className="text-[#C5A85C]/20 text-5xl font-serif mb-4">"</div>
                <blockquote className="font-serif text-xl md:text-2xl text-white leading-relaxed mb-6">
                  Healing is not merely the absence of distress, but the cultivation of wholeness through spiritual grounding, psychological understanding, and compassionate community.
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Four Core Pillars
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto">
              Our healing framework rests on four interconnected pillars, each essential to holistic support and sustainable wellbeing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 text-center hover:border-[#C5A85C]/30 transition-colors"
              >
                <div className="w-12 h-12 bg-[#C5A85C]/10 rounded-full flex items-center justify-center text-[#C5A85C] mx-auto mb-4">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-lg text-white mb-3">{pillar.title}</h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progression Model */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl text-white mb-4">Healing Progression Model</h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto">
              A structured pathway through healing, from initial awareness to integrated wellbeing and the capacity to support others.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C5A85C]/40 via-[#C5A85C]/20 to-[#C5A85C]/40 hidden md:block" />

              <div className="space-y-6">
                {progressionSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-16 h-16 bg-[#232B52] border-2 border-[#C5A85C]/40 rounded-full flex items-center justify-center text-[#C5A85C] font-serif font-bold flex-shrink-0 relative z-10">
                      {index + 1}
                    </div>
                    <div className="flex-1 bg-[#232B52] border border-[#C5A85C]/10 rounded-xl p-6">
                      <h3 className="font-serif text-xl text-white mb-2">{step.title}</h3>
                      <p className="text-[#AAB3CF] leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safeguards & Ethics */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl text-white mb-4">Safeguards & Facilitator Ethics</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6"
            >
              <h3 className="font-serif text-xl text-[#C5A85C] mb-4">Participant Safeguards</h3>
              <ul className="space-y-3 text-[#AAB3CF] text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Confidential and safe spaces for all healing activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Clear boundaries and informed consent for all engagements</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Referral pathways to specialized mental health services when needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cultural sensitivity and respect for diverse spiritual backgrounds</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6"
            >
              <h3 className="font-serif text-xl text-[#C5A85C] mb-4">Facilitator Ethics</h3>
              <ul className="space-y-3 text-[#AAB3CF] text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Training in ethical facilitation and boundary maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ongoing supervision and peer support for facilitators</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Recognition of scope and appropriate referral practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Commitment to non-harm and participant wellbeing above all</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Delivery & Evaluation */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl text-white mb-4">Delivery & Evaluation</h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-serif text-2xl text-white mb-4">Delivery Model</h3>
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6 space-y-4">
                <div>
                  <h4 className="text-[#C5A85C] text-sm font-medium mb-2">In-Person Sessions</h4>
                  <p className="text-[#AAB3CF] text-sm">Facilitated circles, workshops, and counseling sessions conducted in community spaces, centers, and partner locations.</p>
                </div>
                <div>
                  <h4 className="text-[#C5A85C] text-sm font-medium mb-2">Remote Support</h4>
                  <p className="text-[#AAB3CF] text-sm">Virtual sessions and digital resources for those unable to access in-person services, maintaining quality and ethical standards.</p>
                </div>
                <div>
                  <h4 className="text-[#C5A85C] text-sm font-medium mb-2">Community Partnerships</h4>
                  <p className="text-[#AAB3CF] text-sm">Collaboration with local organizations, faith communities, and care providers to extend reach and cultural relevance.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-serif text-2xl text-white mb-4">Evaluation Model</h3>
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6 space-y-4">
                <div>
                  <h4 className="text-[#C5A85C] text-sm font-medium mb-2">Participant Feedback</h4>
                  <p className="text-[#AAB3CF] text-sm">Regular collection of participant experiences, outcomes, and suggestions for continuous improvement.</p>
                </div>
                <div>
                  <h4 className="text-[#C5A85C] text-sm font-medium mb-2">Facilitator Reflection</h4>
                  <p className="text-[#AAB3CF] text-sm">Structured debriefing and peer learning among facilitators to refine practices and share insights.</p>
                </div>
                <div>
                  <h4 className="text-[#C5A85C] text-sm font-medium mb-2">Outcome Tracking</h4>
                  <p className="text-[#AAB3CF] text-sm">Monitoring of wellbeing indicators, engagement levels, and long-term healing progression where appropriate.</p>
                </div>
              </div>
            </motion.div>
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
            <h2 className="font-serif text-3xl text-white mb-4">Explore Healing Pathways</h2>
            <div className="gold-divider long mx-auto mb-8" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto mb-10">
              Learn about specific healing pathways and find the approach that best meets your needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/legacy-projects/healing/pathways"
                className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                View Pathways
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
