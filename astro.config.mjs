import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import htmx from 'astro-htmx';
import vercel from '@astrojs/vercel/serverless';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [htmx(), tailwind(), icon()]
});