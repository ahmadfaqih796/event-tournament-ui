<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseModal from '~/components/common/BaseModal.vue';
import FooterSection from '~/components/layout/landing/container/FooterSection.vue';
import HeroSection from '~/components/layout/landing/container/HeroSection.vue';
import NavbarSection from '~/components/layout/landing/container/NavbarSection.vue';
import TablePagination from '~/components/style-components/table/TablePagination.vue';
import { useEventService } from '~/services/eventService';
import { useGameService } from '~/services/gameService';
import { useTournamentService } from '~/services/tournamentService';

definePageMeta({
   layout: "blank",
   middleware: 'auth',
});

const STATUS_PAID = [
   { label: 'Free', value: 0 },
   { label: 'Paid', value: 1 },
]

const items = ref({
   tournament: [],
   events: [],
   game: []
});

const { fetchTournaments, addTournament, updateTournament, deleteTournament } = useTournamentService();
const { fetchGames } = useGameService();
const { fetchEvents } = useEventService();
const { showSnackbar } = useSnackbar();


const isModalOpen = ref(false);
const isLoading = ref(false);
const form = ref({ id: null, name: "", game: "", event_id: "", status: '', price: null, barcode: null, is_paid: 0, close_registration: "" });
const modalType = ref<"add" | "edit" | "delete" | null>(null);

const openModal = (type: "add" | "edit" | "delete", rowData?: any) => {
   modalType.value = type;
   if (type === "add") {
      form.value = {
         id: null,
         name: "",
         game: "",
         event_id: "",
         status: '',
         is_paid: 0,
         price: null,
         barcode: null,
         close_registration: ""
      };
   } else if (type === "edit") {
      form.value = { ...rowData, barcode: null, close_registration: formatDate(rowData.close_registration) };
   } else if (rowData) {
      form.value = { ...rowData };
   }
   isModalOpen.value = true;
};

const formatMembers = (members: any[]) => {
   return members.join(", ");
};

const confirmAction = async () => {
   isLoading.value = true;
   try {
      const payload = {
         ...form.value,
         price: form.value.is_paid ? form.value.price : null
      };
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("game", payload.game);
      formData.append("event_id", payload.event_id);
      formData.append("is_paid", (payload.is_paid as any) || 0);
      formData.append("status", payload.status);
      formData.append("price", payload.price || "");
      formData.append("barcode", (payload.barcode as any)[0] || null);
      formData.append("close_registration", payload.close_registration);

      if (modalType.value === "add") {
         await addTournament(formData);
         showSnackbar({ message: "Tournament berhasil ditambahkan!", color: "success" });
      } else if (modalType.value === "edit" && form.value.id !== null) {
         await updateTournament(form.value.id, formData);
         showSnackbar({ message: "Tournament berhasil diubah!", color: "success" });
      } else if (modalType.value === "delete" && form.value.id !== null) {
         await deleteTournament(form.value.id);
         showSnackbar({ message: "Tournament berhasil dihapus!", color: "success" });
      }
      isModalOpen.value = false;
      items.value.tournament = await fetchTournaments();
   } catch (error) {
      console.error("Action failed:", error);
      showSnackbar({ message: getErrorMessage(error), color: "error" });
   } finally {
      isLoading.value = false;
   }
};

onMounted(async () => {
   items.value.tournament = await fetchTournaments();
   items.value.events = await fetchEvents();
   items.value.game = await fetchGames();
})
</script>

<template>
   <div>
      <!-- Navbar -->
      <NavbarSection />

      <!-- Hero Section dengan Slider -->
      <section id="home">
         <HeroSection :title="'Pendaftaran Tournament'" />
      </section>

      <!-- Team Section -->
      <section id="game" class="bg-white py-10">
         <div class="container mx-auto lg:px-[15%] px-4">
            <h2 class="text-2xl font-bold mb-4 text-red-600 text-center">Data Pendaftaran Tournament</h2>

            <TablePagination :columns="[
               { title: 'No', field: 'no', sortable: true, width: 80 },
               { title: 'Name', field: 'name', sortable: true },
               { title: 'Game', field: 'game', sortable: true },
               {
                  title: 'Event', field: 'event', sortable: true,
                  formatter: (rowData: any) => `
              <div>
                <p class='font-weight-bold text-center'>${rowData.event.name}</p>
              </div>`
               },
               {
                  title: 'Status', field: 'is_paid', sortable: true,
                  formatter: (rowData: any) => rowData.is_paid ? `
              <div><p class='font-weight-bold text-error text-center'>${rowData.price}</p></div>` : `
              <div>
                <p class='font-weight-bold text-${rowData.is_paid ? 'error' : 'success'} text-center'>${rowData.is_paid ? 'Paid' : 'Free'}</p>
              </div>`
               },
               {
                  title: 'Barcode', field: 'barcode', sortable: true,
                  formatter: (rowData: any) => {
                     return rowData.barcode
                        ? `<div>
                        <a href='http://127.0.0.1:8000/storage/${rowData.barcode}' target='_blank'>
                        <img src='http://127.0.0.1:8000/storage/${rowData.barcode}' style='width: 100px; height: 100px; object-fit: cover;'' />
                        </a>
            </div>`
                        : '-';
                  }
               },
               {
                  title: 'Tutup Pendaftaran',
                  field: 'close_registration',
                  sortable: true
               },
               {
                  title: 'Actions', field: 'actions', width: 150,
                  actions: (rowData: any) => [
                     { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('edit', rowData) },
                     { label: 'Delete', color: 'error', icon: 'mdi-delete', onClick: () => openModal('delete', rowData) }
                  ]
               }
            ]" :items="items.tournament" :extraButtons="[
               { label: 'Add', color: 'primary', icon: 'mdi-plus', onClick: () => openModal('add') }]" />
         </div>
      </section>

      <!-- Footer -->
      <FooterSection />
   </div>

   <BaseModal v-model="isModalOpen" :loading="isLoading"
      :title="modalType === 'add' ? 'Tambah Data' : modalType === 'edit' ? 'Edit Data' : 'Hapus Data'"
      @confirm="confirmAction">
      <template v-if="modalType !== 'delete'">
         <v-text-field v-model="form.name" label="Name"></v-text-field>
         <v-autocomplete v-model="form.game" :items="items.game" item-title="name" item-value="name" label="Game"
            clearable></v-autocomplete>
         <v-autocomplete v-model="form.event_id" :items="items.events" item-title="name" item-value="id" label="Event"
            clearable></v-autocomplete>
         <v-select v-model="form.is_paid" :items="STATUS_PAID" item-title="label" item-value="value"
            label="Status"></v-select>
         <v-text-field v-model="form.price" label="Price" v-if="form.is_paid"></v-text-field>
         <v-file-input v-model="form.barcode" label="File barcode"></v-file-input>
         <v-text-field v-model="form.close_registration" type="date" label="Close Registration"></v-text-field>
      </template>
      <template v-else>
         <p>Apakah Anda yakin ingin menghapus data ini?</p>
      </template>
   </BaseModal>

</template>

<style scoped>
html {
   scroll-behavior: smooth;
}

.animate-slide {
   transition: background-image 1s ease-in-out;
}
</style>
