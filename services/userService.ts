import { useNuxtApp } from "#app";

export const useUserService = () => {
  const { $axios } = useNuxtApp();

  const fetchUsers = async () => {
    try {
      const response = await $axios.get("/users");
      const dataMap = response.data.map((item: any, index: number) => {
        return {
          ...item,
          no: index + 1,
        };
      });
      return dataMap;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const addUser = async (userData: any) => {
    try {
      const response = await $axios.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  const updateUser = async (id: number, userData: any) => {
    try {
      const response = await $axios.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await $axios.delete(`/users/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  return { fetchUsers, addUser, updateUser, deleteUser };
};
