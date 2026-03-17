"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface MemberCardProps {
  id: string;
  name: string;
  country: string;
  profession: string;
  yearConnected: number;
  delay: number;
}

export default function MemberCard({ id, name, country, profession, yearConnected, delay }: MemberCardProps) {
  return (
    <motion.div className=""
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8 }}
    >
      <Link
        href={`/the-circle/members-directory/${id}`}
        className="group block bg-[#232B52] border  border-[#C5A85C]/15 rounded-2xl p-6 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)]"
      >
        {/* Name */}
        <h3 className="font-serif text-xl text-white mb-3 group-hover:text-[#C5A85C] transition-colors duration-300">
          {name}
        </h3>

        {/* Info */}
        <div className="space-y-2 text-[#AAB3CF] text-sm">
          <p>{country}</p>
          <p>{profession}</p>
        </div>

        {/* Year Connected */}
        <div className="mt-4 pt-4 border-t border-[#C5A85C]/20">
          <p className="text-[#C5A85C] text-xs">
            Connected {yearConnected}
          </p>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#C5A85C]/10 rounded-tr-2xl group-hover:border-[#C5A85C]/30 transition-colors duration-500" />
      </Link>
    </motion.div>
  );
}
