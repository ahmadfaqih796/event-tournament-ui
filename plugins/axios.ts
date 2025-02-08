import { useLocalStorage } from "@vueuse/core";
import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useLocalStorage("auth_token", null);

  const instance = axios.create({
    baseURL: config.public.apiBase,
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
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: instance,
    },
  };
});
