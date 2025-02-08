<template lang="">
<div class="flex flex-col items-center justify-center h-screen ">
  <div class="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-4">
    <h2 class="text-2xl font-bold mb-4">Login Admin</h2>
    <form @submit.prevent="onLogin">
      <input v-model="email" type="text"  placeholder="Username" required />
      <input v-model="password" type="password" defaultvalue="12345678" placeholder="Password" required />
      <button type="submit">Login</button>
      <UButton>Button</UButton>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</div>
</template>
<script setup>
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const { login: doLogin, error } = useAuth();
const router = useRouter();
const email = ref('faqih@example.com');
const password = ref('12345678');
const onLogin = async () => {
  const success = await doLogin(email.value, password.value);
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