import { useLocalStorage } from "@vueuse/core";

export const useAuth = () => {
  const token = useLocalStorage("auth_token", null);
  const error = ref("");

  const login = async (email: string, password: string) => {
    try {
      const { $axios } = useNuxtApp();
      // const response = await $axios.post("/auth/login", { email, password });
      const response = await $axios.post("/api/login", { email, password });

      token.value = response.data.token;
      return true;
    } catch (err) {
      error.value = "Login gagal!";
      return false;
    }
  };

  const logout = () => {
    token.value = null;
  };

  const isAuthenticated = computed(() => !!token.value);

  return { login, logout, isAuthenticated, token, error };
};
