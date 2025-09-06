"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Clock, Flame, Plus } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import Navigation from "./Navigation";
import Footer from "./Footer";

const MenuClient = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const t = useTranslations('menu');
  const locale = useLocale();

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
      id: 1,
      name: "برگر کلاسیک",
      description: "برگر گوشت گاو با پنیر چدار، کاهو، گوجه و سس مخصوص",
      price: 45000,
      category: "classic",
      rating: 4.9,
      prepTime: "15 دقیقه",
      isSpicy: false,
      isPopular: true,
      image: "🍔",
    },
    {
      id: 2,
      name: "برگر دوبل چیز",
      description: "دو لایه گوشت با پنیر چدار و سس مخصوص",
      price: 58000,
      category: "classic",
      rating: 4.9,
      prepTime: "20 دقیقه",
      isSpicy: false,
      isPopular: true,
      image: "🍔",
    },
    {
      id: 3,
      name: "برگر بیکن",
      description: "برگر گوشت با بیکن ترد، پنیر و سس باربیکیو",
      price: 52000,
      category: "classic",
      rating: 4.8,
      prepTime: "18 دقیقه",
      isSpicy: false,
      isPopular: false,
      image: "🍔",
    },
    // Spicy Burgers
    {
      id: 4,
      name: "برگر تند مکزیکی",
      description: "برگر گوشت با فلفل تند، پنیر پپرونی و سس تند مخصوص",
      price: 52000,
      category: "spicy",
      rating: 4.8,
      prepTime: "18 دقیقه",
      isSpicy: true,
      isPopular: false,
      image: "🌶️",
    },
    {
      id: 5,
      name: "برگر فلفل قرمز",
      description: "برگر گوشت با فلفل قرمز تند و سس چیلی",
      price: 48000,
      category: "spicy",
      rating: 4.7,
      prepTime: "16 دقیقه",
      isSpicy: true,
      isPopular: false,
      image: "🌶️",
    },
    // Vegetarian Burgers
    {
      id: 6,
      name: "برگر گیاهی",
      description: "برگر گیاهی با قارچ، آووکادو و سبزیجات تازه",
      price: 38000,
      category: "vegetarian",
      rating: 4.7,
      prepTime: "12 دقیقه",
      isSpicy: false,
      isPopular: false,
      image: "🥬",
    },
    {
      id: 7,
      name: "برگر قارچ",
      description: "برگر قارچ پورتوبلو با پنیر بز و سبزیجات",
      price: 42000,
      category: "vegetarian",
      rating: 4.6,
      prepTime: "14 دقیقه",
      isSpicy: false,
      isPopular: false,
      image: "🥬",
    },
    // Drinks
    {
      id: 8,
      name: "کولا",
      description: "نوشیدنی کولا سرد و تازه",
      price: 15000,
      category: "drinks",
      rating: 4.5,
      prepTime: "2 دقیقه",
      isSpicy: false,
      isPopular: false,
      image: "🥤",
    },
    {
      id: 9,
      name: "شیر موز",
      description: "شیر موز طبیعی و خوشمزه",
      price: 25000,
      category: "drinks",
      rating: 4.8,
      prepTime: "5 دقیقه",
      isSpicy: false,
      isPopular: true,
      image: "🥤",
    },
    // Desserts
    {
      id: 10,
      name: "چیزکیک",
      description: "چیزکیک خامه‌ای با توت فرنگی",
      price: 35000,
      category: "desserts",
      rating: 4.9,
      prepTime: "3 دقیقه",
      isSpicy: false,
      isPopular: true,
      image: "🍰",
    },
    {
      id: 11,
      name: "آیس کرم",
      description: "آیس کرم وانیلی با سس شکلات",
      price: 20000,
      category: "desserts",
      rating: 4.6,
      prepTime: "2 دقیقه",
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
            <div className="flex flex-wrap gap-2">
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
                    <span>{item.prepTime}</span>
                  </div>

                  {/* Price and Order Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {item.price.toLocaleString()} تومان
                    </div>
                    <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-red-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
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
    </>
  );
};

export default MenuClient;
