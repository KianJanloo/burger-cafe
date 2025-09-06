"use client";

import { useTranslations } from 'next-intl';
import { ShoppingCart, Plus, Minus, Trash2, Edit3 } from 'lucide-react';
import { CartItem } from '@/types/order';
import { useState } from 'react';
import useOrderStore from '@/store/orderStore';

interface CartProps {
  onCheckout: () => void;
}

export default function Cart({ onCheckout }: CartProps) {
  const t = useTranslations('order.cart');
  const { cart, updateCartItemQuantity, removeFromCart, updateCartItemInstructions, getCartSummary } = useOrderStore();
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string>('');

  const summary = getCartSummary();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const handleUpdateInstructions = (itemId: string) => {
    updateCartItemInstructions(itemId, instructions);
    setEditingItem(null);
    setInstructions('');
  };

  const handleEditInstructions = (item: CartItem) => {
    setEditingItem(item.id);
    setInstructions(item.specialInstructions || '');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          {t('title')}
        </h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {cart.map((item) => (
          <div key={item.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {item.menuItem.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.menuItem.description}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">
                  {formatPrice(item.menuItem.price)} × {item.quantity} = {formatPrice(item.menuItem.price * item.quantity)}
                </p>
                
                {item.specialInstructions && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                    <strong>دستورات ویژه:</strong> {item.specialInstructions}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleEditInstructions(item)}
                  className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {editingItem === item.id && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('specialInstructions')}
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder={t('instructionsPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  rows={3}
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleUpdateInstructions(item.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    {t('update')}
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm"
                  >
                    لغو
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{t('subtotal')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatPrice(summary.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">مالیات (9%):</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatPrice(summary.tax)}
            </span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">{t('total')}:</span>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                {formatPrice(summary.total)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          ادامه به پرداخت
        </button>
      </div>
    </div>
  );
}
