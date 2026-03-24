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

export function useAdminUser() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const session = localStorage.getItem("admin_session");
      if (!session) {
        router.push("/admin/login");
        return;
      }

      try {
        const userData = JSON.parse(session);
        
        // Validate required fields
        if (!userData.id || !userData.role) {
          console.error("Invalid session data");
          localStorage.removeItem("admin_session");
          router.push("/admin/login");
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error("Failed to parse session:", error);
        localStorage.removeItem("admin_session");
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [router]);

  return { user, isLoading };
}
