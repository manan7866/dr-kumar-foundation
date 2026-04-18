"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import ProjectHero from "../../components/ProjectHero";
import FrameworkCard from "../../components/FrameworkCard";
import ImpactDiagram from "../../components/ImpactDiagram";
import ImpactMetric from "../../components/ImpactMetric";
import TopContributorsGrid from "../../components/TopContributorsGrid";

interface Contribution {
  id: string;
  title: string;
  activity_date: string;
  venue_city: string;
  venue_country: string;
  participant_count: number;
  task_conducted: string;
  results: string;
  user_name: string;
  submitted_at: string;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface TopContributor {
  user: User;
  contribution_count: number;
  latest_contribution: Contribution;
}

export default function HealingInitiativesPage() {
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('/api/contributions/top-contributors?program_type=healing-initiatives&limit=3');
        if (response.ok) {
          const data = await response.json();
          setTopContributors(data);
        }
      } catch (error) {
        console.error('Failed to fetch contributors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, []);
  const frameworkItems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Spiritual Guidance",
      description: "Structured counseling grounded in ethical clarity and inner development principles.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Psychological Resilience",
      description: "Building capacity for emotional balance through self-awareness and disciplined practice.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Counseling",
      description: "Facilitating group dialogue and mutual support through structured engagement frameworks.",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Ethical Support",
      description: "Guidance on ethical decision-making grounded in self-awareness and responsibility.",
      delay: 0.4,
    },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <ProjectHero
        title={
          <>
            Community Healing &
            <br />
            <span className="gradient-gold">Spiritual Restoration</span>
          </>
        }
        subtitle="Structured initiatives focused on spiritual guidance, psychological resilience, and compassionate community service."
        ctaLink="#framework"
        ctaText="View Program Framework"
      />

      {/* Program Overview */}
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
                Program Overview
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  Healing Initiatives address the need for structured spiritual
                  and psychological support within communities. These programs
                  integrate traditional wisdom with contemporary understanding
                  of human development.
                </p>
                <p>
                  The approach emphasizes self-awareness as the foundation for
                  healing, recognizing that lasting transformation requires
                  inner work alongside external support.
                </p>
                <p>
                  Programs are delivered through trained facilitators who
                  maintain ethical standards and operate within defined
                  frameworks of responsibility.
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
                <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />

                <h3 className="font-serif text-xl text-white mb-6">
                  Program Statement
                </h3>
                <blockquote className="font-serif text-lg text-white leading-relaxed mb-6">
                  "Healing is not the absence of difficulty, but the presence of
                  awareness and responsibility in meeting life's challenges."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="gold-divider" />
                  <span className="text-[#C5A85C] uppercase tracking-widest text-sm">
                    Foundational Principle
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section id="framework" className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Strategic Framework
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Four interconnected domains of healing work, each supporting
              and reinforcing the others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworkItems.map((item) => (
              <FrameworkCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={item.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Model */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Impact Model
            </h2>
            <div className="gold-divider long sm:x-auto mb-6" />
          </motion.div>

          <ImpactDiagram
            steps={[
              {
                title: "Awareness",
                description: "Developing conscious recognition of patterns, reactions, and inner states that shape experience.",
              },
              {
                title: "Understanding",
                description: "Gaining clarity on the roots of suffering and the conditions that support healing and growth.",
              },
              {
                title: "Practice",
                description: "Engaging in structured exercises for self observation, ethical conduct, and community support.",
              },
              {
                title: "Integration",
                description: "Embodiment of healing principles in daily life, relationships, and community engagement.",
              },
            ]}
          />
        </div>
      </section>

      {/* Implementation Structure */}
      <section className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Implementation Structure
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Planning",
                description: "Assessment of community needs, facilitator training, and program design aligned with ethical standards.",
              },
              {
                title: "Execution",
                description: "Delivery of programs through structured sessions, group dialogue, and individual counseling.",
              },
              {
                title: "Evaluation",
                description: "Ongoing review of program effectiveness, participant feedback, and continuous improvement.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 text-center"
              >
                <h3 className="font-serif text-xl text-[#C5A85C] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#AAB3CF] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributions */}
      <section className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Top Contributors
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            Recognizing our most active community members making a difference through healing engagement.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
            </div>
          ) : (
            <TopContributorsGrid
              contributors={topContributors}
              programName="Healing Initiatives"
              isLoading={isLoading}
            />
          )}
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Program Impact
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactMetric value={50} label="Sessions Conducted" suffix="+" delay={0.1} />
            <ImpactMetric value={200} label="Participants" suffix="+" delay={0.2} />
            <ImpactMetric value={15} label="Facilitators" suffix="+" delay={0.3} />
            <ImpactMetric value={5} label="Communities" suffix="+" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Healing Support Platform Section */}
      <section className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          {/* Gold Divider Above Section */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "12rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider long mx-auto mb-12"
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
              Community Healing & Spiritual Restoration
              </h2>

              <p className="text-[#C5A85C] text-lg mb-6 font-medium">
                A dedicated platform is being developed to support the Community Healing & Spiritual Restoration initiative through structured guidance, ethical care frameworks, reflective practices, and community-based support models.
              </p>

              <div className="space-y-4 text-[#AAB3CF] leading-relaxed">
                <p>
                  While Dr. Kumar Foundation USA provides the institutional vision and stewardship, the Healing Support Platform serves as the applied environment where healing pathways, facilitator engagement, and responsible support structures can be organized and extended with greater depth.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/legacy-projects/healing/pathways"
                  className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
                >
                  <span>Explore Healing Pathways</span>
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

                <Link
                  href="/legacy-projects/healing/framework"
                  className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
                >
                  View Support Framework
                </Link>
              </div>
            </motion.div>

            {/* Right: Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
                    Supporting healing-oriented engagement through care, responsibility, and institutional discipline.
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

      {/* Call to Engage */}
      <section className="py-24 bg-[#151A30] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] to-[#151A30]" />
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Participate in Responsible Community Service
            </h2>
            <div className="gold-divider long sm:mx-auto mb-8" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed mb-12">
              Whether for collaboration, support, or inquiry, we welcome
              structured engagement aligned with our mission and values.
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
                Support
              </Link>
              <Link
                href="/engage/healing-initiatives/inquiry"
                className="px-8 py-4 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                Inquire
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-16 bg-[#0F1326] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/legacy-projects"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Legacy Projects</span>
            </Link>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/legacy-projects/environmental-programs"
                className="group inline-flex items-center px-6 py-3 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                <span>Environmental Programs</span>
              </Link>
              <Link
                href="/legacy-projects/youth-engagement"
                className="group inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                <span>Youth Engagement</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
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
        </div>
      </section>

      {/* Pre-Launch Introduction Section */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          {/* Gold Divider Above Section */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "12rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="gold-divider long mx-auto mb-12"
          />

          {/* Section Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center mb-16"
          >
            {/* <p className="text-[#C5A85C] text-xs uppercase tracking-widest mb-3">
              Pre-Launch Introduction
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Community Healing & Spiritual Restoration
            </h2>
            <p className="text-[#AAB3CF] max-w-3xl mx-auto leading-relaxed">
              The Healing Support Platform USA is an upcoming initiative within the wider healing vision of Dr. Kumar Foundation USA, offering an early view of its purpose, direction, and evolving role in supporting inner restoration, resilience, and compassionate community care.
            </p> */}
          </motion.div>

          {/* Pre-Launch Video */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-16"
          >
            <div className="w-full">
              <div className="relative">
               
                <div className="relative w-full pb-[56.25%] bg-[#232B52] rounded-xl overflow-hidden border border-[#C5A85C]/15">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/PLACEHOLDER"
                    title="Healing Support Platform USA Pre-Launch Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="sm:text-center mt-6">
                <Link
                  href="#"
                  className="inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Watch the Pre-Launch Video</span>
                </Link>
                <p className="text-[#AAB3CF] text-sm leading-relaxed mt-4">
                  An early introduction to the vision and future direction of this healing-centered platform.
                </p>
              </div>
            </div>
          </motion.div> */}

          {/* Website Objective */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-serif text-xl text-white mb-8 sm:text-center">
              What the Healing Support Platform USA Is Being Built To Do
            </h3>

            {/* Objective Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Guided Reflection",
                  description: "Supporting self-awareness, emotional insight, and compassionate inner work.",
                },
                {
                  title: "Healing Pathways",
                  description: "Creating structured routes for personal restoration, balance, and growth.",
                },
                {
                  title: "Facilitator Development",
                  description: "Preparing trained facilitators for ethical and responsible healing support.",
                },
                {
                  title: "Community Care",
                  description: "Building support models that strengthen resilience and mutual care.",
                },
                {
                  title: "Ethical Restoration",
                  description: "Connecting healing with accountability, discernment, and conscious living.",
                },
                {
                  title: "Learning Resources",
                  description: "Developing practical materials and guided supports for individuals and communities.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
                  className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6"
                >
                  <h4 className="font-serif text-[#C5A85C] text-base mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[#AAB3CF] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
