"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useProductStore } from "@/lib/stores/product-store";

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground">
          This page would display the product management interface.
        </p>
      </div>
    </DashboardLayout>
  );
}