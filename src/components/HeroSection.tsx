"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

const HeroSection = () => {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-center ${locale === 'fa' ? 'lg:text-right' : 'lg:text-left'}`}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-gray-900 dark:text-white mb-8"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`flex flex-wrap justify-center ${locale === 'fa' ? 'lg:justify-start' : 'lg:justify-start'} gap-8 mb-10`}
          >
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{t('rating')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock className="w-5 h-5" />
              <span>{t('experience')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Users className="w-5 h-5" />
              <span>{t('customers')}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`flex flex-col sm:flex-row gap-6 justify-center ${locale === 'fa' ? 'lg:justify-start' : 'lg:justify-start'}`}
          >
            <Link
              href={`/${locale}/menu`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-full hover:from-red-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('viewMenu')}
              {locale === 'fa' ? (
                <ArrowLeft className="mr-2 w-5 h-5" />
              ) : (
                <ArrowRight className="ml-2 w-5 h-5" />
              )}
            </Link>
            <Link
              href={`/${locale}/reservation`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {t('reserveTable')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Image/Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative w-full h-96 lg:h-[500px]">
            {/* Burger Animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                {/* Plate */}
                <div className="w-80 h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-2xl flex items-center justify-center">
                  {/* Burger */}
                  <div className="relative">
                    {/* Bottom Bun */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-48 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg"
                    />
                    
                    {/* Lettuce */}
                    <div className="w-48 h-3 bg-green-500 rounded-full -mt-1" />
                    
                    {/* Tomato */}
                    <div className="w-48 h-3 bg-red-500 rounded-full -mt-1" />
                    
                    {/* Cheese */}
                    <div className="w-48 h-4 bg-yellow-300 rounded-full -mt-1" />
                    
                    {/* Patty */}
                    <div className="w-48 h-6 bg-gradient-to-r from-amber-800 to-amber-900 rounded-full -mt-1" />
                    
                    {/* Top Bun */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-48 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg -mt-1"
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -top-4 -right-4 text-4xl"
                >
                  🍟
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 text-3xl"
                >
                  🥤
                </motion.div>
                <motion.div
                  animate={{ y: [0, -25, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  className="absolute top-1/2 -right-8 text-2xl"
                >
                  🌟
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
