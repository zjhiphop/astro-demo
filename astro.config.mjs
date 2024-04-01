import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://j-astro-1.netlify.app",
  integrations: [sitemap({
    // Filter out pages that should not be included in the sitemap
    // filter: (page) => page !== 'https://stargazers.club/secret-vip-lounge/',

    // Add custom pages to the sitemap
    // customPages: ['https://stargazers.club/external-page', 'https://stargazers.club/external-page2'],
    entryLimit: 10000,
    changefreq: 'weekly',
    priority: 0.7,

    i18n: {
        defaultLocale: 'en', // All urls that don't contain `es` or `fr` after `https://stargazers.club/` will be treated as default locale, i.e. `en`
        locales: {
          en: 'en-US', // The `defaultLocale` value must present in `locales` keys
          es: 'es-ES',
          fr: 'fr-CA',
        },
      },
  })],
  integrations: [preact()],
  prefetch: true,
  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
    cacheOnDemandPages: true,
  })
});