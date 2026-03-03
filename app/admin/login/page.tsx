"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_session", JSON.stringify(data.user));
        router.push("/admin");
      } else {
        setError(data.error || "Invalid credentials");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#161B33] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 border border-[#C5A85C]/40 flex items-center justify-center mx-auto mb-4">
            <span className="text-[#C5A85C] font-serif text-3xl font-bold">D</span>
          </div>
          <h1 className="font-serif text-3xl text-white mb-2">Admin Dashboard</h1>
          <p className="text-[#AAB3CF] text-sm">
            Dr. Ghulam Mohammad Kumar Foundation
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#C9CCD6] text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={isLoading}
                className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all disabled:opacity-50"
                placeholder="admin@drkumarfoundation.org"
              />
            </div>

            <div>
              <label className="block text-[#C9CCD6] text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                disabled={isLoading}
                className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo Credentials */}
          {/* <div className="mt-6 p-4 bg-[#1C2340] border border-[#C5A85C]/10 rounded-lg">
            <p className="text-[#C5A85C] text-xs font-medium mb-2">Demo Credentials:</p>
            <p className="text-[#AAB3CF] text-xs">Email: <code className="text-white">admin@drkumarfoundation.org</code></p>
            <p className="text-[#AAB3CF] text-xs">Password: <code className="text-white">admin123</code></p>
          </div> */}
        </div>

        {/* Footer */}
        <p className="text-center text-[#AAB3CF] text-xs mt-6">
          Restricted access. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
