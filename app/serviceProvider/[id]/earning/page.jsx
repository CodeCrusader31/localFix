"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Download, IndianRupee, TrendingUp } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function EarningsPage() {
  const { id } = useParams();
  const { user, loading: ctxLoading } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isOwner = !!user && user.role === "serviceProvider" && String(user.id) === String(id);

  useEffect(() => {
    const loadEarnings = async () => {
      if (!isOwner) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/ServiceProviders/${id}/earnings`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(payload.error || "Failed to load earnings");
        setData(payload);
      } catch (err) {
        setError(err.message || "Failed to load earnings");
      } finally {
        setLoading(false);
      }
    };

    if (!ctxLoading) loadEarnings();
  }, [ctxLoading, id, isOwner]);

  if (ctxLoading || loading) return <div className="bg-white rounded-lg p-6 shadow-sm">Loading earnings...</div>;

  if (!isOwner) {
    return (
      <div className="bg-white border border-red-100 rounded-lg p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Authentication required</h1>
        <p className="mt-2 text-gray-600">Log in as this service provider to view earnings.</p>
      </div>
    );
  }

  if (error) return <div className="bg-white border border-red-100 text-red-700 rounded-lg p-6">{error}</div>;

  const summary = data?.summary || {};
  const transactions = data?.transactions || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
        <p className="text-gray-600 mt-2">Track paid jobs and financial performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          ["Total Earnings", money(summary.totalEarnings), IndianRupee, "bg-green-100 text-green-600"],
          ["Pending Payments", summary.pendingPayments || 0, IndianRupee, "bg-yellow-100 text-yellow-600"],
          ["Completed Jobs", summary.completedJobs || 0, TrendingUp, "bg-blue-100 text-blue-600"],
          ["Avg. per Job", money(summary.averageEarning), Calendar, "bg-purple-100 text-purple-600"],
        ].map(([label, value, Icon, color]) => (
          <div key={label} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-lg p-3 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No paid transactions yet.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.job}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(transaction.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{money(transaction.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
