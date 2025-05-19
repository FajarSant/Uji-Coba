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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const customer = customers.find((c) => c.id === params.id);
  
  if (!customer) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(customer);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const index = customers.findIndex((c) => c.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }
    
    customers[index] = { ...customers[index], ...updates };
    
    return NextResponse.json(customers[index]);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update customer" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = customers.findIndex((c) => c.id === params.id);
  
  if (index === -1) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }
  
  // In a real application, this would be a soft delete
  customers = customers.filter((c) => c.id !== params.id);
  
  return NextResponse.json(
    { message: "Customer deleted successfully" }
  );
}