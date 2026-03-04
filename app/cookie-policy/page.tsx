"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";

export default function CookiePolicyPage() {
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
            Cookie <span className="gradient-gold">Policy</span>
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
            {/* What Are Cookies */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">What Are Cookies</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed">
                Cookies are small text files stored on a user&apos;s device when visiting a website. They help websites function properly and improve user experience.
              </p>
            </div>

            {/* How We Use Cookies */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">How We Use Cookies</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                The Dr. Kumar Foundation website may use cookies to:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Ensure basic website functionality',
                  'Improve website performance',
                  'Analyze how visitors use the website'
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
                These cookies help us understand how the website is being used so improvements can be made.
              </p>
            </div>

            {/* Types of Cookies Used */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Types of Cookies Used</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              
              <div className="space-y-8">
                {/* Essential Cookies */}
                <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl text-white">Essential Cookies</h3>
                  </div>
                  <p className="text-[#AAB3CF] leading-relaxed">
                    These cookies are necessary for the website to operate properly. Without these cookies, basic website functions may not work correctly.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl text-white">Analytics Cookies</h3>
                  </div>
                  <p className="text-[#AAB3CF] leading-relaxed mb-4">
                    Analytics cookies help us understand how visitors interact with the website, including pages visited and time spent on the site.
                  </p>
                  <p className="text-[#AAB3CF] leading-relaxed">
                    This information is used in aggregated form and does not identify individual users.
                  </p>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Managing Cookies</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                Most web browsers allow users to control cookie settings through browser preferences.
              </p>
              <div className="bg-[#C5A85C]/10 border border-[#C5A85C]/30 rounded-xl p-6 mb-6">
                <p className="text-[#C9CCD6] leading-relaxed">
                  Users may choose to block or delete cookies. However, disabling certain cookies may affect the functionality of the website.
                </p>
              </div>
              <h3 className="font-serif text-lg text-white mb-3">Browser Settings</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                You can manage cookies through your browser settings:
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {['Google Chrome', 'Mozilla Firefox', 'Safari', 'Microsoft Edge'].map((browser) => (
                  <li key={browser} className="flex items-center gap-3 text-[#AAB3CF] bg-[#232B52] px-4 py-3 rounded-lg">
                    <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{browser}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Third-Party Cookies</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                Some services integrated into the website may use third-party cookies, particularly for analytics or performance monitoring.
              </p>
              <p className="text-[#AAB3CF] leading-relaxed">
                Users are encouraged to review the policies of those third-party providers.
              </p>
            </div>

            {/* Updates to This Policy */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl text-white mb-4">Updates to This Policy</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed">
                This Cookie Policy may be updated from time to time to reflect changes in technology or legal requirements.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8">
              <h2 className="font-serif text-2xl text-white mb-4">Contact</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#AAB3CF] leading-relaxed mb-4">
                For questions about this Cookie Policy, please contact:
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
