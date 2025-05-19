"use client";

import Link from "next/link";
import { DivideIcon as LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarLogo } from "./sidebar-logo";

interface SidebarProps {
  navItems: {
    title: string;
    href: string;
    icon: LucideIcon;
    active: boolean;
  }[];
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ navItems, open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <SidebarLogo />
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={onClose}>
                      <Button
                        variant={item.active ? "secondary" : "ghost"}
                        className="w-full justify-start h-10"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r">
        <div className="h-16 flex items-center border-b px-6">
          <SidebarLogo />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10",
                    item.active ? "bg-secondary font-medium" : ""
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}