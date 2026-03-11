"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import NotificationBell from "../components/NotificationBell";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email: string; full_name: string } | null>(null);
  const [hasProgram, setHasProgram] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage for user session
        const localSession = localStorage.getItem("user_session");
        if (localSession) {
          try {
            const userData = JSON.parse(localSession);
            console.log('[Dashboard] User from localStorage:', userData);
            setUser(userData);

            // Check if user has a program using their unique ID
            const programResponse = await fetch(`/api/user-programs?user_id=${userData.id}`);
            if (programResponse.ok) {
              const programs = await programResponse.json();
              console.log('[Dashboard] User programs:', programs);
              setHasProgram(programs.length > 0);
            }

            setIsLoading(false);
            return;
          } catch {
            localStorage.removeItem("user_session");
          }
        }

        // If no local session, try server session
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          router.push("/");
          return;
        }
        const userData = await response.json();
        console.log('[Dashboard] User from server:', userData);
        setUser(userData);
        
        // Store in localStorage for future requests
        localStorage.setItem("user_session", JSON.stringify(userData));

        // Check if user has a program using their unique ID
        const programResponse = await fetch(`/api/user-programs?user_id=${userData.id}`);
        if (programResponse.ok) {
          const programs = await programResponse.json();
          console.log('[Dashboard] User programs (server):', programs);
          setHasProgram(programs.length > 0);
        }
      } catch (error) {
        console.error('[Dashboard] Auth check error:', error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="bg-[#1C2340] min-h-screen">
        <PremiumHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#AAB3CF]">Loading...</p>
          </div>
        </div>
        <PremiumFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#1C2340]  min-h-screen">
      <div className="flex items-center  justify-between px-4 lg:px-8 py-3 lg:py-4 bg-[#1C2340] border-b border-[#C5A85C]/20">
        <div className="flex-1">
          
        </div>
        <div className="flex items-center absolute top-16 right-8 gap-2 lg:gap-4">
          {hasProgram && user && (
            <div className="relative">
              <NotificationBell userId={user.id} />
            </div>
          )}
          {/* <Link href="/" className="hidden sm:block text-[#AAB3CF] hover:text-white text-sm whitespace-nowrap">
            View Site →
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              localStorage.removeItem("user_session");
              router.push("/");
            }}
            className="text-[#AAB3CF] hover:text-red-400 text-sm whitespace-nowrap"
          >
            Logout
          </button> */}
        </div>
      </div>
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
            Welcome to Your
            <br />
            <span className="gradient-gold">Dashboard</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed"
          >
            Manage your account and explore opportunities.
          </motion.p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 mb-8">
            <h2 className="font-serif text-2xl text-white mb-2">
              Hello, {user?.full_name || 'User'}
            </h2>
            <p className="text-[#AAB3CF]">{user?.email}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C5A85C]/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white">Profile</h3>
              </div>
              <Link href="/profile" className="text-[#AAB3CF] hover:text-[#C5A85C] transition-colors text-sm">
                Update Profile →
              </Link>
            </div>

            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C5A85C]/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white">Security</h3>
              </div>
              <Link href="/security" className="text-[#AAB3CF] hover:text-[#C5A85C] transition-colors text-sm">
                Security Settings →
              </Link>
            </div>

            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C5A85C]/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white">Activity</h3>
              </div>
              <Link href="/activity" className="text-[#AAB3CF] hover:text-[#C5A85C] transition-colors text-sm">
                View Activity →
              </Link>
            </div>
          </div>

          {/* Contributions Section - Only show if user has a program */}
          {hasProgram && (
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl text-white mb-2">My Contributions</h2>
                  <p className="text-[#AAB3CF] text-sm">Track and submit your monthly activities</p>
                </div>
                <Link
                  href="/dashboard/contribute"
                  className="px-6 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium"
                >
                  Submit Contribution
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/dashboard/contributions"
                  className="bg-[#1C2340] border border-white/10 rounded-xl p-6 hover:border-[#C5A85C]/40 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#C5A85C]/10 rounded-full flex items-center justify-center group-hover:bg-[#C5A85C]/20 transition-all">
                      <svg className="w-5 h-5 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg text-white">View All Contributions</h3>
                  </div>
                  <p className="text-[#AAB3CF] text-sm">See your submission history and status</p>
                </Link>
                <Link
                  href="/activity"
                  className="bg-[#1C2340] border border-white/10 rounded-xl p-6 hover:border-[#C5A85C]/40 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg text-white">My Activities</h3>
                  </div>
                  <p className="text-[#AAB3CF] text-sm">View your program activities and engagement</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
