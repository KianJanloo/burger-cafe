import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const vazir = Vazirmatn({
  variable: "--font-iran-sans",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Burger Cafe - بهترین برگرهای شهر",
    template: "%s | Burger Cafe"
  },
  description: "کافه برگر با 20 سال تجربه، ارائه بهترین برگرها و نوشیدنی‌های خوشمزه. سیستم سفارش آنلاین، رزرو میز و تحویل درب منزل.",
  keywords: [
    "برگر",
    "کافه",
    "رستوران",
    "غذا",
    "نوشیدنی",
    "سفارش آنلاین",
    "رزرو میز",
    "تحویل درب منزل",
    "برگر کلاسیک",
    "برگر تند",
    "برگر گیاهی",
    "Burger Cafe",
    "Online Order",
    "Restaurant"
  ],
  authors: [{ name: "Burger Cafe Team" }],
  creator: "Burger Cafe",
  publisher: "Burger Cafe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://burger-cafe.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'fa-IR': '/fa',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://burger-cafe.vercel.app',
    title: 'Burger Cafe - بهترین برگرهای شهر',
    description: 'کافه برگر با 20 سال تجربه، ارائه بهترین برگرها و نوشیدنی‌های خوشمزه',
    siteName: 'Burger Cafe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Burger Cafe - بهترین برگرهای شهر',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Burger Cafe - بهترین برگرهای شهر',
    description: 'کافه برگر با 20 سال تجربه، ارائه بهترین برگرها و نوشیدنی‌های خوشمزه',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages({ locale: 'fa' });

  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Ignore localStorage errors
                }
              })();
            `,
          }}
        />
      </head>
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
