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
import PlatformPartnership from "../../components/PlatformPartnership";
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

export default function SufiSciencePage() {
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('/api/contributions/top-contributors?program_type=sufi-science&limit=3');
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Philosophical Analysis",
      description: "Systematic examination of Sufi philosophical texts and their relevance to contemporary ethical questions.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Environmental Research",
      description: "Investigating ecological ethics from spiritual traditions and their application to contemporary sustainability challenges.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Social Ethics",
      description: "Exploring frameworks for ethical social organization derived from spiritual philosophical traditions.",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Consciousness Studies",
      description: "Interdisciplinary research on states of awareness, self-observation, and their implications for human development.",
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
            Sufi Science &
            <br />
            <span className="gradient-gold">Consciousness Research</span>
          </>
        }
        subtitle="Interdisciplinary exploration connecting spiritual philosophy with structured inquiry and analytical documentation."
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
                  Sufi Science initiatives address the need for rigorous interdisciplinary
                  research connecting spiritual philosophical traditions with contemporary
                  analytical frameworks. These programs integrate traditional wisdom with
                  modern research methodologies.
                </p>
                <p>
                  The approach emphasizes documentation and publication standards
                  appropriate for academic discourse while maintaining fidelity to
                  the depth and nuance of spiritual philosophical traditions.
                </p>
                <p>
                  Programs are implemented through collaborations with researchers,
                  institutions, and scholars committed to serious inquiry that
                  transcends disciplinary boundaries.
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
                  "Spiritual philosophy and scientific inquiry are not opposed.
                  Both seek truth through disciplined observation and honest
                  documentation."
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
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Strategic Framework
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Four interconnected domains of research and inquiry, each contributing
              to interdisciplinary understanding.
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
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Research Pathway
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <ImpactDiagram
            steps={[
              {
                title: "Inquiry",
                description: "Formulating research questions that bridge spiritual philosophical traditions with contemporary analytical frameworks.",
              },
              {
                title: "Documentation",
                description: "Systematic recording and analysis of findings using methodologies appropriate for academic discourse.",
              },
              {
                title: "Publication",
                description: "Disseminating research through peer-reviewed channels and institutional partnerships.",
              },
              {
                title: "Institutional Integration",
                description: "Establishing ongoing research programs and educational initiatives based on findings.",
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
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Implementation Structure
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Research",
                description: "Conducting systematic investigation using appropriate methodologies for each domain of inquiry.",
              },
              {
                title: "Review",
                description: "Peer review and scholarly validation of findings before publication and dissemination.",
              },
              {
                title: "Publication",
                description: "Publishing research through academic channels, conferences, and institutional partnerships.",
              },
              {
                title: "Policy Interface",
                description: "Translating research findings into recommendations for institutional and policy applications.",
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
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Top Contributors
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Recognizing our most active community members advancing interdisciplinary research and philosophical exploration.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
            </div>
          ) : (
            <TopContributorsGrid
              contributors={topContributors}
              programName="Sufi Science"
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
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Research Impact
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactMetric value={25} label="Research Papers" suffix="+" delay={0.1} />
            <ImpactMetric value={10} label="Conferences" suffix="+" delay={0.2} />
            <ImpactMetric value={15} label="Institutional Partners" suffix="+" delay={0.3} />
            <ImpactMetric value={5000} label="Academic Citations" suffix="+" delay={0.4} />
          </div>
        </div>
      </section>


      {/* Platform Partnership Section */}
      <PlatformPartnership
        platformTitle="Sufi Science Center"
        platformSubtitle="Research and knowledge platform supporting the Sufi Science initiative."
        description={[
          "The Sufi Science initiative of the Dr. Kumar Foundation examines the relationship between spiritual insight, philosophical reflection, and contemporary knowledge systems. To support deeper research and interdisciplinary dialogue, the foundation collaborates with the Sufi Science Center, a specialized platform dedicated to scholarly exploration and intellectual engagement.",
          "Through research publications, lectures, and interdisciplinary study, the center investigates the philosophical dimensions of spirituality in relation to science, ethics, and human understanding.",
          "While the Dr. Kumar Foundation establishes the guiding vision for this initiative, the Sufi Science Center functions as the research platform where this work is documented, studied, and shared with global audiences.",
        ]}
        primaryButton={{
          text: "Visit Sufi Science Center",
          href: "https://sufisciencecenter.info",
        }}
        secondaryButton={{
          text: "Explore Research Programs",
          href: "https://sufisciencecenter.info/exploringkashmirisufism",
        }}
        delay={0.2}
      />

      {/* Call to Engage */}
      <section className="py-24 bg-[#151A30] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] to-[#151A30]" />
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Engage With This Program
            </h2>
            <div className="gold-divider long mx-auto mb-8" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed mb-12">
              Whether for collaboration, support, or inquiry, we welcome
              structured engagement aligned with our mission and values.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/engage/sufi-science/collaboration"
                className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                Collaborate
              </Link>
              <Link
                href="/engage/sufi-science/support"
                className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
              >
                Support
              </Link>
              <Link
                href="/engage/sufi-science/inquiry"
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
                href="/legacy-projects/sufi-music"
                className="group inline-flex items-center px-6 py-3 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                <span>Sufi Music</span>
              </Link>
              <Link
                href="/legacy-projects/sufi-ecommerce"
                className="group inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                <span>Sufi Commerce</span>
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
            className="text-center mb-16"
          >
            <p className="text-[#C5A85C] text-xs uppercase tracking-widest mb-3">
              Pre-Launch Introduction
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Introducing Sufi Science Center USA
            </h2>
            <p className="text-[#AAB3CF] max-w-3xl mx-auto leading-relaxed">
              Sufi Science Center USA is an upcoming platform initiative within the wider Sufi Science vision of Dr. Kumar Foundation USA. This pre-launch introduction offers an early look at its direction, purpose, and evolving role.
            </p>
          </motion.div>

          {/* Subsection 1: Pre-Launch Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-16"
          >
            <div className="w-full  ">
              <h3 className="font-serif text-xl text-white mb-2 text-center">
                Watch the Pre-Launch Video
              </h3>
              <p className="text-[#AAB3CF] text-sm leading-relaxed mb-6 text-center">
                An early introduction to the vision, spirit, and future direction of Sufi Science Center USA.
              </p>
              <div className="relative  w-full">
                {/* Video Container - 16:9 Aspect Ratio */}
                <div className="relative w-full pb-[65%] bg-[#232B52] rounded-xl overflow-hidden border border-[#C5A85C]/15">
                  <iframe
                    className="absolute inset-0  w-full h-full"
                    src="https://www.youtube.com/embed/kX2g8o2uEGw"
                    title="Sufi Science Center USA Pre-Launch Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subsection 2: Website Objective */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full">
              <h3 className="font-serif text-xl text-white mb-4 text-center">
                What Sufi Science Center USA Is Being Built To Do
              </h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-3 text-center max-w-4xl mx-auto">
                Sufi Science Center USA is being developed as a future-facing platform for consciousness research, contemplative knowledge systems, inner development, scholarly dialogue, and meaningful public engagement. Rooted in the wider vision of Dr. Kumar Foundation USA, it represents an upgraded and expanded phase of inquiry designed to deepen engagement with spiritual wisdom, knowledge systems, interdisciplinary reflection, and human transformation in a serious and contemporary way.
              </p>
              <p className="text-[#C5A85C]! text-sm italic leading-relaxed mb-10 text-center">
                This emerging platform marks a more advanced and structured level of inquiry within the wider Sufi Science vision.
              </p>

              {/* Objective Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Consciousness Inquiry",
                    description: "Exploring awareness, inner experience, and transformative understanding through a disciplined and reflective lens.",
                  },
                  {
                    title: "Knowledge Heritage",
                    description: "Organizing teachings, lineages, epistemic frameworks, and contemplative traditions into meaningful pathways of study.",
                  },
                  {
                    title: "Inner Assessment",
                    description: "Providing structured tools for self-reflection, developmental understanding, and personalized learning pathways.",
                  },
                  {
                    title: "Research Dialogues",
                    description: "Advancing conversation, scholarship, interdisciplinary exchange, and deeper public engagement around Sufi Science.",
                  },
                  {
                    title: "Creative Participation",
                    description: "Creating space for creative expression, partnership, contribution, and thoughtful collective involvement.",
                  },
                  {
                    title: "Learning Pathways",
                    description: "Developing curated materials, guided curricula, and accessible learning resources for diverse audiences seeking deeper understanding.",
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
            </div>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
