"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

const Loading = () => {
  const t = useTranslations('loading');
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 mx-auto mb-4"
        >
          <div className="w-full h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-4xl">🍔</span>
          </div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-playfair font-bold text-gray-900 mb-2"
        >
          {t('brandName')}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600"
        >
          {t('loadingText')}
        </motion.p>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mx-auto mt-4"
        />
      </div>
    </div>
  );
};

export default Loading;
