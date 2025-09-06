export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'classic' | 'spicy' | 'vegetarian' | 'drinks' | 'desserts';
  image?: string;
  prepTime: number; // in minutes
  badges?: ('popular' | 'spicy')[];
  isAvailable: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedOptions?: {
    size?: 'small' | 'medium' | 'large';
    extras?: string[];
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address?: string;
  };
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalAmount: number;
  subtotal: number;
  tax: number;
  deliveryFee?: number;
  discount?: number;
  specialRequests?: string;
  createdAt: Date;
  estimatedDelivery?: Date;
  notes?: string;
}

export interface OrderSummary {
  totalItems: number;
  subtotal: number;
  tax: number;
  deliveryFee?: number;
  discount?: number;
  total: number;
}

export interface OrderFilters {
  status?: Order['status'][];
  orderType?: Order['orderType'][];
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface OrderState {
  cart: CartItem[];
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

export interface OrderActions {
  // Cart actions
  addToCart: (menuItem: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  updateCartItemInstructions: (itemId: string, instructions: string) => void;
  clearCart: () => void;
  
  // Order actions
  createOrder: (customerInfo: Order['customerInfo'], orderType: Order['orderType'], specialRequests?: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  getOrdersByType: (orderType: Order['orderType']) => Order[];
  
  // Utility actions
  getCartSummary: () => OrderSummary;
  getOrderHistory: (filters?: OrderFilters) => Order[];
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}
