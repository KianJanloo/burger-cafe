"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useOrderStore from '@/store/orderStore';
import { Order, OrderFilters } from '@/types/order';
import { 
  Search, 
  Filter, 
  Eye, 
  X, 
  RotateCcw, 
  Calendar,
  Clock,
  MapPin,
  ShoppingBag
} from 'lucide-react';

interface OrderHistoryProps {
  onViewOrder: (order: Order) => void;
}

export default function OrderHistory({ onViewOrder }: OrderHistoryProps) {
  const t = useTranslations('order.history');
  const { orders, getOrderHistory, cancelOrder, addToCart } = useOrderStore();
  
  const [filters, setFilters] = useState<OrderFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = getOrderHistory(filters).filter(order => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(searchLower) ||
      order.customerInfo.name.toLowerCase().includes(searchLower) ||
      order.items.some(item => 
        item.menuItem.name.toLowerCase().includes(searchLower)
      )
    );
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      preparing: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      ready: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return colors[status];
  };

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: 'در انتظار',
      confirmed: 'تأیید شده',
      preparing: 'در حال آماده‌سازی',
      ready: 'آماده',
      delivered: 'تحویل داده شده',
      cancelled: 'لغو شده',
    };
    return statusMap[status];
  };

  const getOrderTypeText = (orderType: Order['orderType']) => {
    const typeMap = {
      'dine-in': 'مصرف در محل',
      'takeaway': 'بیرون‌بر',
      'delivery': 'ارسال',
    };
    return typeMap[orderType];
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item.menuItem, item.quantity, item.specialInstructions);
    });
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این سفارش را لغو کنید؟')) {
      cancelOrder(orderId);
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t('empty')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('emptyDesc')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو در سفارشات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            فیلترها
          </button>
        </div>

        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  وضعیت
                </label>
                <select
                  value={filters.status?.[0] || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    status: e.target.value ? [e.target.value as Order['status']] : undefined
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">همه وضعیت‌ها</option>
                  <option value="pending">در انتظار</option>
                  <option value="confirmed">تأیید شده</option>
                  <option value="preparing">در حال آماده‌سازی</option>
                  <option value="ready">آماده</option>
                  <option value="delivered">تحویل داده شده</option>
                  <option value="cancelled">لغو شده</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع سفارش
                </label>
                <select
                  value={filters.orderType?.[0] || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    orderType: e.target.value ? [e.target.value as Order['orderType']] : undefined
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">همه انواع</option>
                  <option value="dine-in">مصرف در محل</option>
                  <option value="takeaway">بیرون‌بر</option>
                  <option value="delivery">ارسال</option>
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                >
                  پاک کردن
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('orderNumber')}: {order.orderNumber}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{getOrderTypeText(order.orderType)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{order.items.length} آیتم</span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(order.totalAmount)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onViewOrder(order)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {t('viewDetails')}
                </button>
                
                {order.status === 'pending' && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    {t('cancel')}
                  </button>
                )}
                
                {order.status !== 'cancelled' && (
                  <button
                    onClick={() => handleReorder(order)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('reorder')}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            هیچ سفارشی یافت نشد
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            لطفاً فیلترهای جستجو را تغییر دهید
          </p>
        </div>
      )}
    </div>
  );
}
