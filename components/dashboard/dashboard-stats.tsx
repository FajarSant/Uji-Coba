"use client";

import { 
  Users, 
  ShoppingBag, 
  CreditCard, 
  TrendingUp 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCustomerStore } from "@/lib/stores/customer-store";

export default function DashboardStats() {
  const { customers } = useCustomerStore();
  
  // In a real application, these would be fetched from the API
  const totalCustomers = customers.length;
  const totalProducts = 48;
  const totalSales = 16250;
  const totalRevenue = 124950;

  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      description: "Active customers",
      icon: Users,
      trend: "+5.2%",
      trendUp: true,
    },
    {
      title: "Total Products",
      value: totalProducts,
      description: "Available products",
      icon: ShoppingBag,
      trend: "+3.1%",
      trendUp: true,
    },
    {
      title: "Total Sales",
      value: totalSales,
      description: "All time sales",
      icon: CreditCard,
      trend: "+12.5%",
      trendUp: true,
      formatValue: (value: number) => value.toLocaleString(),
    },
    {
      title: "Total Revenue",
      value: totalRevenue,
      description: "All time revenue",
      icon: TrendingUp,
      trend: "+8.4%",
      trendUp: true,
      formatValue: (value: number) => `$${value.toLocaleString()}`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.formatValue ? stat.formatValue(stat.value) : stat.value}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <div className={`mt-2 flex items-center text-xs ${
              stat.trendUp ? "text-green-500" : "text-red-500"
            }`}>
              {stat.trendUp ? "↑" : "↓"} {stat.trend} from last month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}