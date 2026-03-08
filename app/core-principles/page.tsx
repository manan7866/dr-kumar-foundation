"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import TeachingHero from "../components/TeachingHero";
import TeachingCard from "../components/TeachingCard";
import QuoteBlock from "../components/QuoteBlock";
import Interconnection from "../components/Interconnection";

export default function CorePrinciplesPage() {
  const principles = [
    {
      title: "Self-Awareness",
      description: "The capacity to observe oneself without identification or judgment. The foundation of all inner work.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      href: "/core-principles/self-awareness",
    },
    {
      title: "Inner Discipline",
      description: "The consistent application of attention and effort toward refined states of being.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      href: "/core-principles/inner-discipline",
    },
    {
      title: "Reflective Silence",
      description: "The intentional cultivation of inward quietude. Not absence of thought but quality of attention.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: "/core-principles/reflective-silence",
    },
    {
      title: "Ethical Conduct",
      description: "Action aligned with understanding rather than impulse. Responsibility in all engagement.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      href: "/core-principles/ethical-conduct",
    },
    {
      title: "Shared Responsibility",
      description: "Recognition that individual work occurs within a larger context of mutual accountability.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: "/core-principles/shared-responsibility",
    },
    {
      title: "Compassionate ",
      description: "Recognition of the shared human condition. Awareness expressed through empathy and respect.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      href: "#",
    },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <TeachingHero
        title={
          <>
            Foundational
            <br />
            <span className="gradient-gold">Spiritual Principles</span>
          </>
        }
        subtitle="A structured articulation of the foundational ideas shaping disciplined inner growth and responsible outer engagement."
        ctaLink="#principles"
        ctaText="Explore Principles"
      />

      {/* Principles Grid Section */}
      <section id="principles" className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Core Principles
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Six principles form the foundation of this work. They are not
              beliefs to adopt but qualities to be understood through direct
              observation and sustained practice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <Link key={principle.href} href={principle.href}>
                <TeachingCard
                  icon={principle.icon}
                  title={principle.title}
                  description={principle.description}
                  delay={0.1 * (index + 1)}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Diagram Section */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              The Path of Development
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              These principles unfold in sequence, each building upon the
              foundation of the previous.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {[
              {
                title: "1. Self-Awareness",
                description: "Observation without identification the starting point of all inner work.",
              },
              {
                title: "2. Inner Discipline",
                description: "Consistent application of attention toward refined states of being.",
              },
              {
                title: "3. Reflective Silence",
                description: "Cultivation of inward quietude where deeper understanding emerges.",
              },
              {
                title: "4. Ethical Conduct",
                description: "Action aligned with understanding rather than reactive impulse.",
              },
              {
                title: "5. Shared Responsibility",
                description: "Recognition of mutual accountability within community.",
              },
              {
                title: "6. Compassionate Understanding",
                description: "Awareness expressed through empathy and respect for the shared human condition.",
              },
            ].map((step, index, arr) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
                className="relative"
              >
                <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-6 mb-4">
                  <h4 className="font-serif text-lg text-white mb-2">{step.title}</h4>
                  <p className="text-[#AAB3CF] text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < arr.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-[1px] h-10 bg-gradient-to-b from-[#C5A85C]/50 to-[#C5A85C]/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          <QuoteBlock
            quote="These principles are not abstract philosophy. They are practical frameworks for living with greater awareness, responsibility, and ethical clarity in every moment."
            attribution="Foundational Teaching"
          />
        </div>
      </section>

      {/* Practical Application Section */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl text-white mb-6">
                Practical Application
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  These principles are designed for integration into daily life,
                  not merely intellectual understanding. Each principle offers
                  a framework for observation and a direction for effort.
                </p>
                <p>
                  Self-awareness begins with simple attention to bodily
                  sensations, thoughts, and emotions as they arise. Inner
                  discipline develops through consistent return to this
                  observation despite distraction.
                </p>
                <p>
                  Reflective silence emerges when the constant commentary of
                  the mind subsides. Ethical conduct flows naturally from
                  this clarity. Compassionate understanding extends awareness
                  toward empathy for the shared human condition. Shared
                  responsibility extends the work beyond individual practice
                  into community engagement.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 relative">
                <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />

                <h3 className="font-serif text-xl text-white mb-6">
                  Key Insights
                </h3>

                <ul className="space-y-4">
                  {[
                    "Principles are lived, not merely understood",
                    "Self-observation precedes all transformation",
                    "Discipline arises from understanding, not force",
                    "Compassion emerges from recognizing shared humanity",
                    "Ethics emerge from clarity, not rules",
                    "Community supports but does not replace individual work",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#AAB3CF]">
                      <span className="text-[#C5A85C] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interconnection Section */}
      <Interconnection
        principles={[
          {
            title: "Self-Awareness",
            href: "/core-principles/self-awareness",
            description: "Observation before reaction",
          },
          {
            title: "Inner Discipline",
            href: "/core-principles/inner-discipline",
            description: "Consistency and refinement",
          },
          
          {
            title: "Ethical Conduct",
            href: "/core-principles/ethical-conduct",
            description: "Responsibility in action",
          },
          {
            title: "Shared Responsibility",
            href: "/core-principles/shared-responsibility",
            description: "Accountability in community",
          },
        ]}
      />

      {/* Navigation CTA */}
      <section className="py-16 bg-[#151A30] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>

            <Link
              href="/the-circle"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>View The Circle</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
