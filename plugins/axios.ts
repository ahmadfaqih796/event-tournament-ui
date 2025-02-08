import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.apiBase,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return {
    provide: {
      axios: instance,
    },
  };
});
