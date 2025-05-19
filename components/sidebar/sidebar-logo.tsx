"use client";

import { ShoppingBag } from "lucide-react";

export function SidebarLogo() {
  return (
    <div className="flex items-center">
      <ShoppingBag className="h-6 w-6 text-primary mr-2" />
      <span className="text-lg font-semibold">POS Admin</span>
    </div>
  );
}