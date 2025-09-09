"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  MdSearch as Search,
  MdFilterList as Filter,
  MdMoreVert as MoreVertical,
  MdVisibility as Eye,
  MdEmail as Mail,
  MdPhone as Phone,
  MdLocationOn as MapPin,
  MdCalendarToday as Calendar,
  MdShoppingCart as ShoppingCart,
  MdStar as Star,
  MdPerson as User
} from "react-icons/md";
import useOrderStore from "@/store/orderStore";
import { Order } from "@/types/order";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
  averageOrderValue: number;
  favoriteCategory: string;
  orderHistory: Order[];
}

const AdminCustomers = () => {
  const { orders } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Extract unique customers from orders
    const customerMap = new Map<string, Customer>();

    orders.forEach(order => {
      const customerId = order.customerInfo.phone; // Using phone as unique identifier
      
      if (customerMap.has(customerId)) {
        const existingCustomer = customerMap.get(customerId)!;
        existingCustomer.totalOrders += 1;
        existingCustomer.totalSpent += order.totalAmount;
        existingCustomer.orderHistory.push(order);
        
        // Update last order date
        if (order.createdAt > existingCustomer.lastOrderDate) {
          existingCustomer.lastOrderDate = order.createdAt;
        }
      } else {
        const newCustomer: Customer = {
          id: customerId,
          name: order.customerInfo.name,
          email: order.customerInfo.email,
          phone: order.customerInfo.phone,
          address: order.customerInfo.address,
          totalOrders: 1,
          totalSpent: order.totalAmount,
          lastOrderDate: order.createdAt,
          averageOrderValue: order.totalAmount,
          favoriteCategory: order.items[0]?.menuItem.category || 'classic',
          orderHistory: [order]
        };
        customerMap.set(customerId, newCustomer);
      }
    });

    // Calculate average order value for each customer
    const customersList = Array.from(customerMap.values()).map(customer => ({
      ...customer,
      averageOrderValue: customer.totalSpent / customer.totalOrders
    }));

    setCustomers(customersList);
  }, [orders]);

  useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'classic':
        return 'کلاسیک';
      case 'spicy':
        return 'تند';
      case 'vegetarian':
        return 'گیاهی';
      case 'drinks':
        return 'نوشیدنی';
      case 'desserts':
        return 'دسر';
      default:
        return category;
    }
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 500000) return { tier: 'VIP', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' };
    if (totalSpent >= 200000) return { tier: 'طلایی', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
    if (totalSpent >= 100000) return { tier: 'نقره‌ای', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' };
    return { tier: 'برنزی', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مدیریت مشتریان</h1>
          <p className="text-gray-600 dark:text-gray-400">مدیریت اطلاعات و تاریخچه مشتریان</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {filteredCustomers.length} مشتری
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجو در مشتریان..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Customers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => {
          const tier = getCustomerTier(customer.totalSpent);
          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
            >
              {/* Customer header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {customer.name}
                    </h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${tier.color}`}>
                      {tier.tier}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Contact info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                {customer.address && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {customer.totalOrders}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">سفارش</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(customer.totalSpent)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">کل خرید</div>
                </div>
              </div>

              {/* Additional info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">میانگین سفارش:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(customer.averageOrderValue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">آخرین سفارش:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(customer.lastOrderDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">دسته محبوب:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getCategoryLabel(customer.favoriteCategory)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                  مشاهده
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  پیام
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">هیچ مشتری یافت نشد</p>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
