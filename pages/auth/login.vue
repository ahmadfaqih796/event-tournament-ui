<template lang="">
   <div class="login-container">
    <h2>Login Admin</h2>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>
<script setup>
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const { login: doLogin, error } = useAuth();
const router = useRouter();

const username = ref('');
const password = ref('');

const login = async () => {
   const success = await doLogin(username.value, password.value);
   if (success) {
      router.push('/admin');
   }
};
</script>
<style lang="" scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
}
.error {
  color: red;
}
</style>