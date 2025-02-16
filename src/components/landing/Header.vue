<template lang="">
   <!-- Navbar -->
   <header class="bg-red-600">
        <div class="container mx-auto flex items-center justify-between py-4 lg:px-[15%] px-4">
          <div class="flex items-center">
            <img src="https://e7.pngegg.com/pngimages/976/842/png-clipart-esport-logo-logo-esport-logo-leave-the-material-thumbnail.png" alt="Logo" class="h-8 mr-4" />
            <nav class="hidden md:flex space-x-6">
              <a href="#" class="text-white hover:text-gray-200">Home</a>
              <a href="#" class="text-white hover:text-gray-200">Top Up</a>
              <a href="#" class="text-white hover:text-gray-200">Promo</a>
              <a href="#" class="text-white hover:text-gray-200">Article</a>
              <a href="#" class="text-white hover:text-gray-200">Tournament</a>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <!-- <input
              type="text"
              placeholder="Cari semua turnamen..."
              class="hidden md:block px-4 py-2 rounded-lg text-gray-800"
            /> -->
            <NuxtLink
            to="/auth/login" class="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100">Log in</NuxtLink>
          </div>
        </div>
      </header>
</template>
<script>
export default {
}
</script>
<style lang="">

</style>