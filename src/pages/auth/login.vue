<template lang="">
<div class="flex flex-col items-center justify-center h-screen ">
  <UCard>
    <template #header>
      <h2 class="text-2xl font-bold">Login Admin</h2>
    </template>
<UButton @click="toggleTheme">
  <UIcon name="i-heroicons-moon" v-if="colorMode.value === 'light'" />
  <UIcon name="i-heroicons-sun" v-else />
</UButton>
<UForm @submit.prevent="onLogin">
  <UFormGroup label="username" name="username">
    <UInput v-model="username" type="text" placeholder="Username" required />
  </UFormGroup>
  <UFormGroup label="Password" name="password">
    <UInput v-model="password" type="password" defaultvalue="12345678" placeholder="Password" required />
  </UFormGroup>

  <!-- <input v-model="username" type="text" placeholder="Username" required />
  <input v-model="password" type="password" defaultvalue="12345678" placeholder="Password" required /> -->
  <!-- <Ubutton type="submit">Login</Ubutton> -->
  <UButton block type="submit">Button</UButton>
  <p v-if="error" class="error">{{ error }}</p>
</UForm>
</UCard>
</div>
</template>
<script setup>
import { useAuth } from '@/composables/useAuth';
import { useTheme } from '@/composables/useTheme';
import { useRouter } from 'vue-router';

const { login: doLogin, error } = useAuth();
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
<style lang="" scoped>
/* .login-container {
  max-width: 300px;
  margin: 0 auto;
}
.error {
  color: red;
} */
</style>