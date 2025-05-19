"use client";

import { useEffect } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import CustomerTable from "@/components/customers/customer-table";
import { useCustomerStore } from "@/lib/stores/customer-store";
import { useProductStore } from "@/lib/stores/product-store";

export default function DashboardPage() {
  const { customers, fetchCustomers } = useCustomerStore();
  const { fetchProducts } = useProductStore();

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, [fetchCustomers, fetchProducts]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <DashboardStats />
        <CustomerTable customers={customers} />
      </div>
    </DashboardLayout>
  );
}