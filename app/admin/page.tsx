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
    avatar_url?: string | null;
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

      // If avatar_url is missing, fetch fresh user data from database
      if (userData.avatar_url === undefined || userData.avatar_url === null) {
        fetch(`/api/admin/me?user_id=${userData.id}`)
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (data && data.user) {
              const updatedUser = { ...userData, avatar_url: data.user.avatar_url };
              localStorage.setItem("admin_session", JSON.stringify(updatedUser));
              setUser(updatedUser);
            } else {
              setUser(userData);
            }
            setIsLoading(false);
          })
          .catch(() => {
            setUser(userData);
            setIsLoading(false);
          });
      } else {
        setUser(userData);
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats", {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          const engagementResponse = await fetch("/api/admin/engagement?status=pending", {
            credentials: 'include',
          });
          if (engagementResponse.ok) {
            const engagements = await engagementResponse.json();
            setStats({
              pendingEngagements: engagements.length,
              pendingRegistrations: data.pendingRegistrations || 0,
              totalMembers: data.totalMembers || 0,
              activePrograms: 7,
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
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Welcome Section */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-serif text-white mb-2">
          Welcome back, {user?.full_name || 'Admin'}
        </h1>
        <p className="text-[#AAB3CF] text-sm lg:text-base">
          Here's what's happening with your programs today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {[
          {
            label: "Pending Engagements",
            value: stats.pendingEngagements,
            icon: (
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
            href: "/admin/engagement",
          },
          {
            label: "Circle Requests",
            value: stats.pendingRegistrations,
            icon: (
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            ),
            href: "/admin/registrations",
          },
          {
            label: "Total Members",
            value: stats.totalMembers,
            icon: (
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ),
            href: "/admin/members",
          },
          {
            label: "Active Programs",
            value: stats.activePrograms,
            icon: (
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            ),
            href: "/admin/programs",
          },
        ].map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-[#C5A85C]/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="text-[#C5A85C] group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl lg:text-4xl font-bold text-white">
                {stat.value}
              </div>
            </div>
            <div className="text-[#AAB3CF] text-xs lg:text-sm">{stat.label}</div>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-serif text-white mb-4 lg:mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {[
            { label: "Review Engagements", href: "/admin/engagement", color: "bg-[#C5A85C]/10 text-[#C5A85C] hover:bg-[#C5A85C]/20" },
            { label: "Approve Members", href: "/admin/registrations", color: "bg-[#C5A85C]/10 text-[#C5A85C] hover:bg-[#C5A85C]/20" },
            { label: "Manage Programs", href: "/admin/programs", color: "bg-[#C5A85C]/10 text-[#C5A85C] hover:bg-[#C5A85C]/20" },
            { label: "View Governance", href: "/admin/governance", color: "bg-[#1C2340] text-[#AAB3CF] hover:text-white" },
            { label: "Global Presence", href: "/admin/global-presence", color: "bg-[#1C2340] text-[#AAB3CF] hover:text-white" },
            { label: "Audit Logs", href: "/admin/audit-logs", color: "bg-[#1C2340] text-[#AAB3CF] hover:text-white" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`${action.color} rounded-lg lg:rounded-xl p-3 lg:p-4 text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105`}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
