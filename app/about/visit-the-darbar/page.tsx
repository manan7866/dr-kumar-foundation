"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import { useState } from "react";

export default function VisitTheDarbarPage() {
  const [copySuccess, setCopySuccess] = useState(false);

  // const darbarLocation = {
  //   name: "Dr. Kumar Faqeeri Darbar",
  //   latitude: 34.2378,
  //   longitude: 74.7900,
  //   mappedReference: "Faqeer Dr. Ghulam Mohammad Kumar Saeb, Ganderbal, Jammu and Kashmir 191201",
  //   plusCode: "6QQQ+FV8",
  //   nearestLandmark: "Rehman Sahib Shrine, Banday Bagh, Ganderbal",
  //   area: "Serch Banday Bagh",
  //   region: "Ganderbal District, Jammu and Kashmir, India",
  //   googleMapsUrl: "https://www.google.com/maps?q=34.2378,74.7900",
  //   directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=34.2378,74.7900",
  // };
  const darbarLocation = {
    name: "Dr. Kumar Faqeeri Darbar",
    latitude: 34.239245,
    longitude: 74.788959,
    mappedReference: "Faqeer Dr. Ghulam Mohammad Kumar Saeb, Ganderbal, Jammu and Kashmir 191201",
    plusCode: "6QRP+M9V",
    nearestLandmark: "Rehman Sahib Shrine, Banday Bagh, Ganderbal",
    area: "Serch Banday Bagh",
    region: "Ganderbal District, Jammu and Kashmir, India",
    googleMapsUrl: "https://www.google.com/maps?q=34.239245,74.788959",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=34.239245,74.788959",
  };

  const handleShareLocation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: darbarLocation.name,
          text: `Visit ${darbarLocation.name}`,
          url: darbarLocation.googleMapsUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      handleCopyAddress();
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${darbarLocation.name}\n${darbarLocation.nearestLandmark}\n${darbarLocation.area}\n${darbarLocation.region}\nPlus Code: ${darbarLocation.plusCode}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const quickInfoItems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      value: "Serch Banday Bagh",
      description: "Ganderbal District, J&K",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Visitor Timing",
      value: "Mon, Wed, Fri, Sun",
      description: "10AM-12PM, 3PM-5PM, 7PM-9PM",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Hospitality",
      value: "By arrangement",
      description: "Available on request On selected visit days",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Short Stay",
      value: "Limited availability",
      description: "Limited by arrangement Prior approval needed",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Advance Confirmation",
      value: "Recommended",
      description: "Strongly recommended Before travel planning",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 7m0 13V7" />
        </svg>
      ),
      title: "Google Navigation",
      value: "Available",
      description: "Direct access enabled Use map on this page",
    },
  ];

  const visitorServices = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Spiritual Visit",
      description: "A respectful visit to spend time in the spiritually grounded environment of Dr. Kumar Faqeeri Darbar.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Guidance and Presence",
      description: "Some visitors may come seeking guidance, respectful presence, or quiet sitting, subject to timing and availability.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: "Reflective Visit",
      description: "Visitors may also come simply to sit quietly, observe respectfully, and remain within a disciplined atmosphere.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Family Visit",
      description: "Families may visit according to the Darbar's visitor arrangements and timings.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Outstation Visitor Support",
      description: "Visitors traveling from distant locations may receive guidance regarding travel planning and available arrangements.",
    },
  ];

  const conductItems = [
    "Dress modestly and respectfully",
    "Maintain calm and respectful conduct",
    "Avoid noise, argument, or disruption",
    "Follow any on-site guidance where applicable",
    "Seek permission before photography, filming, or public posting",
    "Respect the privacy of Dr. Kumar, residents, staff, and fellow visitors",
    "Treat the Darbar as a place of dignity and reflection, not casual social activity",
  ];

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
              Visit Dr. Kumar<br />
              <span className="gradient-gold">Faqeeri Darbar</span>
            </h1>

            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Official visitor information for location, timings, hospitality, and stay arrangements
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a
                href={darbarLocation.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Get Directions</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact for Visit Confirmation</span>
              </Link>
            </div>
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
              Dr. Kumar Faqeeri Darbar is maintained as a place of dignity, reflection, spiritual presence, and respectful human encounter. This page provides official guidance for visitors regarding location, timings, visitor arrangements, hospitality, and practical coordination before planning a visit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Information Band */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickInfoItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-5 text-center"
              >
                <div className="w-12 h-12 bg-[#C5A85C]/10 rounded-full flex items-center justify-center text-[#C5A85C] mx-auto mb-3">
                  {item.icon}
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                <p className="text-[#C5A85C] text-sm font-semibold mb-1">{item.value}</p>
                <p className="text-[#AAB3CF] text-xs">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location, Map & Navigation */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">Location, Map & Navigation</h2>
              <div className="gold-divider long mx-auto mb-6" />
              <p className="text-[#AAB3CF] max-w-2xl mx-auto">
                Direct route access to Dr. Kumar Faqeeri Darbar through Google navigation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left: Location Details & Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Darbar Name Card */}
                <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#C5A85C]/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-serif text-xl">{darbarLocation.name}</h3>
                      <p className="text-[#AAB3CF] text-sm">{darbarLocation.area}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-[#C5A85C] font-medium mb-1">Nearest Landmark:</p>
                        <p className="text-[#AAB3CF]">{darbarLocation.nearestLandmark}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <div>
                        <p className="text-[#C5A85C] font-medium mb-1">Region:</p>
                        <p className="text-[#AAB3CF]">{darbarLocation.region}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 7m0 13V7" />
                      </svg>
                      <div>
                        <p className="text-[#C5A85C] font-medium mb-1">Plus Code:</p>
                        <p className="text-[#AAB3CF] font-mono">{darbarLocation.plusCode}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <div>
                        <p className="text-[#C5A85C] font-medium mb-1">Coordinates:</p>
                        <p className="text-[#AAB3CF] font-mono">{darbarLocation.latitude}, {darbarLocation.longitude}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={darbarLocation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-0.5 text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Open in Maps</span>
                  </a>
                  <a
                    href={darbarLocation.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-0.5 text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 7m0 13V7" />
                    </svg>
                    <span>Get Directions</span>
                  </a>
                  <button
                    onClick={handleShareLocation}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C] text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleCopyAddress}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40 text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Arrival Note */}
                <div className="bg-[#C5A85C]/10 border border-[#C5A85C]/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[#AAB3CF] text-sm leading-relaxed">
                      <strong className="text-[#C5A85C]">Arrival Note:</strong> Visitors are encouraged to use the official Google navigation links provided on this page for direct access to Dr. Kumar Faqeeri Darbar.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Embedded Google Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden h-[400px] lg:h-[500px]">
                  <iframe
                    src={`https://maps.google.com/maps?q=${darbarLocation.latitude},${darbarLocation.longitude}&hl=en&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1) brightness(0.9)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dr. Kumar Faqeeri Darbar Location"
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About the Darbar */}
      <section className="section-spacing  bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl "
          >
            <h2 className="font-serif text-3xl text-white mb-6">About the Darbar</h2>
            <div className="gold-divider mb-6" />
            <div className="space-y-4 text-[#AAB3CF] leading-relaxed">
              <p>
                Dr. Kumar Faqeeri Darbar is maintained as a place of spiritual presence, inward reflection, disciplined stillness, and respectful encounter. For some visitors, it is a place of guidance and quiet presence. For others, it is a place to spend time in an atmosphere shaped by humility, sincerity, reflection, and moral clarity.
              </p>
              <p>
                This page is intended to help visitors approach the Darbar in an organized, informed, and respectful manner.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timings and Visitor Entry */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-2xl text-white mb-4">Timings and Visitor Entry</h2>
            <div className="gold-divider mb-6" />
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
                <h3 className="text-[#C5A85C] text-sm uppercase tracking-wider mb-4">General Visitor Timings</h3>
                <div className="space-y-3">
                  <div className="py-2 ">
                    <span className="text-[#AAB3CF]">Best Days To Visit:</span>
                    {/* <span className="text-white font-medium">Monday, Wednesday, Friday, Sunday</span> */}
                    <div className="space-y-2 text-white font-medium">
                      <div className="flex items-center gap-2">
                      <svg className="w-[20px] h-[20px] text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
                        <span>Monday</span>
                      </div>
                      <div className="flex items-center gap-2">
                      <svg className="w-[20px] h-[20px] text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
                        <span>Wednesday</span>
                      </div>
                      <div className="flex items-center gap-2">
                      <svg className="w-[20px] h-[20px] text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
                        <span>Friday</span>
                      </div>
                      <div className="flex items-center gap-2">
                      <svg className="w-[20px] h-[20px] text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
                        <span>Sunday</span>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <span className="text-[#AAB3CF] block mb-2">Hours:</span>
                    <div className="space-y-2 text-white font-medium">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>10:00 AM to 12:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>3:00 PM to 5:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>7:00 PM to 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
                <h3 className="text-[#C5A85C] text-sm uppercase tracking-wider mb-4">Special Schedule Notice</h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed mb-4">
                  Visitor timings may vary depending on:
                </p>
                <ul className="space-y-2 text-[#AAB3CF] text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Spiritual gatherings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Commemorative days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Internal Foundation programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Health, travel, or administrative circumstances</span>
                  </li>
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="text-amber-400 font-medium mb-2">Advance Confirmation</h4>
                  <p className="text-[#AAB3CF] text-sm leading-relaxed">
                    Visitors are encouraged to confirm current timings before travel, especially if they are visiting from another district, state, or country.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visitor Services */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl text-white mb-4">Visitor Services</h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto">
              Depending on the day and current arrangements, visitors may come for one or more of the following purposes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visitorServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 hover:border-[#C5A85C]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-[#C5A85C]/10 rounded-full flex items-center justify-center text-[#C5A85C] mb-4">
                  {service.icon}
                </div>
                <h3 className="font-serif text-lg text-white mb-3">{service.title}</h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food and Hospitality */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-2xl text-white mb-4">Food and Hospitality</h2>
              <div className="gold-divider mb-6" />
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
                <p className="text-[#AAB3CF] leading-relaxed mb-4">
                  Basic hospitality may be available depending on the day and nature of the visit.
                </p>
                <p className="text-[#AAB3CF] text-sm mb-4">This may include:</p>
                <ul className="space-y-2 text-[#AAB3CF] text-sm">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tea or light refreshment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Simple shared food</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Meal arrangements on selected days or during designated gatherings</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-serif text-2xl text-white mb-4">Short-Stay Accommodation</h2>
              <div className="gold-divider mb-6" />
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
                <p className="text-[#AAB3CF] leading-relaxed mb-4">
                  Limited short-stay accommodation may be available for sincere visitors, outstation guests, or those attending specific gatherings at Dr. Kumar Faqeeri Darbar, depending on available space and prior coordination.
                </p>
                <div className="bg-[#C5A85C]/10 border border-[#C5A85C]/20 rounded-lg p-4">
                  <p className="text-[#C5A85C] text-sm font-medium mb-2">Accommodation Guidance</p>
                  <p className="text-[#AAB3CF] text-sm">
                    Availability may depend on room capacity, duration of stay, nature of the visit, internal schedule, and prior approval.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6"
          >
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="text-amber-400 font-medium mb-2">Important Note</h4>
                <p className="text-[#AAB3CF] text-sm leading-relaxed">
                  Food availability should not be assumed for every visit unless it has been confirmed in advance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visitor Conduct */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-2xl text-white mb-4">Visitor Conduct and Respect</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-6">
              To preserve the dignity and atmosphere of Dr. Kumar Faqeeri Darbar, visitors are requested to observe the following:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {conductItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4 flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#AAB3CF] text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before You Travel */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-2xl text-white mb-4">Before You Travel</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-6">
              Before making travel plans, visitors are encouraged to confirm:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Current address",
                "Visiting day and timing",
                "Whether general visitor access is open that day",
                "Whether food arrangements are available",
                "Whether short-stay accommodation is available",
                "Whether any special schedule or restriction applies",
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
            <div className="mt-6 bg-[#C5A85C]/10 border border-[#C5A85C]/20 rounded-xl p-6">
              <p className="text-[#C5A85C] text-sm">
                This is especially important for families, elderly visitors, and long-distance travelers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-serif text-2xl text-white mb-4">Official Contact for Visit Coordination</h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed mb-8">
              For official information regarding visits to <strong className="text-white">Dr. Kumar Faqeeri Darbar</strong>, timings, hospitality, or accommodation, please contact:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
                <h3 className="text-[#C5A85C] text-sm uppercase tracking-wider mb-2">Foundation Office</h3>
                <a href="mailto:info@dkf.sufisciencecenter.info" className="text-white hover:text-[#C5A85C] transition-colors">
                  info@dkf.sufisciencecenter.info
                </a>
              </div>
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
                <h3 className="text-[#C5A85C] text-sm uppercase tracking-wider mb-2">Administrative Support</h3>
                <a href="mailto:admin@dkf.sufisciencecenter.info" className="text-white hover:text-[#C5A85C] transition-colors">
                  admin@dkf.sufisciencecenter.info
                </a>
              </div>
            </div>
            <div className="bg-[#C5A85C]/10 border border-[#C5A85C]/20 rounded-xl p-6">
              <p className="text-[#C5A85C] text-sm">
                Please rely only on official communication channels for Darbar-related information.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
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
              <div className="flex items-start gap-4 mb-6">
                <svg className="w-8 h-8 text-red-400 mt-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h2 className="font-serif text-xl text-red-400 mb-2">Important Notice</h2>
                  <p className="text-[#AAB3CF] leading-relaxed">
                    Timings, visitor arrangements, hospitality availability, and accommodation status may change depending on internal schedule, gatherings, health, travel, or administrative circumstances.
                  </p>
                </div>
              </div>
              <p className="text-white font-medium">
                Visitors are strongly encouraged to confirm details before travel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-[#AAB3CF] text-lg leading-relaxed mb-4">
              We welcome sincere visitors in a spirit of dignity, respect, and order.
            </p>
            <p className="text-[#C5A85C] text-lg font-serif">
              May every visit to Dr. Kumar Faqeeri Darbar be peaceful, meaningful, and well-guided.
            </p>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
