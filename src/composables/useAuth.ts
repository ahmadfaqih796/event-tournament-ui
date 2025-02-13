import { useLocalStorage } from "@vueuse/core";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "nuxt/app";
import { computed, ref } from "vue";

export const useAuth = () => {
  const nuxtApp = useNuxtApp();
  const $axios = nuxtApp.$axios as AxiosInstance;

  const token = useLocalStorage("auth_token", null);
  const error = ref("");
  const loading = ref(false);

  const login = async (username: string, password: string) => {
    loading.value = true;
    try {
      const response = await $axios.post("/login", { username, password });

      token.value = response.data.token;
      return true;
    } catch (err) {
      error.value = "Login gagal!";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      const response = await $axios.post("/logout", {});
      if (response.status == 200) {
        token.value = null;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const isAuthenticated = computed(() => !!token.value);

  return { login, logout, isAuthenticated, token, error, loading };
};
