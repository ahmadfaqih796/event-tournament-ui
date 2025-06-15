<script setup>
import { NuxtLink } from "#components";
import { useRoute, useRouter } from 'vue-router'

const { role } = defineProps({
  role: {
    type: String,
    required: false,
  },
});

const navPesertaList = [
  { name: "Home", url: "/peserta" },
  { name: "Transaksi", url: "/peserta/Transaksi" },
  { name: "Team", url: "/peserta/Team" },
];

const navKomunitasList = [
  { name: "Home", url: "/komunitas" },
  { name: "Tournament", url: "/komunitas/Tournament" },
];

const route = useRoute();
const router = useRouter();

const navList = role === "peserta" ? navPesertaList : navKomunitasList
</script>

<template>
  <div class="flex flex-col md:flex-row md:space-x-6">
    <NuxtLink
      v-for="item in navList"
      :key="item.name"
      :to="item.url"
      :class="[
        'text-red-600 font-bold hover:text-gray-200 py-2 md:py-0'
      ]"
    >
      {{ item.name }}
      <div :class="[route.path === item.url ? 'md:bg-red-600 w-full h-1 rounded-full bg-white' : '']"></div>
    </NuxtLink>

  </div>
</template>
