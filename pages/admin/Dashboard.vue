<script setup lang="ts">
/*Call Components*/
 import SalesOverview from '@/components/dashboard/SalesOverview.vue';
import YearlyBreakup from '@/components/dashboard/YearlyBreakup.vue';
import MonthlyEarning from '@/components/dashboard/MonthlyEarnings.vue';
import RecentTransaction from '@/components/dashboard/RecentTransaction.vue';
import ProductPerformance from '@/components/dashboard/ProductPerformance.vue';
import ProductCards from '@/components/dashboard/ProductCards.vue';
import TransactionOverview from '~/components/dashboard/TransactionOverview.vue';
import TotalUsers from '~/components/dashboard/TotalUsers.vue';
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <!-- Sales overview -->
                <v-col cols="12" lg="8">
                    <TransactionOverview />
                </v-col>
                <!-- Yearly Breakup / Monthly Earnings -->
                <v-col cols="12" lg="4">
                    <div class="mb-6">
                        <TotalUsers />
                        <!-- <YearlyBreakup /> -->
                    </div>
                    <div>
                        <!-- <MonthlyEarning /> -->
                    </div>
                </v-col>
                <!-- Recent transaction -->
                <v-col cols="12" lg="4">
                    <!-- <RecentTransaction /> -->
                </v-col>
                <!-- Product performence -->
                <v-col cols="12" lg="8">
                    <!-- <ProductPerformance /> -->
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>