"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Region {
  id: string;
  continent: string;
  name: string;
  countries: string;
  created_at: string;
  updated_at: string;
}

interface Gathering {
  id: string;
  year: number;
  location_city: string;
  location_country: string;
  region_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function AdminGlobalPresencePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string; full_name: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'regions' | 'gatherings'>('regions');
  
  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingRegion, setIsDeletingRegion] = useState<string | null>(null);
  const [isDeletingGathering, setIsDeletingGathering] = useState<string | null>(null);
  
  // Search/Filter states
  const [regionSearchQuery, setRegionSearchQuery] = useState('');
  const [gatheringSearchQuery, setGatheringSearchQuery] = useState('');
  const [gatheringRegionFilter, setGatheringRegionFilter] = useState('All');
  
  // Regions state
  const [regions, setRegions] = useState<Region[]>([]);
  const [isRegionLoading, setIsRegionLoading] = useState(true);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [regionFormData, setRegionFormData] = useState({
    continent: 'Asia',
    name: '',
    countries: '',
  });

  // Gatherings state
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [isGatheringLoading, setIsGatheringLoading] = useState(true);
  const [isGatheringModalOpen, setIsGatheringModalOpen] = useState(false);
  const [editingGathering, setEditingGathering] = useState<Gathering | null>(null);
  const [gatheringFormData, setGatheringFormData] = useState({
    year: new Date().getFullYear(),
    location_city: '',
    location_country: '',
    region_name: 'North America',
    description: '',
  });

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (!session) {
      router.push("/admin/login");
      return;
    }
    setUser(JSON.parse(session));
    fetchRegions();
    fetchGatherings();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await fetch('/api/admin/global-presence/regions');
      if (response.ok) {
        const data = await response.json();
        setRegions(data);
      }
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    } finally {
      setIsRegionLoading(false);
    }
  };

  const fetchGatherings = async () => {
    try {
      const response = await fetch('/api/admin/global-presence/gatherings');
      if (response.ok) {
        const data = await response.json();
        setGatherings(data);
      }
    } catch (error) {
      console.error('Failed to fetch gatherings:', error);
    } finally {
      setIsGatheringLoading(false);
    }
  };

  const handleRegionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingRegion ? `/api/admin/global-presence/regions/${editingRegion.id}` : '/api/admin/global-presence/regions';
      const method = editingRegion ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...regionFormData,
          countries: regionFormData.countries.split(',').map(c => c.trim()).filter(c => c),
        }),
      });
      if (response.ok) {
        setIsRegionModalOpen(false);
        setEditingRegion(null);
        setRegionFormData({ continent: 'Asia', name: '', countries: '' });
        fetchRegions();
      }
    } catch (error) {
      console.error('Failed to save region:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGatheringSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingGathering ? `/api/admin/global-presence/gatherings/${editingGathering.id}` : '/api/admin/global-presence/gatherings';
      const method = editingGathering ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gatheringFormData),
      });
      if (response.ok) {
        setIsGatheringModalOpen(false);
        setEditingGathering(null);
        setGatheringFormData({
          year: new Date().getFullYear(),
          location_city: '',
          location_country: '',
          region_name: 'North America',
          description: '',
        });
        fetchGatherings();
      }
    } catch (error) {
      console.error('Failed to save gathering:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRegion = async (id: string) => {
    setIsDeletingRegion(id);
    try {
      const response = await fetch(`/api/admin/global-presence/regions/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchRegions();
      }
    } catch (error) {
      console.error('Failed to delete region:', error);
    } finally {
      setIsDeletingRegion(null);
    }
  };

  const handleDeleteGathering = async (id: string) => {
    setIsDeletingGathering(id);
    try {
      const response = await fetch(`/api/admin/global-presence/gatherings/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchGatherings();
      }
    } catch (error) {
      console.error('Failed to delete gathering:', error);
    } finally {
      setIsDeletingGathering(null);
    }
  };

  // Filter regions based on search query
  const filteredRegions = regions.filter(region => {
    const query = regionSearchQuery.toLowerCase();
    return (
      region.name.toLowerCase().includes(query) ||
      region.continent.toLowerCase().includes(query) ||
      JSON.parse(region.countries).some((c: string) => c.toLowerCase().includes(query))
    );
  });

  // Filter gatherings based on search query and region filter
  const filteredGatherings = gatherings.filter(gathering => {
    const matchesSearch = gatheringSearchQuery === '' || 
      gathering.location_city.toLowerCase().includes(gatheringSearchQuery.toLowerCase()) ||
      gathering.location_country.toLowerCase().includes(gatheringSearchQuery.toLowerCase()) ||
      gathering.description?.toLowerCase().includes(gatheringSearchQuery.toLowerCase());
    const matchesRegion = gatheringRegionFilter === 'All' || gathering.region_name === gatheringRegionFilter;
    return matchesSearch && matchesRegion;
  });

  // Get unique regions for filter dropdown
  const uniqueRegions = Array.from(new Set(gatherings.map(g => g.region_name))).sort();

  if (!user) return null;

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      <div className="min-h-screen bg-[#1C2340]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-white mb-2">Global Presence Management</h1>
          <p className="text-[#AAB3CF] text-sm">Manage regions and gatherings for the Global Presence page</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#C5A85C]/20">
          <button
            onClick={() => setActiveTab('regions')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'regions'
                ? 'text-[#C5A85C] border-b-2 border-[#C5A85C]'
                : 'text-[#AAB3CF] hover:text-white'
            }`}
          >
            Regions
          </button>
          <button
            onClick={() => setActiveTab('gatherings')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'gatherings'
                ? 'text-[#C5A85C] border-b-2 border-[#C5A85C]'
                : 'text-[#AAB3CF] hover:text-white'
            }`}
          >
            Gatherings
          </button>
        </div>

        {/* Regions Tab */}
        {activeTab === 'regions' && (
          <div>
            {/* Search and Add */}
            <div className="flex justify-between items-center gap-4 mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search regions or countries..."
                    value={regionSearchQuery}
                    onChange={(e) => setRegionSearchQuery(e.target.value)}
                    className="w-full bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-[#AAB3CF]/60 focus:outline-none focus:border-[#C5A85C]/40 transition-colors"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A85C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingRegion(null);
                  setRegionFormData({ continent: 'Asia', name: '', countries: '' });
                  setIsRegionModalOpen(true);
                }}
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Region
              </button>
            </div>

            {isRegionLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                    <tr>
                      <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Continent</th>
                      <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Region Name</th>
                      <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Countries</th>
                      <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegions.map((region) => (
                      <tr key={region.id} className="border-b border-[#C5A85C]/5 hover:bg-[#1C2340]/50">
                        <td className="py-4 px-6 text-white">{region.continent}</td>
                        <td className="py-4 px-6 text-white">{region.name}</td>
                        <td className="py-4 px-6 text-[#AAB3CF]">
                          {JSON.parse(region.countries).join(', ')}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingRegion(region);
                                setRegionFormData({
                                  continent: region.continent,
                                  name: region.name,
                                  countries: JSON.parse(region.countries).join(', '),
                                });
                                setIsRegionModalOpen(true);
                              }}
                              disabled={isSubmitting}
                              className="p-2 text-[#C5A85C] hover:bg-[#C5A85C]/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteRegion(region.id)}
                              disabled={isDeletingRegion === region.id}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isDeletingRegion === region.id ? (
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Gatherings Tab */}
        {activeTab === 'gatherings' && (
          <div>
            {/* Search, Filter and Add */}
            <div className="flex justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1 max-w-md relative">
                  <input
                    type="text"
                    placeholder="Search gatherings..."
                    value={gatheringSearchQuery}
                    onChange={(e) => setGatheringSearchQuery(e.target.value)}
                    className="w-full bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-[#AAB3CF]/60 focus:outline-none focus:border-[#C5A85C]/40 transition-colors"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A85C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  value={gatheringRegionFilter}
                  onChange={(e) => setGatheringRegionFilter(e.target.value)}
                  className="bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C5A85C]/40 transition-colors"
                >
                  <option value="All">All Regions</option>
                  {uniqueRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  setEditingGathering(null);
                  setGatheringFormData({
                    year: new Date().getFullYear(),
                    location_city: '',
                    location_country: '',
                    region_name: 'North America',
                    description: '',
                  });
                  setIsGatheringModalOpen(true);
                }}
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Gathering
              </button>
            </div>

            {isGatheringLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                    <tr>
                      <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Year</th>
                      <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Location</th>
                      <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Region</th>
                      <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Description</th>
                      <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGatherings.map((gathering) => (
                      <tr key={gathering.id} className="border-b border-[#C5A85C]/5 hover:bg-[#1C2340]/50">
                        <td className="py-4 px-6 text-white">{gathering.year}</td>
                        <td className="py-4 px-6 text-white">{gathering.location_city}, {gathering.location_country}</td>
                        <td className="py-4 px-6 text-[#AAB3CF]">{gathering.region_name}</td>
                        <td className="py-4 px-6 text-[#AAB3CF] max-w-xs truncate">{gathering.description}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingGathering(gathering);
                                setGatheringFormData({
                                  year: gathering.year,
                                  location_city: gathering.location_city,
                                  location_country: gathering.location_country,
                                  region_name: gathering.region_name,
                                  description: gathering.description || '',
                                });
                                setIsGatheringModalOpen(true);
                              }}
                              disabled={isSubmitting}
                              className="p-2 text-[#C5A85C] hover:bg-[#C5A85C]/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteGathering(gathering.id)}
                              disabled={isDeletingGathering === gathering.id}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isDeletingGathering === gathering.id ? (
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Region Modal */}
        <AnimatePresence>
          {isRegionModalOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsRegionModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl w-full max-w-2xl p-6">
                  <h2 className="font-serif text-2xl text-white mb-6">{editingRegion ? 'Edit Region' : 'Add Region'}</h2>
                  <form onSubmit={handleRegionSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Continent</label>
                      <select value={regionFormData.continent} onChange={(e) => setRegionFormData({ ...regionFormData, continent: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]">
                        <option>Asia</option>
                        <option>Europe</option>
                        <option>North America</option>
                        <option>South America</option>
                        <option>Africa</option>
                        <option>Oceania</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Region Name</label>
                      <input type="text" value={regionFormData.name} onChange={(e) => setRegionFormData({ ...regionFormData, name: e.target.value })} required className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]" />
                    </div>
                    <div>
                      <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Countries (comma-separated)</label>
                      <textarea value={regionFormData.countries} onChange={(e) => setRegionFormData({ ...regionFormData, countries: e.target.value })} rows={4} className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]" placeholder="India, Pakistan, Bangladesh" />
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-[#C5A85C]/20">
                      <button
                        type="button"
                        onClick={() => setIsRegionModalOpen(false)}
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Saving...
                          </>
                        ) : (
                          editingRegion ? 'Update' : 'Add'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Gathering Modal */}
        <AnimatePresence>
          {isGatheringModalOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsGatheringModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl w-full max-w-2xl p-6">
                  <h2 className="font-serif text-2xl text-white mb-6">{editingGathering ? 'Edit Gathering' : 'Add Gathering'}</h2>
                  <form onSubmit={handleGatheringSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Year</label>
                        <input type="number" value={gatheringFormData.year} onChange={(e) => setGatheringFormData({ ...gatheringFormData, year: parseInt(e.target.value) })} required className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]" />
                      </div>
                      <div>
                        <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Region</label>
                        <select value={gatheringFormData.region_name} onChange={(e) => setGatheringFormData({ ...gatheringFormData, region_name: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]">
                          <option>North America</option>
                          <option>South America</option>
                          <option>Europe</option>
                          <option>South Asia</option>
                          <option>Middle East</option>
                          <option>Southeast Asia</option>
                          <option>Central Asia</option>
                          <option>Africa</option>
                          <option>Oceania</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#C9CCD6] text-xs uppercase mb-2">City</label>
                        <input type="text" value={gatheringFormData.location_city} onChange={(e) => setGatheringFormData({ ...gatheringFormData, location_city: e.target.value })} required className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]" />
                      </div>
                      <div>
                        <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
                        <input type="text" value={gatheringFormData.location_country} onChange={(e) => setGatheringFormData({ ...gatheringFormData, location_country: e.target.value })} required className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Description</label>
                      <textarea value={gatheringFormData.description} onChange={(e) => setGatheringFormData({ ...gatheringFormData, description: e.target.value })} rows={4} className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]" />
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-[#C5A85C]/20">
                      <button
                        type="button"
                        onClick={() => setIsGatheringModalOpen(false)}
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Saving...
                          </>
                        ) : (
                          editingGathering ? 'Update' : 'Add'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
