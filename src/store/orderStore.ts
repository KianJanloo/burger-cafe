import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderState, OrderActions, CartItem, Order, MenuItem, OrderSummary, OrderFilters } from '@/types/order';

const useOrderStore = create<OrderState & OrderActions>()(
  persist(
    (set, get) => ({
      // Initial state
      cart: [],
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,

      // Cart actions
      addToCart: (menuItem: MenuItem, quantity = 1, specialInstructions?: string) => {
        const { cart } = get();
        const existingItemIndex = cart.findIndex(item => item.id === `${menuItem.id}-${specialInstructions || 'default'}`);
        
        if (existingItemIndex > -1) {
          // Update existing item quantity
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += quantity;
          set({ cart: updatedCart });
        } else {
          // Add new item to cart
          const newCartItem: CartItem = {
            id: `${menuItem.id}-${Date.now()}`,
            menuItem,
            quantity,
            specialInstructions,
          };
          set({ cart: [...cart, newCartItem] });
        }
      },

      removeFromCart: (itemId: string) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.id !== itemId) });
      },

      updateCartItemQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        const { cart } = get();
        const updatedCart = cart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
      },

      updateCartItemInstructions: (itemId: string, instructions: string) => {
        const { cart } = get();
        const updatedCart = cart.map(item =>
          item.id === itemId ? { ...item, specialInstructions: instructions } : item
        );
        set({ cart: updatedCart });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      // Order actions
      createOrder: async (customerInfo, orderType, specialRequests) => {
        const { cart, getCartSummary } = get();
        
        if (cart.length === 0) {
          set({ error: 'Cart is empty' });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const summary = getCartSummary();
          const orderNumber = `ORD-${Date.now()}`;
          
          const newOrder: Order = {
            id: `order-${Date.now()}`,
            orderNumber,
            items: [...cart],
            customerInfo,
            orderType,
            status: 'pending',
            totalAmount: summary.total,
            subtotal: summary.subtotal,
            tax: summary.tax,
            deliveryFee: orderType === 'delivery' ? 15000 : undefined,
            specialRequests,
            createdAt: new Date(),
            estimatedDelivery: orderType === 'delivery' ? new Date(Date.now() + 30 * 60 * 1000) : undefined,
          };

          // Add delivery fee to total if applicable
          if (orderType === 'delivery' && newOrder.deliveryFee) {
            newOrder.totalAmount += newOrder.deliveryFee;
          }

          set(state => ({
            orders: [...state.orders, newOrder],
            currentOrder: newOrder,
            cart: [], // Clear cart after order creation
            isLoading: false,
          }));

          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create order',
            isLoading: false 
          });
        }
      },

      updateOrderStatus: (orderId: string, status: Order['status']) => {
        const { orders } = get();
        const updatedOrders = orders.map(order =>
          order.id === orderId ? { ...order, status } : order
        );
        set({ orders: updatedOrders });
      },

      cancelOrder: (orderId: string) => {
        get().updateOrderStatus(orderId, 'cancelled');
      },

      getOrderById: (orderId: string) => {
        const { orders } = get();
        return orders.find(order => order.id === orderId);
      },

      getOrdersByStatus: (status: Order['status']) => {
        const { orders } = get();
        return orders.filter(order => order.status === status);
      },

      getOrdersByType: (orderType: Order['orderType']) => {
        const { orders } = get();
        return orders.filter(order => order.orderType === orderType);
      },

      // Utility actions
      getCartSummary: (): OrderSummary => {
        const { cart } = get();
        const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
        const tax = Math.round(subtotal * 0.09); // 9% tax
        const total = subtotal + tax;

        return {
          totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
          subtotal,
          tax,
          total,
        };
      },

      getOrderHistory: (filters?: OrderFilters) => {
        const { orders } = get();
        let filteredOrders = [...orders];

        if (filters?.status && filters.status.length > 0) {
          filteredOrders = filteredOrders.filter(order => 
            filters.status!.includes(order.status)
          );
        }

        if (filters?.orderType && filters.orderType.length > 0) {
          filteredOrders = filteredOrders.filter(order => 
            filters.orderType!.includes(order.orderType)
          );
        }

        if (filters?.dateRange) {
          filteredOrders = filteredOrders.filter(order => 
            order.createdAt >= filters.dateRange!.from && 
            order.createdAt <= filters.dateRange!.to
          );
        }

        return filteredOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'order-store',
      partialize: (state) => ({ 
        cart: state.cart, 
        orders: state.orders 
      }),
    }
  )
);

export default useOrderStore;
