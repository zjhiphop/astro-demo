import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://j-astro-1.netlify.app",
  integrations: [preact()],
  prefetch: true,
  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
    cacheOnDemandPages: true,
  })
});