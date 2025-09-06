import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['fa', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as 'fa' | 'en')) {
    // Return default locale instead of notFound
    return {
      locale: 'fa',
      messages: (await import(`../messages/fa.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
