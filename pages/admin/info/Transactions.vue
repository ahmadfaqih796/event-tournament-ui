<script setup lang="ts">
import BaseModal from "@/components/common/BaseModal.vue";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useTeamService } from "~/services/teamService";
import { useTournamentRegistrationService } from "~/services/tournamentRegistrationService";
import { useTransactionService } from "~/services/transactionService";
import { formatDate } from "~/utils/formatMoment";
import { getErrorMessage } from "~/utils/responseMessage";

const { fetchTransactions } = useTransactionService();
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

onMounted(async () => {
   items.value = await fetchTransactions();
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
         <UiParentCard title="Transactions">
            <TablePagination :columns="[
               { title: 'No', field: 'no', sortable: true, width: 80 },
               { title: 'Invoince', field: 'struk', sortable: true },
               { title: 'Game', field: 'game_name', sortable: true },
               { title: 'Harga', field: 'price', sortable: true },
               { title: 'Status', field: 'status', sortable: true,
                  formatter: (rowData: any) => {
                     return rowData.transaction.payment_status
                        ? `<div><p class='font-weight-bold text-success text-center'>${rowData.transaction.payment_status}</p></div>`
                        : ``;
                  }
                },
               { title: 'Paid By', field: 'paid_by', sortable: true },
               { title: 'Tanggal', field: 'created_at', sortable: true },
               {
                  title: 'Bukti', field: 'bukti', sortable: true,
                  formatter: (rowData: any) => {
                     return rowData.transaction.payment_proof
                        ? `<div>
                        <a href='http://127.0.0.1:8000/storage/${rowData.transaction.payment_proof}' target='_blank'>
                        <img src='http://127.0.0.1:8000/storage/${rowData.transaction.payment_proof}' style='width: 100px; height: 100px; object-fit: cover;'' />
                        </a>
            </div>`
                        : '';
                  }
               },


            ]" :items="reactiveItems">


            </TablePagination>
         </UiParentCard>
      </v-col>
   </v-row>

</template>
