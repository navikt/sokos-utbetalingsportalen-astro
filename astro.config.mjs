import { defineConfig } from "astro/config";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import importmap from "./importmap.json";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  /*build: {
    assetsPrefix: "https://cdn.nav.no/min-side/sokos-utbetalingsportalen-astro", // Change this to your CDN prefix
  },*/
  integrations: [
    react(),
    {
      name: "importmap",
      hooks: {
        "astro:build:setup": ({ vite, target }) => {
          if (target === "client") {
            vite.plugins.push({
              ...rollupImportMapPlugin(importmap),
              enforce: "pre",
              apply: "build",
            });
          }
        },
      },
    },
  ],
  output: "server",
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*, https://sokos-utbetalingsportalen-astro.intern.dev.nav.no",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, Accept",
    }
  },
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    publicDir: "./public",
  }
});
