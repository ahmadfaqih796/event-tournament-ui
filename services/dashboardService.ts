import { useNuxtApp } from "#app";

export const useDashboard = () => {
  const { $axios } = useNuxtApp();

  const fetchDashboard = async (year: string = new Date().getFullYear().toString()) => {
    try {
      const response = await $axios.get("/dashboard", { params: { year } });
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return { user: {}, finance: [] };
    }
  };

  return { fetchDashboard };
};
