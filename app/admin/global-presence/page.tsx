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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingRegion, setIsDeletingRegion] = useState<string | null>(null);
  const [isDeletingGathering, setIsDeletingGathering] = useState<string | null>(null);

  // Bulk upload states
  const [isRegionBulkUploadOpen, setIsRegionBulkUploadOpen] = useState(false);
  const [regionBulkFile, setRegionBulkFile] = useState<File | null>(null);
  const [isRegionBulkUploading, setIsRegionBulkUploading] = useState(false);
  const [regionBulkResult, setRegionBulkResult] = useState<{ success: number; failed: number } | null>(null);

  const [isGatheringBulkUploadOpen, setIsGatheringBulkUploadOpen] = useState(false);
  const [gatheringBulkFile, setGatheringBulkFile] = useState<File | null>(null);
  const [isGatheringBulkUploading, setIsGatheringBulkUploading] = useState(false);
  const [gatheringBulkResult, setGatheringBulkResult] = useState<{ success: number; failed: number } | null>(null);

  const [regionSearchQuery, setRegionSearchQuery] = useState('');
  const [gatheringSearchQuery, setGatheringSearchQuery] = useState('');
  const [gatheringRegionFilter, setGatheringRegionFilter] = useState('All');

  const [regions, setRegions] = useState<Region[]>([]);
  const [isRegionLoading, setIsRegionLoading] = useState(true);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [regionFormData, setRegionFormData] = useState({ continent: 'Asia', name: '', countries: '' });

  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [isGatheringLoading, setIsGatheringLoading] = useState(true);
  const [isGatheringModalOpen, setIsGatheringModalOpen] = useState(false);
  const [editingGathering, setEditingGathering] = useState<Gathering | null>(null);
  const [gatheringFormData, setGatheringFormData] = useState({ year: new Date().getFullYear(), location_city: '', location_country: '', region_name: 'North America', description: '' });

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (!session) { router.push("/admin/login"); return; }
    setUser(JSON.parse(session));
    fetchRegions();
    fetchGatherings();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await fetch('/api/admin/global-presence/regions');
      if (response.ok) { setRegions(await response.json()); }
    } catch (error) { console.error('Failed to fetch regions:', error); }
    finally { setIsRegionLoading(false); }
  };

  const fetchGatherings = async () => {
    try {
      const response = await fetch('/api/admin/global-presence/gatherings');
      if (response.ok) { setGatherings(await response.json()); }
    } catch (error) { console.error('Failed to fetch gatherings:', error); }
    finally { setIsGatheringLoading(false); }
  };

  const handleRegionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingRegion ? `/api/admin/global-presence/regions/${editingRegion.id}` : '/api/admin/global-presence/regions';
      const response = await fetch(url, {
        method: editingRegion ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...regionFormData, countries: regionFormData.countries.split(',').map(c => c.trim()).filter(c => c) }),
      });
      if (response.ok) { setIsRegionModalOpen(false); setEditingRegion(null); setRegionFormData({ continent: 'Asia', name: '', countries: '' }); fetchRegions(); }
    } catch (error) { console.error('Failed to save region:', error); }
    finally { setIsSubmitting(false); }
  };

  const handleGatheringSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingGathering ? `/api/admin/global-presence/gatherings/${editingGathering.id}` : '/api/admin/global-presence/gatherings';
      const response = await fetch(url, {
        method: editingGathering ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gatheringFormData),
      });
      if (response.ok) { setIsGatheringModalOpen(false); setEditingGathering(null); setGatheringFormData({ year: new Date().getFullYear(), location_city: '', location_country: '', region_name: 'North America', description: '' }); fetchGatherings(); }
    } catch (error) { console.error('Failed to save gathering:', error); }
    finally { setIsSubmitting(false); }
  };

  // Bulk upload handlers for regions
  const handleRegionBulkUpload = async () => {
    if (!regionBulkFile) return;
    setIsRegionBulkUploading(true);
    setRegionBulkResult(null);
    try {
      const fileText = await regionBulkFile.text();
      const regions = JSON.parse(fileText);
      const response = await fetch('/api/admin/global-presence/regions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regions }),
      });
      if (response.ok) {
        const result = await response.json();
        setRegionBulkResult(result);
        fetchRegions();
      }
    } catch (error) {
      console.error('Region bulk upload failed:', error);
      setRegionBulkResult({ success: 0, failed: regions?.length || 0 });
    }
    finally { setIsRegionBulkUploading(false); }
  };

  const handleRegionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/json') {
      setRegionBulkFile(file);
      setRegionBulkResult(null);
    }
  };

  // Bulk upload handlers for gatherings
  const handleGatheringBulkUpload = async () => {
    if (!gatheringBulkFile) return;
    setIsGatheringBulkUploading(true);
    setGatheringBulkResult(null);
    try {
      const fileText = await gatheringBulkFile.text();
      const gatherings = JSON.parse(fileText);
      const response = await fetch('/api/admin/global-presence/gatherings/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gatherings }),
      });
      if (response.ok) {
        const result = await response.json();
        setGatheringBulkResult(result);
        fetchGatherings();
      }
    } catch (error) {
      console.error('Gathering bulk upload failed:', error);
      setGatheringBulkResult({ success: 0, failed: gatherings?.length || 0 });
    }
    finally { setIsGatheringBulkUploading(false); }
  };

  const handleGatheringFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/json') {
      setGatheringBulkFile(file);
      setGatheringBulkResult(null);
    }
  };

  const handleDeleteRegion = async (id: string) => {
    setIsDeletingRegion(id);
    try {
      const response = await fetch(`/api/admin/global-presence/regions/${id}`, { method: 'DELETE' });
      if (response.ok) fetchRegions();
    } catch (error) { console.error('Failed to delete region:', error); }
    finally { setIsDeletingRegion(null); }
  };

  const handleDeleteGathering = async (id: string) => {
    setIsDeletingGathering(id);
    try {
      const response = await fetch(`/api/admin/global-presence/gatherings/${id}`, { method: 'DELETE' });
      if (response.ok) fetchGatherings();
    } catch (error) { console.error('Failed to delete gathering:', error); }
    finally { setIsDeletingGathering(null); }
  };

  const filteredRegions = regions.filter(region => {
    const query = regionSearchQuery.toLowerCase();
    return region.name.toLowerCase().includes(query) || region.continent.toLowerCase().includes(query) || JSON.parse(region.countries).some((c: string) => c.toLowerCase().includes(query));
  });

  const filteredGatherings = gatherings.filter(gathering => {
    const matchesSearch = gatheringSearchQuery === '' || gathering.location_city.toLowerCase().includes(gatheringSearchQuery.toLowerCase()) || gathering.location_country.toLowerCase().includes(gatheringSearchQuery.toLowerCase()) || gathering.description?.toLowerCase().includes(gatheringSearchQuery.toLowerCase());
    const matchesRegion = gatheringRegionFilter === 'All' || gathering.region_name === gatheringRegionFilter;
    return matchesSearch && matchesRegion;
  });

  const uniqueRegions = Array.from(new Set(gatherings.map(g => g.region_name))).sort();

  if (!user) return null;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white mb-2">Global Presence Management</h1>
        <p className="text-[#AAB3CF] text-sm sm:text-base">Manage regions and gatherings for the Global Presence page</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-6 lg:mb-8 border-b border-[#C5A85C]/20 overflow-x-auto">
        <button onClick={() => setActiveTab('regions')} className={`px-4 sm:px-6 py-3 font-medium whitespace-nowrap transition-colors ${activeTab === 'regions' ? 'text-[#C5A85C] border-b-2 border-[#C5A85C]' : 'text-[#AAB3CF] hover:text-white'}`}>Regions</button>
        <button onClick={() => setActiveTab('gatherings')} className={`px-4 sm:px-6 py-3 font-medium whitespace-nowrap transition-colors ${activeTab === 'gatherings' ? 'text-[#C5A85C] border-b-2 border-[#C5A85C]' : 'text-[#AAB3CF] hover:text-white'}`}>Gatherings</button>
      </div>

      {/* Regions Tab */}
      {activeTab === 'regions' && (
        <div>
          {/* Search and Add */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <input type="text" placeholder="Search regions or countries..." value={regionSearchQuery} onChange={(e) => setRegionSearchQuery(e.target.value)}
                className="w-full bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-2.5 sm:py-3 pl-12 pr-4 text-white placeholder-[#AAB3CF]/60 focus:outline-none focus:border-[#C5A85C]/40 transition-colors text-sm sm:text-base" />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A85C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => { setIsRegionBulkUploadOpen(true); setRegionBulkFile(null); setRegionBulkResult(null); }}
                className="px-4 py-2.5 bg-[#232B52] border border-[#C5A85C]/40 text-[#C5A85C] text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-[#C5A85C]/10 transition-colors rounded-lg whitespace-nowrap flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Bulk Upload
              </button>
              <button onClick={() => { setEditingRegion(null); setRegionFormData({ continent: 'Asia', name: '', countries: '' }); setIsRegionModalOpen(true); }} disabled={isSubmitting}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium disabled:opacity-50 text-sm sm:text-base whitespace-nowrap">
                Add Region
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
            {isRegionLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
              </div>
            ) : (
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
                  {filteredRegions.length === 0 ? (
                    <tr><td colSpan={4} className="py-12 text-center text-[#AAB3CF]">No regions found</td></tr>
                  ) : (
                    filteredRegions.map((region) => (
                      <tr key={region.id} className="border-b border-[#C5A85C]/5 hover:bg-[#1C2340]/50">
                        <td className="py-4 px-6 text-white">{region.continent}</td>
                        <td className="py-4 px-6 text-white">{region.name}</td>
                        <td className="py-4 px-6 text-[#AAB3CF]">{JSON.parse(region.countries).join(', ')}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setEditingRegion(region); setRegionFormData({ continent: region.continent, name: region.name, countries: JSON.parse(region.countries).join(', ') }); setIsRegionModalOpen(true); }} disabled={isSubmitting} className="p-2 text-[#C5A85C] hover:bg-[#C5A85C]/10 rounded-lg disabled:opacity-50">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={() => handleDeleteRegion(region.id)} disabled={isDeletingRegion === region.id} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg disabled:opacity-50">
                              {isDeletingRegion === region.id ? <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {isRegionLoading ? (
              <div className="text-center text-[#AAB3CF] py-12">Loading...</div>
            ) : filteredRegions.length === 0 ? (
              <div className="text-center text-[#AAB3CF] py-12">No regions found</div>
            ) : (
              filteredRegions.map((region) => (
                <div key={region.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium">{region.name}</div>
                      <div className="text-[#AAB3CF] text-sm">{region.continent}</div>
                    </div>
                  </div>
                  <div className="text-[#AAB3CF] text-xs mb-3">
                    <span className="text-[#C5A85C] text-xs uppercase">Countries:</span> {JSON.parse(region.countries).join(', ')}
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-[#C5A85C]/10">
                    <button onClick={() => { setEditingRegion(region); setRegionFormData({ continent: region.continent, name: region.name, countries: JSON.parse(region.countries).join(', ') }); setIsRegionModalOpen(true); }} disabled={isSubmitting} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">Edit</button>
                    <button onClick={() => handleDeleteRegion(region.id)} disabled={isDeletingRegion === region.id} className="flex-1 py-2 text-xs text-red-400 hover:text-red-300 rounded-lg transition-colors disabled:opacity-50">{isDeletingRegion === region.id ? 'Deleting...' : 'Delete'}</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Gatherings Tab */}
      {activeTab === 'gatherings' && (
        <div>
          {/* Search, Filter and Add */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <input type="text" placeholder="Search gatherings..." value={gatheringSearchQuery} onChange={(e) => setGatheringSearchQuery(e.target.value)}
                  className="w-full bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-2.5 sm:py-3 pl-12 pr-4 text-white placeholder-[#AAB3CF]/60 focus:outline-none focus:border-[#C5A85C]/40 transition-colors text-sm sm:text-base" />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A85C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select value={gatheringRegionFilter} onChange={(e) => setGatheringRegionFilter(e.target.value)}
                className="bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-2.5 sm:py-3 px-4 text-white focus:outline-none focus:border-[#C5A85C]/40 transition-colors text-sm sm:text-base">
                <option value="All">All Regions</option>
                {uniqueRegions.map(region => <option key={region} value={region}>{region}</option>)}
              </select>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => { setIsGatheringBulkUploadOpen(true); setGatheringBulkFile(null); setGatheringBulkResult(null); }}
                className="px-4 py-2.5 bg-[#232B52] border border-[#C5A85C]/40 text-[#C5A85C] text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-[#C5A85C]/10 transition-colors rounded-lg whitespace-nowrap flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Bulk Upload
              </button>
              <button onClick={() => { setEditingGathering(null); setGatheringFormData({ year: new Date().getFullYear(), location_city: '', location_country: '', region_name: 'North America', description: '' }); setIsGatheringModalOpen(true); }} disabled={isSubmitting}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium disabled:opacity-50 text-sm sm:text-base whitespace-nowrap">
                Add Gathering
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
            {isGatheringLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
              </div>
            ) : (
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
                  {filteredGatherings.length === 0 ? (
                    <tr><td colSpan={5} className="py-12 text-center text-[#AAB3CF]">No gatherings found</td></tr>
                  ) : (
                    filteredGatherings.map((gathering) => (
                      <tr key={gathering.id} className="border-b border-[#C5A85C]/5 hover:bg-[#1C2340]/50">
                        <td className="py-4 px-6 text-white">{gathering.year}</td>
                        <td className="py-4 px-6 text-white">{gathering.location_city}, {gathering.location_country}</td>
                        <td className="py-4 px-6 text-[#AAB3CF]">{gathering.region_name}</td>
                        <td className="py-4 px-6 text-[#AAB3CF] max-w-xs truncate">{gathering.description}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setEditingGathering(gathering); setGatheringFormData({ year: gathering.year, location_city: gathering.location_city, location_country: gathering.location_country, region_name: gathering.region_name, description: gathering.description || '' }); setIsGatheringModalOpen(true); }} disabled={isSubmitting} className="p-2 text-[#C5A85C] hover:bg-[#C5A85C]/10 rounded-lg disabled:opacity-50">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={() => handleDeleteGathering(gathering.id)} disabled={isDeletingGathering === gathering.id} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg disabled:opacity-50">
                              {isDeletingGathering === gathering.id ? <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {isGatheringLoading ? (
              <div className="text-center text-[#AAB3CF] py-12">Loading...</div>
            ) : filteredGatherings.length === 0 ? (
              <div className="text-center text-[#AAB3CF] py-12">No gatherings found</div>
            ) : (
              filteredGatherings.map((gathering) => (
                <div key={gathering.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium">{gathering.year} • {gathering.location_city}, {gathering.location_country}</div>
                      <div className="text-[#AAB3CF] text-sm">{gathering.region_name}</div>
                    </div>
                  </div>
                  {gathering.description && (
                    <div className="text-[#AAB3CF] text-xs mb-3 line-clamp-2">{gathering.description}</div>
                  )}
                  <div className="flex gap-2 pt-3 border-t border-[#C5A85C]/10">
                    <button onClick={() => { setEditingGathering(gathering); setGatheringFormData({ year: gathering.year, location_city: gathering.location_city, location_country: gathering.location_country, region_name: gathering.region_name, description: gathering.description || '' }); setIsGatheringModalOpen(true); }} disabled={isSubmitting} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">Edit</button>
                    <button onClick={() => handleDeleteGathering(gathering.id)} disabled={isDeletingGathering === gathering.id} className="flex-1 py-2 text-xs text-red-400 hover:text-red-300 rounded-lg transition-colors disabled:opacity-50">{isDeletingGathering === gathering.id ? 'Deleting...' : 'Delete'}</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Region Modal */}
      <AnimatePresence>
        {isRegionModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsRegionModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 sm:p-6 border-b border-[#C5A85C]/20 sticky top-0 bg-[#232B52] z-10">
                <h2 className="font-serif text-lg sm:text-xl text-white">{editingRegion ? 'Edit Region' : 'Add Region'}</h2>
              </div>
              <form onSubmit={handleRegionSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Continent</label>
                  <select value={regionFormData.continent} onChange={(e) => setRegionFormData({ ...regionFormData, continent: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 sm:py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:text-base">
                    <option>Asia</option><option>Europe</option><option>North America</option><option>South America</option><option>Africa</option><option>Oceania</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Region Name</label>
                  <input type="text" value={regionFormData.name} onChange={(e) => setRegionFormData({ ...regionFormData, name: e.target.value })} required className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 sm:py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:text-base" />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Countries (comma-separated)</label>
                  <textarea value={regionFormData.countries} onChange={(e) => setRegionFormData({ ...regionFormData, countries: e.target.value })} rows={4} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 sm:py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:text-base" placeholder="India, Pakistan, Bangladesh" />
                </div>
                <div className="flex gap-3 pt-4 border-t border-[#C5A85C]/20">
                  <button type="button" onClick={() => setIsRegionModalOpen(false)} disabled={isSubmitting} className="flex-1 px-4 py-2.5 sm:py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] disabled:opacity-50 text-sm sm:text-base">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 sm:py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base">
                    {isSubmitting ? <><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Saving...</> : editingRegion ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gathering Modal */}
      <AnimatePresence>
        {isGatheringModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsGatheringModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 sm:p-6 border-b border-[#C5A85C]/20 sticky top-0 bg-[#232B52] z-10">
                <h2 className="font-serif text-lg sm:text-xl text-white">{editingGathering ? 'Edit Gathering' : 'Add Gathering'}</h2>
              </div>
              <form onSubmit={handleGatheringSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Year</label>
                    <input type="number" value={gatheringFormData.year} onChange={(e) => setGatheringFormData({ ...gatheringFormData, year: parseInt(e.target.value) })} required className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 sm:py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Region</label>
                    <select value={gatheringFormData.region_name} onChange={(e) => setGatheringFormData({ ...gatheringFormData, region_name: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 sm:py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:text-base">
                      <option>North America</option><option>South America</option><option>Europe</option><option>South Asia</option><option>Middle East</option><option>Southeast Asia</option><option>Central Asia</option><option>Africa</option><option>Oceania</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">City</label>
                    <input type="text" value={gatheringFormData.location_city} onChange={(e) => setGatheringFormData({ ...gatheringFormData, location_city: e.target.value })} required className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 sm:py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
                    <input type="text" value={gatheringFormData.location_country} onChange={(e) => setGatheringFormData({ ...gatheringFormData, location_country: e.target.value })} required className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 sm:py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:text-base" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Description</label>
                  <textarea value={gatheringFormData.description} onChange={(e) => setGatheringFormData({ ...gatheringFormData, description: e.target.value })} rows={4} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 sm:py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm sm:text-base" />
                </div>
                <div className="flex gap-3 pt-4 border-t border-[#C5A85C]/20">
                  <button type="button" onClick={() => setIsGatheringModalOpen(false)} disabled={isSubmitting} className="flex-1 px-4 py-2.5 sm:py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] disabled:opacity-50 text-sm sm:text-base">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 sm:py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base">
                    {isSubmitting ? <><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Saving...</> : editingGathering ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Region Bulk Upload Modal */}
      <AnimatePresence>
        {isRegionBulkUploadOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setIsRegionBulkUploadOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-4 sm:p-6 w-full max-w-2xl my-8 max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-serif text-lg sm:text-xl">Bulk Upload Regions</h3>
                <button onClick={() => setIsRegionBulkUploadOpen(false)} className="text-[#AAB3CF] hover:text-white p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">JSON Format Example:</label>
                <div className="bg-[#1C2340] border border-[#C5A85C]/20 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-[#AAB3CF] text-xs sm:text-sm whitespace-pre-wrap">{`[
  {
    "continent": "Asia",
    "name": "South Asia",
    "countries": ["India", "Pakistan", "Bangladesh"]
  },
  {
    "continent": "Europe",
    "name": "Western Europe",
    "countries": ["France", "Germany", "UK"]
  }
]`}</pre>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Upload JSON File:</label>
                <div className="border-2 border-dashed border-[#C5A85C]/20 rounded-lg p-6 text-center hover:border-[#C5A85C]/40 transition-colors">
                  <input type="file" accept=".json,application/json" onChange={handleRegionFileChange} className="hidden" id="region-file-upload" />
                  <label htmlFor="region-file-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-[#C5A85C]/40 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    {regionBulkFile ? (<div><p className="text-white text-sm font-medium">{regionBulkFile.name}</p><p className="text-[#AAB3CF] text-xs">{(regionBulkFile.size / 1024).toFixed(2)} KB</p></div>) : (<div><p className="text-[#C9CCD6] text-sm mb-2">Drag and drop your JSON file here, or click to browse</p><p className="text-[#AAB3CF] text-xs">Only .json files are accepted</p></div>)}
                  </label>
                </div>
              </div>
              {regionBulkResult && (
                <div className="mb-6 p-4 rounded-lg border">{regionBulkResult.success > 0 ? (<div className="flex items-center gap-3 text-green-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-sm">Successfully uploaded {regionBulkResult.success} region{regionBulkResult.success !== 1 ? 's' : ''}!</span></div>) : (<div className="flex items-center gap-3 text-red-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-sm">Upload failed. Please check your JSON format.</span></div>)}</div>
              )}
              <div className="flex gap-3 pt-4 border-t border-[#C5A85C]/20">
                <button type="button" onClick={() => setIsRegionBulkUploadOpen(false)} disabled={isRegionBulkUploading} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">Close</button>
                <button type="button" onClick={handleRegionBulkUpload} disabled={!regionBulkFile || isRegionBulkUploading} className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D4BE90] rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">{isRegionBulkUploading ? (<><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Uploading...</>) : (<><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>Upload Regions</>)}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gathering Bulk Upload Modal */}
      <AnimatePresence>
        {isGatheringBulkUploadOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setIsGatheringBulkUploadOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-4 sm:p-6 w-full max-w-2xl my-8 max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-serif text-lg sm:text-xl">Bulk Upload Gatherings</h3>
                <button onClick={() => setIsGatheringBulkUploadOpen(false)} className="text-[#AAB3CF] hover:text-white p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">JSON Format Example:</label>
                <div className="bg-[#1C2340] border border-[#C5A85C]/20 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-[#AAB3CF] text-xs sm:text-sm whitespace-pre-wrap">{`[
  {
    "year": 2024,
    "location_city": "Washington D.C.",
    "location_country": "United States",
    "region_name": "North America",
    "description": "Circle discussion on documenting contemporary spiritual reflections."
  },
  {
    "year": 2023,
    "location_city": "Paris",
    "location_country": "France",
    "region_name": "Europe",
    "description": "Regional dialogue on spiritual traditions."
  }
]`}</pre>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Upload JSON File:</label>
                <div className="border-2 border-dashed border-[#C5A85C]/20 rounded-lg p-6 text-center hover:border-[#C5A85C]/40 transition-colors">
                  <input type="file" accept=".json,application/json" onChange={handleGatheringFileChange} className="hidden" id="gathering-file-upload" />
                  <label htmlFor="gathering-file-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-[#C5A85C]/40 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    {gatheringBulkFile ? (<div><p className="text-white text-sm font-medium">{gatheringBulkFile.name}</p><p className="text-[#AAB3CF] text-xs">{(gatheringBulkFile.size / 1024).toFixed(2)} KB</p></div>) : (<div><p className="text-[#C9CCD6] text-sm mb-2">Drag and drop your JSON file here, or click to browse</p><p className="text-[#AAB3CF] text-xs">Only .json files are accepted</p></div>)}
                  </label>
                </div>
              </div>
              {gatheringBulkResult && (
                <div className="mb-6 p-4 rounded-lg border">{gatheringBulkResult.success > 0 ? (<div className="flex items-center gap-3 text-green-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-sm">Successfully uploaded {gatheringBulkResult.success} gathering{gatheringBulkResult.success !== 1 ? 's' : ''}!</span></div>) : (<div className="flex items-center gap-3 text-red-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-sm">Upload failed. Please check your JSON format.</span></div>)}</div>
              )}
              <div className="flex gap-3 pt-4 border-t border-[#C5A85C]/20">
                <button type="button" onClick={() => setIsGatheringBulkUploadOpen(false)} disabled={isGatheringBulkUploading} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors disabled:opacity-50">Close</button>
                <button type="button" onClick={handleGatheringBulkUpload} disabled={!gatheringBulkFile || isGatheringBulkUploading} className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D4BE90] rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">{isGatheringBulkUploading ? (<><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Uploading...</>) : (<><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>Upload Gatherings</>)}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
