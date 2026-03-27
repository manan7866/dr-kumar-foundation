"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import { useState } from "react";

export default function OfficialPublicNoticePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const trustSummaryItems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      title: "No Informal Fundraising",
      description: "No one should seek funds in Dr. Kumar's personal name without official published authorization.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Verify Before Trusting",
      description: "No financial or representational claim should be treated as official unless verified directly.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Use Official Channels Only",
      description: "Rely only on official Foundation communication for verification.",
    },
  ];

  const notToRelyOnItems = [
    "Verbal claims",
    "Private message requests",
    "Forwarded messages",
    "Social media appeals",
    "Screenshots without verification",
    "Personal bank details sent informally",
    "Claims of special access or special permission",
    "Alleged authority based only on personal association",
  ];

  const misuseItems = [
    "Dr. Kumar's name",
    "Dr. Kumar's image",
    "Foundation identity",
    "Dr. Kumar Faqeeri Darbar association",
    "Claims of influence or authority",
    "Promises of access, favor, or arrangement",
    "Urgency-based requests for money or transfer",
  ];

  const suspiciousItems = [
    "Donation requests",
    "Private transfer requests",
    "Event-related payment claims",
    "Access-related financial demands",
    "False accommodation claims",
    "Misuse of Dr. Kumar's name or image",
  ];

  const faqItems = [
    {
      question: "Does the Foundation currently accept donations in Dr. Kumar's personal name?",
      answer: "No informal or personal-name-based financial request should be treated as official unless explicitly published through an official Foundation channel.",
    },
    {
      question: "How do I verify a request?",
      answer: "Use only the official Foundation contact channels listed on this page.",
    },
    {
      question: "What if someone claims to represent the Foundation or Darbar?",
      answer: "Do not assume the claim is valid. Verify directly through official communication.",
    },
    {
      question: "What if someone asks for money for access, accommodation, favor, or arrangement?",
      answer: "Treat the request as unverified unless confirmed directly through the Foundation.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
              <span className="text-[#C5A85C] uppercase tracking-[0.2em] text-xs">About the Foundation</span>
              <div className="w-10 h-[1px] bg-[#C5A85C]/40" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Official Public<br />
              <span className="gradient-gold">Notice</span>
            </h1>

            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Clarification regarding donations, financial requests, and authorized representation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-[#AAB3CF] text-left md:text-center lg:text-center xl:text-center text-lg leading-relaxed">
              This notice has been issued for clarity, trust, and public protection. It explains the Foundation's position regarding donations, financial requests, and any claim of authority made in the name of Dr. Kumar, Dr. Kumar Faqeeri Darbar, the Foundation, or associated platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Summary Band */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustSummaryItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6"
              >
                <div className="w-14 h-14 bg-[#C5A85C]/10 rounded-full flex items-center justify-center text-[#C5A85C] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg text-white mb-3">{item.title}</h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Box */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-red-400 mt-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h2 className="font-serif text-xl text-red-400 mb-3">Important Public Guidance</h2>
                  <p className="text-[#AAB3CF] leading-relaxed mb-4">
                    The Foundation issues this notice so that visitors, followers, supporters, and the wider public have a clear understanding of the official position regarding donations, financial requests, and representation.
                  </p>
                  <p className="text-white font-medium">
                    No person should assume that a request made in the name of Dr. Kumar, Dr. Kumar Faqeeri Darbar, the Foundation, or any associated platform is valid unless it is clearly confirmed through an official Foundation channel.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donations and Financial Requests */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-2xl text-white mb-4">Donations and Financial Requests</h2>
            <div className="gold-divider mb-6" />
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
                <h3 className="text-[#C5A85C] text-sm uppercase tracking-wider mb-4">Core Policy</h3>
                <p className="text-[#AAB3CF] leading-relaxed">
                  No individual, volunteer, follower, supporter, intermediary, or third party is authorized to request donations, money, gifts, transfers, or financial support in the personal name of <strong className="text-white">Dr. Kumar</strong>, unless that authorization is explicitly published through an official Foundation channel.
                </p>
              </div>

              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
                <h3 className="text-[#C5A85C] text-sm uppercase tracking-wider mb-4">Public Guidance</h3>
                <p className="text-[#AAB3CF] leading-relaxed">
                  Any informal, personal, private, or third-party request made in Dr. Kumar's name should be treated as unverified unless independently confirmed through official Foundation communication.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Not to Rely On */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-2xl text-white mb-4">What the Public Should Not Rely On</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-6">
              The public is requested not to rely on the following as proof of authority:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {notToRelyOnItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#232B52] border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[#AAB3CF] text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <p className="text-red-400 text-sm font-medium">
                No financial request should be treated as official unless verified directly through the Foundation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Associated Platforms Clarification */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-2xl text-white mb-4">Associated Platforms Clarification</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-6">
              The existence of associated platforms, collaborators, supporters, or affiliates does <strong className="text-white">not</strong> automatically authorize any person or group to:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                "Collect funds in Dr. Kumar's personal name",
                "Request money on behalf of Dr. Kumar Faqeeri Darbar",
                "Seek donations in the Foundation's name",
                "Claim representation without explicit official confirmation",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#232B52] border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[#AAB3CF] text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-[#AAB3CF] leading-relaxed">
              Any such claim should be verified directly through the Foundation before being trusted.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Authorized Communication Channels */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-2xl text-white mb-4">Authorized Communication Channels</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-6">
              For verification of any matter related to donations, financial requests, representation, suspicious claims, misuse of name or image, or Darbar-related arrangements, please contact only the official Foundation channels:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6"
              >
                <h3 className="text-[#C5A85C] text-sm uppercase tracking-wider mb-2">Foundation Office</h3>
                <a href="mailto:info@dkf.sufisciencecenter.info" className="text-white hover:text-[#C5A85C] transition-colors text-lg">
                  info@dkf.sufisciencecenter.info
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6"
              >
                <h3 className="text-[#C5A85C] text-sm uppercase tracking-wider mb-2">Administrative Support</h3>
                <a href="mailto:admin@dkf.sufisciencecenter.info" className="text-white hover:text-[#C5A85C] transition-colors text-lg">
                  admin@dkf.sufisciencecenter.info
                </a>
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Misuse of Name */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-2xl text-white mb-4">Misuse of Name, Image, or Institutional Association</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-6">
              The public should exercise caution if any person or group uses:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {misuseItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#232B52] border border-amber-500/20 rounded-xl p-4 flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-[#AAB3CF] text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-[#AAB3CF] leading-relaxed">
              for personal or financial benefit without formal published authorization. Any such claim should be treated cautiously unless verified directly through the Foundation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* If You Receive Suspicious Request */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-2xl text-white mb-4">If You Receive a Suspicious Request</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-6">
              If you receive a suspicious message, solicitation, or representation claim, you are encouraged to report it through official Foundation contact channels. This includes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {suspiciousItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4 flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-[#AAB3CF] text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Policy */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-2xl text-white mb-4">Future Policy</h2>
            <div className="gold-divider mb-6" />
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
              <p className="text-[#AAB3CF] leading-relaxed">
                If, in the future, the Foundation formally enables donations, sponsorship, structured contributions, or other financial participation, that information should be published clearly through official Foundation channels.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed mt-4">
                Until such a formal announcement is made, the public should treat informal financial solicitation in Dr. Kumar's personal name as unauthorized unless directly verified.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Institutional Intent */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-2xl text-white mb-4">Institutional Intent</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-6">
              This notice exists to protect:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Public trust",
                "Institutional clarity",
                "Visitors and followers",
                "Spiritual seekers",
                "Families and supporters",
                "The dignity of Dr. Kumar's name",
                "The integrity of the Foundation and its mission",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-[#C5A85C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#AAB3CF] text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-[#AAB3CF] leading-relaxed mt-6">
              Its purpose is not only administrative. It is also protective, ethical, and reputational.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-2xl text-white mb-4">Frequently Asked Questions</h2>
            <div className="gold-divider long mx-auto mb-6" />
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#1C2340]/50 transition-colors"
                  >
                    <span className="text-white font-medium pr-4">{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-[#C5A85C] flex-shrink-0 transition-transform duration-300 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-[#AAB3CF] text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing Notice */}
      <section className="py-20 bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8">
              <h2 className="font-serif text-xl text-white mb-4">Closing Notice</h2>
              <div className="gold-divider mx-auto mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                We request all visitors, supporters, and members of the public to rely only on official website information and official Foundation communication channels.
              </p>
              <p className="text-[#C5A85C] font-medium">
                Thank you for helping preserve dignity, clarity, and authenticity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
