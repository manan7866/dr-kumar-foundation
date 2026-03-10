"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

export default function SystemSettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'contributor',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/settings/users', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/settings/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowUserForm(false);
        setFormData({ email: '', password: '', full_name: '', role: 'contributor' });
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleUpdateRole = async (id: string, newRole: string) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/settings/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (response.ok) {
        fetchUsers();
        setShowRoleModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setFormData({ ...formData, role: user.role });
    setShowRoleModal(true);
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/settings/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: !isActive }),
      });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div className="space-y-8 p-14">
      <div>
        <h2 className="text-white font-sans text-xl uppercase tracking-wider">System Settings</h2>
        <p className="text-[#C9CCD6] text-sm mt-1">Administrative configuration</p>
      </div>

      {/* User Management */}
      <div className="bg-[#242B4A] border border-[#C5A85C]/20">
        <div className="p-5 border-b border-[#C5A85C]/20 flex items-center justify-between">
          <div>
            <h3 className="text-white font-sans text-sm uppercase tracking-wider">Admin Users</h3>
            <p className="text-[#C9CCD6] text-xs mt-1">Manage dashboard access</p>
          </div>
          <button
            onClick={() => setShowUserForm(true)}
            className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors"
          >
            Add User
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Name</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Email</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Role</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Status</th>
              <th className="text-right text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-[#C9CCD6]">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-[#C9CCD6]">No users found</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-[#C5A85C]/10">
                  <td className="p-4 text-white">{u.full_name}</td>
                  <td className="p-4 text-[#C9CCD6]">{u.email}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs uppercase rounded-full ${
                        u.role === 'super_admin' ? 'bg-red-500/20 text-red-400' :
                        u.role === 'moderator' ? 'bg-[#C5A85C]/20 text-[#C5A85C]' :
                        'bg-[#1C2340] text-[#C9CCD6]'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => openRoleModal(u)}
                        className="px-3 py-1 text-xs border border-[#C5A85C]/40 text-[#C5A85C] hover:bg-[#C5A85C]/10 rounded transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs uppercase ${u.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {u.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleToggleActive(u.id, u.is_active)}
                      className="px-3 py-1 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]"
                    >
                      {u.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* System Info */}
      <div className="bg-[#242B4A] border border-[#C5A85C]/20 p-5">
        <h3 className="text-white font-sans text-sm uppercase tracking-wider mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1C2340] p-4">
            <p className="text-[#C5A85C] text-xs uppercase mb-1">Database</p>
            <p className="text-white text-sm">PostgreSQL</p>
          </div>
          <div className="bg-[#1C2340] p-4">
            <p className="text-[#C5A85C] text-xs uppercase mb-1">ORM</p>
            <p className="text-white text-sm">Prisma</p>
          </div>
          <div className="bg-[#1C2340] p-4">
            <p className="text-[#C5A85C] text-xs uppercase mb-1">Framework</p>
            <p className="text-white text-sm">Next.js 16</p>
          </div>
          <div className="bg-[#1C2340] p-4">
            <p className="text-[#C5A85C] text-xs uppercase mb-1">Version</p>
            <p className="text-white text-sm">1.0.0</p>
          </div>
        </div>
      </div>

      {/* User Form Modal */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleCreateUser} className="bg-[#242B4A] border border-[#C5A85C]/20 p-6 w-full max-w-md">
            <h3 className="text-white font-sans text-lg uppercase tracking-wider mb-6">Add Admin User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                >
                  <option value="contributor">Contributor</option>
                  <option value="moderator">Moderator</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => setShowUserForm(false)} 
                className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C]"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider hover:bg-[#C5A85C]/80">
                Create User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Role Edit Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#242B4A] border border-[#C5A85C]/20 rounded-lg w-full max-w-md">
            <div className="p-5 border-b border-[#C5A85C]/20">
              <h3 className="text-white font-sans text-sm uppercase tracking-wider">Edit User Role</h3>
              <p className="text-[#C9CCD6] text-xs mt-1">{selectedUser.full_name}</p>
            </div>
            <div className="p-5">
              <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Select Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg"
              >
                <option value="contributor">Contributor</option>
                <option value="moderator">Moderator</option>
                <option value="super_admin">Super Admin</option>
              </select>
              <div className="mt-4 space-y-2 text-xs text-[#C9CCD6]">
                <p><strong className="text-white">Contributor:</strong> Can submit contributions and tasks</p>
                <p><strong className="text-white">Moderator:</strong> Can review submissions and manage content</p>
                <p><strong className="text-white">Super Admin:</strong> Full system access</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-[#C5A85C]/20">
              <button
                type="button"
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateRole(selectedUser.id, formData.role)}
                className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider hover:bg-[#C5A85C]/80"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
