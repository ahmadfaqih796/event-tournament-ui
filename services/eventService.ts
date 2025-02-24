import { useNuxtApp } from "#app";

export const useEventService = () => {
  const { $axios } = useNuxtApp();

  const fetchEvents = async () => {
    try {
      const response = await $axios.get("/events");
      const dataMap = response.data.map((item: any, index: number) => {
        return {
          ...item,
          no: index + 1,
        };
      });
      return dataMap;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };

  const addEvent = async (gameData: any) => {
    try {
      const response = await $axios.post("/events", gameData);
      return response.data;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  };

  const updateEvent = async (id: number, gameData: any) => {
    try {
      const response = await $axios.put(`/events/${id}`, gameData);
      return response.data;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await $axios.delete(`/events/${id}`);
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  return { fetchEvents, addEvent, updateEvent, deleteEvent };
};
