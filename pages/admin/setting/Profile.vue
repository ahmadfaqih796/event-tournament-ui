<script setup lang="ts">
import UiParentCard from "@/components/shared/UiParentCard.vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useUserService } from "~/services/userService";
import { formatDate } from "~/utils/formatMoment";
import { getErrorMessage } from "~/utils/responseMessage";
import { useRouter } from "vue-router";

const { user, logout } = useAuth()
const router = useRouter();
const userData = computed(() => JSON.parse(user.value as any) || "");
const form = ref({ id: null, name: userData.value.name });
const isLoading = ref(false);
const { updateUser } = useUserService();
const { showSnackbar } = useSnackbar();

const confirmAction = async () => {
   isLoading.value = true;
   try {
      await updateUser(userData.value.id, form.value);
      showSnackbar({ message: "User berhasil diubah!", color: "success" });
      setTimeout(async () => {
         await logout();
         router.push("/auth/login");
      }, 2000);
   } catch (error) {
      console.error("Action failed:", error);
      showSnackbar({ message: getErrorMessage(error), color: "error" });
   } finally {
      isLoading.value = false;
   }
};

</script>

<template>
   <v-row>
      <v-col cols="12" md="5">
         <UiParentCard title="Profile">
            <div class="pa-7 pt-0">
               <div class="d-flex align-center">
                  <div class="mr-5">
                     <v-avatar size="100" rounded="0">
                        <v-img src="/images/users/avatar-1.jpg"></v-img>
                     </v-avatar>
                  </div>
                  <div>
                     <h5 class="text-body-1">
                        Nama : {{ userData.name }}
                     </h5>
                     <p class="text-body-1">
                        Username : {{ userData.username }}
                     </p>
                     <p class="text-body-1">
                        Role : {{ userData.role }}
                     </p>
                     <p class="text-body-1">
                        Created : {{ formatDate(userData.created_at) }}
                     </p>
                  </div>
               </div>
            </div>
         </UiParentCard>
      </v-col>
      <v-col cols="12" md="7">
         <UiParentCard title="Upadate Profile">
            <form @submit.prevent="confirmAction">
               <v-text-field v-model="form.name" label="Name"></v-text-field>
               <div class="d-flex justify-end">
                  <v-btn type="submit" :loading="isLoading" color="primary">Simpan</v-btn>
               </div>
            </form>
         </UiParentCard>
      </v-col>
   </v-row>
</template>