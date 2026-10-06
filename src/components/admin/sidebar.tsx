"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  BarChart,
  Settings,
  Target,
  Briefcase,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Overview",
    items: [
      { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { href: "/admin/leads", icon: Users, label: "Leads Inbox" },
      { href: "/admin/campaigns", icon: Megaphone, label: "Campaigns" },
      { href: "/admin/analytics", icon: BarChart, label: "Analytics" },
    ],
  },
  {
    title: "Sales Pipeline",
    items: [
      { href: "/admin/opportunities", icon: Target, label: "Opportunities" },
      { href: "/admin/companies", icon: Briefcase, label: "Companies" },
      { href: "/admin/revenue", icon: DollarSign, label: "Revenue" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-background md:flex">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
          <span className="text-sm font-bold text-white">KR</span>
        </div>
        <span className="font-heading font-semibold tracking-tight">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-8 overflow-y-auto p-4">
        {navItems.map((group) => (
          <div key={group.title}>
            <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </h4>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4",
                          isActive ? "text-blue-700 dark:text-blue-400" : ""
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          View Website
        </Link>
      </div>
    </aside>
  );
}
