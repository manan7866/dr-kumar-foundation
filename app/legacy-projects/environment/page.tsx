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

export default function EnvironmentalProgramsPage() {
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('/api/contributions/top-contributors?program_type=environmental-programs&limit=3');
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Water Protection",
      description: "Initiatives focused on preserving water resources through community-led conservation efforts.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Ecological Awareness",
      description: "Educational programs fostering understanding of environmental responsibility and sustainable living.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Sustainable Responsibility",
      description: "Promoting ethical approaches to resource use grounded in long-term thinking and community welfare.",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Community Conservation",
      description: "Grassroots initiatives empowering local communities to take ownership of environmental stewardship.",
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
            Environmental &
            <br />
            <span className="gradient-gold">Water Protection Programs</span>
          </>
        }
        subtitle="Structured initiatives for ecological preservation, sustainable resource management, and community-led environmental stewardship."
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
                  Environmental Programs address the urgent need for responsible
                  stewardship of natural resources. These initiatives combine
                  practical conservation work with ethical frameworks for
                  sustainable living.
                </p>
                <p>
                  The approach recognizes that environmental protection requires
                  not only technical solutions but also a shift in consciousness
                  toward long-term thinking and community responsibility.
                </p>
                <p>
                  Programs are implemented through partnerships with local
                  communities, ensuring that conservation efforts align with
                  local needs and cultural contexts.
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
                  "Environmental responsibility is not optional. It is an ethical
                  imperative grounded in recognition of our interdependence with
                  the natural world."
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
              Four interconnected domains of environmental work, each supporting
              sustainable outcomes.
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
              Impact Pathway
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <ImpactDiagram
            steps={[
              {
                title: "Awareness",
                description: "Building understanding of environmental challenges and the ethical imperative for responsible action.",
              },
              {
                title: "Community Action",
                description: "Mobilizing local communities to take ownership of conservation initiatives and sustainable practices.",
              },
              {
                title: "Resource Preservation",
                description: "Implementing concrete measures for water protection, waste reduction, and ecological restoration.",
              },
              {
                title: "Long-Term Sustainability",
                description: "Establishing systems and practices that ensure environmental stewardship continues across generations.",
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Assessment",
                description: "Evaluating local environmental conditions, community needs, and available resources for intervention.",
              },
              {
                title: "Implementation",
                description: "Deploying conservation programs through community partnerships, training, and resource allocation.",
              },
              {
                title: "Monitoring",
                description: "Tracking environmental outcomes, community engagement, and program effectiveness for continuous improvement.",
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
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Top Contributors
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            Recognizing our most active community members making a difference through Environment engagement.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
            </div>
          ) : (
            <TopContributorsGrid
              contributors={topContributors}
              programName="Environmental Programs"
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
            <ImpactMetric value={30} label="Conservation Projects" suffix="+" delay={0.1} />
            <ImpactMetric value={500} label="Community Participants" suffix="+" delay={0.2} />
            <ImpactMetric value={10} label="Regions Active" suffix="+" delay={0.3} />
            <ImpactMetric value={1000} label="Trees Planted" suffix="+" delay={0.4} />
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
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Support Environmental Stewardship
            </h2>
            <div className="gold-divider long mx-auto mb-8" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed mb-12">
              Join us in responsible environmental action through collaboration,
              support, or inquiry.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/engage/environmental-programs/collaboration"
                className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                Collaborate
              </Link>
              <Link
                href="/engage/environmental-programs/support"
                className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
              >
                Support
              </Link>
              <Link
                href="/engage/environmental-programs/inquiry"
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

      <PremiumFooter />
    </div>
  );
}
