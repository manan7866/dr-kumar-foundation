"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Region { id: string; continent: string; country: string; }

export default function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ continent: '', country: '' });
  const [editingCountry, setEditingCountry] = useState<string | null>(null);

  useEffect(() => { fetchRegions(); }, []);

  const fetchRegions = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/regions', { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { setRegions(await response.json()); }
    } catch (error) { console.error('Failed to fetch regions:', error); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingCountry ? `/api/admin/regions/${editingCountry}` : '/api/admin/regions';
      const response = await fetch(url, {
        method: editingCountry ? 'PATCH' : 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) { setShowForm(false); setEditingCountry(null); setFormData({ continent: '', country: '' }); fetchRegions(); }
    } catch (error) { console.error('Failed to save region:', error); }
  };

  const handleEdit = (item: Region) => { setEditingCountry(item.country); setFormData({ continent: item.continent, country: item.country }); setShowForm(true); };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/regions/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) fetchRegions();
    } catch (error) { console.error('Failed to delete:', error); }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">Regions</h2>
          <p className="text-[#AAB3CF] text-sm sm:text-base">Geographic data management</p>
        </div>
        <button onClick={() => { setEditingCountry(null); setFormData({ continent: '', country: '' }); setShowForm(true); }}
          className="px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors rounded-lg whitespace-nowrap">
          Add Region
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Continent</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Country</th>
              <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {loading ? (
              <tr><td colSpan={3} className="p-8 text-center text-[#AAB3CF]">Loading...</td></tr>
            ) : regions.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-[#AAB3CF]">No regions added</td></tr>
            ) : (
              regions.map((r) => (
                <tr key={r.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4 text-white">{r.continent}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{r.country}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(r)} className="px-3 py-1.5 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">Edit</button>
                      <button onClick={() => handleDelete(r.id)} className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
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
        ) : regions.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No regions added</div>
        ) : (
          regions.map((r) => (
            <div key={r.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-white font-medium">{r.country}</div>
                  <div className="text-[#AAB3CF] text-sm">{r.continent}</div>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-[#C5A85C]/10">
                <button onClick={() => handleEdit(r)} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">Edit</button>
                <button onClick={() => handleDelete(r.id)} className="flex-1 py-2 text-xs text-red-400 hover:text-red-300 rounded-lg transition-colors">Delete</button>
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
              <h3 className="text-white font-serif text-lg sm:text-xl mb-6">{editingCountry ? 'Edit Region' : 'Add Region'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Continent</label>
                  <input type="text" value={formData.continent} onChange={(e) => setFormData({ ...formData, continent: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
                  <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#C5A85C]/80 rounded-lg transition-colors">{editingCountry ? 'Save Changes' : 'Add'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
