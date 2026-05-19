"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const redirect = () => {
      setAuthorized(false);
      setChecking(false);
      if (router.pathname !== "/admin-login") {
        router.replace("/admin-login");
      }
    };

    const token = localStorage.getItem("token");
    const otpVerified = localStorage.getItem("admin_otp_verified");
    const userStr = localStorage.getItem("user");

    if (!token || otpVerified !== "true" || !userStr) {
      redirect();
      return;
    }

    let user;
    try {
      user = JSON.parse(userStr);
    } catch {
      redirect();
      return;
    }

    if (!user || user.role !== "admin") {
      redirect();
      return;
    }

    setAuthorized(true);
    setChecking(false);
  }, [router.pathname]);

  if (checking || !authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  return children;
}
