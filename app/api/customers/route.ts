import { NextResponse } from "next/server";

interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
}

// This would be replaced with actual database queries
let customers: Customer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    phone: "+1 234 567 8901",
    address: "123 Main St, New York, NY",
    totalOrders: 12,
    totalSpent: 1250,
  },
  // More customers would be here
];

export async function GET() {
  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  try {
    const customer = await request.json();
    
    // Validate customer data
    if (!customer.name || !customer.email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // In a real app, we would save to the database
    const newCustomer = {
      id: Date.now().toString(),
      ...customer,
      totalOrders: 0,
      totalSpent: 0,
    };
    
    customers.push(newCustomer);
    
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create customer" },
      { status: 500 }
    );
  }
}