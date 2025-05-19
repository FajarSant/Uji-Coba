"use client";

import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          This page would display various sales and performance reports.
        </p>
      </div>
    </DashboardLayout>
  );
}