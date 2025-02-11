<template>
  <div class="admin-layout">
    <aside>
      <nav>
        <NuxtLink to="/admin">Dashboard</NuxtLink>
        <NuxtLink to="/admin/settings">Settings</NuxtLink>
        <button @click="handleLogout">Logout</button>
      </nav>
    </aside>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const { logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  alert('Logout berhasil!');
  router.replace('/auth/login');
};
</script>

<style scoped>
.admin-layout {
  display: flex;
}

aside {
  width: 200px;
  background-color: #f5f5f5;
  padding: 20px;
}

main {
  flex: 1;
  padding: 20px;
}
</style>
