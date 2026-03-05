"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface UserProgram {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  program_type: string;
}

interface Task {
  id: string;
  title: string;
  message: string;
  user_name: string;
  user_email: string;
  program_type: string;
  status: string;
  created_at: string;
  due_date?: string;
}

const programNames: Record<string, string> = {
  'healing-initiatives': 'Healing Initiatives',
  'environmental-programs': 'Environmental Programs',
  'youth-engagement': 'Youth Engagement',
  'sufi-music': 'Sufi Music',
  'sufi-ecommerce': 'Sufi Ecommerce',
  'sufi-science': 'Sufi Science',
  'interfaith-program': 'Interfaith Program',
};

export default function AdminTasksPage() {
  const [userPrograms, setUserPrograms] = useState<UserProgram[]>([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tasksCreated, setTasksCreated] = useState(0);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState<string>('all');

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@dkf.sufisciencecenter.info", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@dkf.sufisciencecenter.info", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchUserPrograms();
    fetchAllTasks();
  }, []);

  const fetchUserPrograms = async () => {
    try {
      console.log('[Admin Tasks] Fetching user programs...');
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/user-programs', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[Admin Tasks] Received user programs:', data.length);
        setUserPrograms(data);
      } else {
        console.error('[Admin Tasks] Failed to fetch:', response.status);
      }
    } catch (error) {
      console.error('[Admin Tasks] Failed to fetch user programs:', error);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/tasks', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAllTasks(data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  // Get users in selected program
  const usersInProgram = selectedProgram
    ? userPrograms.filter(p => p.program_type === selectedProgram)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) {
      alert('Please select a program');
      return;
    }

    if (usersInProgram.length === 0) {
      alert('No users found in this program');
      return;
    }

    setIsSubmitting(true);
    let successCount = 0;

    try {
      const token = localStorage.getItem("admin_token");
      
      // Create task for EACH user in the program
      const taskPromises = usersInProgram.map(async (program) => {
        try {
          const response = await fetch('/api/admin/tasks', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_program_id: program.id,
              user_id: program.user_id,
              user_name: program.user_name,
              user_email: program.user_email,
              program_type: program.program_type,
              title,
              message,
              due_date: dueDate || null,
            }),
          });

          if (response.ok) {
            successCount++;
            return { success: true, user: program.user_name };
          }
          return { success: false, user: program.user_name, error: 'Failed to create task' };
        } catch (error) {
          console.error(`[Admin Tasks] Failed to create task for ${program.user_name}:`, error);
          return { success: false, user: program.user_name, error: 'Network error' };
        }
      });

      // Wait for all tasks to be created
      const results = await Promise.all(taskPromises);
      
      console.log('[Admin Tasks] Task creation results:', results);
      setTasksCreated(successCount);
      setSuccess(true);
      
      // Reset form
      setTitle('');
      setMessage('');
      setDueDate('');
      setSelectedProgram('');
      
      // Hide success after 5 seconds
      setTimeout(() => {
        setSuccess(false);
        setTasksCreated(0);
      }, 5000);

    } catch (error) {
      console.error('[Admin Tasks] Failed to create tasks:', error);
      alert('Failed to create tasks: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#C5A85C] to-[#D4BE90] rounded-xl flex items-center justify-center shadow-lg shadow-[#C5A85C]/20">
              <svg className="w-6 h-6 text-[#1C2340]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-serif text-white">Assign Tasks by Program</h2>
              <p className="text-[#AAB3CF] text-sm mt-1">Assign tasks to ALL members of a selected program</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-400 flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Successfully assigned task to <strong className="text-white">{tasksCreated} users</strong> in {programNames[selectedProgram] || 'selected program'}!
        </motion.div>
      )}

      {/* Info Box */}
      {selectedProgram && usersInProgram.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>
              This task will be sent to <strong className="text-white">{usersInProgram.length}</strong> member{usersInProgram.length !== 1 ? 's' : ''} in {programNames[selectedProgram]}
            </span>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden"
      >
        {/* Form Header */}
        <div className="bg-gradient-to-r from-[#1C2340] to-[#232B52] px-8 py-6 border-b border-[#C5A85C]/20">
          <h3 className="font-serif text-xl text-white flex items-center gap-3">
            <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Task Details
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Program Selection */}
          <div className="mb-6">
            <label className="block text-[#C5A85C] text-xs uppercase mb-2 font-medium">
              Select Program *
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] transition-all"
              required
            >
              <option value="">Select a program to send task to ALL members...</option>
              {Object.entries(programNames).map(([key, name]) => {
                const count = userPrograms.filter(p => p.program_type === key).length;
                return (
                  <option key={key} value={key}>
                    {name} ({count} member{count !== 1 ? 's' : ''})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Task Title */}
          <div className="mb-6">
            <label className="block text-[#C5A85C] text-xs uppercase mb-2 font-medium">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] transition-all"
              placeholder="e.g., Organize Community Discussion"
              required
            />
          </div>

          {/* Task Message */}
          <div className="mb-6">
            <label className="block text-[#C5A85C] text-xs uppercase mb-2 font-medium">
              Task Description *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] transition-all min-h-[100px] max-h-[200px]"
              placeholder="Describe the task details, expectations, and any specific requirements..."
              required
            />
            <p className="text-[#AAB3CF] text-xs mt-2 text-right">{message.length} characters</p>
          </div>

          {/* Due Date */}
          <div className="mb-8">
            <label className="block text-[#C5A85C] text-xs uppercase mb-2 font-medium">
              Due Date <span className="text-[#6B7299]">(Optional)</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full md:w-1/2 bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t border-[#C5A85C]/20">
            <button
              type="button"
              onClick={() => {
                setTitle('');
                setMessage('');
                setDueDate('');
                setSelectedProgram('');
                setSuccess(false);
                setTasksCreated(0);
              }}
              className="px-6 py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] transition-all"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedProgram || !title || !message || usersInProgram.length === 0}
              className="flex-1 px-8 py-3 bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] rounded-lg hover:from-[#D4BE90] hover:to-[#C5A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-[#C5A85C]/20"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending to {usersInProgram.length} Users...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Task to All {usersInProgram.length > 0 ? `(${usersInProgram.length})` : ''} Members
                </span>
              )}
            </button>
          </div>

          {/* Helper Text */}
          <p className="text-[#AAB3CF] text-xs mt-4 text-center">
            📧 Each member will receive a notification in their dashboard
          </p>
        </form>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 grid md:grid-cols-3 gap-6"
      >
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
          <div className="text-3xl font-serif text-[#C5A85C] mb-2">{userPrograms.length}</div>
          <div className="text-[#AAB3CF] text-sm">Total Enrolled Users</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
          <div className="text-3xl font-serif text-blue-400 mb-2">
            {new Set(userPrograms.map(p => p.program_type)).size}
          </div>
          <div className="text-[#AAB3CF] text-sm">Active Programs</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-6">
          <div className="text-3xl font-serif text-green-400 mb-2">
            {new Set(userPrograms.map(p => p.user_id)).size}
          </div>
          <div className="text-[#AAB3CF] text-sm">Unique Contributors</div>
        </div>
      </motion.div>

      {/* All Sent Tasks Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif text-white">All Sent Tasks</h2>
            <p className="text-[#AAB3CF] text-sm mt-1">View all tasks assigned to users</p>
          </div>
          <div className="flex gap-3">
            {(['all', 'pending', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setTaskFilter(status)}
                className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                  taskFilter === status
                    ? 'bg-[#C5A85C] border-[#C5A85C] text-[#1C2340]'
                    : 'border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by user name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#232B52] border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#C5A85C]"
          />
          <select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="bg-[#232B52] border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#C5A85C]"
          >
            <option value="all">All Programs</option>
            {Object.entries(programNames).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
          {(searchTerm || programFilter !== 'all' || taskFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setProgramFilter('all');
                setTaskFilter('all');
              }}
              className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Tasks Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-white mb-1">
              {allTasks.filter(t => 
                (taskFilter === 'all' || t.status === taskFilter) &&
                (programFilter === 'all' || t.program_type === programFilter) &&
                (t.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 t.user_email.toLowerCase().includes(searchTerm.toLowerCase()))
              ).length}
            </div>
            <div className="text-[#AAB3CF] text-sm">Filtered Tasks</div>
          </div>
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-amber-400 mb-1">
              {allTasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-[#AAB3CF] text-sm">Total Pending</div>
          </div>
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-green-400 mb-1">
              {allTasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-[#AAB3CF] text-sm">Total Completed</div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">User</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Program</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Title</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Created</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Due Date</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {allTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#AAB3CF]">
                    No tasks sent yet
                  </td>
                </tr>
              ) : (
                allTasks
                  .filter(t => 
                    (taskFilter === 'all' || t.status === taskFilter) &&
                    (programFilter === 'all' || t.program_type === programFilter) &&
                    (t.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     t.user_email.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .map((task) => (
                    <tr key={task.id} className="hover:bg-[#1C2340]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-white font-medium">{task.user_name}</div>
                          <div className="text-[#AAB3CF] text-sm">{task.user_email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                        {programNames[task.program_type]}
                      </td>
                      <td className="px-6 py-4 text-white text-sm">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                        {new Date(task.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                        {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Not set'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                          task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
