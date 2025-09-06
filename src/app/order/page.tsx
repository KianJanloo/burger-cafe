"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingCart, History, Plus } from 'lucide-react';
import Link from 'next/link';
import Cart from '@/components/order/Cart';
import Checkout from '@/components/order/Checkout';
import OrderSuccess from '@/components/order/OrderSuccess';
import OrderHistory from '@/components/order/OrderHistory';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Order } from '@/types/order';

type OrderPageState = 'cart' | 'checkout' | 'success' | 'history';

export default function OrderPage() {
  const t = useTranslations('order');
  const [currentState, setCurrentState] = useState<OrderPageState>('cart');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const handleCheckout = () => {
    setCurrentState('checkout');
  };

  const handleOrderSuccess = (order: Order) => {
    setCurrentOrder(order);
    setCurrentState('success');
  };

  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setCurrentState('success');
  };

  const handleContinueShopping = () => {
    setCurrentState('cart');
    setCurrentOrder(null);
  };

  const handleBackToCart = () => {
    setCurrentState('cart');
  };

  const renderContent = () => {
    switch (currentState) {
      case 'cart':
        return <Cart onCheckout={handleCheckout} />;
      case 'checkout':
        return (
          <Checkout 
            onBack={handleBackToCart} 
            onSuccess={handleOrderSuccess} 
          />
        );
      case 'success':
        return currentOrder ? (
          <OrderSuccess
            order={currentOrder}
            onViewOrder={() => setCurrentState('history')}
            onContinueShopping={handleContinueShopping}
          />
        ) : null;
      case 'history':
        return <OrderHistory onViewOrder={handleViewOrder} />;
      default:
        return <Cart onCheckout={handleCheckout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1">
            <div className="flex flex-wrap justify-center">
              <button
                onClick={() => setCurrentState('cart')}
                className={`px-4 py-3 rounded-md font-medium transition-colors flex items-center gap-2 ${
                  currentState === 'cart'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                سبد خرید
              </button>
              <button
                onClick={() => setCurrentState('history')}
                className={`px-4 py-3 rounded-md font-medium transition-colors flex items-center gap-2 ${
                  currentState === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <History className="w-5 h-5" />
                تاریخچه سفارشات
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>

        {/* Quick Action Button */}
        {currentState === 'cart' && (
          <div className="fixed bottom-6 left-6 z-50">
            <Link
              href="/menu"
              className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-6 h-6" />
              <span className="hidden sm:block">{t('viewMenu')}</span>
            </Link>
          </div>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
