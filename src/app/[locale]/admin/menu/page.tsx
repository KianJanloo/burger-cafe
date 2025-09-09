"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
  MdSearch,
  MdLocalCafe,
  MdWaterDrop,
  MdLocalFireDepartment,
  MdIcecream
} from "react-icons/md";
import { menuItems } from "@/data/menuItems";
import { MenuItem } from "@/types/order";
import { ChefHat, Plus } from "lucide-react";

const AdminMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);

  useEffect(() => {
    let filtered = menuItems;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (availabilityFilter !== "all") {
      if (availabilityFilter === "available") {
        filtered = filtered.filter(item => item.isAvailable);
      } else if (availabilityFilter === "unavailable") {
        filtered = filtered.filter(item => !item.isAvailable);
      }
    }

    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter, availabilityFilter]);

  const categories = [
    { value: "all", label: "همه دسته‌ها", icon: ChefHat },
    { value: "classic", label: "کلاسیک", icon: ChefHat },
    { value: "spicy", label: "تند", icon: MdLocalFireDepartment },
    { value: "vegetarian", label: "گیاهی", icon: MdLocalCafe },
    { value: "drinks", label: "نوشیدنی", icon: MdWaterDrop },
    { value: "desserts", label: "دسر", icon: MdIcecream },
  ];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData?.icon || ChefHat;
  };

  const getCategoryLabel = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData?.label || category;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'popular':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'spicy':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'popular':
        return 'محبوب';
      case 'spicy':
        return 'تند';
      default:
        return badge;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مدیریت منو</h1>
          <p className="text-gray-600 dark:text-gray-400">مدیریت آیتم‌های منوی رستوران</p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          <Plus className="w-5 h-5" />
          افزودن آیتم جدید
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو در منو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          {/* Availability filter */}
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">همه آیتم‌ها</option>
            <option value="available">موجود</option>
            <option value="unavailable">ناموجود</option>
          </select>
        </div>
      </div>

      {/* Menu items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const CategoryIcon = getCategoryIcon(item.category);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Item image placeholder */}
              <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center">
                <ChefHat className="w-16 h-16 text-red-400" />
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CategoryIcon className="w-4 h-4" />
                      <span>{getCategoryLabel(item.category)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.isAvailable ? (
                      <MdVisibility className="w-5 h-5 text-green-500" />
                    ) : (
                      <MdVisibilityOff className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Badges */}
                {item.badges && item.badges.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {item.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(badge)}`}
                      >
                        {getBadgeText(badge)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and prep time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(item.price)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.prepTime} دقیقه
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200">
                    <MdEdit className="w-4 h-4" />
                    ویرایش
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200">
                    <MdDelete className="w-4 h-4" />
                    حذف
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add new item card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-red-400 dark:hover:border-red-500 transition-colors duration-200"
      >
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            افزودن آیتم جدید
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            آیتم جدیدی به منوی رستوران اضافه کنید
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
            افزودن آیتم
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminMenu;
