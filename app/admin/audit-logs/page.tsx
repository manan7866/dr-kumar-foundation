"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

export default function AdminAuditLogsPage() {
  const [filterAction, setFilterAction] = useState("all");

  const logs = [
    { id: "1", action: "LOGIN", entity_type: "User", entity_id: "user-123", user_email: "admin@drkumarfoundation.org", user_role: "super_admin", ip_address: "192.168.1.1", created_at: new Date().toISOString() },
    { id: "2", action: "APPROVE", entity_type: "Registration", entity_id: "reg-456", user_email: "admin@drkumarfoundation.org", user_role: "super_admin", ip_address: "192.168.1.1", created_at: new Date().toISOString() },
  ];

  const filteredLogs = logs.filter((log) => filterAction === "all" || log.action === filterAction);

  const actionColors: Record<string, string> = {
    CREATE: "bg-green-500/20 text-green-400",
    UPDATE: "bg-blue-500/20 text-blue-400",
    DELETE: "bg-red-500/20 text-red-400",
    APPROVE: "bg-amber-500/20 text-amber-400",
    REJECT: "bg-red-500/20 text-red-400",
    LOGIN: "bg-purple-500/20 text-purple-400",
    LOGOUT: "bg-gray-500/20 text-gray-400",
  };

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">Audit Logs</h2>
          <p className="text-[#AAB3CF] text-sm sm:text-base">System activity tracking and compliance</p>
        </div>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C]/60 text-sm sm:w-auto w-full"
        >
          <option value="all">All Actions</option>
          <option value="CREATE">Create</option>
          <option value="UPDATE">Update</option>
          <option value="DELETE">Delete</option>
          <option value="APPROVE">Approve</option>
          <option value="LOGIN">Login</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Action</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Entity</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">User</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">IP Address</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-[#1C2340]/50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${actionColors[log.action] || "bg-gray-500/20 text-gray-400"}`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                  {log.entity_type} <span className="text-xs text-[#AAB3CF]/60">({log.entity_id})</span>
                </td>
                <td className="px-6 py-4 text-[#AAB3CF] text-sm">{log.user_email}</td>
                <td className="px-6 py-4">
                  <code className="text-[#AAB3CF] text-xs font-mono">{log.ip_address}</code>
                </td>
                <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredLogs.map((log) => (
          <div key={log.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full ${actionColors[log.action] || "bg-gray-500/20 text-gray-400"}`}>
                {log.action}
              </span>
              <span className="text-[#AAB3CF] text-xs">{new Date(log.created_at).toLocaleDateString()}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-[#AAB3CF] text-xs uppercase">Entity</span>
                <div className="text-white">{log.entity_type} <span className="text-xs text-[#AAB3CF]/60">({log.entity_id})</span></div>
              </div>
              <div>
                <span className="text-[#AAB3CF] text-xs uppercase">User</span>
                <div className="text-white">{log.user_email}</div>
              </div>
              <div>
                <span className="text-[#AAB3CF] text-xs uppercase">IP Address</span>
                <div className="text-white font-mono text-xs">{log.ip_address}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
