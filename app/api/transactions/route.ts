import { NextResponse } from "next/server";

interface Transaction {
  id: string;
  customerId: string;
  productIds: string[];
  totalAmount: number;
  date: string;
  status: "completed" | "pending" | "canceled";
}

// This would be replaced with actual database queries
let transactions: Transaction[] = [];

export async function GET() {
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  try {
    const transaction = await request.json();
    
    // Validate transaction data
    if (!transaction.customerId || !transaction.productIds || transaction.productIds.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // In a real app, we would:
    // 1. Check if products are in stock
    // 2. Calculate the total amount based on products
    // 3. Update product stock quantities
    // 4. Update customer's order history
    
    const newTransaction = {
      id: Date.now().toString(),
      ...transaction,
      date: new Date().toISOString(),
      status: "completed",
    };
    
    transactions.push(newTransaction);
    
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create transaction" },
      { status: 500 }
    );
  }
}