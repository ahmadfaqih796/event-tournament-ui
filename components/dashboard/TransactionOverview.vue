<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import { useDashboard } from "~/services/dashboardService";


const { fetchDashboard } = useDashboard();
const financeData = ref([]);


const theme = useTheme();
const primary = theme.current.value.colors.primary;
const select = ref("2025");
const items = ref(["2025", "2026", "2027"]);

const loadDashboard = async (year : string) => {
  const data = await fetchDashboard(year);
  financeData.value = data.finance.original.data;
};
onMounted(() => loadDashboard(select.value));
watch(select, (newYear) => {
  loadDashboard(newYear);
});

const chartOptions = computed(() => {
  return {
    series: [
      {
        name: "Pemasukan",
        type: "line",
        // data: [2000, 3000, 7000, 4000, 2000, 3000, 7000, 4000, 2000, 3000, 7000, 4000],
        data: financeData.value || [] ,
      },
    ],
    chartOptions: {
      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: { lines: { show: false } },
      },
      colors: [primary],
      chart: {
        type: "line",
        height: 370,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: "#adb0bb",
        fontFamily: "inherit",
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        width: 3,
        curve: "smooth",
      },
      markers: { size: 5 },
      legend: { show: true },
      xaxis: {
        type: "category",
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        labels: { style: { cssClass: "grey--text lighten-2--text fill-color" } },
      },
      yaxis: {
        show: true,
        min: 0,
        tickAmount: 4,
        labels: { style: { cssClass: "grey--text lighten-2--text fill-color" } },
      },
      tooltip: { theme: "light" },
      responsive: [
        {
          breakpoint: 600,
          options: {},
        },
      ],
    },
  };
});
</script>

<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <div>
          <v-card-title class="text-h5">Transaction Overview</v-card-title>
        </div>
        <div class="my-sm-0 my-2">
          <v-select
            v-model="select"
            :items="items"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </div>
      </div>
      <div class="mt-6">
        <apexchart
          type="line"
          height="370px"
          :options="chartOptions.chartOptions"
          :series="chartOptions.series"
        />
      </div>
    </v-card-item>
  </v-card>
</template>
