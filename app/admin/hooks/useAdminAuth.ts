"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string | null;
}

export function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return { user, isLoading };
}
