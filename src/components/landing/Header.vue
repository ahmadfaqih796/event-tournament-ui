<template lang="">
   <!-- Navbar -->
   <header class="bg-red-600">
        <div class="container mx-auto flex items-center justify-between py-4 lg:px-[15%] px-4">
          <div class="flex items-center">
            <img src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fblue.kumparan.com%2Fimage%2Fupload%2Ffl_progressive%2Cfl_lossy%2Cc_fill%2Cq_auto%3Abest%2Cw_640%2Fv1634025439%2F98beb64b5b9391c22bcefe4e719505d6acfb2f1e4ae41296c17b95b82c0ff923.jpg&sp=1736683755T5beef989d0a6c5d9d19575fc55e543530b850a1de05363c7d63b727303d427e1" alt="Logo" class="h-8 mr-4" />
            <nav class="hidden md:flex space-x-6">
              <a href="#" class="text-white hover:text-gray-200">Home</a>
              <a href="#" class="text-white hover:text-gray-200">Top Up</a>
              <a href="#" class="text-white hover:text-gray-200">Promo</a>
              <a href="#" class="text-white hover:text-gray-200">Article</a>
              <a href="#" class="text-white hover:text-gray-200">Tournament</a>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Cari semua turnamen..."
              class="hidden md:block px-4 py-2 rounded-lg text-gray-800"
            />
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