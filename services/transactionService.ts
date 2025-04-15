import { useNuxtApp } from "#app";

export const useTransactionService = () => {
  const { $axios } = useNuxtApp();

  const fetchTransactions = async () => {
   try {
     const response = await $axios.get("/transactions");
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

  return {
    fetchTransactions,
  };
};
