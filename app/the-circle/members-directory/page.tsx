"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import MemberCard from "../../components/MemberCard";
import {dummyMembers} from "../../../dumpdata/circle-members";

interface Member {
  id: string;
  full_name: string;
  country: string;
  profession: string;
  year_connected: number;
  first_encounter: string;
  resonated_quality: string;
  life_changes: string;
  continuing_engagement: string;
  city?: string;
  gender?: "Male" | "Female";
}

interface Region {
  country: string;
  continent: string;
}

const professions = [
  "All",
  "Architect",
  "Artist",
  "Banker",
  "Business Leader",
  "Civil Servant",
  "Designer",
  "Diplomat",
  "Doctor",
  "Educator",
  "Engineer",
  "Entrepreneur",
  "Environmental Scientist",
  "Journalist",
  "Judge",
  "Lawyer",
  "Legislator",
  "Medical Specialist",
  "Policy Analyst",
  "Politician",
  "Professor",
  "Public Health Expert",
  "Researcher",
  "Scientist",
  "Social Worker",
  "Student",
  "Technologist",
  "Therapist",
  "Writer",
];

export default function MembersDirectoryPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedProfession, setSelectedProfession] = useState("All");
  const [selectedYear, setSelectedYear] = useState<number | "All">("All");
  const [regions, setRegions] = useState<Region[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [membersPerSlide, setMembersPerSlide] = useState(9);
  
  
  
  
  // Fetch members from database
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log('[Members Directory] Fetching members...');
        const response = await fetch('/api/members?limit=100');
        console.log('[Members Directory] Response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('[Members Directory] Received data:', result);
          // API returns { data: Member[], pagination: {...} }
          const fetchedMembers = result.data || result || [];
          // Use dummy data if no members from database
          setMembers(fetchedMembers.length > 0 ? fetchedMembers : dummyMembers);
        } else {
          // Use dummy data if API fails
          setMembers(dummyMembers);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
        // Use dummy data on error
        setMembers(dummyMembers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
    const width = window.innerWidth;
    if (width < 640) {
      setMembersPerSlide(4);
    }else if (width < 1024) {
      setMembersPerSlide(4); // sm
    } else if (width < 1280) {
      setMembersPerSlide(6); // md
    } else {
      setMembersPerSlide(8); // lg
    }
  }, []);

  // Fetch regions for country filter
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/regions');
        if (response.ok) {
          const data = await response.json();
          setRegions(data);
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    fetchRegions();
  }, []);

  const filteredMembers = (members || []).filter((member) => {
    const matchesSearch = member.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === "All" || member.country === selectedCountry;
    const matchesProfession = selectedProfession === "All" || member.profession === selectedProfession;
    const matchesYear = selectedYear === "All" || member.year_connected === selectedYear;
    return matchesSearch && matchesCountry && matchesProfession && matchesYear;
  });

  // Slider navigation
  const totalSlides = Math.ceil(filteredMembers.length / membersPerSlide);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentMembers = () => {
    const start = currentSlide * membersPerSlide;
    return filteredMembers.slice(start, start + membersPerSlide);
  };

  // Get unique countries from members
  const memberCountries = Array.from(new Set(members.map(m => m.country))).sort();
  const allCountries = ["All", ...memberCountries];
  
  // Get unique years from members
  const memberYears = Array.from(new Set(members.map(m => m.year_connected))).sort((a, b) => b - a);
  const allYears = ["All", ...memberYears];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Members
            <br />
            <span className="gradient-gold">Directory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed max-w-3xl mx-auto"
          >
            A structured archive of individuals engaged with the preserved life
            and orientation of the Foundation.
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-[#151A30] border-b border-[#C5A85C]/20">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1C2340] border border-[#C5A85C]/30 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 transition-colors rounded-lg"
              />
            </div>
            {/* Country Filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-[#1C2340] border border-[#C5A85C]/30 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 min-w-[180px] rounded-lg"
            >
              {allCountries.map((country) => (
                <option key={country} value={country}>{country === "All" ? "All Countries" : country}</option>
              ))}
            </select>
            {/* Profession Filter */}
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="bg-[#1C2340] border border-[#C5A85C]/30 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 min-w-[180px] rounded-lg"
            >
              {professions.map((profession) => (
                <option key={profession} value={profession}>{profession === "All" ? "All Professions" : profession}</option>
              ))}
            </select>
            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === "All" ? "All" : Number(e.target.value))}
              className="bg-[#1C2340] border border-[#C5A85C]/30 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 min-w-[150px] rounded-lg"
            >
              {allYears.map((year) => (
                <option key={year} value={year}>{year === "All" ? "All Years" : year}</option>
              ))}
            </select>
          </div>
          <div className="text-[#AAB3CF] text-sm">
            Showing {filteredMembers.length} of {members.length} members
          </div>
        </div>
      </section>

      {/* Members Slider */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium ">
          {isLoading ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-2" />
              <p className="text-[#AAB3CF]">Loading members...</p>
            </div>
          ) : filteredMembers.length > 0 ? (
            <div className=" ">
              {/* Previous Arrow */}
              <div className="flex justify-between gap-2">
              <button
                onClick={prevSlide}
                className=" -translate-y-1/2   z-20 w-12 h-12 lg:w-14 lg:h-14 bg-[#C5A85C]/70 hover:bg-[#C5A85C] text-[#1C2340] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#C5A85C]/30 transition-all duration-300 group"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {/* Next Arrow */}
              <button
                onClick={nextSlide}
                className=" -translate-y-1/2   z-20 w-12 h-12 lg:w-14 lg:h-14 bg-[#C5A85C]/70 hover:bg-[#C5A85C] text-[#1C2340] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#C5A85C]/30 transition-all duration-300 group"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6  group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              </div>
              

              {/* Members Grid Slide */}
              <div className="overflow-hidden ">
                
                <div
                  className="grid sm:grid-cols-2  -z-30 my-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-transform duration-500"
                >
                  {getCurrentMembers().map((member, index) => (
                    <MemberCard 
                      key={member.id}
                      id={member.id.toString()}
                      name={member.full_name}
                      country={member.country}
                      city={member.city}
                      profession={member.profession}
                      yearConnected={member.year_connected}
                      delay={0.05 * index}
                    />
                  ))}
                </div>
              </div>

              

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-[#C5A85C] w-8'
                        : 'bg-[#C5A85C]/30 hover:bg-[#C5A85C]/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <div className="text-center mt-4 text-[#AAB3CF] text-sm">
                Slide {currentSlide + 1} of {totalSlides} ({filteredMembers.length} members)
              </div>
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-[#AAB3CF] mb-4">No members found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("All");
                  setSelectedProfession("All");
                  setSelectedYear("All");
                }}
                className="text-[#C5A85C] hover:text-white transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-24 bg-[#151A30] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Submit for Inclusion
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed mb-12">
              Individuals seeking inclusion must submit structured documentation.
              All submissions undergo review prior to publication.
            </p>
            <Link
              href="/the-circle/registration"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Register for The Circle</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
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
          </motion.div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-16 bg-[#0F1326] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/the-circle"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to The Circle</span>
            </Link>

            <Link
              href="/the-circle/registration"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Register</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
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
      </section>

      <PremiumFooter />
    </div>
  );
}
