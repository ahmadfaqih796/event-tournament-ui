import { useNuxtApp } from "#app";

export const useTournamentRegistrationService = () => {
  const { $axios } = useNuxtApp();

  const fetchTournaments = async () => {
    try {
      const response = await $axios.get("/open-tournaments");
      const dataMap = response.data.map((item: any, index: number) => {
        return {
          ...item,
          no: index + 1,
        };
      });
      return dataMap;
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      return [];
    }
  };

  const addTransaction = async (tournamentData: any) => {
    try {
      const response = await $axios.post("/tournament-registration", tournamentData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  };

  return {
    fetchTournaments,
    addTransaction
  };
};
