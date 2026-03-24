"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RefreshSessionPage() {
  const router = useRouter();

  useEffect(() => {
    const refreshSession = async () => {
      const session = localStorage.getItem("admin_session");
      if (!session) {
        router.push("/admin/login");
        return;
      }

      const userData = JSON.parse(session);
      
      // Fetch fresh user data
      try {
        const response = await fetch(`/api/admin/me?user_id=${userData.id}`);
        if (response.ok) {
          const data = await response.json();
          // Update session with fresh data including avatar_url
          localStorage.setItem("admin_session", JSON.stringify(data.user));
          console.log("Session refreshed with avatar_url:", data.user.avatar_url);
        }
      } catch (error) {
        console.error("Failed to refresh session:", error);
      }
      
      // Redirect to dashboard
      router.push("/admin");
    };

    refreshSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#AAB3CF]">Refreshing session...</p>
      </div>
    </div>
  );
}
