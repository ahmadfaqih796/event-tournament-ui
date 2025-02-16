import { useLocalStorage } from "@vueuse/core";
import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useLocalStorage("auth_token", null);

  if (token.value && to.path === "/auth/login") {
    return navigateTo("/admin");
  } else if (!token.value && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
  }
});
