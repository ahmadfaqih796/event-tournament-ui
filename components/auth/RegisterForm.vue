<script setup lang="ts">
import { ref } from 'vue';
import { useSnackbar } from "~/composables/useSnackbar";


const { register, loading } = useAuth();
const { showSnackbar } = useSnackbar();
const formState = reactive({
    "name": "Faqih",
    "username": "faqih1",
    "password": "12345678",
    "role": "peserta"
});

const onSubmit = async () => {
    const success = await register(formState);
    showSnackbar({ message: "Berhasil mendaftar akun", color: "success" });
    if (success) {
        navigateTo('/auth/login');
    }
};
</script>

<template>
    <v-form @submit.prevent="onSubmit">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Name</v-label>
                <v-text-field variant="outlined" v-model="formState.name" hide-details color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Username</v-label>
                <v-text-field variant="outlined" v-model="formState.username" hide-details
                    color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Password</v-label>
                <v-text-field variant="outlined" v-model="formState.password" type="password" hide-details
                    color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-btn color="primary" type="submit" size="large" block flat :loading="loading">Sign up</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
