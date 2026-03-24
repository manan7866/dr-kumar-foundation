"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Program {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  engagement_count: number;
  approved_contributions: number;
  last_updated: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  engagement_count: number;
  approved_contributions: number;
  last_updated: string;
}

interface ProgramMap {
  [key: string]: Program;
}

export default function AdminProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/admin/contributions?status=approved');
      if (response.ok) {
        const contributions = await response.json();
        const programMap: ProgramMap = {
          'healing-initiatives': { id: '1', name: 'Healing Initiatives', description: 'Structured pathways for healing and counseling programs.', is_active: true, engagement_count: 0, approved_contributions: 0, last_updated: new Date().toISOString() },
          'environmental-programs': { id: '2', name: 'Environmental Programs', description: 'Research and field partnership for environmental conservation.', is_active: true, engagement_count: 0, approved_contributions: 0, last_updated: new Date().toISOString() },
          'youth-engagement': { id: '3', name: 'Youth Engagement', description: 'Nurturing the next generation through educational programs.', is_active: true, engagement_count: 0, approved_contributions: 0, last_updated: new Date().toISOString() },
          'sufi-music': { id: '4', name: 'Sufi Music', description: 'Preservation and dissemination of devotional musical traditions.', is_active: true, engagement_count: 0, approved_contributions: 0, last_updated: new Date().toISOString() },
          'sufi-ecommerce': { id: '5', name: 'Sufi Ecommerce', description: 'Ethical commerce supporting heritage artisans and crafts.', is_active: true, engagement_count: 0, approved_contributions: 0, last_updated: new Date().toISOString() },
          'sufi-science': { id: '6', name: 'Sufi Science', description: 'Interdisciplinary exploration of spiritual philosophy.', is_active: true, engagement_count: 0, approved_contributions: 0, last_updated: new Date().toISOString() },
          'interfaith-program': { id: '7', name: 'Interfaith Program', description: 'Dialogue and civilizational engagement infrastructure.', is_active: true, engagement_count: 0, approved_contributions: 0, last_updated: new Date().toISOString() },
        };
        contributions.forEach((contrib: { program_type: string; submitted_at: string }) => {
          const programType = contrib.program_type;
          if (programMap[programType]) {
            programMap[programType].approved_contributions += 1;
            programMap[programType].engagement_count += 1;
            programMap[programType].last_updated = contrib.submitted_at;
          }
        });
        const programList = Object.values(programMap).map((p: Program) => ({ ...p, last_updated: p.last_updated || new Date().toISOString() }));
        setPrograms(programList);
      }
    } catch (error) { console.error('Failed to fetch programs:', error); }
    finally { setIsLoading(false); }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">Programs</h2>
        <p className="text-[#AAB3CF] text-sm sm:text-base">Manage program content and engagement</p>
      </div>

      {/* Programs Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-[#C5A85C]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-serif text-base lg:text-lg font-semibold">{program.name}</h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 whitespace-nowrap">Active</span>
              </div>
              <p className="text-[#AAB3CF] text-xs sm:text-sm mb-4 line-clamp-2">{program.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#1C2340] rounded-lg p-3">
                  <div className="text-2xl font-serif text-[#C5A85C]">{program.engagement_count}</div>
                  <div className="text-[#AAB3CF] text-xs">Engagements</div>
                </div>
                <div className="bg-[#1C2340] rounded-lg p-3">
                  <div className="text-2xl font-serif text-[#C5A85C]">{program.approved_contributions}</div>
                  <div className="text-[#AAB3CF] text-xs">Contributions</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProgram(program)}
                className="w-full py-2.5 border border-[#C5A85C]/40 text-[#C5A85C] text-xs sm:text-sm rounded-lg hover:bg-[#C5A85C]/10 transition-colors font-medium"
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProgram(null)}>
          <div className="bg-[#232B52] border border-[#C5A85C]/20 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sm:p-6 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#232B52] z-10">
              <h3 className="text-white font-serif text-lg sm:text-xl">{selectedProgram.name}</h3>
              <button onClick={() => setSelectedProgram(null)} className="text-[#AAB3CF] hover:text-white p-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <p className="text-[#C9CCD6] text-sm sm:text-base">{selectedProgram.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1C2340] rounded-lg p-4">
                  <div className="text-3xl font-serif text-[#C5A85C]">{selectedProgram.engagement_count}</div>
                  <div className="text-[#AAB3CF] text-xs sm:text-sm">Total Engagements</div>
                </div>
                <div className="bg-[#1C2340] rounded-lg p-4">
                  <div className="text-3xl font-serif text-[#C5A85C]">{selectedProgram.approved_contributions}</div>
                  <div className="text-[#AAB3CF] text-xs sm:text-sm">Approved Contributions</div>
                </div>
              </div>
              <div>
                <div className="text-[#AAB3CF] text-xs uppercase mb-2">Last Activity</div>
                <div className="text-white">{new Date(selectedProgram.last_updated).toLocaleString()}</div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-[#C5A85C]/20">
              <button onClick={() => setSelectedProgram(null)} className="w-full py-2.5 bg-[#C5A85C] text-[#1C2340] text-sm font-medium rounded-lg hover:bg-[#D4BE90] transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
