"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Gathering {
  id: string;
  year: number;
  location_city: string;
  location_country: string;
  description?: string;
}

export default function GatheringsPage() {
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ year: new Date().getFullYear(), location_city: '', location_country: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => { fetchGatherings(); }, []);

  const fetchGatherings = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/gatherings', { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { setGatherings(await response.json()); }
    } catch (error) { console.error('Failed to fetch gatherings:', error); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingId ? `/api/admin/gatherings/${editingId}` : '/api/admin/gatherings';
      const response = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) { setShowForm(false); setEditingId(null); setFormData({ year: new Date().getFullYear(), location_city: '', location_country: '', description: '' }); fetchGatherings(); }
    } catch (error) { console.error('Failed to save gathering:', error); }
  };

  const handleEdit = (item: Gathering) => {
    setEditingId(item.id);
    setFormData({ year: item.year, location_city: item.location_city, location_country: item.location_country, description: item.description || '' });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/gatherings/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) fetchGatherings();
    } catch (error) { console.error('Failed to delete:', error); }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">Gatherings</h2>
          <p className="text-[#AAB3CF] text-sm sm:text-base">Documented meetings and events</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ year: new Date().getFullYear(), location_city: '', location_country: '', description: '' }); setShowForm(true); }}
          className="px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors rounded-lg whitespace-nowrap"
        >
          Record Gathering
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Year</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Location</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Description</th>
              <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-[#AAB3CF]">Loading...</td></tr>
            ) : gatherings.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-[#AAB3CF]">No gatherings recorded</td></tr>
            ) : (
              gatherings.map((g) => (
                <tr key={g.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4 text-white">{g.year}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{g.location_city}, {g.location_country}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm truncate max-w-md">{g.description || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(g)} className="px-3 py-1.5 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">Edit</button>
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
        ) : gatherings.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No gatherings recorded</div>
        ) : (
          gatherings.map((g) => (
            <div key={g.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium">{g.year} • {g.location_city}, {g.location_country}</div>
                  <div className="text-[#AAB3CF] text-sm truncate">{g.description || 'No description'}</div>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-[#C5A85C]/10">
                <button onClick={() => handleEdit(g)} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">Edit</button>
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
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-4 sm:p-6 w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-6">{editingId ? 'Edit Gathering' : 'Record Gathering'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Year</label>
                  <input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">City</label>
                    <input type="text" value={formData.location_city} onChange={(e) => setFormData({ ...formData, location_city: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
                    <input type="text" value={formData.location_country} onChange={(e) => setFormData({ ...formData, location_country: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" rows={4} />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#C5A85C]/80 rounded-lg transition-colors">{editingId ? 'Save Changes' : 'Record'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
