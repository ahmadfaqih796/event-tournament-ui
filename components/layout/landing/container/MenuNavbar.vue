<script setup>
import { NuxtLink } from "#components";

const navList = [
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
</script>

<template>
    <div class="flex flex-col md:flex-row md:space-x-6" v-for="item in navList" :key="item.name">
      <NuxtLink :to="item.url" class="text-white hover:text-gray-200 py-2 md:py-0">
        {{ item.name }}
      </NuxtLink>
    </div>
</template>
