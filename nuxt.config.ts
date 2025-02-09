// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  // devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
  imports: {
    autoImport: true,
  },
  // ui: {
  //   primary: "blue",
  //   gray: "cool",
  // },
  // colorMode: {
  //   preference: "system",
  //   fallback: "light",
  //   classSuffix: "",
  // },
  typescript: {
    typeCheck: true,
  },
  tailwindcss: {
    // exposeConfig: true,
    config: {
      content: ["content/**/**.md"],
    },
    // config: './tw-config.mts',
    // config: [
    //   { theme: { extend: { primary: 'red' } } },
    //   './tw-config.mts',
    //   { content: ['content/**/*.md'] },
    // ]
  },
  app: {
    baseURL: "/",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
    },
  },
});
