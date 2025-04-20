// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@nuxtjs/tailwindcss";
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  modules: [tailwindcss],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {},
  app: {
    baseURL: "/",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
    },
  },
});
