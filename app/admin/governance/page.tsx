"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Governance {
  id: string;
  full_name: string;
  role_title: string;
  bio_summary?: string;
  term_start?: string;
  term_end?: string;
  is_active: boolean;
}

export default function GovernancePage() {
  const [governance, setGovernance] = useState<Governance[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', role_title: '', bio_summary: '', term_start: '', term_end: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { fetchGovernance(); }, []);

  const fetchGovernance = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/governance', { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { setGovernance(await response.json()); }
    } catch (error) { console.error('Failed to fetch governance:', error); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingId ? `/api/admin/governance/${editingId}` : '/api/admin/governance';
      const response = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) { setShowForm(false); setEditingId(null); setFormData({ full_name: '', role_title: '', bio_summary: '', term_start: '', term_end: '' }); fetchGovernance(); }
    } catch (error) { console.error('Failed to save governance:', error); }
  };

  const handleEdit = (item: Governance) => {
    setEditingId(item.id);
    setFormData({ full_name: item.full_name, role_title: item.role_title, bio_summary: item.bio_summary || '', term_start: item.term_start ? item.term_start.split('T')[0] : '', term_end: item.term_end ? item.term_end.split('T')[0] : '' });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/governance/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) fetchGovernance();
    } catch (error) { console.error('Failed to delete:', error); }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/governance/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !isActive }),
      });
      if (response.ok) fetchGovernance();
    } catch (error) { console.error('Failed to update:', error); }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">Governance</h2>
          <p className="text-[#AAB3CF] text-sm sm:text-base">Board and leadership management</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ full_name: '', role_title: '', bio_summary: '', term_start: '', term_end: '' }); setShowForm(true); }}
          className="px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors rounded-lg whitespace-nowrap"
        >
          Add Member
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Name</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Role</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Term</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
              <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-[#AAB3CF]">Loading...</td></tr>
            ) : governance.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-[#AAB3CF]">No governance members</td></tr>
            ) : (
              governance.map((g) => (
                <tr key={g.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4 text-white">{g.full_name}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{g.role_title}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                    {g.term_start ? new Date(g.term_start).toLocaleDateString() : 'N/A'} - {g.term_end ? new Date(g.term_end).toLocaleDateString() : 'Present'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${g.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {g.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(g)} className="px-3 py-1.5 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleToggleActive(g.id, g.is_active)} className="px-3 py-1.5 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">{g.is_active ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={() => handleDelete(g.id)} className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
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
          <div className="text-center text-[#AAB3CF] py-12">Loading...</div>
        ) : governance.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No governance members</div>
        ) : (
          governance.map((g) => (
            <div key={g.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{g.full_name}</div>
                  <div className="text-[#AAB3CF] text-sm truncate">{g.role_title}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${g.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {g.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-[#AAB3CF] text-xs mb-3">
                Term: {g.term_start ? new Date(g.term_start).toLocaleDateString() : 'N/A'} - {g.term_end ? new Date(g.term_end).toLocaleDateString() : 'Present'}
              </div>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#C5A85C]/10">
                <button onClick={() => handleEdit(g)} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">Edit</button>
                <button onClick={() => handleToggleActive(g.id, g.is_active)} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">{g.is_active ? 'Deactivate' : 'Activate'}</button>
                <button onClick={() => handleDelete(g.id)} className="flex-1 py-2 text-xs text-red-400 hover:text-red-300 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-4 sm:p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-6">{editingId ? 'Edit Governance Member' : 'Add Governance Member'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Full Name</label>
                  <input type="text" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Role Title</label>
                  <input type="text" value={formData.role_title} onChange={(e) => setFormData({ ...formData, role_title: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required placeholder="e.g., Board Member" />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Bio Summary</label>
                  <textarea value={formData.bio_summary} onChange={(e) => setFormData({ ...formData, bio_summary: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Term Start</label>
                    <input type="date" value={formData.term_start} onChange={(e) => setFormData({ ...formData, term_start: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Term End</label>
                    <input type="date" value={formData.term_end} onChange={(e) => setFormData({ ...formData, term_end: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#C5A85C]/80 rounded-lg transition-colors">{editingId ? 'Save Changes' : 'Add Member'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
