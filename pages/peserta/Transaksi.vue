<script setup>
import { onMounted, ref } from 'vue';
import { useGameService } from '~/services/gameService';
import { useTournamentRegistrationService } from '~/services/tournamentRegistrationService';
import { useAuth } from '@/composables/useAuth';
import { useTransactionService } from '~/services/transactionService';
import ProfileLandingDD from '~/components/layout/landing/container/ProfileLandingDD.vue';
import MenuNavbar from '~/components/layout/landing/container/MenuNavbar.vue';

definePageMeta({
  layout: "blank",
  middleware: 'auth',
});

const images = [
  "https://img.freepik.com/free-photo/esports-championship-background-3d-illustration_1419-2785.jpg",
  "https://wallpapercave.com/wp/wp5195928.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebcyrBnbm-6Qz9jy2no4LY0EFB0HNjyXG5g&s"
]

const currentImage = ref(0)
const mobileMenu = ref(false)
const items = ref({
  game: [],
  tournament: [],
  transaction: []
});
const { fetchGames } = useGameService();
const { fetchTournaments } = useTournamentRegistrationService();
const { fetchTransactions } = useTransactionService();

const { user } = useAuth();
const userData = computed(() => JSON.parse(user.value) || "");

console.log("items", items.value)
onMounted(async () => {
  items.value.game = await fetchGames();
  items.value.tournament = await fetchTournaments();
  items.value.transaction = await fetchTransactions();

  setInterval(() => {
    currentImage.value = (currentImage.value + 1) % images.length
  }, 5000)
})
</script>

<template>
  <div>
    <header class="fixed top-0 left-0 w-full bg-red-600 z-50">
      <div :class="['block md:hidden absolute top-16 p-3 left-0 w-full bg-red-600 z-50', mobileMenu ? 'block' : 'hidden']">
        <MenuNavbar />
      </div>
      <div class="container mx-auto flex justify-between items-center py-4 px-4 lg:px-[15%]">
        <div class="flex items-center">
          <img
            src="https://e7.pngegg.com/pngimages/976/842/png-clipart-esport-logo-logo-esport-logo-leave-the-material-thumbnail.png"
            alt="Logo" class="h-8 mr-4" />
          <nav :class="['hidden md:flex', 'flex-col md:flex-row md:space-x-6']">
            <MenuNavbar />
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-white">Hi, {{ userData.name }}</span>
          <ProfileLandingDD />
          <button @click="mobileMenu = !mobileMenu" class="md:hidden text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path :class="{ 'hidden': mobileMenu, 'block': !mobileMenu }" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path :class="{ 'block': mobileMenu, 'hidden': !mobileMenu }" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section dengan Slider -->
    <section id="home" class="relative h-screen overflow-hidden">
      <div class="absolute inset-0 w-full h-full animate-slide bg-cover bg-center"
        :style="{ backgroundImage: `url(${images[currentImage]})` }">
      </div>
      <div class="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Transaksi</h1>
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </section>

    <!-- Game Section -->
    <section id="game" class="bg-red-50 py-10">
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
    <footer class="bg-red-600 py-10">
      <div class="container mx-auto lg:px-[15%] px-4 text-center">
        <div class="flex justify-center space-x-4 mb-4">
          <a href="#home" class="text-white hover:text-gray-200">Home</a>
          <a href="#game" class="text-white hover:text-gray-200">Game</a>
          <a href="#tournament" class="text-white hover:text-gray-200">Tournament</a>
        </div>
        <p class="text-white">© 2025 Esport Merdeka. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

.animate-slide {
  transition: background-image 1s ease-in-out;
}
</style>
