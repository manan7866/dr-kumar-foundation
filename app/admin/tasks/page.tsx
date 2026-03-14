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
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/user-programs', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserPrograms(data);
      }
    } catch (error) {
      console.error('Failed to fetch user programs:', error);
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

  const usersInProgram = selectedProgram ? userPrograms.filter(p => p.program_type === selectedProgram) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) { alert('Please select a program'); return; }
    if (usersInProgram.length === 0) { alert('No users found in this program'); return; }

    setIsSubmitting(true);
    let successCount = 0;
    try {
      const token = localStorage.getItem("admin_token");
      const taskPromises = usersInProgram.map(async (program) => {
        try {
          const response = await fetch('/api/admin/tasks', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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
          if (response.ok) { successCount++; }
          return { success: response.ok, user: program.user_name };
        } catch (error) {
          return { success: false, user: program.user_name, error: 'Network error' };
        }
      });
      await Promise.all(taskPromises);
      setTasksCreated(successCount);
      setSuccess(true);
      setTitle(''); setMessage(''); setDueDate(''); setSelectedProgram('');
      setTimeout(() => { setSuccess(false); setTasksCreated(0); }, 5000);
    } catch (error) {
      console.error('Failed to create tasks:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = programFilter === 'all' || task.program_type === programFilter;
    const matchesStatus = taskFilter === 'all' || task.status === taskFilter;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white mb-2">Assign Tasks by Program</h2>
        <p className="text-[#AAB3CF] text-sm sm:text-base">Assign tasks to ALL members of a selected program</p>
      </div>

      {/* Create Task Form */}
      <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Select Program</label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm"
              >
                <option value="">Choose a program...</option>
                {Object.entries(programNames).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Due Date (Optional)</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Task Description</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter task description"
              rows={4}
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-2.5 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#AAB3CF]">
              {selectedProgram && <span>{usersInProgram.length} user(s) will receive this task</span>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !selectedProgram}
              className="px-6 py-2.5 bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] font-medium rounded-lg hover:from-[#D4BE90] hover:to-[#C5A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isSubmitting ? 'Creating...' : 'Create Tasks'}
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">Successfully created {tasksCreated} task(s)!</p>
          </div>
        )}
      </div>

      {/* Task Filters */}
      <div className="flex flex-wrap gap-3 mb-4 lg:mb-6">
        <select
          value={taskFilter}
          onChange={(e) => setTaskFilter(e.target.value as 'all' | 'pending' | 'completed')}
          className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm"
        >
          <option value="all">All Programs</option>
          {Object.entries(programNames).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#C5A85C] text-sm flex-1 min-w-[200px]"
        />
      </div>

      {/* Tasks Table - Desktop */}
      <div className="hidden md:block bg-[#232B52] border border-[#C5A85C]/15 rounded-xl lg:rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Task</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">User</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Program</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#AAB3CF]">No tasks found</td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{task.title}</div>
                    <div className="text-[#AAB3CF] text-sm truncate max-w-xs">{task.message}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white text-sm">{task.user_name}</div>
                    <div className="text-[#AAB3CF] text-xs">{task.user_email}</div>
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{programNames[task.program_type]}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${task.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{new Date(task.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Task Cards */}
      <div className="md:hidden space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-[#AAB3CF] py-12">No tasks found</div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{task.title}</div>
                  <div className="text-[#AAB3CF] text-sm truncate">{task.message}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${task.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                  {task.status}
                </span>
              </div>
              <div className="space-y-1 text-[#AAB3CF] text-xs mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">{task.user_name}</span>
                </div>
                <div>{programNames[task.program_type]}</div>
                <div>{new Date(task.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
