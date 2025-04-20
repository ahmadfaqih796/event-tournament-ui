import { useNuxtApp } from "#app";

export const useBeritaService = () => {
  const { $axios } = useNuxtApp();

  const fetchBerita = async () => {
    try {
      const response = await $axios.get("/news");
      const dataMap = response.data.map((item: any, index: number) => {
        return {
          ...item,
          no: index + 1,
        };
      });
      return dataMap;
    } catch (error) {
      console.error("Error fetching Games:", error);
      return [];
    }
  };

  const addBerita = async (gameData: any) => {
    try {
      const response = await $axios.post("/news", gameData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding news:", error);
      throw error;
    }
  };

  const updateBerita = async (id: number, gameData: any) => {
    try {
      const response = await $axios.post(`/news/${id}`, gameData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating news:", error);
      throw error;
    }
  };

  const deleteBerita = async (id: number) => {
    try {
      await $axios.delete(`/news/${id}`);
    } catch (error) {
      console.error("Error deleting news:", error);
      throw error;
    }
  };

  return { fetchBerita, addBerita, updateBerita, deleteBerita };
};
