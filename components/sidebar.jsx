"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "", label: "Dashboard" }, // /serviceProvider/[id]
  { href: "profile", label: "Profile" },
  { href: "request", label: "Requests" },
  { href: "earning", label: "Earnings" },
  { href: "review", label: "Reviews" },
  { href: "messages", label: "Messages" },
];

export default function Sidebar({ base }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-blue-600">Provider Panel</h2>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const fullPath = `${base}${item.href ? "/" + item.href : ""}`;
          const isActive = pathname === fullPath;
          return (
            <Link
              key={item.href}
              href={fullPath}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
