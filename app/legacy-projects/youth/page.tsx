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
  collaboration_info?: {
    fullName?: string;
    professionalBackground?: string;
    specialization?: string;
    yearsExperience?: string;
    country?: string;
    email?: string;
    proposedContribution?: string;
  };
}

export default function YouthEngagementPage() {
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('/api/contributions/top-contributors?program_type=youth-engagement&limit=3');
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Cultural Reconnection",
      description: "Programs helping youth connect with cultural heritage, traditional wisdom, and ethical frameworks.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Ethical Formation",
      description: "Guidance on developing moral clarity, personal integrity, and responsible decision-making.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Leadership Development",
      description: "Training programs for emerging leaders focused on service, accountability, and ethical stewardship.",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Engagement",
      description: "Opportunities for youth to contribute meaningfully to community initiatives and social responsibility.",
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
            Youth &
            <br />
            <span className="gradient-gold">Cultural Engagement</span>
          </>
        }
        subtitle="Programs nurturing the next generation through cultural reconnection, ethical formation, and leadership development."
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
                  Youth Engagement Programs address the critical need for
                  ethical formation and cultural continuity among the next
                  generation. These initiatives provide structured frameworks
                  for personal development and community contribution.
                </p>
                <p>
                  The approach emphasizes character development over academic
                  achievement, recognizing that ethical clarity and self-awareness
                  are foundational to meaningful success.
                </p>
                <p>
                  Programs are facilitated by trained mentors who model ethical
                  conduct and provide guidance through structured dialogue and
                  practical engagement.
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
                  "Youth development is not merely preparation for the future.
                  It is the cultivation of ethical presence in the current moment."
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
              Four interconnected domains of youth development, each supporting
              holistic growth and ethical formation.
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
              Development Pathway
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
          </motion.div>

          <ImpactDiagram
            steps={[
              {
                title: "Self-Discovery",
                description: "Guided exploration of personal values, strengths, and ethical orientation through structured reflection.",
              },
              {
                title: "Skill Building",
                description: "Development of practical competencies in communication, leadership, and ethical decision-making.",
              },
              {
                title: "Community Contribution",
                description: "Application of learning through meaningful service projects and community engagement initiatives.",
              },
              {
                title: "Leadership Emergence",
                description: "Transition from participant to facilitator, taking responsibility for mentoring younger participants.",
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
                title: "Mentorship",
                description: "Pairing youth with trained mentors who provide guidance, accountability, and ethical modeling.",
              },
              {
                title: "Workshops",
                description: "Structured learning sessions on ethical principles, cultural heritage, and practical life skills.",
              },
              {
                title: "Service Projects",
                description: "Hands-on community initiatives that allow youth to apply learning and contribute meaningfully.",
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

      {/* Top Contributors */}
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
              Recognizing our most active community members making a difference through youth engagement.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
            </div>
          ) : (
            <TopContributorsGrid
              contributors={topContributors}
              programName="Youth Engagement"
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
            <ImpactMetric value={100} label="Youth Participants" suffix="+" delay={0.1} />
            <ImpactMetric value={25} label="Mentors" suffix="+" delay={0.2} />
            <ImpactMetric value={40} label="Workshops" suffix="+" delay={0.3} />
            <ImpactMetric value={15} label="Service Projects" suffix="+" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Youth Development Platform Section */}
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
                Youth Development Platform
              </h2>

              <p className="text-[#C5A85C] text-lg mb-6 font-medium">
                A dedicated youth development platform is being developed to support ethical formation, cultural continuity, mentorship pathways, leadership development, and meaningful community participation.
              </p>

              <div className="space-y-4 text-[#AAB3CF] leading-relaxed">
                <p>
                  While Dr. Kumar Foundation USA provides the institutional vision and long-term direction, the Youth Development Platform serves as the applied environment where mentorship structures, youth programs, and leadership pathways can be organized and expanded with greater clarity and depth.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/legacy-projects/youth/pathways"
                  className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
                >
                  <span>Explore Youth Pathways</span>
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
                  href="/legacy-projects/youth/framework"
                  className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
                >
                  View Mentorship Framework
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
                    Supporting ethical youth formation, cultural continuity, and leadership development through structured engagement.
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
              Support Youth Development
            </h2>
            <div className="gold-divider long sm:mx-auto mb-8" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed mb-12">
              Invest in the next generation through mentorship, program support,
              or institutional collaboration.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/engage/youth-engagement/collaboration"
                className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                Become a Mentor
              </Link>
              <Link
                href="/engage/youth-engagement/support"
                className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
              >
                Support Programs
              </Link>
              <Link
                href="/engage/youth-engagement/inquiry"
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
                href="/legacy-projects/healing"
                className="group inline-flex items-center px-6 py-3 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                <span>Healing Initiatives</span>
              </Link>
              <Link
                href="/legacy-projects/environment"
                className="group inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                <span>Environmental Programs</span>
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
            Youth & Cultural Engagement
            </h2>
            <p className="text-[#AAB3CF] max-w-3xl mx-auto leading-relaxed">
              The Youth Development Platform USA is an upcoming initiative within the wider youth engagement vision of Dr. Kumar Foundation USA, offering an early view of its purpose, direction, and role in supporting the next generation through mentorship, ethical development, and cultural rootedness.
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
                    title="Youth Development Platform USA Pre-Launch Video"
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
                  An early introduction to the vision and future direction of this youth-focused platform.
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
              What the Youth Development Platform USA Is Being Built To Do
            </h3>

            {/* Objective Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Cultural Identity",
                  description: "Helping youth reconnect with heritage, values, and belonging.",
                },
                {
                  title: "Ethical Grounding",
                  description: "Supporting integrity, responsibility, and principled decision-making.",
                },
                {
                  title: "Mentorship Pathways",
                  description: "Creating sustained mentor-supported routes for growth and accountability.",
                },
                {
                  title: "Leadership Formation",
                  description: "Developing emerging leaders prepared to serve with humility and responsibility.",
                },
                {
                  title: "Community Participation",
                  description: "Building opportunities for youth service, contribution, and collaboration.",
                },
                {
                  title: "Learning Resources",
                  description: "Providing guided materials and developmental tools for long-term growth.",
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
