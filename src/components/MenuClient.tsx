"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock, Flame, Plus, ShoppingCart } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import useOrderStore from '@/store/orderStore';
import Navigation from "./Navigation";
import Footer from "./Footer";
import Toast from './Toast';
import { useToast } from '@/hooks/useToast';

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  prepTime: number;
  isSpicy: boolean;
  isPopular: boolean;
  image: string;
}

const MenuClient = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const t = useTranslations('menu');
  const locale = useLocale();
  const { addToCart, getCartSummary } = useOrderStore();
  const { toast, showToast, hideToast } = useToast();

  const categories = [
    { id: "all", name: t('categories.all'), icon: "🍔" },
    { id: "classic", name: t('categories.classic'), icon: "🥩" },
    { id: "spicy", name: t('categories.spicy'), icon: "🌶️" },
    { id: "vegetarian", name: t('categories.vegetarian'), icon: "🥬" },
    { id: "drinks", name: t('categories.drinks'), icon: "🥤" },
    { id: "desserts", name: t('categories.desserts'), icon: "🍰" },
  ];

  const menuItems = [
    // Classic Burgers
    {
      id: "classic-burger",
      name: t('items.classicBurger.name'),
      description: t('items.classicBurger.description'),
      price: 45000,
      category: "classic",
      rating: 4.9,
      prepTime: 15,
      isSpicy: false,
      isPopular: true,
      image: "🍔",
    },
    {
      id: "double-cheese",
      name: t('items.doubleCheese.name'),
      description: t('items.doubleCheese.description'),
      price: 58000,
      category: "classic",
      rating: 4.9,
      prepTime: 20,
      isSpicy: false,
      isPopular: true,
      image: "🍔",
    },
    {
      id: "bacon-burger",
      name: t('items.baconBurger.name'),
      description: t('items.baconBurger.description'),
      price: 52000,
      category: "classic",
      rating: 4.8,
      prepTime: 18,
      isSpicy: false,
      isPopular: false,
      image: "🍔",
    },
    // Spicy Burgers
    {
      id: "mexican-spicy",
      name: t('items.mexicanSpicy.name'),
      description: t('items.mexicanSpicy.description'),
      price: 52000,
      category: "spicy",
      rating: 4.8,
      prepTime: 18,
      isSpicy: true,
      isPopular: false,
      image: "🌶️",
    },
    {
      id: "red-pepper",
      name: t('items.redPepper.name'),
      description: t('items.redPepper.description'),
      price: 48000,
      category: "spicy",
      rating: 4.7,
      prepTime: 16,
      isSpicy: true,
      isPopular: false,
      image: "🌶️",
    },
    // Vegetarian Burgers
    {
      id: "vegetarian",
      name: t('items.vegetarian.name'),
      description: t('items.vegetarian.description'),
      price: 38000,
      category: "vegetarian",
      rating: 4.7,
      prepTime: 12,
      isSpicy: false,
      isPopular: false,
      image: "🥬",
    },
    {
      id: "mushroom",
      name: t('items.mushroom.name'),
      description: t('items.mushroom.description'),
      price: 42000,
      category: "vegetarian",
      rating: 4.6,
      prepTime: 14,
      isSpicy: false,
      isPopular: false,
      image: "🥬",
    },
    // Drinks
    {
      id: "cola",
      name: t('items.cola.name'),
      description: t('items.cola.description'),
      price: 15000,
      category: "drinks",
      rating: 4.5,
      prepTime: 2,
      isSpicy: false,
      isPopular: false,
      image: "🥤",
    },
    {
      id: "banana-milk",
      name: t('items.bananaMilk.name'),
      description: t('items.bananaMilk.description'),
      price: 25000,
      category: "drinks",
      rating: 4.8,
      prepTime: 5,
      isSpicy: false,
      isPopular: true,
      image: "🥤",
    },
    // Desserts
    {
      id: "cheesecake",
      name: t('items.cheesecake.name'),
      description: t('items.cheesecake.description'),
      price: 35000,
      category: "desserts",
      rating: 4.9,
      prepTime: 3,
      isSpicy: false,
      isPopular: true,
      image: "🍰",
    },
    {
      id: "ice-cream",
      name: t('items.iceCream.name'),
      description: t('items.iceCream.description'),
      price: 20000,
      category: "desserts",
      rating: 4.6,
      prepTime: 2,
      isSpicy: false,
      isPopular: false,
      image: "🍰",
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItemType) => {
    const menuItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category as 'classic' | 'spicy' | 'vegetarian' | 'drinks' | 'desserts',
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

  const cartSummary = getCartSummary();

  return (
    <>
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-red-100 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
          
          {/* Cart Summary */}
          {cartSummary.totalItems > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="font-semibold">
                {cartSummary.totalItems} آیتم - {cartSummary.total.toLocaleString('fa-IR')} تومان
              </span>
              <a
                href={`/${locale}/order`}
                className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors"
              >
                مشاهده سبد خرید
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 max-md:justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-red-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <span className="text-6xl">{item.image}</span>
                  
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
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{item.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors">
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
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
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

          {/* No Results */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('noResults')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('noResultsDesc')}</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      
      {/* Toast */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </>
  );
};

export default MenuClient;
