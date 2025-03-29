<template>
  <div>
    <Header />

    <section class="relative bg-cover bg-center py-44 text-white"
      style="background-image: url('https://img.freepik.com/free-photo/esports-championship-background-3d-illustration_1419-2785.jpg?t=st=1736685375~exp=1736688975~hmac=39af46a08f48fd2fb1db17eaacfd1706ed2c3079683eeb82d61c061a89205196&w=1380');">
      <div class="container mx-auto lg:px-[15%] px-4">
        <h1 class="text-4xl font-bold mb-4">
          Buat Turnamen E-Sport Milikmu Sendiri
        </h1>
        <p class="text-gray-200 mb-6">
          Kelola kompetisimu dengan solusi online yang gratis
        </p>
        <div class="flex justify-center md:justify-start space-x-4">
          <button class="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100">
            Create Tournament
          </button>
          <button class="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800">
            Bracket Generator
          </button>
        </div>
      </div>
    </section>

    <!-- Carousel Game -->
    <section class="bg-red-50 py-10">
      <div class="container mx-auto lg:px-[15%] px-4">
        <h2 class="text-2xl font-bold mb-4 text-red-600">Turnamen Game</h2>
        <div class="flex overflow-x-auto space-x-6">
          <div class="flex-shrink-0 w-36">
            <img src="https://i.pinimg.com/736x/b0/19/cc/b019cc1879859c1bb4defa46a1207c1e.jpg" alt="AOV"
              class="rounded-lg" />
          </div>
          <div class="flex-shrink-0 w-36">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebcyrBnbm-6Qz9jy2no4LY0EFB0HNjyXG5g&s"
              alt="FIFA" class="rounded-lg" />
          </div>
          <!-- <div class="flex-shrink-0 w-36">
              <img
                src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-JUCm0hJ_t1yzvbV0YOoBgHaEK%26pid%3DApi&sp=1736684109T818a38a7bd7b7afbf93dd2956562e79da9f2a045f8406580f1a1053a1af7474b"
                alt="PES" class="rounded-lg" />
            </div>
            <div class="flex-shrink-0 w-36">
              <img
                src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ae5q13dKCIPdW3Du_iByKAHaEK%26pid%3DApi&sp=1736684233T7ff6f68bf3506d12ba01be10b4dc4471489194a3a15fd4c6261566b538419da1"
                alt="Fortnite" class="rounded-lg" />
            </div>
            <div class="flex-shrink-0 w-36">
              <img
                src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp5195928.jpg&sp=1736684349T7516c8927dee5e738cf2bf294e9c4703c618ddc353c09bebb192240d10033262"
                alt="Free Fire" class="rounded-lg" />
            </div> -->
        </div>
      </div>
    </section>

    <!-- Turnamen Trending -->
    <section class="bg-white py-10">
      <div class="container mx-auto lg:px-[15%] px-4">
        <h2 class="text-2xl font-bold mb-6 text-red-600">Turnamen Trending</h2>
        <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div class="bg-red-100 p-4 rounded-lg">
            <img src="" alt="Mobile Legends" class="rounded-lg mb-4" />
            <h3 class="text-lg font-bold text-red-600">HFG Januari MLBB 06</h3>
            <p class="text-gray-500">31 Jan 2025</p>
          </div>
          <div class="bg-red-100 p-4 rounded-lg">
            <img src="" alt="Mobile Legends" class="rounded-lg mb-4" />
            <h3 class="text-lg font-bold text-red-600">HFG Januari MLBB 05</h3>
            <p class="text-gray-500">31 Jan 2025</p>
          </div>
          <div class="bg-red-100 p-4 rounded-lg">
            <img src="" alt="Mobile Legends" class="rounded-lg mb-4" />
            <h3 class="text-lg font-bold text-red-600">HFG Januari MLBB 04</h3>
            <p class="text-gray-500">31 Jan 2025</p>
          </div>
          <div class="bg-red-100 p-4 rounded-lg">
            <img src="" alt="Mobile Legends" class="rounded-lg mb-4" />
            <h3 class="text-lg font-bold text-red-600">HFG Januari MLBB 03</h3>
            <p class="text-gray-500">31 Jan 2025</p>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/layout/landing/Footer.vue';
import Header from '~/components/layout/landing/Header.vue';

export default {
  components: {
    Header,
    Footer
  },
};
definePageMeta({
  // middleware: 'auth',
  layout: "blank",
});
</script>

<style scoped></style>