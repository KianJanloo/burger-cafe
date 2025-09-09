"use client";

import Link from "next/link";

import { useState } from "react";
import { motion } from "framer-motion";
import { redirect, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { LayoutDashboard, ShoppingBag, ChefHat, Users, BarChart3, Settings, X, LogOut, Menu, Bell } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  const menuItems = [
    {
      name: "داشبورد",
      href: `/${locale}/admin`,
      icon: LayoutDashboard,
    },
    {
      name: "سفارشات",
      href: `/${locale}/admin/orders`,
      icon: ShoppingBag,
    },
    {
      name: "منوی غذا",
      href: `/${locale}/admin/menu`,
      icon: ChefHat,
    },
    {
      name: "مشتریان",
      href: `/${locale}/admin/customers`,
      icon: Users,
    },
    {
      name: "گزارشات",
      href: `/${locale}/admin/reports`,
      icon: BarChart3,
    },
    {
      name: "تنظیمات",
      href: `/${locale}/admin/settings`,
      icon: Settings,
    },
  ];

  return (
    <div className="max-h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-50 w-2/12 min-h-screen bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0 lg:block
        rtl:right-auto rtl:left-0 rtl:translate-x-full rtl:lg:translate-x-0
        ${sidebarOpen ? 'rtl:translate-x-0' : ''}
        flex flex-col
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div onClick={() => redirect('/')} className="w-8 h-8 bg-gradient-to-r cursor-pointer from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍔</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">پنل ادمین</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6 px-3 flex-1">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${isActive 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">اد</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">مدیر سیستم</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@burgercafe.com</p>
            </div>
          </div>
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden pb-16">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Page title */}
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {menuItems.find(item => item.href === pathname)?.name || "داشبورد"}
              </h1>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
