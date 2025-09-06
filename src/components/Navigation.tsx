"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import useOrderStore from '@/store/orderStore';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const { getCartSummary } = useOrderStore();

  const navItems = [
    { name: t('home'), href: `/${locale}` },
    { name: t('menu'), href: `/${locale}/menu` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('gallery'), href: `/${locale}/gallery` },
    { name: t('reservation'), href: `/${locale}/reservation` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍔</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact Info & Toggles */}
          <div className="hidden lg:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <LanguageToggle />
            <ThemeToggle />
            {/* Cart Icon */}
            <Link
              href={`/${locale}/order`}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartSummary().totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {getCartSummary().totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button & Toggles */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            {/* Mobile Cart Icon */}
            <Link
              href={`/${locale}/order`}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartSummary().totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {getCartSummary().totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 flex flex-col gap-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navigation;
