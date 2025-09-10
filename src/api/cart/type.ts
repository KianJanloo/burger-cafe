interface CartItem {
  id?: number;
  sessionId: string;
  foodId: number;
  foodName: string;
  foodPrice: number;
  quantity: number;
  specialInstructions?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CartTotal {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

export type { CartItem, CartTotal };
