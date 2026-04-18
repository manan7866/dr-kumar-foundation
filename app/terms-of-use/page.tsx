"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";

export default function TermsOfUsePage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A85C]/10 rounded-full blur-[140px]"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto mb-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-5xl text-white mb-6"
          >
            Terms of <span className="gradient-gold">Use</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed"
          >
            Last updated: March 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing bg-[#151A30]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Acceptance of Terms */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Acceptance of Terms</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                By accessing or using the Dr. Kumar Foundation website, visitors agree to comply with these Terms of Use.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                If a visitor does not agree with these terms, they should discontinue use of the website.
              </p>
            </div>

            {/* Website Purpose */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Website Purpose</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                The website is intended to provide information about the mission, programs, and intellectual work associated with the Dr. Kumar Foundation.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                Content is provided for educational and informational purposes.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Intellectual Property</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                All content on this website, including:
              </p>
              <ul className="grid grid-cols-2 gap-3 mb-6">
                {['text', 'images', 'design elements', 'graphics', 'publications'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#AAB3CF] bg-[#232B52] px-4 py-3 rounded-lg">
                    <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="capitalize">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                is the property of the Dr. Kumar Foundation unless otherwise stated.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                Content may not be copied, reproduced, or distributed without permission.
              </p>
            </div>

            {/* Acceptable Use */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Acceptable Use</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                Users agree not to:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Use the website for unlawful purposes',
                  'Attempt to gain unauthorized access to website systems',
                  'Disrupt or interfere with website functionality',
                  'Misrepresent affiliation with the Foundation'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#AAB3CF]">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Disclaimer</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                While the Dr. Kumar Foundation strives to provide accurate and reliable information, the website content is provided <strong className="text-white">as is</strong> without guarantees of completeness or accuracy.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                The Foundation is not liable for any damages resulting from use of the website.
              </p>
            </div>

            {/* External Links */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">External Links</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed">
                Links to third-party websites are provided for informational purposes. The Foundation does not control or endorse the content of external websites.
              </p>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Modifications</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                The Dr. Kumar Foundation reserves the right to update these Terms of Use at any time.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                Continued use of the website following changes indicates acceptance of the updated terms.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8">
              <h2 className="font-serif text-2xl text-white mb-4">Contact</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                Questions regarding these Terms of Use may be directed to:
              </p>
              <div className="mt-6">
                <p className="text-white font-medium mb-2">Dr. Kumar Foundation</p>
                <Link 
                  href="mailto:info@dkf.sufisciencecenter.info"
                  className="text-[#C5A85C] hover:text-white transition-colors"
                >
                  info@dkf.sufisciencecenter.info
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
