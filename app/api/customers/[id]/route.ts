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

// Ini adalah data pelanggan contoh, bisa diganti dengan database Anda.
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
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    status: "inactive",
    phone: "+1 234 567 8902",
    address: "456 Oak St, Los Angeles, CA",
    totalOrders: 8,
    totalSpent: 800,
  },
  // Tambahkan lebih banyak pelanggan sesuai kebutuhan
];

// Handler untuk GET request
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

// Handler untuk PUT request
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

// Handler untuk DELETE request
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

  // Melakukan soft delete atau penghapusan pelanggan
  customers = customers.filter((c) => c.id !== params.id);

  return NextResponse.json(
    { message: "Customer deleted successfully" }
  );
}

// Fungsi untuk generate static params
export async function generateStaticParams() {
  // Misalnya, kita ambil data id pelanggan dari array customers.
  // Dalam aplikasi nyata, Anda bisa mengambil ini dari database.
  const customerIds = customers.map(customer => customer.id);

  // Membuat parameter statis untuk setiap id pelanggan
  return customerIds.map(id => ({
    id, // id pelanggan yang akan dipakai untuk path dinamis
  }));
}
