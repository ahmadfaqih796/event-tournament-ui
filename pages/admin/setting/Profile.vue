<script setup lang="ts">
import UiParentCard from "@/components/shared/UiParentCard.vue";
import { useAccountGameService } from "~/services/accountGameService";


const { fetchAccountGames } = useAccountGameService();
const accountGameData = ref([]);
const reactiveItems = computed(() => accountGameData.value);

onMounted(async () => {
   accountGameData.value = await fetchAccountGames();
})

</script>

<template>
   <v-row>
      <v-col cols="12" md="5">
         <UiParentCard title="Profile">
         </UiParentCard>
      </v-col>
      <v-col cols="12" md="7">
         <UiParentCard title="Account Game">
         </UiParentCard>
      </v-col>
   </v-row>
</template>