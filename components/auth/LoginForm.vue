<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(true);
const { login: doLogin, error, loading } = useAuth();
const formState = reactive({
    username: 'admin',
    password: '12345678'
});
const router = useRouter();
const onSubmit = async () => {
    const res = await doLogin(formState.username, formState.password);
    console.log("masukkkk", res)
    if (res.user.role == "peserta") {
        navigateTo('/peserta/transaksi');
    } else if (res.user.role == "komunitas") {
        navigateTo('/komunitas');
    } else {
        navigateTo('/admin/dashboard');
    }
};
</script>

<template>
    <v-form @submit.prevent="onSubmit">

        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Username</v-label>
                <v-text-field v-model="formState.username" variant="outlined" hide-details
                    color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Password</v-label>
                <v-text-field v-model="formState.password" variant="outlined" type="password" hide-details
                    color="primary"></v-text-field>
            </v-col>
            <!-- <v-col cols="12" class="pt-0">
                <div class="d-flex flex-wrap align-center ml-n2">
                    <v-checkbox v-model="checkbox" color="primary" hide-details>
                        <template v-slot:label class="text-body-1">Remeber this Device</template>
                    </v-checkbox>
                    <div class="ml-sm-auto">
                        <NuxtLink to="/"
                            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                            Forgot
                            Password ?</NuxtLink>
                    </div>
                </div>
            </v-col> -->
            <v-col cols="12" class="pt-0">
                <v-btn :loading="loading" :disabled="loading" type="submit" color="primary" size="large" block flat>{{ loading ? 'Loading' : 'Login' }}</v-btn>
            </v-col>
            <v-col cols="12" class="pt-0">
                <div style="color: red; text-align: center">
                   {{ error }}
                </div>
            </v-col>
        </v-row>
    </v-form>
</template>
