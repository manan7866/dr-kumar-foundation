"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import AuthModal from "@/app/components/auth/AuthModal";
import { sendCircleRegistrationEmail } from "@/app/actions/send-circle-email";
import {citiesByCountry} from "../../../dumpdata/cities";

interface FormData {
  fullName: string;
  country: string;
  city: string;
  gender: string;
  profession: string;
  yearConnected: string;
  firstEncounter: string;
  resonatedQuality: string;
  lifeChanges: string;
  continuingEngagement: string;
  consent: boolean;
}

// Hardcoded country list for Circle registration
const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
  "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia",
  "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Italy", "Japan", "Jordan",
  "Kenya", "Kuwait", "Lebanon", "Malaysia", "Mexico", "Morocco", "Netherlands",
  "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand",
  "Tunisia", "Turkey", "United Arab Emirates", "United Kingdom", "United States",
  "Vietnam", "Yemen"
];



// Gender options
const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface User {
  id: string;
  email: string;
  full_name: string;
}

const resonatedQualities = [
  { value: "Stillness", label: "Stillness" },
  { value: "Clarity", label: "Clarity" },
  { value: "Discipline", label: "Discipline" },
  { value: "Accountability", label: "Accountability" },
  { value: "Compassion", label: "Compassion" },
  { value: "Presence", label: "Presence" },
  { value: "Ethical_Firmness", label: "Ethical Firmness" },
  { value: "Self_Awareness", label: "Self-Awareness" },
  { value: "Inner_Discipline", label: "Inner Discipline" },
  { value: "Reflective_Silence", label: "Reflective Silence" },
  { value: "Ethical_Conduct", label: "Ethical Conduct" },
  { value: "Shared_Responsibility", label: "Shared Responsibility" },
];

const professions = [
  { value: "Architect", label: "Architect" },
  { value: "Artist", label: "Artist" },
  { value: "Banker", label: "Banker" },
  { value: "Business Leader", label: "Business Leader" },
  { value: "Civil Servant", label: "Civil Servant" },
  { value: "Designer", label: "Designer" },
  { value: "Diplomat", label: "Diplomat" },
  { value: "Doctor", label: "Doctor" },
  { value: "Educator", label: "Educator" },
  { value: "Engineer", label: "Engineer" },
  { value: "Entrepreneur", label: "Entrepreneur" },
  { value: "Environmental Scientist", label: "Environmental Scientist" },
  { value: "Journalist", label: "Journalist" },
  { value: "Judge", label: "Judge" },
  { value: "Lawyer", label: "Lawyer" },
  { value: "Legislator", label: "Legislator" },
  { value: "Medical Specialist", label: "Medical Specialist" },
  { value: "Policy Analyst", label: "Policy Analyst" },
  { value: "Politician", label: "Politician" },
  { value: "Professor", label: "Professor" },
  { value: "Public Health Expert", label: "Public Health Expert" },
  { value: "Researcher", label: "Researcher" },
  { value: "Scientist", label: "Scientist" },
  { value: "Social Worker", label: "Social Worker" },
  { value: "Student", label: "Student" },
  { value: "Technologist", label: "Technologist" },
  { value: "Therapist", label: "Therapist" },
  { value: "Writer", label: "Writer" },
];

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<"signin" | "signup">("signin");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    mode: 'onChange',
  });

  // No need to fetch regions - using hardcoded countries

  // Check authentication and submission status
  useEffect(() => {
    const checkAuthAndSubmission = async () => {
      // First check localStorage for existing session
      const localSession = localStorage.getItem("user_session");
      
      if (localSession) {
        try {
          const userData = JSON.parse(localSession);
          console.log('[Circle Registration] Found session in localStorage:', userData);
          setUser(userData);
          // User is authenticated from localStorage, check submission status
          await checkSubmissionStatus(userData.id, userData.email);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('[Circle Registration] Failed to parse localStorage session:', error);
          localStorage.removeItem("user_session");
        }
      }

      // No localStorage session - validate with server
      try {
        console.log('[Circle Registration] No localStorage session, validating with server...');
        const response = await fetch('/api/auth/session');

        if (!response.ok) {
          // Not authenticated - show auth modal
          console.log('[Circle Registration] Not authenticated, showing auth modal');
          setAuthInitialTab("signin");
          setIsAuthModalOpen(true);
          setIsLoading(false);
          return;
        }

        const userData = await response.json();
        console.log('[Circle Registration] Validated user:', userData);

        // Update localStorage with validated user
        localStorage.setItem("user_session", JSON.stringify(userData));
        setUser(userData);

        // Check submission status
        await checkSubmissionStatus(userData.id, userData.email);
      } catch (error) {
        console.error('[Circle Registration] Session validation error:', error);
        localStorage.removeItem("user_session");
        setAuthInitialTab("signin");
        setIsAuthModalOpen(true);
        setIsLoading(false);
      }
    };

    checkAuthAndSubmission();
  }, []);

  const checkSubmissionStatus = async (userId: string, userEmail: string) => {
    try {
      console.log('[Circle Registration] Checking submission for user:', userId);
      const response = await fetch(`/api/circle/check-submission?user_id=${userId}`);

      if (response.status === 404) {
        // User doesn't exist - clear session
        localStorage.removeItem("user_session");
        setAuthInitialTab("signin");
        setIsAuthModalOpen(true);
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('[Circle Registration] Submission check result:', data);

        // Check if user already has a member record or pending registration
        if (data.hasMember || data.hasRegistration) {
          console.log('[Circle Registration] Already submitted!');
          setAlreadySubmitted(true);
        } else {
          console.log('[Circle Registration] First time submission - showing form');
        }
      } else {
        console.log('[Circle Registration] Check failed, showing form anyway');
      }
    } catch (error) {
      console.error('[Circle Registration] Error checking submission:', error);
    } finally {
      // Always ensure loading is false after check completes
      setIsLoading(false);
    }
  };

  // Handle auth modal close - revalidate session
  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    // Force revalidation after modal closes
    setTimeout(async () => {
      // First check localStorage
      const localSession = localStorage.getItem("user_session");
      if (localSession) {
        try {
          const userData = JSON.parse(localSession);
          console.log('[Circle Registration] Found session in localStorage after auth:', userData);
          setUser(userData);
          await checkSubmissionStatus(userData.id, userData.email);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('[Circle Registration] Failed to parse localStorage session:', error);
          localStorage.removeItem("user_session");
        }
      }

      // No localStorage - validate with server
      try {
        console.log('[Circle Registration] Revalidating session after auth...');
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const userData = await response.json();
          console.log('[Circle Registration] Revalidated user:', userData);
          localStorage.setItem("user_session", JSON.stringify(userData));
          setUser(userData);
          // Check submission status with validated user
          await checkSubmissionStatus(userData.id, userData.email);
        } else {
          console.log('[Circle Registration] Revalidation failed');
          localStorage.removeItem("user_session");
        }
      } catch (error) {
        console.error('[Circle Registration] Revalidation error:', error);
        localStorage.removeItem("user_session");
      } finally {
        // Ensure loading is false
        setIsLoading(false);
      }
    }, 800);
  };

  // Auto-fill user data
  useEffect(() => {
    if (user) {
      setValue('fullName', user.full_name);
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.fullName,
          country: data.country,
          city: data.city,
          gender: data.gender,
          profession: data.profession,
          year_connected: parseInt(data.yearConnected),
          first_encounter: data.firstEncounter,
          resonated_quality: data.resonatedQuality,
          life_changes: data.lifeChanges,
          continuing_engagement: data.continuingEngagement,
          consent_accepted: data.consent,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);

        // Send confirmation email using user's email from auth state
        const userEmail = user?.email;
        const userName = user?.full_name || data.fullName;

        if (userEmail) {
          try {
            await sendCircleRegistrationEmail(userEmail, userName);
            console.log('[Circle] Confirmation email sent to:', userEmail);
          } catch (emailError) {
            console.error('[Circle] Failed to send confirmation email:', emailError);
            // Don't fail the submission if email fails
          }
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        initialTab={authInitialTab}
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
            The Circle — <span className="gradient-gold">Registration</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed max-w-3xl mx-auto"
          >
            Individuals seeking inclusion must submit structured documentation.
            All submissions undergo review before publication.
          </motion.p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium max-w-4xl">
          {/* Program Framing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-2xl text-white mb-4">Circle Membership</h2>
            <div className="w-24 h-[1px] bg-[#C5A85C] mx-auto mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed">
              Structured pathway for individuals to join The Circle community.
              Share your journey and connection with the work.
            </p>
          </motion.div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-[#C5A85C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Submission Received</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-8">
                Your registration has been submitted for review. All submissions undergo
                moderation before publication. You will be contacted if additional
                information is required.
              </p>
              <Link
                href="/the-circle/members-directory"
                className="inline-flex items-center text-[#C5A85C] hover:text-white transition-colors"
              >
                <span>View Directory</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ) : !user ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-[#C5A85C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Sign In Required</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-8">
                You must be signed in to register for The Circle. Please sign in or create an account to continue.
              </p>
              <button
                onClick={() => {
                  setAuthInitialTab("signin");
                  setIsAuthModalOpen(true);
                }}
                className="px-8 py-3 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)]"
              >
                Sign In
              </button>
            </motion.div>
          ) : alreadySubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-[#C5A85C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Already Registered</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-8">
                You have already submitted a registration for The Circle. Your submission is being reviewed or has been approved.
              </p>
              <Link
                href="/the-circle/members-directory"
                className="inline-flex items-center text-[#C5A85C] hover:text-white transition-colors"
              >
                <span>View Directory</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-10"
            >
              {/* Personal Information Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden"
              >
                {/* Section Header */}
                <div className="bg-[#1C2340] px-8 py-5 border-b border-[#C5A85C]/15">
                  <div className="flex items-center gap-3">
                    <div className="text-[#C5A85C]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg text-white">Personal Information</h3>
                  </div>
                </div>

                {/* Section Fields */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        {...register("fullName", { required: "Full Name is required" })}
                        disabled={!!user}
                        className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all ${errors.fullName ? 'border-red-500/40' : ''} ${user ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                      {user && (
                        <p className="text-[#C5A85C] text-xs">Your name ({user.full_name}) will be automatically used</p>
                      )}
                      {errors.fullName && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        Country
                      </label>
                      <div className="relative">
                        <select
                          {...register("country", { required: "Country is required" })}
                          onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            setValue("city", ""); // Reset city when country changes
                          }}
                          className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all appearance-none ${errors.country ? 'border-red-500/40' : ''}`}
                        >
                          <option value="">Select your country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.country && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.country.message}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                        City
                      </label>
                      <div className="relative">
                        <select
                          {...register("city", { required: "City is required" })}
                          disabled={!selectedCountry}
                          className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all appearance-none ${!selectedCountry ? 'opacity-50 cursor-not-allowed' : ''} ${errors.city ? 'border-red-500/40' : ''}`}
                        >
                          <option value="">Select your city</option>
                          {selectedCountry && citiesByCountry[selectedCountry]?.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {!selectedCountry && (
                        <p className="text-[#C5A85C] text-xs">Please select a country first</p>
                      )}
                      {errors.city && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          {...register("gender", { required: "Gender is required" })}
                          className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all appearance-none ${errors.gender ? 'border-red-500/40' : ''}`}
                        >
                          <option value="">Select gender</option>
                          {genders.map((gender) => (
                            <option key={gender.value} value={gender.value}>
                              {gender.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.gender && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.gender.message}
                        </p>
                      )}
                    </div>

                    {/* Profession */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        Profession
                      </label>
                      <div className="relative">
                        <select
                          {...register("profession", { required: "Profession is required" })}
                          className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all appearance-none ${errors.profession ? 'border-red-500/40' : ''}`}
                        >
                          <option value="">Select your profession</option>
                          {professions.map((profession) => (
                            <option key={profession.value} value={profession.value}>
                              {profession.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.profession && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.profession.message}
                        </p>
                      )}
                    </div>

                    {/* Year of First Connection */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        Year of First Connection
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 2020"
                        min="1900"
                        max={new Date().getFullYear()}
                        {...register("yearConnected", { required: "Year is required" })}
                        className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all ${errors.yearConnected ? 'border-red-500/40' : ''}`}
                      />
                      {errors.yearConnected && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.yearConnected.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Journey Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden"
              >
                {/* Section Header */}
                <div className="bg-[#1C2340] px-8 py-5 border-b border-[#C5A85C]/15">
                  <div className="flex items-center gap-3">
                    <div className="text-[#C5A85C]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg text-white">Your Journey</h3>
                  </div>
                </div>

                {/* Section Fields */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* First Encounter */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </span>
                        First Encounter
                      </label>
                      <textarea
                        placeholder="Describe how you first encountered the work..."
                        rows={4}
                        {...register("firstEncounter", { required: "First Encounter is required" })}
                        className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all resize-none ${errors.firstEncounter ? 'border-red-500/40' : ''}`}
                      />
                      {errors.firstEncounter && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.firstEncounter.message}
                        </p>
                      )}
                    </div>

                    {/* Resonated Quality */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </span>
                        Resonated Quality
                      </label>
                      <div className="relative">
                        <select
                          {...register("resonatedQuality", { required: "Resonated Quality is required" })}
                          className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all appearance-none ${errors.resonatedQuality ? 'border-red-500/40' : ''}`}
                        >
                          <option value="">Select a quality...</option>
                          {resonatedQualities.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.resonatedQuality && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.resonatedQuality.message}
                        </p>
                      )}
                    </div>

                    {/* Life Changes */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </span>
                        Life Changes
                      </label>
                      <textarea
                        placeholder="Describe any life changes experienced..."
                        rows={4}
                        {...register("lifeChanges", { required: "Life Changes is required" })}
                        className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all resize-none ${errors.lifeChanges ? 'border-red-500/40' : ''}`}
                      />
                      {errors.lifeChanges && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.lifeChanges.message}
                        </p>
                      )}
                    </div>

                    {/* Continuing Engagement */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                        <span className="text-[#C5A85C]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </span>
                        Continuing Engagement
                      </label>
                      <textarea
                        placeholder="Describe your ongoing participation or engagement..."
                        rows={4}
                        {...register("continuingEngagement", { required: "Continuing Engagement is required" })}
                        className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all resize-none ${errors.continuingEngagement ? 'border-red-500/40' : ''}`}
                      />
                      {errors.continuingEngagement && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.continuingEngagement.message}
                        </p>
                      )}
                    </div>

                    {/* Consent */}
                    <div className="space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox"
                            {...register("consent", { required: "You must consent to proceed" })}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-white/20 rounded peer-checked:border-[#C5A85C] peer-checked:bg-[#C5A85C] transition-all"></div>
                          <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-[#1C2340] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-[#C9CCD6] text-sm group-hover:text-white transition-colors">I consent to the processing of my information for review purposes</span>
                      </label>
                      {errors.consent && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.consent.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[length:200%_100%] animate-gradient"
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </motion.div>
            </motion.form>
          )}
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
