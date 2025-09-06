import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['fa', 'en'],

  // Used when no locale matches
  defaultLocale: 'fa',
  
  // Don't redirect if locale is already in path
  localePrefix: 'always',
  
  // Detect locale from localStorage
  localeDetection: true
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fa|en)/:path*']
};
