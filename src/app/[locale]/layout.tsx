import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const vazir = Vazirmatn({
  variable: "--font-iran-sans",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Burger Cafe - بهترین برگرهای شهر",
  description: "کافه برگر با 20 سال تجربه، ارائه بهترین برگرها و نوشیدنی‌های خوشمزه",
  keywords: "برگر، کافه، رستوران، غذا، نوشیدنی",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const isRTL = locale === 'fa';

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={`${vazir.variable} font-iran-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
