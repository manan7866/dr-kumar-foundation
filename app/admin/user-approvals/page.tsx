"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";
import Image from "next/image";

interface User {
  id: string;
  email: string;
  avatar_url : string | null;
  full_name: string;
  role: string;
  is_active: boolean;
  approval_status?: string;
  created_at?: string;
}

export default function AdminUserApprovalsPage() {
  const [filter, setFilter] = useState("pending");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users?status=${filter}`);
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    setActionLoading(userId);
    try {
      const response = await fetch("/api/admin/users/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId));
      }
    } catch (error) {
      console.error("Error approving user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId: string) => {
    setActionLoading(userId);
    try {
      const response = await fetch("/api/admin/users/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId));
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to delete this user account?\n\nEmail: ${userEmail}\n\nThis action cannot be undone!`)) return;

    setActionLoading(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId));
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert('Error deleting user');
    } finally {
      setActionLoading(null);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-400",
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">User Approvals</h2>
          <p className="text-[#AAB3CF] text-sm sm:text-base">Review and manage user registration requests</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C]/60 text-sm sm:w-auto w-full"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-2xl sm:text-3xl font-serif text-amber-400 mb-1">
            {filter === "pending" ? users.length : "-"}
          </div>
          <div className="text-[#AAB3CF] text-xs sm:text-sm">Pending Approval</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-2xl sm:text-3xl font-serif text-green-400 mb-1">
            {filter === "approved" ? users.length : "-"}
          </div>
          <div className="text-[#AAB3CF] text-xs sm:text-sm">Approved Users</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-2xl sm:text-3xl font-serif text-red-400 mb-1">
            {filter === "rejected" ? users.length : "-"}
          </div>
          <div className="text-[#AAB3CF] text-xs sm:text-sm">Rejected</div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">User</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Role</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Registered</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#AAB3CF]">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
                  <p>Loading users...</p>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#AAB3CF]">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <p>No {filter} users found</p>
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {u.avatar_url ? (<Image src={u.avatar_url} alt={u.full_name || "User Avatar"} width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0" />) : (
                       <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C5A85C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                       <span className="text-[#C5A85C] font-serif text-xs sm:text-sm font-bold">
                         {u.full_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
                       </span>
                     </div>
                      )}
                      
                      <div className="min-w-0">
                        <div className="text-white font-medium truncate">{u.full_name || "Unknown"}</div>
                        <div className="text-[#AAB3CF] text-sm truncate">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#AAB3CF] text-sm capitalize">{u.role?.replace("_", " ") || "moderator"}</span>
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[u.approval_status || 'pending']}`}>
                      {(u.approval_status || 'pending').charAt(0).toUpperCase() + (u.approval_status || 'pending').slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {filter === "pending" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(u.id)}
                          disabled={actionLoading === u.id}
                          className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all text-xs sm:text-sm disabled:opacity-50 font-medium"
                        >
                          {actionLoading === u.id ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleReject(u.id)}
                          disabled={actionLoading === u.id}
                          className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-xs sm:text-sm disabled:opacity-50 font-medium"
                        >
                          {actionLoading === u.id ? "..." : "Reject"}
                        </button>
                      </div>
                    )}
                    {filter !== "pending" && (
                      <button
                        onClick={() => handleDelete(u.id, u.email)}
                        disabled={actionLoading === u.id}
                        className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-xs sm:text-sm disabled:opacity-50 flex items-center gap-1 sm:gap-2 font-medium"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="hidden sm:inline">{actionLoading === u.id ? "..." : "Delete"}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="text-center text-[#AAB3CF] py-12">
            <div className="w-12 h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">
            <svg className="w-12 h-12 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p>No {filter} users found</p>
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-[#C5A85C]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C5A85C] font-serif text-sm font-bold">
                    {u.full_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{u.full_name || "Unknown"}</div>
                  <div className="text-[#AAB3CF] text-sm truncate">{u.email}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[#AAB3CF] text-xs capitalize">{u.role?.replace("_", " ") || "moderator"}</span>
                    <span className="text-[#AAB3CF] text-xs">•</span>
                    <span className="text-[#AAB3CF] text-xs">{u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[u.approval_status || 'pending']}`}>
                  {(u.approval_status || 'pending').charAt(0).toUpperCase() + (u.approval_status || 'pending').slice(1)}
                </span>
              </div>
              {filter === "pending" ? (
                <div className="flex gap-2 pt-3 border-t border-[#C5A85C]/10">
                  <button
                    onClick={() => handleApprove(u.id)}
                    disabled={actionLoading === u.id}
                    className="flex-1 py-2.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all text-sm font-medium disabled:opacity-50"
                  >
                    {actionLoading === u.id ? "Approving..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(u.id)}
                    disabled={actionLoading === u.id}
                    className="flex-1 py-2.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-medium disabled:opacity-50"
                  >
                    {actionLoading === u.id ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleDelete(u.id, u.email)}
                  disabled={actionLoading === u.id}
                  className="w-full py-2.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {actionLoading === u.id ? "Deleting..." : "Delete User"}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Info Banner */}
      {filter === "pending" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4 sm:p-6"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-serif text-white text-sm sm:text-base mb-2">User Approval Process</h4>
              <p className="text-[#AAB3CF] text-xs sm:text-sm leading-relaxed">
                All new user registrations are set to <span className="text-amber-400">Pending</span> status by default.
                Users cannot access the admin dashboard until their account is <span className="text-green-400">Approved</span>.
                Rejected accounts remain in the system but cannot log in. All approval actions are logged in the audit trail.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AdminLayout>
  );
}
