"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Quote {
  id: string;
  text: string;
  category: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const CATEGORIES = ["Compassion", "Self Awareness", "Inner Discipline", "Ethical Conduct", "Human Unity", "Peace and Reflection"];

export default function AdminQuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [bulkUploadFile, setBulkUploadFile] = useState<File | null>(null);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [bulkUploadResult, setBulkUploadResult] = useState<{ success: number; failed: number } | null>(null);

  const [formData, setFormData] = useState({ text: "", category: "Compassion", is_featured: false, display_order: 0, is_active: true });

  const [user, setUser] = useState<{ id: string; email: string; full_name: string; role: string } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (!session) { router.push("/admin/login"); return; }
    setUser(JSON.parse(session));
    fetchQuotes();
  }, [searchQuery, selectedCategory]);

  const fetchQuotes = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory !== "All") params.append("category", selectedCategory);
      const response = await fetch(`/api/admin/quotes?${params.toString()}`);
      if (response.ok) { setQuotes(await response.json()); }
    } catch (error) { console.error("Failed to fetch quotes:", error); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingQuote ? `/api/admin/quotes/${editingQuote.id}` : "/api/admin/quotes";
      const response = await fetch(url, {
        method: editingQuote ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsModalOpen(false);
        setEditingQuote(null);
        setFormData({ text: "", category: "Compassion", is_featured: false, display_order: 0, is_active: true });
        fetchQuotes();
      }
    } catch (error) { console.error("Failed to save quote:", error); }
    finally { setIsSubmitting(false); }
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setFormData({ text: quote.text, category: quote.category, is_featured: quote.is_featured, display_order: quote.display_order, is_active: quote.is_active });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/admin/quotes/${id}`, { method: "DELETE" });
      if (response.ok) { setDeleteConfirmId(null); fetchQuotes(); }
    } catch (error) { console.error("Failed to delete quote:", error); }
    finally { setIsDeleting(null); }
  };

  const toggleFeatured = async (quote: Quote) => {
    setIsToggling(quote.id);
    try {
      const response = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_featured: !quote.is_featured }),
      });
      if (response.ok) fetchQuotes();
    } catch (error) { console.error("Failed to toggle featured:", error); }
    finally { setIsToggling(null); }
  };

  const toggleActive = async (quote: Quote) => {
    setIsToggling(quote.id);
    try {
      const response = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !quote.is_active }),
      });
      if (response.ok) fetchQuotes();
    } catch (error) { console.error("Failed to toggle active:", error); }
    finally { setIsToggling(null); }
  };

  const handleBulkUpload = async () => {
    if (!bulkUploadFile) return;
    setIsBulkUploading(true);
    setBulkUploadResult(null);
    try {
      const fileText = await bulkUploadFile.text();
      const quotes = JSON.parse(fileText);
      const response = await fetch("/api/admin/quotes/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quotes }),
      });
      if (response.ok) {
        const result = await response.json();
        setBulkUploadResult(result);
        fetchQuotes();
      }
    } catch (error) {
      console.error("Bulk upload failed:", error);
      setBulkUploadResult({ success: 0, failed: quotes?.length || 0 });
    }
    finally { setIsBulkUploading(false); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/json") {
      setBulkUploadFile(file);
      setBulkUploadResult(null);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch = quote.text.toLowerCase().includes(searchQuery.toLowerCase()) || quote.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || quote.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user) return null;

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">Quotes Management</h2>
          <p className="text-[#AAB3CF] text-sm sm:text-base">Curate inspirational quotes</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => { setIsBulkUploadOpen(true); setBulkUploadFile(null); setBulkUploadResult(null); }}
            className="px-4 py-2.5 bg-[#232B52] border border-[#C5A85C]/40 text-[#C5A85C] text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-[#C5A85C]/10 transition-colors rounded-lg whitespace-nowrap flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Bulk Upload
          </button>
          <button onClick={() => { setEditingQuote(null); setFormData({ text: "", category: "Compassion", is_featured: false, display_order: 0, is_active: true }); setIsModalOpen(true); }}
            className="px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors rounded-lg whitespace-nowrap">
            Add Quote
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 lg:mb-8">
        <input type="text" placeholder="Search quotes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm flex-1 min-w-[200px]" />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm">
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Quote</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Category</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
              <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {isLoading ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-[#AAB3CF]">Loading quotes...</td></tr>
            ) : filteredQuotes.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-[#AAB3CF]">No quotes found</td></tr>
            ) : (
              filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white text-sm line-clamp-2">{quote.text}</div>
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{quote.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${quote.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{quote.is_active ? 'Active' : 'Inactive'}</span>
                      {quote.is_featured && <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-400">Featured</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleFeatured(quote)} disabled={isToggling === quote.id} className="px-3 py-1.5 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">{quote.is_featured ? 'Unfeature' : 'Feature'}</button>
                      <button onClick={() => toggleActive(quote)} disabled={isToggling === quote.id} className="px-3 py-1.5 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">{quote.is_active ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={() => handleEdit(quote)} className="px-3 py-1.5 text-xs text-[#C5A85C] hover:text-white transition-colors">Edit</button>
                      <button onClick={() => setDeleteConfirmId(quote.id)} className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
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
        {isLoading ? (
          <div className="text-center text-[#AAB3CF] py-12">Loading quotes...</div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No quotes found</div>
        ) : (
          filteredQuotes.map((quote) => (
            <div key={quote.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm line-clamp-3 mb-2">{quote.text}</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[#AAB3CF] text-xs">{quote.category}</span>
                    {quote.is_featured && <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400">Featured</span>}
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${quote.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{quote.is_active ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#C5A85C]/10">
                <button onClick={() => toggleFeatured(quote)} disabled={isToggling === quote.id} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">{quote.is_featured ? 'Unfeature' : 'Feature'}</button>
                <button onClick={() => toggleActive(quote)} disabled={isToggling === quote.id} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">{quote.is_active ? 'Deactivate' : 'Activate'}</button>
                <button onClick={() => handleEdit(quote)} className="flex-1 py-2 text-xs text-[#C5A85C] hover:text-white rounded-lg transition-colors">Edit</button>
                <button onClick={() => setDeleteConfirmId(quote.id)} className="flex-1 py-2 text-xs text-red-400 hover:text-red-300 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-4 sm:p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-6">{editingQuote ? 'Edit Quote' : 'Add Quote'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Quote Text</label>
                  <textarea value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" rows={4} required />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg">
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} className="w-4 h-4 rounded bg-[#1C2340] border-white/20 text-[#C5A85C] focus:ring-[#C5A85C]" />
                    <span className="text-[#C9CCD6] text-xs sm:text-sm">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4 rounded bg-[#1C2340] border-white/20 text-[#C5A85C] focus:ring-[#C5A85C]" />
                    <span className="text-[#C9CCD6] text-xs sm:text-sm">Active</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#C5A85C]/80 rounded-lg transition-colors disabled:opacity-50">{isSubmitting ? 'Saving...' : editingQuote ? 'Save Changes' : 'Add Quote'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirmId(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-6 w-full max-w-sm rounded-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-serif text-lg mb-4">Delete Quote?</h3>
              <p className="text-[#AAB3CF] text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-sm rounded-lg hover:border-[#C5A85C] transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirmId)} disabled={isDeleting === deleteConfirmId} className="flex-1 px-4 py-2.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50">{isDeleting === deleteConfirmId ? 'Deleting...' : 'Delete'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Upload Modal */}
      <AnimatePresence>
        {isBulkUploadOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setIsBulkUploadOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-4 sm:p-6 w-full max-w-2xl my-8 max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-serif text-lg sm:text-xl">Bulk Upload Quotes</h3>
                <button onClick={() => setIsBulkUploadOpen(false)} className="text-[#AAB3CF] hover:text-white p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Example Section */}
              <div className="mb-6">
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">JSON Format Example:</label>
                <div className="bg-[#1C2340] border border-[#C5A85C]/20 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-[#AAB3CF] text-xs sm:text-sm whitespace-pre-wrap">
{`[
  {
    "text": "Your quote text here",
    "category": "Compassion",
    "is_featured": false,
    "display_order": 0,
    "is_active": true
  },
  {
    "text": "Another quote",
    "category": "Self Awareness",
    "is_featured": true,
    "display_order": 1,
    "is_active": true
  }
]`}
                  </pre>
                </div>
                <p className="text-[#AAB3CF] text-xs mt-2">
                  <strong>Categories:</strong> Compassion, Self Awareness, Inner Discipline, Ethical Conduct, Human Unity, Peace and Reflection
                </p>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Upload JSON File:</label>
                <div className="border-2 border-dashed border-[#C5A85C]/20 rounded-lg p-6 text-center hover:border-[#C5A85C]/40 transition-colors">
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-[#C5A85C]/40 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {bulkUploadFile ? (
                      <div>
                        <p className="text-white text-sm font-medium">{bulkUploadFile.name}</p>
                        <p className="text-[#AAB3CF] text-xs">{(bulkUploadFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#C9CCD6] text-sm mb-2">Drag and drop your JSON file here, or click to browse</p>
                        <p className="text-[#AAB3CF] text-xs">Only .json files are accepted</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Result Display */}
              {bulkUploadResult && (
                <div className="mb-6 p-4 rounded-lg border">
                  {bulkUploadResult.success > 0 ? (
                    <div className="flex items-center gap-3 text-green-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">Successfully uploaded {bulkUploadResult.success} quote{bulkUploadResult.success !== 1 ? 's' : ''}!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-red-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">Upload failed. Please check your JSON format.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-[#C5A85C]/20">
                <button type="button" onClick={() => setIsBulkUploadOpen(false)} disabled={isBulkUploading} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">
                  Close
                </button>
                <button type="button" onClick={handleBulkUpload} disabled={!bulkUploadFile || isBulkUploading} className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D4BE90] rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {isBulkUploading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload Quotes
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
