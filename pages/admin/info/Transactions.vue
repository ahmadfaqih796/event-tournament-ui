<script setup lang="ts">
import UiParentCard from "@/components/shared/UiParentCard.vue";
import TablePagination from "@/components/style-components/table/TablePagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import BaseModal from "~/components/common/BaseModal.vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { useTeamService } from "~/services/teamService";
import { useTransactionService } from "~/services/transactionService";
import { getErrorMessage } from "~/utils/responseMessage";

const STATUS_PAID = [
   { label: 'Approved', value: "paid" },
   { label: 'Rejected', value: "rejected" },
]

const { fetchTransactions, updateTransaction } = useTransactionService();
const { fetchTeams } = useTeamService();
const { showSnackbar } = useSnackbar();
const { user } = useAuth()
const userRole = computed(() => JSON.parse(user.value as any).role || "");
const isModalOpen = ref(false);
const isLoading = ref(false);

const form = ref({ id: null, payment_status: "" });
const items = ref([]);
const fetchData = reactive({
   teams: [],
})
const modalType = ref<"edit" | null>(null);
const reactiveItems = computed(() => items.value);

const openModal = (type: "edit", rowData?: any) => {
   modalType.value = type;
   form.value = {
      id: rowData.tr_id,
      payment_status: "",

   };
   isModalOpen.value = true;
};

const confirmAction = async () => {
   isLoading.value = true;
   const payload = {
      ...form.value,
   };
   console.log("transaction", form.value)
   try {
      if (modalType.value === "edit" && form.value.id !== null) {
         await updateTransaction(form.value.id, payload);
         showSnackbar({ message: "Transaction berhasil!", color: "success" });
      }
      isModalOpen.value = false;
      items.value = await fetchTransactions();
   } catch (error) {
      console.error("Action failed:", error);
      showSnackbar({ message: getErrorMessage(error), color: "error" });
   } finally {
      isLoading.value = false;
   }
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
               {
                  title: 'Status', field: 'status', sortable: true,
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
               ...(userRole === 'komunitas' ?
                  [{
                     title: 'Actions', field: 'actions', width: 150,
                     actions: (rowData: any) => rowData.transaction.payment_status === 'pending'
                        ? [
                           { label: 'Edit', color: 'primary', icon: 'mdi-pencil', onClick: () => openModal('edit', rowData) },
                        ] : []
                  }]
                  :
                  []
               )
            ]" :items="reactiveItems">
            </TablePagination>
         </UiParentCard>
      </v-col>
   </v-row>

   <BaseModal v-model="isModalOpen" :loading="isLoading" :title="'Approve Transaction'" @confirm="confirmAction">
      <template v-if="modalType === 'edit'">
         <v-select v-model="form.payment_status" :items="STATUS_PAID" item-title="label" item-value="value"
            label="Status"></v-select>
      </template>
   </BaseModal>
</template>
