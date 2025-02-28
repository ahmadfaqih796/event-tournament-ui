import { useNuxtApp } from "#app";

export const useAccountGameService = () => {
  const { $axios } = useNuxtApp();

  const fetchAccountGames = async () => {
    try {
      const response = await $axios.get("/account-game");
      const dataMap = response.data.map((item: any, index: number) => {
        return {
          ...item,
          no: index + 1,
        };
      });
      return dataMap;
    } catch (error) {
      console.error("Error fetching account game:", error);
      return [];
    }
  };

  const addAccountGame = async (accountGameData: any) => {
    try {
      const response = await $axios.post("/account-game", accountGameData);
      return response.data;
    } catch (error) {
      console.error("Error adding account game:", error);
      throw error;
    }
  };

  const updateAccountGame = async (id: number, accountGameData: any) => {
    try {
      const response = await $axios.put(`/account-game/${id}`, accountGameData);
      return response.data;
    } catch (error) {
      console.error("Error updating account game:", error);
      throw error;
    }
  };

  const deleteAccountGame = async (id: number) => {
    try {
      await $axios.delete(`/account-game/${id}`);
    } catch (error) {
      console.error("Error deleting account game:", error);
      throw error;
    }
  };

  return { fetchAccountGames, addAccountGame, updateAccountGame, deleteAccountGame };
};
