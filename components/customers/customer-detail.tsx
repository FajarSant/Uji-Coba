"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Mail, Phone, Home } from "lucide-react";
import { Customer, OrderedProduct } from "@/lib/types";
import { useCustomerStore } from "@/lib/stores/customer-store";

interface CustomerDetailProps {
  customer: Customer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CustomerDetail({ 
  customer, 
  open, 
  onOpenChange 
}: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { updateCustomerProducts } = useCustomerStore();

  const handleQuantityChange = (productId: string, increment: boolean) => {
    const updatedProducts = [...customer.orderedProducts];
    const productIndex = updatedProducts.findIndex(p => p.id === productId);
    
    if (productIndex >= 0) {
      const product = updatedProducts[productIndex];
      const newQuantity = increment 
        ? product.quantity + 1 
        : Math.max(0, product.quantity - 1);
      
      if (newQuantity === 0) {
        updatedProducts.splice(productIndex, 1);
      } else {
        updatedProducts[productIndex] = {
          ...product,
          quantity: newQuantity
        };
      }
      
      updateCustomerProducts(customer.id, updatedProducts);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500 text-white";
      case "inactive":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Customer Details</DialogTitle>
          <DialogDescription>
            View and manage customer information and order history.
          </DialogDescription>
        </DialogHeader>
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{customer.name}</CardTitle>
                    <CardDescription>Customer Profile</CardDescription>
                  </div>
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{customer.address}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-2xl font-bold">{customer.totalOrders}</div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">${customer.totalSpent.toLocaleString()}</div>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                    <p className="text-sm text-muted-foreground">
                      Customer joined on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Ordered Products</CardTitle>
                <CardDescription>
                  Manage products ordered by this customer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {customer.orderedProducts.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No products ordered yet.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.orderedProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>
                            ${(product.price * product.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(product.id, false)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(product.id, true)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}