<script setup>
import { onMounted, ref } from 'vue';
import { useGameService } from '~/services/gameService';
import { useTournamentRegistrationService } from '~/services/tournamentRegistrationService';

definePageMeta({
  layout: "blank",
});

const images = [
  "https://img.freepik.com/free-photo/esports-championship-background-3d-illustration_1419-2785.jpg",
  "https://wallpapercave.com/wp/wp5195928.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebcyrBnbm-6Qz9jy2no4LY0EFB0HNjyXG5g&s"
]
const currentImage = ref(0)
const mobileMenu = ref(false)
const items = ref({
  game : [],
  tournament: []
});
const { fetchGames } = useGameService();
const { fetchTournaments } = useTournamentRegistrationService();

const eventList = [
  { title: "HFG Januari MLBB 06", date: "31 Jan 2025", image: "" },
  { title: "HFG Januari MLBB 05", date: "31 Jan 2025", image: "" },
  { title: "HFG Januari MLBB 04", date: "31 Jan 2025", image: "" },
  { title: "HFG Januari MLBB 03", date: "31 Jan 2025", image: "" }
]

console.log("items", items.value)
onMounted(async () => {
  items.value.game = await fetchGames();
  items.value.tournament = await fetchTournaments();

  setInterval(() => {
    currentImage.value = (currentImage.value + 1) % images.length
  }, 5000)
})
</script>

<template>
  <div>
    <header class="fixed top-0 left-0 w-full bg-red-600 z-50">
      <div class="container mx-auto flex justify-between items-center py-4 px-4 lg:px-[15%]">
        <div class="flex items-center">
          <img
            src="https://e7.pngegg.com/pngimages/976/842/png-clipart-esport-logo-logo-esport-logo-leave-the-material-thumbnail.png"
            alt="Logo" class="h-8 mr-4" />
          <nav :class="['md:flex', mobileMenu ? 'flex' : 'hidden', 'flex-col md:flex-row md:space-x-6']">
            <a href="#home" class="text-white hover:text-gray-200 py-2 md:py-0">Home</a>
            <a href="#game" class="text-white hover:text-gray-200 py-2 md:py-0">Game</a>
            <a href="#tournament" class="text-white hover:text-gray-200 py-2 md:py-0">Tournament</a>
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <!-- <NuxtLink to="/auth/login" class="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100">
            Log in
          </NuxtLink> -->
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
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Esport Merdeka</h1>
        <p class="mb-6 text-lg md:text-xl">Bersaing dan menangkan hadiah menarik!</p>
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </section>

    <!-- Game Section -->
    <section id="game" class="bg-red-50 py-10">
      <div class="container mx-auto lg:px-[15%] px-4">
        <h2 class="text-2xl font-bold mb-4 text-red-600 text-center">Kumpulan Game</h2>
        <div class="flex overflow-x-auto space-x-6 justify-center">
          <div v-for="(game, index) in items.game" :key="index" class="flex-shrink-0 w-36">
            <img :src="game.link_image" :alt="game.name" class="rounded-lg bg-cover object-cover h-[150px] w-[150px]" />
            
          </div>
        </div>
      </div>
    </section>

    <!-- Tournament Section -->
    <section id="tournament" class="bg-white py-10">
      <div class="container mx-auto lg:px-[15%] px-4">
        <h2 class="text-2xl font-bold mb-6 text-red-600 text-center">Informasi Registrasi Tournament</h2>
        <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <a v-for="(item, index) in items.tournament" :key="index" class="bg-red-100 p-4 rounded-lg" href="/auth/login">
            <h3 class="text-lg font-bold text-red-600">{{ item.name }}</h3>
            <p class="text-gray-500">{{ item.game }}</p>
            <p class="text-gray-700">{{ item.price ? `Rp ${item.price}` : 'Gratis' }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Tournament Section -->
    <section id="tournament" class="bg-gray-100 py-10">
      <div class="container mx-auto lg:px-[15%] px-4 text-center">
        <h2 class="text-2xl font-bold mb-4 text-red-600">Gabung Turnament Sekarang</h2>
        <p class="mb-6 text-gray-700">Bersaing dan menangkan hadiah menarik!</p>
        <NuxtLink to="/auth/login" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
          Daftar Sekarang
        </NuxtLink>
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
