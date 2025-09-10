interface OrderItem {
  foodId: number;
  foodName: string;
  quantity: number;
  price: number;
}

interface Order {
  id?: number;
  orderNumber?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderType: "delivery" | "pickup" | "dine-in";
  items: OrderItem[];
  subtotal: number;
  deliveryFee?: number;
  tax: number;
  total: number;
  specialInstructions?: string;
  deliveryAddress?: string;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}

export type { Order, OrderItem };
