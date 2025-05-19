"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Customer, OrderedProduct } from "@/lib/types";

interface CustomerStore {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, "id" | "totalOrders" | "totalSpent" | "orderedProducts">) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  updateCustomerProducts: (customerId: string, products: OrderedProduct[]) => Promise<void>;
}

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('customers')
        .select(`
          *,
          transactions:transactions(
            id,
            total_amount,
            transaction_items:transaction_items(
              id,
              quantity,
              products:products(*)
            )
          )
        `)
        .is('deleted_at', null);

      if (error) throw error;

      const customers: Customer[] = data.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        status: customer.status,
        phone: customer.phone || '',
        address: customer.address || '',
        totalOrders: customer.transactions?.length || 0,
        totalSpent: customer.transactions?.reduce((sum, t) => sum + (t.total_amount || 0), 0) || 0,
        orderedProducts: customer.transactions?.flatMap(t => 
          t.transaction_items.map(item => ({
            id: item.products.id,
            name: item.products.name,
            price: item.products.price,
            quantity: item.quantity
          }))
        ) || []
      }));

      set({ customers, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addCustomer: async (customer) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([customer])
        .select()
        .single();

      if (error) throw error;

      const newCustomer: Customer = {
        ...data,
        totalOrders: 0,
        totalSpent: 0,
        orderedProducts: []
      };

      set(state => ({
        customers: [...state.customers, newCustomer],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('customers')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        customers: state.customers.filter(c => c.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateCustomerProducts: async (customerId, products) => {
    set({ loading: true, error: null });
    try {
      // Create a new transaction
      const { data: transaction, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          customer_id: customerId,
          total_amount: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
          status: 'completed'
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      // Create transaction items
      const transactionItems = products.map(product => ({
        transaction_id: transaction.id,
        product_id: product.id,
        quantity: product.quantity,
        price: product.price
      }));

      const { error: itemsError } = await supabase
        .from('transaction_items')
        .insert(transactionItems);

      if (itemsError) throw itemsError;

      // Refresh customers to get updated data
      await get().fetchCustomers();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));