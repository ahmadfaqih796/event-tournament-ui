<template>
  <UContainer class="admin-layout">

    <UCard class="sidebar">
      <UVerticalNavigation :links="navLinks" />

      <UButton block color="red" variant="solid" @click="handleLogout">
        Logout
      </UButton>
    </UCard>

    <UCard class="content">
      <NuxtPage />
    </UCard>

  </UContainer>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const { logout } = useAuth();
const router = useRouter();

const navLinks = ref([
  { label: 'Dashboard', to: '/admin', icon: 'i-heroicons-chart-bar' },
  { label: 'Settings', to: '/admin/settings', icon: 'i-heroicons-cog' }
]);

const handleLogout = async () => {
  await logout();
  alert('Logout berhasil!');
  router.replace('/auth/login');
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  gap: 16px;
  height: 100vh;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
