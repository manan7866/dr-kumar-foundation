"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface EngagementRequest {
  id: string;
  program_type: string;
  form_type: string;
  payload: string;
  status: string;
  created_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export default function AdminEngagementPage() {
  const [filter, setFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<EngagementRequest | null>(null);
  const [requests, setRequests] = useState<EngagementRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      if (filter !== "all") params.set("status", filter);

      const response = await fetch(`/api/admin/engagement?${params}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch engagement requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/engagement/${id}/approve`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRequests();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error("Failed to approve engagement request:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this engagement request?")) return;
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/engagement/${id}/reject`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRequests();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error("Failed to reject engagement request:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this engagement request?")) return;
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/engagement/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRequests();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error("Failed to delete engagement request:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-400",
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
    reviewed: "bg-blue-500/20 text-blue-400",
  };

  const getPayload = (payloadString: string) => {
    try {
      return JSON.parse(payloadString);
    } catch {
      return {};
    }
  };

  const formatProgramName = (programType: string) => {
    return programType.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">Engagement Requests</h2>
          <p className="text-[#AAB3CF] text-sm sm:text-base">Review and manage program engagement submissions</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C]/60 text-sm sm:w-auto w-full"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="reviewed">Reviewed</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
        {[
          { label: "Pending", value: requests.filter((r) => r.status === "pending").length },
          { label: "Approved", value: requests.filter((r) => r.status === "approved").length },
          { label: "Rejected", value: requests.filter((r) => r.status === "rejected").length },
          { label: "Total", value: requests.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-2xl sm:text-3xl font-serif text-white mb-1">{stat.value}</div>
            <div className="text-[#AAB3CF] text-xs sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[#AAB3CF]">Loading engagement requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12 text-[#AAB3CF]">No engagement requests found</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Name</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Program</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Type</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Country</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {filteredRequests.map((request) => {
                const payload = getPayload(request.payload);
                return (
                  <tr key={request.id} className="hover:bg-[#1C2340]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{payload.fullName || "N/A"}</div>
                        <div className="text-[#AAB3CF] text-sm">{payload.email || "N/A"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">{formatProgramName(request.program_type)}</td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm capitalize">{request.form_type}</td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">{payload.country || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${statusColors[request.status]}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-[#C5A85C] hover:text-white text-sm transition-colors font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <div className="text-center text-[#AAB3CF] py-12">Loading...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No requests found</div>
        ) : (
          filteredRequests.map((request) => {
            const payload = getPayload(request.payload);
            return (
              <div
                key={request.id}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{payload.fullName || "N/A"}</div>
                    <div className="text-[#AAB3CF] text-sm truncate">{payload.email || "N/A"}</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[request.status]}`}>
                    {request.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-[#AAB3CF] text-xs mb-3">
                  <span>{formatProgramName(request.program_type)}</span>
                  <span>•</span>
                  <span>{payload.country || "N/A"}</span>
                </div>
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="w-full py-2.5 text-sm border border-[#C5A85C]/40 text-[#C5A85C] hover:bg-[#C5A85C]/10 transition-colors rounded-lg font-medium"
                >
                  View Details
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 rounded-xl lg:rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b border-[#C5A85C]/10 flex items-center justify-between sticky top-0 bg-[#232B52] z-10">
                <h3 className="font-serif text-lg sm:text-xl text-white">Request Details</h3>
                <button onClick={() => setSelectedRequest(null)} className="text-[#AAB3CF] hover:text-white p-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                {(() => {
                  const payload = getPayload(selectedRequest.payload);
                  return (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[#AAB3CF] text-xs uppercase">Full Name</label>
                          <p className="text-white mt-1">{payload.fullName || "N/A"}</p>
                        </div>
                        <div>
                          <label className="text-[#AAB3CF] text-xs uppercase">Email</label>
                          <p className="text-white mt-1">{payload.email || "N/A"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[#AAB3CF] text-xs uppercase">Program</label>
                          <p className="text-white mt-1">{formatProgramName(selectedRequest.program_type)}</p>
                        </div>
                        <div>
                          <label className="text-[#AAB3CF] text-xs uppercase">Form Type</label>
                          <p className="text-white mt-1 capitalize">{selectedRequest.form_type}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[#AAB3CF] text-xs uppercase">Country</label>
                          <p className="text-white mt-1">{payload.country || "N/A"}</p>
                        </div>
                        <div>
                          <label className="text-[#AAB3CF] text-xs uppercase">Submitted</label>
                          <p className="text-white mt-1">{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {payload.professionalBackground && (
                        <div>
                          <label className="text-[#AAB3CF] text-xs uppercase">Professional Background</label>
                          <p className="text-white mt-1">{payload.professionalBackground}</p>
                        </div>
                      )}
                      {payload.proposedContribution && (
                        <div>
                          <label className="text-[#AAB3CF] text-xs uppercase">Proposed Contribution</label>
                          <p className="text-white mt-1">{payload.proposedContribution}</p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
              <div className="p-4 sm:p-6 border-t border-[#C5A85C]/10 flex flex-col sm:flex-row gap-3 justify-end sticky bottom-0 bg-[#232B52]">
                {selectedRequest.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleReject(selectedRequest.id)}
                      disabled={actionLoading === selectedRequest.id}
                      className="px-4 sm:px-6 py-2.5 sm:py-2 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-50 text-sm sm:text-base"
                    >
                      {actionLoading === selectedRequest.id ? "Processing..." : "Reject"}
                    </button>
                    <button
                      onClick={() => handleApprove(selectedRequest.id)}
                      disabled={actionLoading === selectedRequest.id}
                      className="px-4 sm:px-6 py-2.5 sm:py-2 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all disabled:opacity-50 text-sm sm:text-base"
                    >
                      {actionLoading === selectedRequest.id ? "Processing..." : "Approve"}
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(selectedRequest.id)}
                  className="px-4 sm:px-6 py-2.5 sm:py-2 text-[#AAB3CF] hover:text-red-400 transition-all text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
