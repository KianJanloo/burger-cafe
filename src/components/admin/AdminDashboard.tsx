"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  MdShoppingCart as ShoppingCart,
  MdPeople as Users,
  MdRestaurant as ChefHat,
  MdTrendingUp as TrendingUp,
  MdAccessTime as Clock,
  MdCheckCircle as CheckCircle,
} from "react-icons/md";
import useOrderStore from "@/store/orderStore";

const AdminDashboard = () => {
  const { orders, getOrdersByStatus } = useOrderStore();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
  });

  useEffect(() => {
    const pendingOrders = getOrdersByStatus('pending');
    const completedOrders = getOrdersByStatus('delivered');
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    setStats({
      totalOrders: orders.length,
      pendingOrders: pendingOrders.length,
      completedOrders: completedOrders.length,
      totalRevenue,
      averageOrderValue,
    });
  }, [orders, getOrdersByStatus]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const recentOrders = orders.slice(0, 5);

  const statCards = [
    {
      title: "کل سفارشات",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "سفارشات در انتظار",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
      change: "+5%",
      changeType: "positive" as const,
    },
    {
      title: "سفارشات تکمیل شده",
      value: stats.completedOrders,
      icon: CheckCircle,
      color: "bg-green-500",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "درآمد کل",
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: "bg-purple-500",
      change: "+15%",
      changeType: "positive" as const,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'preparing':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'در انتظار';
      case 'confirmed':
        return 'تایید شده';
      case 'preparing':
        return 'در حال آماده‌سازی';
      case 'ready':
        return 'آماده';
      case 'delivered':
        return 'تحویل داده شده';
      case 'cancelled':
        return 'لغو شده';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">خوش آمدید به پنل مدیریت</h1>
        <p className="text-red-100">مدیریت کامل رستوران برگر کافه</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className={`text-xs mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} از ماه گذشته
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent orders and quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">سفارشات اخیر</h2>
          </div>
          <div className="p-6">
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        سفارش #{order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.customerInfo.name} - {order.orderType === 'dine-in' ? 'توی رستوران' : 
                         order.orderType === 'takeaway' ? 'بیرون‌بر' : 'ارسال'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">هنوز سفارشی ثبت نشده است</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">عملیات سریع</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200">
                <ChefHat className="w-8 h-8 text-red-600 dark:text-red-400 mb-2" />
                <span className="text-sm font-medium text-red-700 dark:text-red-300">مدیریت منو</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
                <ShoppingCart className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">سفارشات جدید</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">مشتریان</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">گزارشات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
