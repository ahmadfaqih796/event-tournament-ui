import { useLocalStorage } from "@vueuse/core";

export const useAuth = () => {
  const { $axios } = useNuxtApp();
  const token = useLocalStorage("auth_token", null);
  const error = ref("");

  const login = async (email: string, password: string) => {
    try {
      // const response = await $axios.post("/auth/login", { email, password });
      const response = await $axios.post("/api/login", { email, password });

      token.value = response.data.token;
      return true;
    } catch (err) {
      error.value = "Login gagal!";
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await $axios.post("/api/logout", {});
      if (response.status == 200) {
        token.value = null;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const isAuthenticated = computed(() => !!token.value);

  return { login, logout, isAuthenticated, token, error };
};
