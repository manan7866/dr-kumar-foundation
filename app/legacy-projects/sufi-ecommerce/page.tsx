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

export default function SufiEcommercePage() {
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('/api/contributions/top-contributors?program_type=sufi-ecommerce&limit=3');
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "Artisan Documentation",
      description: "Recording and preserving traditional craft techniques, tools, and cultural context for heritage continuity.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Supply Chain Transparency",
      description: "Ensuring traceability from raw materials to final product with full disclosure of production processes.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Ethical Market Access",
      description: "Creating fair trade pathways that connect heritage artisans directly with conscious consumers globally.",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Certification & Compliance",
      description: "Establishing standards for authenticity, fair compensation, and sustainable production practices.",
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
            Sufi Commerce &
            <br />
            <span className="gradient-gold">Ethical Craft</span>
          </>
        }
        subtitle="Structured economic pathways supporting heritage crafts through transparency, traceability, and digital integration."
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
                  Sufi Commerce initiatives address the economic sustainability of
                  heritage crafts through structured market access and ethical
                  trade frameworks. These programs integrate traditional craftsmanship
                  with contemporary commerce standards.
                </p>
                <p>
                  The approach emphasizes transparency throughout the supply chain,
                  recognizing that ethical commerce requires accountability at every
                  stage from production to distribution.
                </p>
                <p>
                  Programs are implemented through partnerships with artisan
                  communities, certification bodies, and digital platforms committed
                  to fair trade principles and cultural preservation.
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
                  "Ethical commerce is not charity. It is structured economic
                  relationship grounded in transparency, fairness, and mutual
                  responsibility."
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
              Four interconnected domains of ethical commerce, each supporting
              sustainable economic pathways for heritage artisans.
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

      {/* Platform Partnership Section */}
      

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
              Impact Pathway
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <ImpactDiagram
            steps={[
              {
                title: "Artisan",
                description: "Identifying and documenting skilled craftspeople practicing traditional techniques with cultural authenticity.",
              },
              {
                title: "Verification",
                description: "Establishing standards for authenticity, fair labor practices, and sustainable production methods.",
              },
              {
                title: "Digital Marketplace",
                description: "Creating online platforms that connect verified artisans directly with conscious consumers globally.",
              },
              {
                title: "Sustainable Income",
                description: "Ensuring fair compensation that supports artisan livelihoods and encourages传承 of traditional crafts.",
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
                title: "Onboarding",
                description: "Identifying artisans, documenting techniques, and establishing baseline standards for participation.",
              },
              {
                title: "Monitoring",
                description: "Ongoing verification of production practices, labor conditions, and material sourcing.",
              },
              {
                title: "Certification",
                description: "Granting ethical commerce certification based on compliance with established standards.",
              },
              {
                title: "Marketplace",
                description: "Listing certified products on digital platforms with full transparency about origin and pricing.",
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
              Recognizing our most active community members supporting ethical commerce and heritage artisans.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
            </div>
          ) : (
            <TopContributorsGrid
              contributors={topContributors}
              programName="Sufi Ecommerce"
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
              Program Impact
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactMetric value={75} label="Artisan Partners" suffix="+" delay={0.1} />
            <ImpactMetric value={500} label="Products Certified" suffix="+" delay={0.2} />
            <ImpactMetric value={20} label="Craft Traditions" suffix="+" delay={0.3} />
            <ImpactMetric value={10000} label="Fair Trade Revenue" suffix="+" delay={0.4} />
          </div>
        </div>
      </section>

      <PlatformPartnership
        platformTitle="Purple Soul – DKC Collective"
        platformSubtitle="Ethical commerce platform supporting the Sufi Ecommerce initiative."
        description={[
          "The Sufi Ecommerce initiative of the Dr. Kumar Foundation explores ethical and spiritually informed models of cultural commerce. To implement this work at scale, the foundation collaborates with Purple Soul – DKC Collective, a specialized digital platform designed to connect spiritual values with responsible global trade.",
          "Through this platform, cultural products, artistic works, and ethically produced goods are presented within a framework that emphasizes authenticity, responsible sourcing, and cultural respect.",
          "While the Dr. Kumar Foundation establishes the philosophical and ethical principles guiding this initiative, Purple Soul – DKC Collective provides the operational infrastructure that enables responsible digital commerce and global accessibility.",
        ]}
        primaryButton={{
          text: "Visit Purple Soul Collective",
          href: "https://purplesoul.com",
        }}
        secondaryButton={{
          text: "Explore Ethical Commerce",
          href: "https://purplesoul.com",
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
                href="/engage/sufi-ecommerce/collaboration"
                className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                Collaborate
              </Link>
              <Link
                href="/engage/sufi-ecommerce/support"
                className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
              >
                Support
              </Link>
              <Link
                href="/engage/sufi-ecommerce/inquiry"
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
                href="/legacy-projects/sufi-science"
                className="group inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                <span>Sufi Science</span>
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
