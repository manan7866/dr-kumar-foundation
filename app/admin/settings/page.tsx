"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface User { id: string; email: string; full_name: string; role: string; is_active: boolean; }

export default function SystemSettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState({ email: '', password: '', full_name: '', role: 'contributor' });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/settings/users', { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { setUsers(await response.json()); }
    } catch (error) { console.error('Failed to fetch users:', error); }
    finally { setLoading(false); }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/settings/users', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) { setShowUserForm(false); setFormData({ email: '', password: '', full_name: '', role: 'contributor' }); fetchUsers(); }
    } catch (error) { console.error('Failed to create user:', error); }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/settings/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole }),
      });
      if (response.ok) { fetchUsers(); setShowRoleModal(false); setSelectedUser(null); }
    } catch (error) { console.error('Failed to update user role:', error); }
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setShowRoleModal(true);
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/settings/users/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !isActive }),
      });
      if (response.ok) fetchUsers();
    } catch (error) { console.error('Failed to update user:', error); }
  };

  const roleColors: Record<string, string> = {
    super_admin: "bg-purple-500/20 text-purple-400",
    program_director: "bg-blue-500/20 text-blue-400",
    moderator: "bg-green-500/20 text-green-400",
    contributor: "bg-gray-500/20 text-gray-400",
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl font-serif text-white mb-2">System Settings</h2>
        <p className="text-[#AAB3CF] text-sm sm:text-base">Administrative configuration</p>
      </div>

      {/* User Management */}
      <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#C5A85C]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-white font-serif text-base sm:text-lg">Admin Users</h3>
            <p className="text-[#AAB3CF] text-xs sm:text-sm mt-1">Manage dashboard access</p>
          </div>
          <button onClick={() => setShowUserForm(true)} className="px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors rounded-lg whitespace-nowrap">
            Add User
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Name</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Email</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Role</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
                <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-[#AAB3CF]">Loading...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-[#AAB3CF]">No users found</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#1C2340]/50 transition-colors">
                    <td className="px-6 py-4 text-white">{u.full_name}</td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${roleColors[u.role] || "bg-gray-500/20 text-gray-400"}`}>{u.role.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${u.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{u.is_active ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openRoleModal(u)} className="px-3 py-1.5 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">Set Role</button>
                        <button onClick={() => handleToggleActive(u.id, u.is_active)} className="px-3 py-1.5 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">{u.is_active ? 'Deactivate' : 'Activate'}</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {loading ? (
            <div className="text-center text-[#AAB3CF] py-12">Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center text-[#AAB3CF] py-12">No users found</div>
          ) : (
            users.map((u) => (
              <div key={u.id} className="bg-[#1C2340] border border-[#C5A85C]/15 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{u.full_name}</div>
                    <div className="text-[#AAB3CF] text-sm truncate">{u.email}</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${u.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{u.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${roleColors[u.role] || "bg-gray-500/20 text-gray-400"}`}>{u.role.replace('_', ' ')}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openRoleModal(u)} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">Set Role</button>
                  <button onClick={() => handleToggleActive(u.id, u.is_active)} className="flex-1 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] rounded-lg transition-colors">{u.is_active ? 'Deactivate' : 'Activate'}</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create User Modal */}
      <AnimatePresence>
        {showUserForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUserForm(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-4 sm:p-6 w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-6">Create Admin User</h3>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Full Name</label>
                  <input type="text" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Password</label>
                  <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg" required />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg">
                    <option value="contributor">Contributor</option>
                    <option value="moderator">Moderator</option>
                    <option value="program_director">Program Director</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowUserForm(false)} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#C5A85C]/80 rounded-lg transition-colors">Create User</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Role Modal */}
      <AnimatePresence>
        {showRoleModal && selectedUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRoleModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#232B52] border border-[#C5A85C]/20 p-4 sm:p-6 w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-serif text-lg sm:text-xl mb-6">Change Role</h3>
              <div className="mb-4">
                <p className="text-[#AAB3CF] text-xs uppercase mb-1">User</p>
                <p className="text-white font-medium">{selectedUser.full_name}</p>
                <p className="text-[#AAB3CF] text-sm">{selectedUser.email}</p>
              </div>
              <div className="mb-6">
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">New Role</label>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg">
                  <option value="contributor">Contributor</option>
                  <option value="moderator">Moderator</option>
                  <option value="program_director">Program Director</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowRoleModal(false)} className="flex-1 px-4 py-2.5 border border-white/20 text-[#C9CCD6] text-xs sm:text-sm uppercase tracking-wider hover:border-[#C5A85C] rounded-lg transition-colors">Cancel</button>
                <button type="button" onClick={handleUpdateRole} className="flex-1 px-4 py-2.5 bg-[#C5A85C] text-[#1C2340] text-xs sm:text-sm uppercase tracking-wider hover:bg-[#C5A85C]/80 rounded-lg transition-colors">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
