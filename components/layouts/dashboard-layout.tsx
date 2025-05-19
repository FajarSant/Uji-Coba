"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingBag, BarChart } from "lucide-react";
import Sidebar from "@/components/sidebar/sidebar";
import MobileHeader from "@/components/sidebar/mobile-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
      active: pathname.startsWith("/dashboard/customers"),
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: ShoppingBag,
      active: pathname.startsWith("/dashboard/products"),
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart,
      active: pathname.startsWith("/dashboard/reports"),
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        navItems={navItems} 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MobileHeader 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}