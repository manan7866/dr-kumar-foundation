"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";

interface MilestoneCardProps {
  period: string;
  title: string;
  description: string;
  details: string[];
  delay: number;
}

function MilestoneCard({ period, title, description, details, delay }: MilestoneCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="relative pl-12 pb-16 last:pb-0"
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 top-3 w-4 h-4 bg-[#C5A85C] rounded-full shadow-[0_0_20px_rgba(197,168,92,0.6)]" />
      
      {/* Period Label */}
      <div className="text-[#C5A85C] text-sm uppercase tracking-widest mb-3 font-medium">
        {period}
      </div>
      
      {/* Title */}
      <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{title}</h3>
      
      {/* Description */}
      <p className="text-[#AAB3CF] leading-relaxed mb-6">{description}</p>
      
      {/* Details */}
      {details.length > 0 && (
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start gap-3 text-[#AAB3CF] text-sm">
              <span className="text-[#C5A85C] mt-1">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function HisLifePage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />
        
        {/* Radial Gold Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A85C]/10 rounded-full blur-[140px]"
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Animated Gold Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto mb-8"
          />
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6"
          >
            The Life & Formation of
            <br />
            <span className="gradient-gold">Dr. G. M. Kumar</span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12"
          >
            A documented journey of intellectual refinement, spiritual discipline,
            and institutional vision.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Link
              href="#timeline"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>View Timeline</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: EARLY FORMATION */}
      <section id="timeline" className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Timeline Line */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block relative pt-8"
            >
              <div className="absolute left-[19px] top-8 bottom-0 w-[1px] bg-gradient-to-b from-[#C5A85C]/50 via-[#C5A85C]/30 to-transparent" />
              
              <div className="space-y-64">
                {[1, 2, 3, 4 ,5,].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 border border-[#C5A85C]/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-2.5 h-2.5 bg-[#C5A85C]/40 rounded-full" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Milestone Cards */}
            <div className="pt-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                  Early Formation
                </h2>
                <div className="gold-divider mb-6" />
                <p className="text-[#AAB3CF] leading-relaxed">
                  The foundational years shaped by family environment, traditional
                  education, and early sensitivity to questions beyond routine experience.
                </p>
              </motion.div>

              <MilestoneCard
                period="1957"
                title="Birth in Ganderbal"
                description="Born in Ganderbal, Kashmir, into a family with spiritual inclinations. Early environment characterized by questioning and inward orientation."
                details={[
                  "Family tradition of spiritual seeking",
                  "Early education in local institutions in Kashmir",
                  "Demonstrated aptitude for sciences and humanities from young age",
                ]}
                delay={0.2}
              />

              <MilestoneCard
                period="1975"
                title="Spiritual Awakening"
                description="Experienced profound spiritual awakening and crisis at age 18, marking the beginning of deep inner inquiry alongside formal education."
                details={[
                  "Period of intense inner questioning and transformation",
                  "Continued formal education while pursuing spiritual inquiry",
                  "Began systematic self-observation practices",
                ]}
                delay={0.4}
              />

              <MilestoneCard
                period="1981"
                title="Completed Medical Education"
                description="Completed MBBS degree, gaining formal understanding of human biology, physiology, and the medical model of human functioning."
                details={[
                  "Graduated with medical degree",
                  "Developed comprehensive understanding of human body and mind",
                  "Prepared for medical practice while continuing inner work",
                ]}
                delay={0.6}
              />

              <MilestoneCard
                period="1983"
                title="Abandoned Medical Practice"
                description="Made decisive break from conventional professional path, choosing instead to dedicate himself fully to spiritual inquiry and inner work."
                details={[
                  "Left established medical career",
                  "Rejected conventional professional identity",
                  "Committed to path of spiritual discipline",
                ]}
                delay={0.8}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WITHDRAWAL & SILENCE */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Timeline Line */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block relative pt-8"
            >
              <div className="absolute left-[19px] top-8 bottom-0 w-[1px] bg-gradient-to-b from-[#C5A85C]/50 via-[#C5A85C]/30 to-transparent" />

              <div className="space-y-48">
                {[1, 2 ,3,4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 border border-[#C5A85C]/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-2.5 h-2.5 bg-[#C5A85C]/40 rounded-full" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Milestone Cards */}
            <div className="pt-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                  Withdrawal & Silence
                </h2>
                <div className="gold-divider mb-6" />
                <p className="text-[#AAB3CF] leading-relaxed">
                  Fourteen years of disciplined solitude dedicated to inner consolidation
                  and spiritual maturation.
                </p>
              </motion.div>

              <MilestoneCard
                period="1983-97"
                title="14 Years in Silence"
                description="Extended period of withdrawal from public life, dedicated to sustained inner work, self-observation, and spiritual discipline in Ganderbal."
                details={[
                  "Complete withdrawal from social and professional obligations",
                  "Systematic work on self-observation and inner refinement",
                  "Integration of spiritual insights through prolonged discipline",
                ]}
                delay={0.2}
              />

              <MilestoneCard
                period="1998"
                title="Return as Qalandar"
                description="Emerged from period of silence as a Qalandar - one who has completed inner work and is free to serve without personal agenda."
                details={[
                  "Marked completion of intensive inner work period",
                  "Began informal teaching and guidance",
                  "Embodied role of Qalandar - free servant of truth",
                ]}
                delay={0.4}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TEACHING & INSTITUTIONAL ESTABLISHMENT */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Timeline Line */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block relative pt-8"
            >
              <div className="absolute left-[19px] top-8 bottom-0 w-[1px] bg-gradient-to-b from-[#C5A85C]/50 via-[#C5A85C]/30 to-transparent" />

              <div className="space-y-56">
                {[1, 2, 3, 4,5,6].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 border border-[#C5A85C]/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-2.5 h-2.5 bg-[#C5A85C]/40 rounded-full" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Milestone Cards */}
            <div className="pt-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                  Teaching & Institutional Establishment
                </h2>
                <div className="gold-divider mb-6" />
                <p className="text-[#AAB3CF] leading-relaxed">
                  From individual guidance to structured frameworks for long-term
                  continuity and responsible participation.
                </p>
              </motion.div>

              <MilestoneCard
                period="1999-2026"
                title="Teaching & Healing"
                description="Ongoing period of public engagement through structured teaching, individual guidance, and healing work with diverse seekers."
                details={[
                  "Regular teaching sessions and discourses",
                  "Individual counseling and guidance",
                  "Development of structured methodologies",
                ]}
                delay={0.2}
              />

              <MilestoneCard
                period="2022"
                title="Sufi Science Center"
                description="Established Sufi Science Center (USA) to document and disseminate teachings through structured research and publication."
                details={[
                  "Formal institutional structure for research",
                  "Documentation of teachings and methodologies",
                  "Bridge between spiritual tradition and contemporary inquiry",
                ]}
                delay={0.4}
              />

              <MilestoneCard
                period="2024"
                title="Sufi Pulse"
                description="Launched Sufi Pulse as digital platform for wider dissemination of teachings and community engagement."
                details={[
                  "Online presence and digital content",
                  "Accessible resources for global audience",
                  "Modern communication of timeless principles",
                ]}
                delay={0.6}
              />

              <MilestoneCard
                period="2025"
                title="Dr. Kumar Foundation"
                description="Established Dr. Kumar Foundation (USA) as comprehensive institutional framework for governance, compliance, and long-term continuity."
                details={[
                  "Legal and governance structure",
                  "Framework for legacy programs and initiatives",
                  "Institutional continuity beyond individual presence",
                ]}
                delay={0.8}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INSTITUTIONAL ESTABLISHMENT */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Institutional Establishment
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              The formation of structured frameworks to preserve continuity and
              support responsible participation across generations.
            </p>
          </motion.div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)] hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 flex items-center justify-center text-[#C5A85C] group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <h3 className="font-serif text-xl text-white mb-4 group-hover:text-[#C5A85C] transition-colors duration-300">
                Vision
              </h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-6">
                Establishment of institutional framework to document continuity,
                preserve disciplined orientation, and support responsible participation.
              </p>
              <Link href="/foundation" className="text-[#C5A85C] font-medium inline-flex items-center group/link">
                <span className="transition-all duration-300 group-hover/link:translate-x-2">Learn More</span>
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)] hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 flex items-center justify-center text-[#C5A85C] group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <h3 className="font-serif text-xl text-white mb-4 group-hover:text-[#C5A85C] transition-colors duration-300">
                Public Engagement
              </h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-6">
                Return to community with clarity of purpose, engaging through
                structured documentation and ethical example.
              </p>
              <Link href="/the-circle" className="text-[#C5A85C] font-medium inline-flex items-center group/link">
                <span className="transition-all duration-300 group-hover/link:translate-x-2">View The Circle</span>
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="group bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)] hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 flex items-center justify-center text-[#C5A85C] group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              
              <h3 className="font-serif text-xl text-white mb-4 group-hover:text-[#C5A85C] transition-colors duration-300">
                Institutional Structuring
              </h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-6">
                Formation of governance structures, legal frameworks, and
                documentation systems for long-term continuity.
              </p>
              <Link href="/foundation#governance" className="text-[#C5A85C] font-medium inline-flex items-center group/link">
                <span className="transition-all duration-300 group-hover/link:translate-x-2">View Governance</span>
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

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
              href="/core-principles"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Explore Core Principles</span>
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
