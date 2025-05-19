export interface OrderedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  orderedProducts: OrderedProduct[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  productIds: string[];
  totalAmount: number;
  date: string;
  status: "completed" | "pending" | "canceled";
}