"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function ServiceProviderEntryPage() {
  const router = useRouter();
  const { user, loading } = useAppContext();

  useEffect(() => {
    if (loading) return;
    if (user?.role === "serviceProvider" && user.id) {
      router.replace(`/serviceProvider/${user.id}`);
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          Loading provider dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Service Provider Access</h1>
        <p className="mt-3 text-gray-600">
          Log in as a service provider to open your dashboard.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/auth/login"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-5 py-2.5 rounded-lg border border-blue-200 text-blue-700 font-medium hover:bg-blue-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
