import { useNuxtApp } from "#app";

export const useTournamentService = () => {
  const { $axios } = useNuxtApp();

  const fetchTournaments = async () => {
    try {
      const response = await $axios.get("/tournaments");
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

  const fetchTournamentById = async (id: string) => {
    try {
      const response = await $axios.get(`/tournaments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tournament:", error);
      throw error;
    }
  };

  const fetchOpenTournaments = async () => {
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

  const addTournament = async (tournamentData: any) => {
    try {
      const response = await $axios.post("/tournaments", tournamentData, {
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

  const updateTournament = async (id: number, tournamentData: any) => {
    try {
      const response = await $axios.post(`/tournaments/${id}`, tournamentData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteTournament = async (id: number) => {
    try {
      await $axios.delete(`/tournaments/${id}`);
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  return {
    fetchTournaments,
    fetchTournamentById,
    fetchOpenTournaments,
    addTournament,
    updateTournament,
    deleteTournament,
  };
};
