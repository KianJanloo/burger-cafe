"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍔</span>
              </div>
              <span className="font-playfair text-2xl font-bold">{t('brandName')}</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}`} className="text-gray-300 dark:text-gray-400 hover:text-red-400 transition-colors duration-300">
                  خانه
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/menu`} className="text-gray-300 dark:text-gray-400 hover:text-red-400 transition-colors duration-300">
                  منو
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-300 dark:text-gray-400 hover:text-red-400 transition-colors duration-300">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gallery`} className="text-gray-300 dark:text-gray-400 hover:text-red-400 transition-colors duration-300">
                  گالری
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-300 dark:text-gray-400 hover:text-red-400 transition-colors duration-300">
                  تماس
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Menu Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">{t('menuCategories')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  {t('classicBurgers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  {t('spicyBurgers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  {t('vegetarianBurgers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  {t('drinks')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  {t('desserts')}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">{t('contactInfo')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">021-12345678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">info@burgercafe.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 mt-1" />
                <span className="text-gray-300">
                  تهران، خیابان ولیعصر، پلاک 123
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">9:00 - 23:00</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {t('brandName')}. {t('rightsReserved')}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                {t('privacy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                {t('terms')}
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                {t('cookies')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
