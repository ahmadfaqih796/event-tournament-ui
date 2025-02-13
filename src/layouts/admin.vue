<template>
  <div class="admin-layout">
    <UCard>
      <div class="navbar">
        <h1 class="text-2xl font-bold text-center">Esports</h1>
        <div>
          <!-- <h2>Add</h2> -->
          <UDropdown :items="menuItems">
            <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" class="cursor-pointer" />
          </UDropdown>
        </div>
      </div>
    </UCard>

    <div class="flex gap-4">
      <UCard class="sidebar">
        <ul class="nav-list">
          <li v-for="(item, index) in navLinks" :key="index">
            <div @click="item.children ? toggleDropdown(index) : navigateTo(item.to)" class="nav-item">
              <div class="flex items-center gap-4">
                <UIcon :name="item.icon" class="nav-icon" />
                <span>{{ item.label }}</span>
              </div>
              <UIcon v-if="item.children"
                :name="isOpen[index] ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'" />
            </div>
            <ul v-if="item.children && isOpen[index]" class="submenu">
              <li v-for="(child, cIndex) in item.children" :key="cIndex" @click="navigateTo(child.to)"
                class="flex items-center gap-4 pl-4 my-2">
                <UIcon :name="child.icon" class="nav-icon" />
                <span>{{ child.label }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </UCard>



      <UCard class="content">
        <NuxtPage />
      </UCard>
    </div>

  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const { logout } = useAuth();
const router = useRouter();
const session = useLocalStorage('auth_session', null);
console.log("user", session)

const navLinks = ref([
  { label: 'Dashboard', to: '/admin', icon: 'i-heroicons-chart-bar' },
  {
    label: 'Manajemen',
    icon: 'i-heroicons-folder',
    children: [
      { label: 'Users', to: '/admin/users', icon: 'i-heroicons-user-group' },
      { label: 'Event', to: '/admin/events', icon: 'i-heroicons-calendar' }
    ]
  },
  { label: 'Settings', to: '/admin/settings', icon: 'i-heroicons-cog' }
]);

const isOpen = ref({});
const toggleDropdown = (index) => {
  isOpen.value[index] = !isOpen.value[index];
};

const navigateTo = (route) => {
  router.push(route);
};

const menuItems = ref([
  [
    { label: 'Profile', icon: 'i-heroicons-user', click: () => router.push('/admin/profile') },
    { label: 'Logout', icon: 'i-heroicons-arrow-left-end-on-rectangle', click: () => handleLogout() }
  ]
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
  padding: 16px;
  flex-direction: column;
  gap: 16px;
  height: 100vh;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar .nav-list {
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar .nav-icon {
  width: 24px;
  height: 24px;
}

.sidebar .nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
