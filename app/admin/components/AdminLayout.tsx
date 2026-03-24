"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string | null;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Get user data from localStorage
  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (error) {
        console.error("Failed to parse session:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    localStorage.removeItem("user_session");
    window.location.href = "/admin/login";
  };

  const userRole = user?.role || "";
  const userName = user?.full_name || "";
  const userEmail = user?.email || "";
  const avatar_url = user?.avatar_url;

  const navItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "User Approvals",
      href: "/admin/user-approvals",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      roles: ["super_admin"],
    },
    {
      label: "Engagement Requests",
      href: "/admin/engagement",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      roles: ["super_admin", "moderator"],
    },
    {
      label: "Circle Member Requests",
      href: "/admin/registrations",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      roles: ["super_admin", "moderator"],
    },
    {
      label: "Contributions",
      href: "/admin/contributions",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      roles: ["super_admin", "moderator"],
    },
    {
      label: "Tasks",
      href: "/admin/tasks",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      roles: ["super_admin", "moderator"],
    },
    {
      label: "Circle Members",
      href: "/admin/members",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      roles: ["super_admin", "moderator"],
    },
    {
      label: "Programs",
      href: "/admin/programs",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      roles: ["super_admin", "moderator"],
    },
    {
      label: "Global Presence",
      href: "/admin/global-presence",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      roles: ["super_admin"],
    },
    {
      label: "Governance",
      href: "/admin/governance",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      roles: ["super_admin"],
    },
    {
      label: "Research Archive",
      href: "/admin/research",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      roles: ["super_admin"],
    },
    {
      label: "Quotes",
      href: "/admin/quotes",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      roles: ["super_admin"],
    },
    {
      label: "Audit Logs",
      href: "/admin/audit-logs",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      roles: ["super_admin"],
    },
    {
      label: "User Management",
      href: "/admin/users",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      roles: ["super_admin"],
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      roles: ["super_admin"],
    },
    {
      label: "Profile Settings",
      href: "/admin/profile",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      roles: ["super_admin", "moderator", "contributor"],
    },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  });

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#161B33]">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#161B33] border-r border-[#C5A85C]/20 transition-all duration-300 z-50 ${
          isMobile
            ? isSidebarOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full"
            : isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-6 border-b border-[#C5A85C]/20">
          <div className="flex items-center gap-3">
            <div className=" rounded-lg flex items-center justify-center flex-shrink-0">
            <Image alt="LOGO" height={50} width={50} src="/dkf_logo_21.png" className="pt-2" />
            </div>
            {(!isCollapsed || isMobile) && (
              <span className="text-[#C5A85C] font-serif text-base lg:text-lg font-bold truncate">        
                Admin
              </span>
            )}
          </div>
          <button
            onClick={() => isMobile ? setIsSidebarOpen(false) : setIsCollapsed(!isCollapsed)}
            className="text-[#AAB3CF] hover:text-white transition-colors p-1 lg:p-2 rounded-lg hover:bg-white/5"
            aria-label={isMobile ? "Close menu" : isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isMobile ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 lg:p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-180px)] scrollbar-hide">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-[#C5A85C]/10 text-[#C5A85C] border-l-2 border-[#C5A85C]"
                    : "text-[#AAB3CF] hover:text-white hover:bg-white/5"
                } ${isCollapsed && !isMobile && "justify-center px-2"}`}
                title={isCollapsed && !isMobile ? item.label : undefined}
              >
                <span className={`${isActive ? "text-[#C5A85C]" : "text-[#AAB3CF] group-hover:text-white"} flex-shrink-0`}>
                  {item.icon}
                </span>
                {(!isCollapsed || isMobile) && (
                  <span className="text-xs lg:text-sm font-medium truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info - Only show when expanded or on mobile */}
        {(!isCollapsed || isMobile) && (
          <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-[#C5A85C]/20 bg-[#161B33]">
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="px-3 py-2 bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-2" aria-label="Logout">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isMobile ? "ml-0" : isCollapsed ? "ml-20" : "ml-64"
      }`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 lg:h-20 bg-[#1C2340]/95 backdrop-blur-sm border-b border-[#C5A85C]/20 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-[#AAB3CF] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-white font-serif text-lg lg:text-2xl truncate max-w-[200px] sm:max-w-none">
                {navItems.find(item => item.href === pathname)?.label || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <Link
              href="/"
              className="hidden sm:inline-flex py-2 px-2 bg-[#C5A85C] text-black rounded-xl hover:text-white transition-colors text-xs lg:text-sm"
            >
             ← View Site
            </Link>
            <div className=" p-3 lg:p-4 border-t border-[#C5A85C]/20 bg-[#161B33]">
            <div className="flex items-center gap-3">
              {avatar_url ? (<Image alt="user image" height={50} width={50} src={avatar_url} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0"  />) : (
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#C5A85C]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#C5A85C] font-serif text-xs lg:text-sm font-bold">
                  {userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </span>
              </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-white text-xs lg:text-sm font-medium truncate">{userName}</p>
                <p className="text-[#AAB3CF] text-[10px] lg:text-xs truncate capitalize">{(userRole || "").replace("_", " ")}</p>
              </div>
            </div>
          </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
