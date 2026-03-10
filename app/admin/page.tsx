"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminLayout from "./components/AdminLayout";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    full_name: string;
    role: string;
  } | null>(null);
  const [stats, setStats] = useState({
    pendingEngagements: 0,
    pendingRegistrations: 0,
    totalMembers: 0,
    activePrograms: 0,
  });

  useEffect(() => {
    const checkSession = () => {
      const session = localStorage.getItem("admin_session");
      if (!session) {
        router.push("/admin/login");
        return;
      }
      const userData = JSON.parse(session);
      
      // Only super_admin can access main dashboard
      if (userData.role !== 'super_admin') {
        // Redirect moderators to their allowed pages
        if (userData.role === 'moderator') {
          router.push("/admin/engagement");
        } else {
          router.push("/");
        }
        return;
      }
      
      setUser(userData);
      setIsLoading(false);
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use cookies for authentication (automatically sent by browser)
        const response = await fetch("/api/admin/stats", {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          // Fetch engagement count separately
          const engagementResponse = await fetch("/api/admin/engagement?status=pending", {
            credentials: 'include',
          });
          if (engagementResponse.ok) {
            const engagements = await engagementResponse.json();
            setStats({
              pendingEngagements: engagements.length,
              pendingRegistrations: data.pendingRegistrations || 0,
              totalMembers: data.totalMembers || 0,
              activePrograms: 7, // Static for now (program types)
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    if (!isLoading) {
      fetchStats();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#161B33] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">
          Welcome back, {user.full_name}
        </h2>
        <p className="text-[#AAB3CF]">
          Here's what's happening with the foundation today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Pending Engagement Requests", value: stats.pendingEngagements },
          { label: "Pending Circle Registrations", value: stats.pendingRegistrations },
          { label: "Total Members", value: stats.totalMembers },
          { label: "Active Programs", value: stats.activePrograms },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 hover:border-[#C5A85C]/30 transition-all duration-300"
          >
            <div className="text-4xl font-serif text-[#C5A85C] mb-2">{stat.value}</div>
            <div className="text-[#AAB3CF] text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6"
      >
        <h3 className="font-serif text-xl text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/engagement" className="flex flex-col items-center justify-center p-4 bg-[#1C2340] rounded-xl hover:bg-[#1C2340]/80 transition-all group">
            <svg className="w-6 h-6 text-[#C5A85C] mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#AAB3CF] text-sm">Approve Requests</span>
          </a>
          <a href="/admin/members" className="flex flex-col items-center justify-center p-4 bg-[#1C2340] rounded-xl hover:bg-[#1C2340]/80 transition-all group">
            <svg className="w-6 h-6 text-[#C5A85C] mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="text-[#AAB3CF] text-sm">Add Member</span>
          </a>
          <a href="/admin/programs" className="flex flex-col items-center justify-center p-4 bg-[#1C2340] rounded-xl hover:bg-[#1C2340]/80 transition-all group">
            <svg className="w-6 h-6 text-[#C5A85C] mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-[#AAB3CF] text-sm">New Program</span>
          </a>
          <a href="/admin/audit-logs" className="flex flex-col items-center justify-center p-4 bg-[#1C2340] rounded-xl hover:bg-[#1C2340]/80 transition-all group">
            <svg className="w-6 h-6 text-[#C5A85C] mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[#AAB3CF] text-sm">View Logs</span>
          </a>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
