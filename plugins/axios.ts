import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";
import { watchEffect } from "vue";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useLocalStorage("auth_token", null);

  const instance = axios.create({
    baseURL: config.public.apiBase as string,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  watchEffect(() => {
    instance.defaults.headers.Authorization = token.value
      ? `Bearer ${token.value}`
      : "";
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.data.message === "Unauthenticated.") {
        token.value = null;
        window.location.href = "/auth/login"; 
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: instance,
    },
  };
});
