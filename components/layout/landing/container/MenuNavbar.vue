<script setup>
import { NuxtLink } from "#components";
 
const { role } = defineProps({
  role: {
    type: String,
    required: false,
  },
});

const navPesertaList = [
  {
    name: "Home",
    url: "/peserta",
  },
  {
    name: "Transaksi",
    url: "/peserta/Transaksi",
  },
  {
    name: "Team",
    url: "/peserta/Team",
  },
];

const navKomunitasList = [
  {
    name: "Home",
    url: "/komunitas",
  },
  {
    name: "Tournament",
    url: "/komunitas/Tournament",
  },
]

const navList = role === "peserta" ? navPesertaList : navKomunitasList

</script>

<template>
    <div class="flex flex-col md:flex-row md:space-x-6" v-for="item in navList" :key="item.name">
      <NuxtLink :to="item.url" class="text-white hover:text-gray-200 py-2 md:py-0">
        {{ item.name }}
      </NuxtLink>
    </div>
</template>
