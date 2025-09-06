"use client";

import { motion } from "framer-motion";
import { Star, Clock, Flame, Plus } from "lucide-react";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import useOrderStore from '@/store/orderStore';
import Toast from './Toast';
import { useToast } from '@/hooks/useToast';

const FeaturedMenu = () => {
  const t = useTranslations('menu');
  const { addToCart } = useOrderStore();
  const { toast, showToast, hideToast } = useToast();
  
  const featuredItems = [
    {
      id: "classic-burger",
      name: t('items.classicBurger.name'),
      description: t('items.classicBurger.description'),
      price: 45000,
      image: "/api/placeholder/300/200",
      rating: 4.9,
      prepTime: 15,
      isSpicy: false,
      isPopular: true,
    },
    {
      id: "mexican-spicy",
      name: t('items.mexicanSpicy.name'),
      description: t('items.mexicanSpicy.description'),
      price: 52000,
      image: "/api/placeholder/300/200",
      rating: 4.8,
      prepTime: 18,
      isSpicy: true,
      isPopular: false,
    },
    {
      id: "vegetarian",
      name: t('items.vegetarian.name'),
      description: t('items.vegetarian.description'),
      price: 38000,
      image: "/api/placeholder/300/200",
      rating: 4.7,
      prepTime: 12,
      isSpicy: false,
      isPopular: false,
    },
    {
      id: "double-cheese",
      name: t('items.doubleCheese.name'),
      description: t('items.doubleCheese.description'),
      price: 58000,
      image: "/api/placeholder/300/200",
      rating: 4.9,
      prepTime: 20,
      isSpicy: false,
      isPopular: true,
    },
  ];

  const handleAddToCart = (item: typeof featuredItems[0]) => {
    const menuItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: 'classic' as const,
      prepTime: item.prepTime,
      badges: [
        ...(item.isPopular ? ['popular' as const] : []),
        ...(item.isSpicy ? ['spicy' as const] : [])
      ] as ('popular' | 'spicy')[],
      isAvailable: true,
    };
    addToCart(menuItem, 1);
    showToast(`${item.name} به سبد خرید اضافه شد!`, 'success');
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <span className="text-6xl">🍔</span>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {item.isPopular && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {t('badges.popular')}
                    </div>
                  )}
                  {item.isSpicy && (
                    <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {t('badges.spicy')}
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-700 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Prep Time */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{item.prepTime} {t('prepTime')}</span>
                </div>

                {/* Price and Order Button */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">
                    {item.price.toLocaleString()} تومان
                  </div>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-red-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {t('order')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link 
            href="/menu"
            className="inline-flex items-center px-8 py-4 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            {t('viewAll')}
          </Link>
        </motion.div>
      </div>
      
      {/* Toast */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </section>
  );
};

export default FeaturedMenu;