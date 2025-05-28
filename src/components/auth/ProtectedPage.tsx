"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedPageProps {
  children: React.ReactNode;
  redirectTo?: string; // default: "/login"
  fallback?: React.ReactNode; // voliteľný loading stav
}

export default function ProtectedPage({
  children,
  redirectTo = "/login",
  fallback = <div className="text-center mt-10">Checking authentication...</div>,
}: ProtectedPageProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  if (loading || !user) {
    return fallback;
  }

  return <>{children}</>;
}