// ./lib/database.types.ts

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          name: string;
          email: string;
          status: "active" | "inactive";
          phone: string;
          address: string;
          totalOrders: number;
          totalSpent: number;
          orderedProducts: OrderedProduct[]; // Adjust if orderedProducts should be a separate table or is part of this table.
        };
        Insert: {
          name: string;
          email: string;
          status: "active" | "inactive";
          phone: string;
          address: string;
        };
        Update: {
          name?: string;
          email?: string;
          status?: "active" | "inactive";
          phone?: string;
          address?: string;
        };
      };
      products: {
        Row: Product; // directly using the Product interface
        Insert: {
          name: string;
          description: string;
          price: number;
          stock: number;
          category: string;
        };
        Update: {
          name?: string;
          description?: string;
          price?: number;
          stock?: number;
          category?: string;
        };
      };
      transactions: {
        Row: Transaction; // directly using the Transaction interface
        Insert: {
          customerId: string;
          totalAmount: number;
          status: "completed" | "pending" | "canceled";
        };
        Update: {
          totalAmount?: number;
          status?: "completed" | "pending" | "canceled";
        };
      };
      transaction_items: {
        Row: {
          id: string;
          transaction_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          transaction_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          quantity?: number;
          price?: number;
        };
      };
    };
  };
};

// Interfaces to define types used in database types (you can also import these if defined elsewhere)
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
