"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const GalleryClient = () => {
  const t = useTranslations('gallery');
  const tMenu = useTranslations('menu');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = [
    { id: "all", name: t('categories.all') },
    { id: "food", name: t('categories.food') },
    { id: "drinks", name: t('categories.drinks') },
    { id: "desserts", name: t('categories.desserts') },
    { id: "interior", name: t('categories.interior') },
    { id: "events", name: t('categories.events') },
  ];

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop",
      title: tMenu('items.classicBurger.name'),
      description: tMenu('items.classicBurger.description'),
      category: "food",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
      title: tMenu('items.doubleCheese.name'),
      description: tMenu('items.doubleCheese.description'),
      category: "food",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=800&h=600&fit=crop",
      title: tMenu('items.baconBurger.name'),
      description: tMenu('items.baconBurger.description'),
      category: "food",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop",
      title: tMenu('items.cola.name'),
      description: tMenu('items.cola.description'),
      category: "drinks",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&h=600&fit=crop",
      title: tMenu('items.bananaMilk.name'),
      description: tMenu('items.bananaMilk.description'),
      category: "drinks",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
      title: tMenu('items.cheesecake.name'),
      description: tMenu('items.cheesecake.description'),
      category: "desserts",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      title: tMenu('items.iceCream.name'),
      description: tMenu('items.iceCream.description'),
      category: "desserts",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      title: t('images.interior'),
      description: t('images.interiorDesc'),
      category: "interior",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      title: t('images.events'),
      description: t('images.eventsDesc'),
      category: "events",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
      title: tMenu('items.vegetarian.name'),
      description: tMenu('items.vegetarian.description'),
      category: "food",
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      title: t('images.nightCafe'),
      description: t('images.nightCafeDesc'),
      category: "interior",
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop",
      title: t('images.coldDrinks'),
      description: t('images.coldDrinksDesc'),
      category: "drinks",
    },
  ];

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  {t('noResults')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {t('noResultsDesc')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <Image
                  src={filteredImages[selectedImage]?.src || ''}
                  alt={filteredImages[selectedImage]?.title || ''}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[70vh] object-cover"
                />
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {filteredImages[selectedImage]?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {filteredImages[selectedImage]?.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default GalleryClient;
