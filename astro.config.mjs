import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://j-astro-1.netlify.app",
  integrations: [preact()]
});