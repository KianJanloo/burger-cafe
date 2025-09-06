"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "علی احمدی",
      role: "مشتری دائمی",
      content: "بهترین برگرهای شهر رو اینجا خوردم. کیفیت گوشت و طعم فوق‌العاده‌ست. هر هفته میام!",
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      id: 2,
      name: "فاطمه محمدی",
      role: "مدیر بازاریابی",
      content: "فضای کافه خیلی دنج و آرامش‌بخشه. برگر گیاهی‌شون هم عالیه. به همه پیشنهاد می‌کنم.",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      id: 3,
      name: "حسن رضایی",
      role: "آشپز",
      content: "به عنوان یک آشپز، می‌تونم بگم که کیفیت کار اینجا واقعاً بالاست. مواد اولیه تازه و مرغوب استفاده می‌کنن.",
      rating: 5,
      avatar: "👨‍🍳",
    },
    {
      id: 4,
      name: "مریم کریمی",
      role: "دانشجو",
      content: "قیمت‌هاشون مناسب و کیفیتشون عالیه. برای دانشجوها هم تخفیف دارن. عاشق برگر تندشونم!",
      rating: 5,
      avatar: "👩‍🎓",
    },
    {
      id: 5,
      name: "محمد حسینی",
      role: "کارمند",
      content: "ناهار کاری رو همیشه اینجا می‌خورم. سرویس سریع و کیفیت ثابت. پرسنل هم خیلی مهربونن.",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      id: 6,
      name: "زهرا نوری",
      role: "مادر خانواده",
      content: "بچه‌هام عاشق برگرهای اینجان. من هم از تنوع منو و کیفیت مواد راضیم. محیط خانوادگی‌ست.",
      rating: 5,
      avatar: "👩‍👧‍👦",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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
            نظرات مشتریان
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            آنچه مشتریان عزیزمان درباره تجربه‌شان در کافه برگر می‌گویند
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-red-200">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-orange-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-red-100">مشتری راضی</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-red-100">امتیاز میانگین</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20</div>
              <div className="text-red-100">سال تجربه</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-red-100">نوع برگر</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
