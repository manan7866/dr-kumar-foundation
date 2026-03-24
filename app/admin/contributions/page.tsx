"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Contribution {
  id: string;
  user_name: string;
  user_email: string;
  program_type: string;
  title: string;
  activity_date: string;
  venue_city: string;
  venue_country: string;
  participant_count: number;
  participant_phones: string;
  task_conducted: string;
  results: string;
  status: string;
  admin_comment?: string;
  submitted_at: string;
}

interface MonthlyData {
  month: string;
  count: number;
  approved: number;
  pending: number;
  rejected: number;
}

const programNames: Record<string, string> = {
  'healing-initiatives': 'Healing Initiatives',
  'environmental-programs': 'Environmental Programs',
  'youth-engagement': 'Youth Engagement',
  'sufi-music': 'Sufi Music',
  'sufi-ecommerce': 'Sufi Ecommerce',
  'sufi-science': 'Sufi Science',
  'interfaith-program': 'Interfaith Program',
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AdminContributionsPage() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [adminComment, setAdminComment] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@dkf.sufisciencecenter.info", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@dkf.sufisciencecenter.info", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchContributions();
  }, [statusFilter, programFilter]);

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      params.set('status', statusFilter);
      if (programFilter !== 'all') params.set('program_type', programFilter);

      const response = await fetch(`/api/admin/contributions?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setContributions(data);

        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        const monthlyCounts: Record<string, { count: number; approved: number; pending: number; rejected: number }> = {};

        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          monthlyCounts[key] = { count: 0, approved: 0, pending: 0, rejected: 0 };
        }

        data.forEach((c: Contribution) => {
          const date = new Date(c.submitted_at);
          if (date >= sixMonthsAgo) {
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            if (monthlyCounts[key]) {
              monthlyCounts[key].count++;
              if (c.status === 'approved') monthlyCounts[key].approved++;
              else if (c.status === 'pending') monthlyCounts[key].pending++;
              else if (c.status === 'rejected') monthlyCounts[key].rejected++;
            }
          }
        });

        const monthlyArray: MonthlyData[] = Object.entries(monthlyCounts)
          .map(([key, data]) => {
            const [year, month] = key.split('-').map(Number);
            return {
              month: monthNames[month],
              count: data.count,
              approved: data.approved,
              pending: data.pending,
              rejected: data.rejected,
            };
          });

        setMonthlyData(monthlyArray);
      }
    } catch (error) {
      console.error('Failed to fetch contributions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/contributions/${id}/review`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          adminComment,
          adminId: user.id,
          programType: selectedContribution?.program_type,
        }),
      });

      if (response.ok) {
        fetchContributions();
        setSelectedContribution(null);
        setAdminComment('');
      }
    } catch (error) {
      console.error('Failed to review contribution:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contribution? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/contributions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchContributions();
        setSelectedContribution(null);
      } else {
        alert('Failed to delete contribution');
      }
    } catch (error) {
      console.error('Failed to delete contribution:', error);
      alert('Error deleting contribution');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      case 'revision_requested': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredContributions = contributions.filter(c => {
    const matchesSearch = c.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white mb-2">Contribution Reviews</h2>
        <p className="text-[#AAB3CF] text-sm sm:text-base">Review and approve user contributions from all programs</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 lg:mb-6">
        {(['pending', 'approved', 'rejected', 'all'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 sm:px-4 py-2 text-xs uppercase tracking-wider border transition-colors whitespace-nowrap ${
              statusFilter === status
                ? 'bg-[#C5A85C] border-[#C5A85C] text-[#1C2340]'
                : 'border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 lg:mb-8">
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="bg-[#232B52] border border-white/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:flex-1"
        >
          <option value="all">All Programs</option>
          {Object.entries(programNames).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#232B52] border border-white/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:flex-1"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
        {[
          { label: "Pending", value: contributions.filter(c => c.status === 'pending').length, color: "text-amber-400" },
          { label: "Approved", value: contributions.filter(c => c.status === 'approved').length, color: "text-green-400" },
          { label: "Rejected", value: contributions.filter(c => c.status === 'rejected').length, color: "text-red-400" },
          { label: "Total", value: contributions.length, color: "text-white" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className={`text-2xl lg:text-3xl font-serif ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-[#AAB3CF] text-xs sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">User</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Program</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Title</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Date</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
              <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#AAB3CF]">Loading contributions...</td>
              </tr>
            ) : filteredContributions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#AAB3CF]">No contributions found</td>
              </tr>
            ) : (
              filteredContributions.map((contribution) => (
                <tr key={contribution.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{contribution.user_name}</div>
                      <div className="text-[#AAB3CF] text-sm">{contribution.user_email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{programNames[contribution.program_type]}</td>
                  <td className="px-6 py-4 text-white text-sm truncate max-w-xs">{contribution.title}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{new Date(contribution.activity_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                      {contribution.status === 'approved' ? 'Approved' :
                       contribution.status === 'rejected' ? 'Rejected' :
                       contribution.status === 'revision_requested' ? 'Revision Requested' :
                       'Pending Review'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedContribution(contribution);
                          setAdminComment(contribution.admin_comment || '');
                        }}
                        className="px-4 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] hover:text-white transition-colors rounded-lg"
                      >
                        Review
                      </button>
                    </div>
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
          <div className="text-center text-[#AAB3CF] py-12">Loading contributions...</div>
        ) : filteredContributions.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No contributions found</div>
        ) : (
          filteredContributions.map((contribution) => (
            <div key={contribution.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{contribution.user_name}</div>
                  <div className="text-[#AAB3CF] text-sm truncate">{contribution.user_email}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                  {contribution.status === 'approved' ? 'Approved' :
                   contribution.status === 'rejected' ? 'Rejected' :
                   contribution.status === 'revision_requested' ? 'Revision' :
                   'Pending'}
                </span>
              </div>
              <div className="space-y-2 mb-3">
                <div className="text-white text-sm">{contribution.title}</div>
                <div className="text-[#AAB3CF] text-xs">{programNames[contribution.program_type]}</div>
                <div className="text-[#AAB3CF] text-xs">{new Date(contribution.activity_date).toLocaleDateString()}</div>
              </div>
              <button
                onClick={() => {
                  setSelectedContribution(contribution);
                  setAdminComment(contribution.admin_comment || '');
                }}
                className="w-full py-2.5 text-sm border border-[#C5A85C]/40 text-[#C5A85C] hover:bg-[#C5A85C]/10 transition-colors rounded-lg font-medium"
              >
                Review
              </button>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedContribution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => {
              setSelectedContribution(null);
              setAdminComment('');
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#232B52] z-10">
                <h3 className="text-white font-serif text-lg sm:text-xl">Review Contribution</h3>
                <button
                  onClick={() => {
                    setSelectedContribution(null);
                    setAdminComment('');
                  }}
                  className="text-[#C9CCD6] hover:text-white p-2"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-1">Contributor</p>
                    <p className="text-white">{selectedContribution.user_name}</p>
                    <p className="text-[#AAB3CF] text-sm">{selectedContribution.user_email}</p>
                  </div>
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-1">Program</p>
                    <p className="text-white">{programNames[selectedContribution.program_type]}</p>
                  </div>
                </div>

                <div className="bg-[#1C2340] rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-1">Title</p>
                    <p className="text-white">{selectedContribution.title}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <p className="text-[#C5A85C] text-xs uppercase mb-1">Date</p>
                      <p className="text-white">{new Date(selectedContribution.activity_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[#C5A85C] text-xs uppercase mb-1">Location</p>
                      <p className="text-white text-sm">{selectedContribution.venue_city}, {selectedContribution.venue_country}</p>
                    </div>
                    <div>
                      <p className="text-[#C5A85C] text-xs uppercase mb-1">Participants</p>
                      <p className="text-white">{selectedContribution.participant_count}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-2">Task Conducted</p>
                    <p className="text-[#C9CCD6] leading-relaxed text-sm sm:text-base">{selectedContribution.task_conducted}</p>
                  </div>
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-2">Results / Outcomes</p>
                    <p className="text-[#C9CCD6] leading-relaxed text-sm sm:text-base">{selectedContribution.results}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                    Admin Comment
                  </label>
                  <textarea
                    value={adminComment}
                    onChange={(e) => setAdminComment(e.target.value)}
                    className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] min-h-[100px] text-sm sm:text-base"
                    placeholder="Add your review comments..."
                  />
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-[#C5A85C]/20 flex flex-col sm:flex-row justify-between items-center gap-3 sticky bottom-0 bg-[#232B52]">
                {selectedContribution.status === 'pending' && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                    <button
                      onClick={() => handleReview(selectedContribution.id, 'rejected')}
                      disabled={actionLoading === selectedContribution.id}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-50 text-sm sm:text-base"
                    >
                      {actionLoading === selectedContribution.id ? 'Processing...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => handleReview(selectedContribution.id, 'revision_requested')}
                      disabled={actionLoading === selectedContribution.id}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 border border-blue-500/40 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all disabled:opacity-50 text-sm sm:text-base"
                    >
                      {actionLoading === selectedContribution.id ? 'Processing...' : 'Request Revision'}
                    </button>
                    <button
                      onClick={() => handleReview(selectedContribution.id, 'approved')}
                      disabled={actionLoading === selectedContribution.id}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50 text-sm sm:text-base"
                    >
                      {actionLoading === selectedContribution.id ? 'Processing...' : 'Approve'}
                    </button>
                  </div>
                )}
                
                {selectedContribution.status === 'approved' && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                    <button
                      onClick={() => handleDelete(selectedContribution.id)}
                      disabled={isDeleting}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-50 text-sm sm:text-base flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {isDeleting ? 'Deleting...' : 'Delete Contribution'}
                    </button>
                  </div>
                )}
                
                <button
                  onClick={() => {
                    setSelectedContribution(null);
                    setAdminComment('');
                  }}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] transition-all text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
