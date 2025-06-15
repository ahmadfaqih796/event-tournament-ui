<script setup>
import { onMounted, ref } from 'vue';
import FooterSection from '~/components/layout/landing/container/FooterSection.vue';
import HeroSection from '~/components/layout/landing/container/HeroSection.vue';
import NavbarSection from '~/components/layout/landing/container/NavbarSection.vue';
import { useGameService } from '~/services/gameService';
import { useTournamentRegistrationService } from '~/services/tournamentRegistrationService';
import { useTransactionService } from '~/services/transactionService';

definePageMeta({
  layout: "blank",
  middleware: 'auth',
});

const items = ref({
  game: [],
  tournament: [],
  transaction: []
});

const { fetchGames } = useGameService();
const { fetchTournaments } = useTournamentRegistrationService();
const { fetchTransactions } = useTransactionService();

onMounted(async () => {
  items.value.game = await fetchGames();
  items.value.tournament = await fetchTournaments();
  items.value.transaction = await fetchTransactions();
})
</script>

<template>
  <div>
    <!-- Navbar -->
    <NavbarSection />

    <!-- Hero Section dengan Slider -->
    <section id="home">
      <HeroSection :title="'Transaksi'" />
    </section>

    <section id="table" class="bg-red-50 py-10">
      <div class="container mx-auto lg:px-[15%] px-4">
        <h2 class="text-2xl font-bold mb-4 text-red-600 text-center">Data Transaksi</h2>

        <div class="relative w-[90%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Tournament
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Game
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Bukti
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in items.transaction" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ index + 1 }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.tournament_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.game_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Rp {{ item.price }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.transaction.payment_status }}</div>
                </td>
                <div>
                  <a :href="`http://127.0.0.1:8000/storage/${item.transaction.payment_proof}`" target="_blank">
                    <img :src="`http://127.0.0.1:8000/storage/${item.transaction.payment_proof}`"
                      style="width: 100px; height: 100px; object-fit: cover;" />
                  </a>
                </div>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
