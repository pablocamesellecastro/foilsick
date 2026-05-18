/** @type {import('next').NextConfig} */


import { composePlugins, withNx } from '@nx/next';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  publicRuntimeConfig: {
    appname: 'Foilsick',
    appversion: '0.1.0',
    metadata: {
      title: 'Foilsick',
      description: "Tienda digital de productos musicales"
    }
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jlvrepykpdzdayppdbww.supabase.co',

      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ]
  },
  experimental: {
    // reactRefresh: true,
    // serverActions: false // ya no aplica
  },
};
const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withNextIntl
];

export default composePlugins(...plugins)(nextConfig);
