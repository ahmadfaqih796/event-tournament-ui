import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  srcDir: "src/",
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
  imports: {
    autoImport: true,
  },
  // tailwindcss: {
  //   config: {
  //     content: ["content/**/**.md"],
  //   },
  // },
  app: {
    baseURL: "/",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
    },
  },
});
