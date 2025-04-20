import { useNuxtApp } from "#app";

export const useTeamService = () => {
  const { $axios } = useNuxtApp();

  const fetchTeams = async () => {
    try {
      const response = await $axios.get("/teams");
      const dataMap = response.data.map((item: any, index: number) => {
        return {
          ...item,
          no: index + 1,
        };
      });
      return dataMap;
    } catch (error) {
      console.error("Error fetching Teams:", error);
      return [];
    }
  };

  const addTeam = async (gameData: any) => {
    try {
      const response = await $axios.post("/teams", gameData);
      return response.data;
    } catch (error) {
      console.error("Error adding team:", error);
      throw error;
    }
  };

  const updateTeam = async (id: number, gameData: any) => {
    try {
      const response = await $axios.put(`/teams/${id}`, gameData);
      return response.data;
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    }
  };

  const deleteTeam = async (id: number) => {
    try {
      await $axios.delete(`/teams/${id}`);
    } catch (error) {
      console.error("Error deleting team:", error);
      throw error;
    }
  };

  return { fetchTeams, addTeam, updateTeam, deleteTeam };
};
