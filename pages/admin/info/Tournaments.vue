<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useTeamService } from "~/services/teamService";
import { useTournamentRegistrationService } from "~/services/tournamentRegistrationService";
import { formatDate } from "~/utils/formatMoment";
import { getErrorMessage } from "~/utils/responseMessage";

const STATUS_PAID = [
   { label: 'Free', value: 0 },
   { label: 'Paid', value: 1 },
]

const { fetchTournaments, addTransaction } = useTournamentRegistrationService();
const { fetchTeams } = useTeamService();
const { showSnackbar } = useSnackbar();

const isModalOpen = ref(false);
const isLoading = ref(false);

const form = ref({ id: null, tournament_id: "", team_id: "", payment_status: "", payment_proof: "" });
const items = ref([]);
const fetchData = reactive({
   teams: [],
})
const modalType = ref<"add" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "add", rowData?: any) => {
   modalType.value = type;
   if (type === "add") {
      form.value = {
         id: null,
         tournament_id: rowData.id,
         team_id: "",
         payment_status: rowData.is_paid == 1 ? "pending" : "free",
         payment_proof: "",
      };
      console.log("vdvdvdvd", form.value, rowData)
   }
   isModalOpen.value = true;
};

const confirmAction = async () => {
   isLoading.value = true;
   const payload = {
      ...form.value,
   };
   console.log("masuk", payload.payment_proof[0]);
   try {
      if (modalType.value === "add") {
         const formData = new FormData();
         formData.append("tournament_id", payload.tournament_id);
         formData.append("team_id", payload.team_id);
         formData.append("payment_status", payload.payment_status);
         formData.append("payment_proof", payload.payment_proof[0]);
         await addTransaction(formData);
         showSnackbar({ message: "Tournament berhasil ditambahkan!", color: "success" });
      }
      isModalOpen.value = false;
      items.value = await fetchTournaments();
   } catch (error) {
      console.error("Action failed:", error);
      showSnackbar({ message: getErrorMessage(error), color: "error" });
   } finally {
      isLoading.value = false;
   }
};

onMounted(async () => {
   items.value = await fetchTournaments();
   console.log("Fetched Items:", items.value);
   const responseFetch = {
      teams: await fetchTeams(),

   }
   fetchData.teams = responseFetch.teams;
});

watch(items, (newItems) => {
   console.log("Updated items:", newItems);
});
</script>

<template>
   <v-row>
      <v-col cols="12">
         <UiParentCard title="Tournaments">
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
                  title: 'Tutup Pendaftaran',
                  field: 'close_registration',
                  sortable: true
               },
               {
                  title: 'Actions', field: 'actions', width: 150,
                  actions: (rowData: any) => [
                     { label: 'Daftar', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('add', rowData) },
                  ]
               }
            ]" :items="reactiveItems">

               <template #column(close_registration)="{ rowData }">
                  <div class="d-flex flex-column">
                     <p>{{ formatDate(rowData.close_registration) }}</p>
                  </div>
               </template>
            </TablePagination>
         </UiParentCard>
      </v-col>
   </v-row>

   <BaseModal v-model="isModalOpen" :loading="isLoading" :title="modalType === 'add' ? 'Daftar' : 'Data'"
      @confirm="confirmAction">
      <template v-if="modalType == 'add'">
         <v-autocomplete v-model="form.team_id" :items="fetchData.teams" item-title="name" item-value="id" label="Team"
            clearable></v-autocomplete>
         <v-file-input v-model="form.payment_proof" label="File input"></v-file-input>
      </template>
   </BaseModal>
</template>
