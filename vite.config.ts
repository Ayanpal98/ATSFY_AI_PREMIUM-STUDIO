import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-icon.svg', 'pwa-maskable-icon.svg', 'offline.html'],
        manifest: {
          name: 'ATSFY AI | AI Product Studio',
          short_name: 'ATSFY AI',
          description: 'ATSFY AI designs and develops AI products, AI agents, SaaS platforms, and intelligent automation for startups and enterprises.',
          theme_color: '#0F172A',
          background_color: '#FFFFFF',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/pwa-icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: '/pwa-maskable-icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          navigateFallback: '/index.html',
          // Ensure all navigation requests to targeted routes get handled by index.html when offline
          navigateFallbackAllowlist: [
            /^\/$/,
            /^\/company-registration\/?$/,
            /^\/cost-calculator\/?$/,
            /^\/business-structure-comparison\/?$/,
            /^\/startup-scheme-eligibility-checker\/?$/,
            /^\/dpr-services\/?$/,
            /^\/business-plan-services\/?$/,
            /^\/financial-projection-services\/?$/,
            /^\/blog\/?$/,
            /^\/faq\/?$/
          ],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-stylesheets',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webformats',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                }
              }
            },
            {
              // Image caching - Cache First
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'pwa-images',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              // Unsplash and other external image assets - Cache First
              urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'pwa-external-images',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              // API Requests - Network First
              urlPattern: /\/api\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'pwa-api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 // 1 Day
                },
                networkTimeoutSeconds: 5,
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              // Route specific runtime caching - Network First (for fresh updates but fallback to cache)
              urlPattern: ({ url }) => {
                const paths = [
                  '/',
                  '/company-registration',
                  '/cost-calculator',
                  '/business-structure-comparison',
                  '/startup-scheme-eligibility-checker',
                  '/dpr-services',
                  '/business-plan-services',
                  '/financial-projection-services',
                  '/blog',
                  '/faq'
                ];
                return paths.some(p => url.pathname === p || url.pathname === p + '/');
              },
              handler: 'NetworkFirst',
              options: {
                cacheName: 'pwa-routes-cache',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 7 // 7 Days
                },
                networkTimeoutSeconds: 3
              }
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
