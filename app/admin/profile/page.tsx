"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import AdminLayout from "../components/AdminLayout";

interface User {
  role: string;
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: string;
}

export default function AdminProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Load user data
  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (!session) {
      router.push("/admin/login");
      return;
    }

    try {
      const userData = JSON.parse(session);
      setUser(userData);
    } catch (error) {
      console.error("Failed to parse session:", error);
      localStorage.removeItem("admin_session");
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch("/api/admin/profile/upload-avatar", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const result = await response.json();

      // Update user profile with new avatar URL
      const updateResponse = await fetch("/api/admin/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          avatarUrl: result.url,
        }),
      });

      if (updateResponse.ok) {
        const updatedUserData = await updateResponse.json();
        // Preserve ALL existing user data and only update avatar_url
        const updatedUser = {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          avatar_url: updatedUserData.user.avatar_url,
          role: user.role, // Preserve role from existing session
        };
        setUser(updatedUser);
        // Update session storage with complete user data
        localStorage.setItem("admin_session", JSON.stringify(updatedUser));
        // Force reload to update avatar in header
        window.location.reload();
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      alert(error instanceof Error ? error.message : "Failed to upload avatar");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!user) return;

    // Validate passwords
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Password change failed");
      }

      setPasswordSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password change error:", error);
      setPasswordError(error instanceof Error ? error.message : "Failed to change password");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout
      userRole={user.role}
      userName={user.full_name}
      userEmail={user.email}
      avatar_url={user.avatar_url}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl text-white mb-2">Profile Settings</h1>
          <p className="text-[#AAB3CF]">Manage your avatar and password</p>
        </motion.div>

        {/* Avatar Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 mb-8"
        >
          <h2 className="font-serif text-xl text-white mb-6">Profile Avatar</h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar Display */}
            <div
              onClick={handleAvatarClick}
              className="relative w-32 h-32 rounded-full bg-[#C5A85C]/20 flex items-center justify-center cursor-pointer hover:bg-[#C5A85C]/30 transition-colors group"
            >
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <span className="text-[#C5A85C] font-serif text-4xl font-bold">
                  {user.full_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </span>
              )}

              {/* Upload Overlay */}
              <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Upload Info */}
            <div className="flex-1">
              <h3 className="text-white font-medium mb-2">{user.full_name}</h3>
              <p className="text-[#AAB3CF] text-sm mb-4">{user.email}</p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={handleAvatarClick}
                disabled={isUploading}
                className="px-6 py-2.5 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg hover:bg-[#C5A85C]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Change Avatar"}
              </button>

              {isUploading && (
                <div className="mt-4">
                  <div className="w-full bg-[#1C2340] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#C5A85C] h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-[#AAB3CF] text-xs mt-2">Uploading... {uploadProgress}%</p>
                </div>
              )}

              <p className="text-[#6B7299] text-xs mt-4">
                Recommended: Square image, at least 200x200px. Max size: 5MB
              </p>
            </div>
          </div>
        </motion.div>

        {/* Password Change Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8"
        >
          <h2 className="font-serif text-xl text-white mb-6">Change Password</h2>

          <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
            {/* Current Password */}
            <div>
              <label className="block text-[#C9CCD6] text-sm font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                placeholder="Enter current password"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[#C9CCD6] text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                placeholder="Enter new password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#C9CCD6] text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                placeholder="Confirm new password"
                required
              />
            </div>

            {/* Error/Success Messages */}
            {passwordError && (
              <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-lg">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {passwordError}
                </p>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-4 bg-green-500/10 border border-green-500/40 rounded-lg">
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {passwordSuccess}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}
              className="w-full px-6 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg hover:bg-[#C5A85C]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Changing Password..." : "Change Password"}
            </button>
          </form>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
