"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PrincipleLink {
  title: string;
  href: string;
  description: string;
}

interface InterconnectionProps {
  principles: PrincipleLink[];
}

export default function Interconnection({ principles }: InterconnectionProps) {
  return (
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
            Interconnected Principles
          </h2>
          <div className="gold-divider long mx-auto mb-6" />
          <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            These principles form a unified framework—each informing and
            reinforcing the others in sustained practice.
          </p>
        </motion.div>

        {/* Connection Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {principles.map((principle, index) => (
              <Link
                key={principle.href}
                href={principle.href}
                className="group relative"
              >
                <div className="bg-[#232B52] border px-2 border-[#C5A85C]/20 rounded-2xl p-6 text-center hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,168,92,0.15)] hover:-translate-y-2">
                  <div className="text-[#C5A85C] text-3xl font-serif mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif text-lg text-white mb-2 group-hover:text-[#C5A85C] transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-[#AAB3CF] text-sm">
                    {principle.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < principles.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gradient-to-r from-[#C5A85C]/50 to-[#C5A85C]/20" />
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
