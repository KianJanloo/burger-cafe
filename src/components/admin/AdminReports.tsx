"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useOrderStore from "@/store/orderStore";
import { BarChart3, DollarSign, Download, ShoppingCart, TrendingDown, TrendingUp, Users } from "lucide-react";

const AdminReports = () => {
  const { orders } = useOrderStore();
  const [dateRange, setDateRange] = useState("7");
  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalCustomers: 0,
    revenueGrowth: 0,
    orderGrowth: 0,
    topSellingItems: [] as { name: string; quantity: number; revenue: number }[],
    ordersByStatus: {} as Record<string, number>,
    ordersByType: {} as Record<string, number>,
    revenueByCategory: {} as Record<string, number>,
    hourlyDistribution: [] as number[],
  });

  useEffect(() => {
    calculateReportData();
  }, [orders, dateRange]);

  const calculateReportData = () => {
    const days = parseInt(dateRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const filteredOrders = orders.filter(order => order.createdAt >= cutoffDate);
    
    // Basic stats
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = filteredOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Unique customers
    const uniqueCustomers = new Set(filteredOrders.map(order => order.customerInfo.phone));
    const totalCustomers = uniqueCustomers.size;
    
    // Growth calculation (simplified - comparing with previous period)
    const previousPeriodOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const previousCutoff = new Date();
      previousCutoff.setDate(previousCutoff.getDate() - (days * 2));
      const previousEnd = new Date();
      previousEnd.setDate(previousEnd.getDate() - days);
      return orderDate >= previousCutoff && orderDate < previousEnd;
    });
    
    const previousRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const previousOrderCount = previousPeriodOrders.length;
    
    const revenueGrowth = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    const orderGrowth = previousOrderCount > 0 ? ((totalOrders - previousOrderCount) / previousOrderCount) * 100 : 0;
    
    // Top selling items
    const itemSales = new Map();
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        const key = item.menuItem.id;
        if (itemSales.has(key)) {
          itemSales.set(key, itemSales.get(key) + item.quantity);
        } else {
          itemSales.set(key, item.quantity);
        }
      });
    });
    
    const topSellingItems = Array.from(itemSales.entries())
      .map(([itemId, quantity]) => {
        const menuItem = filteredOrders
          .flatMap(order => order.items)
          .find(item => item.menuItem.id === itemId)?.menuItem;
        return {
          name: menuItem?.name || 'Unknown',
          quantity,
          revenue: quantity * (menuItem?.price || 0)
        };
      })
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
    
    // Orders by status
    const ordersByStatus = filteredOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Orders by type
    const ordersByType = filteredOrders.reduce((acc, order) => {
      acc[order.orderType] = (acc[order.orderType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Revenue by category
    const revenueByCategory = filteredOrders.reduce((acc, order) => {
      order.items.forEach(item => {
        const category = item.menuItem.category;
        acc[category] = (acc[category] || 0) + (item.menuItem.price * item.quantity);
      });
      return acc;
    }, {} as Record<string, number>);
    
    // Hourly distribution (simplified)
    const hourlyDistribution = new Array(24).fill(0);
    filteredOrders.forEach(order => {
      const hour = new Date(order.createdAt).getHours();
      hourlyDistribution[hour]++;
    });
    
    setReportData({
      totalRevenue,
      totalOrders,
      averageOrderValue,
      totalCustomers,
      revenueGrowth,
      orderGrowth,
      topSellingItems,
      ordersByStatus,
      ordersByType,
      revenueByCategory,
      hourlyDistribution,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'در انتظار',
      'confirmed': 'تایید شده',
      'preparing': 'در حال آماده‌سازی',
      'ready': 'آماده',
      'delivered': 'تحویل داده شده',
      'cancelled': 'لغو شده',
    };
    return statusMap[status] || status;
  };

  const getTypeText = (type: string) => {
    const typeMap: Record<string, string> = {
      'dine-in': 'توی رستوران',
      'takeaway': 'بیرون‌بر',
      'delivery': 'ارسال',
    };
    return typeMap[type] || type;
  };

  const getCategoryText = (category: string) => {
    const categoryMap: Record<string, string> = {
      'classic': 'کلاسیک',
      'spicy': 'تند',
      'vegetarian': 'گیاهی',
      'drinks': 'نوشیدنی',
      'desserts': 'دسر',
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">گزارشات و آمار</h1>
          <p className="text-gray-600 dark:text-gray-400">تحلیل عملکرد و آمار فروش رستوران</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="7">7 روز گذشته</option>
            <option value="30">30 روز گذشته</option>
            <option value="90">90 روز گذشته</option>
            <option value="365">یک سال گذشته</option>
          </select>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            <Download className="w-5 h-5" />
            دانلود گزارش
          </button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">کل درآمد</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatPrice(reportData.totalRevenue)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {reportData.revenueGrowth >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${
                  reportData.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage(reportData.revenueGrowth)}
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">کل سفارشات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {reportData.totalOrders}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {reportData.orderGrowth >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${
                  reportData.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage(reportData.orderGrowth)}
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">میانگین سفارش</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatPrice(reportData.averageOrderValue)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">مشتریان فعال</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {reportData.totalCustomers}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and detailed reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top selling items */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">پرفروش‌ترین آیتم‌ها</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {reportData.topSellingItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.quantity} فروش
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders by status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">توزیع سفارشات بر اساس وضعیت</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(reportData.ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getStatusText(status)}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(count / reportData.totalOrders) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white w-8">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders by type */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">توزیع سفارشات بر اساس نوع</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(reportData.ordersByType).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getTypeText(type)}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(count / reportData.totalOrders) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white w-8">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue by category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">درآمد بر اساس دسته‌بندی</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(reportData.revenueByCategory).map(([category, revenue]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getCategoryText(category)}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(revenue / reportData.totalRevenue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatPrice(revenue)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
