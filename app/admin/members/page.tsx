"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Member {
  id: string;
  full_name: string;
  country: string;
  city?: string;
  gender?: string;
  profession: string;
  year_connected: number;
  visibility_status: "draft" | "published" | "archived";
  approved: boolean;
  created_at: string;
}

export default function AdminMembersPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Member>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchMembers();
  }, [filterStatus, searchTerm]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.set("visibility_status", filterStatus);
      if (searchTerm) params.set("search", searchTerm);

      const response = await fetch(`/api/admin/members?${params}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    setActionLoading(`publish-${id}`);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${id}/publish`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchMembers();
        setSelectedMember(null);
      }
    } catch (error) {
      console.error("Failed to publish member:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleArchive = async (id: string) => {
    if (!confirm("Are you sure you want to archive this member?")) return;
    setActionLoading(`archive-${id}`);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${id}/archive`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchMembers();
        setSelectedMember(null);
      }
    } catch (error) {
      console.error("Failed to archive member:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    setActionLoading(`delete-${id}`);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchMembers();
        setSelectedMember(null);
      }
    } catch (error) {
      console.error("Failed to delete member:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${selectedMember?.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      if (response.ok) {
        const updated = await response.json();
        setSelectedMember(updated);
        setEditMode(false);
        fetchMembers();
      }
    } catch (error) {
      console.error("Failed to update member:", error);
    }
  };

  const statusColors: Record<string, string> = {
    draft: "bg-gray-500/20 text-gray-400",
    published: "bg-green-500/20 text-green-400",
    archived: "bg-amber-500/20 text-amber-400",
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">Circle Members</h2>
          <p className="text-[#AAB3CF] text-sm sm:text-base">Manage member directory and registrations</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C]/60 text-sm sm:w-48 w-full"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C]/60 text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
        {[
          { label: "Published", value: members.filter(m => m.visibility_status === 'published').length },
          { label: "Draft", value: members.filter(m => m.visibility_status === 'draft').length },
          { label: "Archived", value: members.filter(m => m.visibility_status === 'archived').length },
          { label: "Total", value: members.length },
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
          <div className="p-8 text-center text-[#AAB3CF]">Loading members...</div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center text-[#AAB3CF]">No members found</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Member</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Country/City</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Profession</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Year</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{member.full_name}</div>
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{member.country}{member.city ? " / " + member.city : ""}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{member.profession}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{member.year_connected}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[member.visibility_status]}`}>
                      {member.visibility_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setSelectedMember(member); setEditMode(false); }}
                        className="text-[#C5A85C] hover:text-white text-sm transition-colors font-medium"
                      >
                        Edit
                      </button>
                      {member.visibility_status === 'draft' && (
                        <button
                          onClick={() => handlePublish(member.id)}
                          disabled={actionLoading === `publish-${member.id}`}
                          className="text-green-400 hover:text-green-300 text-sm transition-colors disabled:opacity-50"
                        >
                          {actionLoading === `publish-${member.id}` ? '...' : 'Publish'}
                        </button>
                      )}
                      {member.visibility_status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(member.id)}
                          disabled={actionLoading === `archive-${member.id}`}
                          className="text-amber-400 hover:text-amber-300 text-sm transition-colors disabled:opacity-50"
                        >
                          {actionLoading === `archive-${member.id}` ? '...' : 'Archive'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <div className="text-center text-[#AAB3CF] py-12">Loading...</div>
        ) : members.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No members found</div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{member.full_name}</div>
                  <div className="text-[#AAB3CF] text-sm truncate">{member.profession} • {member.country}{member.city ? " / " + member.city : ""}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[member.visibility_status]}`}>
                  {member.visibility_status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#AAB3CF] text-xs mb-3">
                <span>Year: {member.year_connected}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#C5A85C]/10">
                <button
                  onClick={() => { setSelectedMember(member); setEditMode(false); }}
                  className="flex-1 py-2 text-xs font-medium bg-[#C5A85C]/10 text-[#C5A85C] rounded-lg hover:bg-[#C5A85C]/20 transition-all"
                >
                  Edit
                </button>
                {member.visibility_status === 'draft' && (
                  <button
                    onClick={() => handlePublish(member.id)}
                    disabled={actionLoading === `publish-${member.id}`}
                    className="flex-1 py-2 text-xs font-medium bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all disabled:opacity-50"
                  >
                    {actionLoading === `publish-${member.id}` ? '...' : 'Publish'}
                  </button>
                )}
                {member.visibility_status !== 'archived' && (
                  <button
                    onClick={() => handleArchive(member.id)}
                    disabled={actionLoading === `archive-${member.id}`}
                    className="flex-1 py-2 text-xs font-medium bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20 transition-all disabled:opacity-50"
                  >
                    {actionLoading === `archive-${member.id}` ? '...' : 'Archive'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setSelectedMember(null); setEditMode(false); }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#232B52] z-10">
                <h3 className="text-white font-serif text-lg sm:text-xl">
                  {editMode ? "Edit Member" : "Member Details"}
                </h3>
                <button onClick={() => { setSelectedMember(null); setEditMode(false); }} className="text-[#AAB3CF] hover:text-white p-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                {editMode ? (
                  <>
                    <div>
                      <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Full Name</label>
                      <input
                        type="text"
                        value={editedData.full_name ?? selectedMember.full_name}
                        onChange={(e) => setEditedData({ ...editedData, full_name: e.target.value })}
                        className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
                        <input
                          type="text"
                          value={editedData.country ?? selectedMember.country}
                          onChange={(e) => setEditedData({ ...editedData, country: e.target.value })}
                          className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Profession</label>
                        <input
                          type="text"
                          value={editedData.profession ?? selectedMember.profession}
                          onChange={(e) => setEditedData({ ...editedData, profession: e.target.value })}
                          className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Year Connected</label>
                        <input
                          type="number"
                          value={editedData.year_connected ?? selectedMember.year_connected}
                          onChange={(e) => setEditedData({ ...editedData, year_connected: parseInt(e.target.value) })}
                          className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Status</label>
                        <select
                          value={editedData.visibility_status ?? selectedMember.visibility_status}
                          onChange={(e) => setEditedData({ ...editedData, visibility_status: e.target.value as 'draft' | 'published' | 'archived' })}
                          className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#AAB3CF] text-xs uppercase">Full Name</label>
                        <p className="text-white mt-1">{selectedMember.full_name}</p>
                      </div>
                      <div>
                        <label className="text-[#AAB3CF] text-xs uppercase">Country</label>
                        <p className="text-white mt-1">{selectedMember.country}{selectedMember.city ? " / " + selectedMember.city : ""}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#AAB3CF] text-xs uppercase">Profession</label>
                        <p className="text-white mt-1">{selectedMember.profession}</p>
                      </div>
                      <div>
                        <label className="text-[#AAB3CF] text-xs uppercase">Year Connected</label>
                        <p className="text-white mt-1">{selectedMember.year_connected}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[#AAB3CF] text-xs uppercase">Status</label>
                      <p className="mt-1">
                        <span className={`text-xs px-3 py-1 rounded-full ${statusColors[selectedMember.visibility_status]}`}>
                          {selectedMember.visibility_status}
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 sm:p-6 border-t border-[#C5A85C]/20 flex flex-col sm:flex-row gap-3 justify-between items-center sticky bottom-0 bg-[#232B52]">
                {editMode ? (
                  <div className="flex gap-3 w-full sm:w-auto justify-center">
                    <button
                      onClick={() => { setEditMode(false); setEditedData({}); }}
                      className="px-4 sm:px-6 py-2.5 sm:py-2 border border-white/20 text-[#C9CCD6] text-sm font-medium rounded-lg hover:border-[#C5A85C] transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="px-4 sm:px-6 py-2.5 sm:py-2 bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] text-sm font-medium rounded-lg transition-all shadow-lg shadow-[#C5A85C]/30"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditMode(true); setEditedData({}); }}
                    className="px-4 sm:px-6 py-2.5 sm:py-2 border border-white/20 text-[#C9CCD6] text-sm font-medium rounded-lg hover:border-[#C5A85C] transition-all w-full sm:w-auto"
                  >
                    Edit
                  </button>
                )}
                <div className="flex gap-3 w-full sm:w-auto justify-center">
                  <button
                    onClick={() => handleDelete(selectedMember.id)}
                    className="px-4 sm:px-6 py-2.5 sm:py-2 text-[#AAB3CF] hover:text-red-400 text-sm font-medium transition-all"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => { setSelectedMember(null); setEditMode(false); }}
                    className="px-4 sm:px-6 py-2.5 sm:py-2 border border-white/20 text-[#C9CCD6] text-sm font-medium rounded-lg hover:border-[#C5A85C] transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
