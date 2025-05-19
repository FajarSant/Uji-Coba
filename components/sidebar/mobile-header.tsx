"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarLogo } from "./sidebar-logo";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="lg:hidden flex items-center h-16 border-b px-4">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      <div className="ml-3">
        <SidebarLogo />
      </div>
    </div>
  );
}