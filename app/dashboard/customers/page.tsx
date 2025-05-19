"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import CustomerTable from "@/components/customers/customer-table";
import { useCustomerStore } from "@/lib/stores/customer-store";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { customers } = useCustomerStore();

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <CustomerTable customers={filteredCustomers} />
      </div>
    </DashboardLayout>
  );
}