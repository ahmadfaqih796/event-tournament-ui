import { useNuxtApp } from "#app";

export const useGameService = () => {
  const { $axios } = useNuxtApp();

  const fetchGames = async () => {
    try {
      const response = await $axios.get("/games");
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

  const addGame = async (userData: any) => {
    try {
      const response = await $axios.post("/games", userData);
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  const updateGame = async (id: number, userData: any) => {
    try {
      const response = await $axios.put(`/games/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteGame = async (id: number) => {
    try {
      await $axios.delete(`/games/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  return { fetchGames, addGame, updateGame, deleteGame };
};
