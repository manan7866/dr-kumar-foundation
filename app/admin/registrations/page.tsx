"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Registration {
  id: string;
  full_name: string;
  country: string;
  city? : string;
  gender?: string;
  profession: string;
  year_connected: number;
  resonated_quality: string;
  first_encounter: string;
  life_changes: string;
  continuing_engagement: string;
  review_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchRegistrations();
  }, [filter]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations?status=${filter}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations/${id}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchRegistrations();
        setSelectedRegistration(null);
      }
    } catch (error) {
      console.error('Failed to approve registration:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this registration?')) return;
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations/${id}/reject`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRegistrations();
        setSelectedRegistration(null);
      }
    } catch (error) {
      console.error('Failed to reject registration:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRegistrations();
        setSelectedRegistration(null);
      }
    } catch (error) {
      console.error('Failed to delete registration:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white mb-2">Circle Member Requests</h2>
        <p className="text-[#AAB3CF] text-sm sm:text-base">Review and manage Circle membership submissions</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 lg:mb-8">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all capitalize whitespace-nowrap ${
              filter === status
                ? 'bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] shadow-lg shadow-[#C5A85C]/30'
                : 'bg-[#232B52] text-[#AAB3CF] hover:text-white hover:bg-[#232B52]/80 border border-[#C5A85C]/20'
            }`}
          >
            {status}
            {status === 'pending' && (
              <span className="ml-2 px-2 py-0.5 bg-[#1C2340]/20 rounded-full text-xs">
                {registrations.filter(r => r.review_status === 'pending').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {[
          { label: 'Total Requests', value: registrations.length, textColor: 'text-blue-400' },
          { label: 'Pending Review', value: registrations.filter(r => r.review_status === 'pending').length, textColor: 'text-amber-400' },
          { label: 'Approved', value: registrations.filter(r => r.review_status === 'approved').length, textColor: 'text-green-400' },
          { label: 'Rejected', value: registrations.filter(r => r.review_status === 'rejected').length, textColor: 'text-red-400' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4"
          >
            <div className={`text-2xl sm:text-3xl lg:text-4xl font-serif ${stat.textColor} mb-2`}>{stat.value}</div>
            <div className="text-[#AAB3CF] text-xs sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Name</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Country/city</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Profession</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Year</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Submitted</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
                <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#AAB3CF]">Loading registrations...</p>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#AAB3CF]">
                    No {filter !== 'all' ? filter : ''} registrations found
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-[#1C2340]/50 transition-all cursor-pointer"
                    onClick={() => setSelectedRegistration(reg)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#C5A85C]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#C5A85C] font-serif text-xs sm:text-sm font-bold">
                            {reg.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </span>
                        </div>
                        <div className="text-white font-medium">{reg.full_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">{reg.country}{reg.city ? " / " + reg.city : ""}</td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">{reg.profession}</td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">{reg.year_connected}</td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">{formatDate(reg.created_at)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.review_status)}`}>
                        {reg.review_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {reg.review_status === 'pending' && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleApprove(reg.id); }}
                              disabled={actionLoading === reg.id}
                              className="px-3 py-1.5 text-xs font-medium bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all disabled:opacity-50"
                            >
                              {actionLoading === reg.id ? '...' : 'Approve'}
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReject(reg.id); }}
                              disabled={actionLoading === reg.id}
                              className="px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50"
                            >
                              {actionLoading === reg.id ? '...' : 'Reject'}
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedRegistration(reg); }}
                          className="px-3 py-1.5 text-xs font-medium bg-[#C5A85C]/10 text-[#C5A85C] rounded-lg hover:bg-[#C5A85C]/20 transition-all"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="text-center text-[#AAB3CF] py-12">Loading registrations...</div>
        ) : registrations.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No registrations found</div>
        ) : (
          registrations.map((reg) => (
            <div
              key={reg.id}
              className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4"
              onClick={() => setSelectedRegistration(reg)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#C5A85C]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C5A85C] font-serif text-sm font-bold">
                    {reg.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{reg.full_name}</div>
                  <div className="text-[#AAB3CF] text-sm">{reg.profession} • {reg.country}{reg.city ? " / " + reg.city : ""}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.review_status)}`}>
                  {reg.review_status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[#AAB3CF] text-xs mb-3">
                <span>Year: {reg.year_connected}</span>
                <span>{formatDate(reg.created_at)}</span>
              </div>
              {reg.review_status === 'pending' && (
                <div className="flex gap-2 pt-3 border-t border-[#C5A85C]/10">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleApprove(reg.id); }}
                    disabled={actionLoading === reg.id}
                    className="flex-1 py-2 text-xs font-medium bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all disabled:opacity-50"
                  >
                    {actionLoading === reg.id ? 'Processing...' : 'Approve'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleReject(reg.id); }}
                    disabled={actionLoading === reg.id}
                    className="flex-1 py-2 text-xs font-medium bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50"
                  >
                    {actionLoading === reg.id ? 'Processing...' : 'Reject'}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setSelectedRegistration(null)}
        >
          <div
            className="bg-[#232B52] border border-[#C5A85C]/20 w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#232B52] z-10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C5A85C]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C5A85C] font-serif text-sm sm:text-lg font-bold">
                    {selectedRegistration.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-serif text-base sm:text-lg truncate">{selectedRegistration.full_name}</h3>
                  <p className="text-[#AAB3CF] text-xs sm:text-sm truncate">{selectedRegistration.profession} • {selectedRegistration.country}{selectedRegistration.city ? " / " + selectedRegistration.city : ""}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-[#AAB3CF] hover:text-white transition-colors p-2"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#C5A85C] text-xs uppercase mb-2 font-semibold">First Encounter</h4>
                  <p className="text-[#C9CCD6] leading-relaxed bg-[#1C2340]/50 rounded-xl p-4 border border-[#C5A85C]/10 text-sm sm:text-base">
                    {selectedRegistration.first_encounter}
                  </p>
                </div>

                <div>
                  <h4 className="text-[#C5A85C] text-xs uppercase mb-2 font-semibold">Resonated Quality</h4>
                  <p className="text-white bg-[#1C2340]/50 rounded-xl px-4 py-3 border border-[#C5A85C]/10 text-sm sm:text-base">
                    {selectedRegistration.resonated_quality.replace(/_/g, ' ')}
                  </p>
                </div>

                <div>
                  <h4 className="text-[#C5A85C] text-xs uppercase mb-2 font-semibold">Life Changes</h4>
                  <p className="text-[#C9CCD6] leading-relaxed bg-[#1C2340]/50 rounded-xl p-4 border border-[#C5A85C]/10 text-sm sm:text-base">
                    {selectedRegistration.life_changes}
                  </p>
                </div>

                <div>
                  <h4 className="text-[#C5A85C] text-xs uppercase mb-2 font-semibold">Continuing Engagement</h4>
                  <p className="text-[#C9CCD6] leading-relaxed bg-[#1C2340]/50 rounded-xl p-4 border border-[#C5A85C]/10 text-sm sm:text-base">
                    {selectedRegistration.continuing_engagement}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-[#C5A85C]/20 flex flex-col sm:flex-row justify-between items-center gap-3 sticky bottom-0 bg-[#232B52]">
              {selectedRegistration.review_status === 'pending' && (
                <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                  <button
                    onClick={() => handleReject(selectedRegistration.id)}
                    disabled={actionLoading === selectedRegistration.id}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 border border-red-500/40 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-50"
                  >
                    {actionLoading === selectedRegistration.id ? 'Processing...' : 'Reject'}
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRegistration.id)}
                    disabled={actionLoading === selectedRegistration.id}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50"
                  >
                    {actionLoading === selectedRegistration.id ? 'Processing...' : 'Approve'}
                  </button>
                </div>
              )}
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                <button
                  onClick={() => handleDelete(selectedRegistration.id)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-[#AAB3CF] text-sm font-medium hover:text-red-400 transition-all"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 border border-white/20 text-[#C9CCD6] text-sm font-medium rounded-lg hover:border-[#C5A85C] transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
