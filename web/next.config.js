/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en'
  }
};

module.exports = nextConfig;
