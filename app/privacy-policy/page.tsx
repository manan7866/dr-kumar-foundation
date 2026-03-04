"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";

export default function PrivacyPolicyPage() {
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
            Privacy <span className="gradient-gold">Policy</span>
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
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Introduction</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                The <strong className="text-white">Dr. Kumar Foundation</strong> is committed to protecting the privacy of visitors to our website and ensuring that personal information is handled responsibly and transparently.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                This Privacy Policy explains how information is collected, used, and safeguarded when individuals interact with our website.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                By accessing or using this website, visitors acknowledge that they have read and understood this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Information We Collect</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              
              <h3 className="font-serif text-xl text-white mt-8 mb-3">Information Provided Voluntarily</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                Visitors may choose to provide personal information such as:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Name',
                  'Email address',
                  'Contact details',
                  'Messages or inquiries submitted through contact forms'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#AAB3CF]">
                    <svg className="w-5 h-5 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#AAB3CF] leading-relaxed">
                This information is provided voluntarily by the user.
              </p>

              <h3 className="font-serif text-xl text-white mt-8 mb-3">Automatically Collected Information</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                Certain technical information may be collected automatically when visiting the website, including:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'IP address',
                  'Browser type',
                  'Device type',
                  'Pages visited',
                  'Time and date of visit'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#AAB3CF]">
                    <svg className="w-5 h-5 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#AAB3CF] leading-relaxed">
                This information helps improve the performance and usability of the website.
              </p>
            </div>

            {/* How Information Is Used */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">How Information Is Used</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                Information collected through the website may be used for the following purposes:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Responding to inquiries or communications',
                  'Improving website functionality and user experience',
                  'Maintaining website security',
                  'Analyzing traffic patterns and usage trends'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#AAB3CF]">
                    <svg className="w-5 h-5 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#AAB3CF] leading-relaxed">
                The Dr. Kumar Foundation does not sell or rent personal information to third parties.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Data Security</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                We take reasonable technical and organizational measures to protect information from unauthorized access, disclosure, or misuse.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                However, no method of internet transmission or electronic storage can be guaranteed to be completely secure.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Third-Party Services</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                The website may use trusted third-party services for analytics or website functionality. These providers may collect limited technical information as part of their services.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                Users are encouraged to review the privacy policies of those third-party services when applicable.
              </p>
            </div>

            {/* External Links */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">External Links</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed">
                The website may contain links to external websites. The Dr. Kumar Foundation is not responsible for the privacy practices or content of external sites.
              </p>
            </div>

            {/* Policy Updates */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Policy Updates</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed">
                This Privacy Policy may be updated periodically to reflect changes in website practices or legal requirements. Updates will be posted on this page.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8">
              <h2 className="font-serif text-2xl text-white mb-4">Contact</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                For questions regarding this Privacy Policy, please contact:
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
