import { useLocalStorage } from "@vueuse/core";
const { $axios } = useNuxtApp();

export const useAuth = () => {
  const token = useLocalStorage("auth_token", null);
  const error = ref("");

  const login = async (username: string, password: string) => {
    try {
      const response = await $axios.post("/auth/login", { username, password });
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

  return { login, logout, isAuthenticated, error };
};
