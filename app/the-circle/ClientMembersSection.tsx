"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MemberCard from "../components/MemberCard";
import { dummyMembersFour } from "../../dumpdata/circle-members";
import AnimatedSection from "../components/AnimatedSection";

interface Member {
  id: string;
  full_name: string;
  country: string;
  city?: string;
  profession: string;
  year_connected: number;
  photo_url?: string;
}

interface MembersResponse {
  data: Member[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function ClientMembersSection() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members?page=1&limit=4&status=published');
        if (response.ok) {
          const data: MembersResponse = await response.json();
          if (data.data && data.data.length > 0) {
            setMembers(data.data);
            setTotalCount(data.pagination.total);
          } else {
            setMembers(dummyMembersFour);
            setTotalCount(dummyMembersFour.length);
          }
        } else {
          setMembers(dummyMembersFour);
          setTotalCount(dummyMembersFour.length);
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
        setMembers(dummyMembersFour);
        setTotalCount(dummyMembersFour.length);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <section className="section-spacing bg-[#1C2340] relative">
      <div className="container-premium">
        <AnimatedSection className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
              Members Directory
            </h2>
            <div className="gold-divider" />
            <p className="text-[#AAB3CF] text-sm mt-2">
              {totalCount > 0 ? `${totalCount} published members` : 'No members yet'}
            </p>
          </div>
          <Link
            href="/the-circle/members-directory"
            className="text-[#AAB3CF] hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            <span>View All</span>
            <svg
              className="w-4 h-4"
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
        </AnimatedSection>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
          </div>
        ) : members.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.slice(0, 4).map((member, index) => (
              <MemberCard
                key={member.id}
                id={member.id}
                name={member.full_name}
                country={member.country}
                city={member.city}
                profession={member.profession}
                yearConnected={member.year_connected}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl">
            <svg className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-[#AAB3CF] text-lg">No published members yet</p>
            <p className="text-[#6B7299] text-sm mt-2">Members will appear here once approved</p>
          </div>
        )}
      </div>
    </section>
  );
}
