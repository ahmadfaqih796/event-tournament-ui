import { useLocalStorage } from "@vueuse/core";
import type { AxiosInstance } from "axios";
import { useNuxtApp } from "nuxt/app";
import { computed, ref } from "vue";

export const useAuth = () => {
  const nuxtApp = useNuxtApp();
  const $axios = nuxtApp.$axios as AxiosInstance;

  const token = useLocalStorage("auth_token", null);
  const user = useLocalStorage("auth_user", null as any);
  const error = ref("");
  const loading = ref(false);

  const login = async (username: string, password: string) => {
    loading.value = true;
    try {
      const response = await $axios.post("/login", { username, password });
      token.value = response.data.token;
      await getSession(response.data.token);
      return true;
    } catch (err) {
      error.value = "Login gagal!";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (values : any) => {
    loading.value = true;
    try {
      await $axios.post("/register", values);
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

  const getSession = async (token: string) => {
    console.log("toeken", token);
    try {
      const response = await $axios.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response data", response.data);
      if (response.status === 200) {
        user.value = JSON.stringify(response.data) as string;
      }
      return response.data;
    } catch (error) {
      console.error("Gagal mendapatkan session:", error);
      return false;
    }
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    login,
    register,
    logout,
    getSession,
    user,
    isAuthenticated,
    token,
    error,
    loading,
  };
};
