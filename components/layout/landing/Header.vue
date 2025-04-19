<template>
  <header class="fixed top-0 left-0 w-full bg-red-600 z-50">
    <div class="container mx-auto flex justify-between items-center py-4 px-4 lg:px-[15%]">
      <div class="flex items-center">
        <img
          src="https://e7.pngegg.com/pngimages/976/842/png-clipart-esport-logo-logo-esport-logo-leave-the-material-thumbnail.png"
          alt="Logo" class="h-8 mr-4" />
        <nav :class="['md:flex', mobileMenu ? 'flex' : 'hidden', 'flex-col md:flex-row md:space-x-6']">
          <a href="#home" class="text-white hover:text-gray-200 py-2 md:py-0">Home</a>
          <a href="#game" class="text-white hover:text-gray-200 py-2 md:py-0">Game</a>
          <a href="#event" class="text-white hover:text-gray-200 py-2 md:py-0">Event</a>
          <a href="#tournament" class="text-white hover:text-gray-200 py-2 md:py-0">Tournament</a>
        </nav>
      </div>
      <div class="flex items-center space-x-4">
        <!-- <NuxtLink to="/auth/login" class="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100">
          Log in
        </NuxtLink> -->
        <button @click="mobileMenu = !mobileMenu" class="md:hidden text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path :class="{ 'hidden': mobileMenu, 'block': !mobileMenu }" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path :class="{ 'block': mobileMenu, 'hidden': !mobileMenu }" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style scoped></style>
