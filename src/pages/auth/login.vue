<template lang="">
<div class="flex flex-col items-center justify-center h-screen ">
  <UCard class="w-full max-w-md">
    <template #header>
      <h2 class="text-2xl font-bold text-center">Login Admin</h2>
    </template>
<UButton @click="toggleTheme">
  <UIcon name="i-heroicons-moon" v-if="colorMode.value === 'light'" />
  <UIcon name="i-heroicons-sun" v-else />
</UButton>
<UForm @submit.prevent="onLogin">
  <p v-if="error" class="error-message">{{ error }}</p>
  <UFormGroup label="username" name="username" class="mb-4">
    <UInput v-model="username" type="text" placeholder="Username" required />
  </UFormGroup>
  <UFormGroup label="Password" name="password" class="mb-4">
    <UInput v-model="password" type="password" defaultvalue="12345678" placeholder="Password" required />
  </UFormGroup>
  <UButton block type="submit" :loading="loading">Login</UButton>
</UForm>
</UCard>
</div>
</template>
<script setup>
import { useAuth } from '@/composables/useAuth';
import { useTheme } from '@/composables/useTheme';
import { useRouter } from 'vue-router';

const { login: doLogin, error, loading } = useAuth();
const { colorMode, toggleTheme } = useTheme();
const router = useRouter();
const username = ref('admin');
const password = ref('12345678');

const onLogin = async () => {
  const success = await doLogin(username.value, password.value);
  if (success) {
    router.replace('/admin');
  }
};

definePageMeta({
  middleware: 'auth',
});
</script>
<style scoped>
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 0.375rem;
  text-align: center;
}
</style>