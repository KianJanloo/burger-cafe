"use client";

import { useTranslations } from 'next-intl';
import { CheckCircle, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { Order } from '@/types/order';

interface OrderSuccessProps {
  order: Order;
  onViewOrder: () => void;
  onContinueShopping: () => void;
}

export default function OrderSuccess({ order, onViewOrder, onContinueShopping }: OrderSuccessProps) {
  const t = useTranslations('order.success');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  // const formatDate = (date: Date) => {
  //   return new Intl.DateTimeFormat('fa-IR', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   }).format(date);
  // };

  const getEstimatedTime = () => {
    const maxPrepTime = Math.max(...order.items.map(item => item.menuItem.prepTime));
    return maxPrepTime + (order.orderType === 'delivery' ? 30 : 0);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {t('message')}
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('orderNumber')}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {order.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('estimatedTime')}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" />
                {getEstimatedTime()} {t('minutes')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                نوع سفارش
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {order.orderType === 'dine-in' ? 'مصرف در محل' :
                 order.orderType === 'takeaway' ? 'بیرون‌بر' : 'ارسال'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                مجموع سفارش
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                {formatPrice(order.totalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="text-right mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            آیتم‌های سفارش
          </h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.menuItem.name} × {item.quantity}
                  </p>
                  {item.specialInstructions && (
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      دستورات ویژه: {item.specialInstructions}
                    </p>
                  )}
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(item.menuItem.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8 text-right">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            اطلاعات مشتری
          </h3>
          <div className="space-y-2">
            <p><strong>نام:</strong> {order.customerInfo.name}</p>
            <p><strong>تلفن:</strong> {order.customerInfo.phone}</p>
            <p><strong>ایمیل:</strong> {order.customerInfo.email}</p>
            {order.customerInfo.address && (
              <p><strong>آدرس:</strong> {order.customerInfo.address}</p>
            )}
            {order.specialRequests && (
              <p><strong>درخواست‌های ویژه:</strong> {order.specialRequests}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onViewOrder}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            {t('viewOrder')}
          </button>
          <button
            onClick={onContinueShopping}
            className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center justify-center gap-2"
          >
            {t('continueShopping')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
