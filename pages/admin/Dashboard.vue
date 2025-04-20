<script setup lang="ts">
/* Import Components */
import TotalUsers from '~/components/dashboard/TotalUsers.vue';
import TransactionOverview from '~/components/dashboard/TransactionOverview.vue';
import { useDashboard } from '~/services/dashboardService';

const { fetchDashboard } = useDashboard();
const dashboardData = reactive({
    user: [],
    finance: []
});

const select = ref("2025");

const { user } = useAuth()
const userData = computed(() => JSON.parse(user.value as any) || "");

const loadDashboard = async (year: string) => {
    const data = await fetchDashboard(year) as any;
    dashboardData.user = data.user;
    dashboardData.finance = data.finance.original.data;
};

onMounted(() => loadDashboard(select.value));
watch(select, (newYear) => loadDashboard(newYear));

</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <template v-if="userData.role == 'peserta'">
                                <h1>Selamat Datang, {{ userData.name }}!</h1>
                            </template>

                            <template v-else>
                                <v-col cols="12" lg="8">
                                    <TransactionOverview :data="dashboardData.finance" v-model="select" />
                                </v-col>
                                <v-col cols="12" lg="4">
                                    <div class="mb-6">
                                        <TotalUsers :data="dashboardData.user" />
                                    </div>
                                </v-col>
                            </template>
                        </v-row>
                    </v-col>
                </v-row>
            </v-row>
        </v-col>
    </v-row>
</template>
