<template lang="">
  <div>
    <h1>Daftar Pengguna</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Terjadi kesalahan: {{ error.message }}</div>
    <ul v-else>
      <li v-for="user in data.users" :key="user.id">{{ user.firstName }}</li>
    </ul>
  </div>
</template>

<script setup>
const { $axios } = useNuxtApp();

const { data, pending, error } = useAsyncData('users', async () => {
  const response = await $axios.get('/users');
  console.log("dataaaaa", response.data);
  return response.data;
});
</script>

<style lang="">

</style>