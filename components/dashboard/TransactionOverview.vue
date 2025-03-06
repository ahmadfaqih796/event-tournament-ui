<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useTheme } from "vuetify";

const props = defineProps<{
  data?: any;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const theme = useTheme();
const primary = theme.current.value.colors.primary;

const select = ref(props.modelValue);
const items = ref(["2025", "2026", "2027"]);

const dataFinance = computed(() => props.data || []);

const chartOptions = computed(() => {
  return {
    series: [
      {
        name: "Pemasukan",
        type: "line",
        data: dataFinance.value || [],
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

watch(select, (newYear) => {
  emit("update:modelValue", newYear);
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
          <v-select v-model="select" :items="items" variant="outlined" density="compact" hide-details></v-select>
        </div>
      </div>
      <div class="mt-6">
        <apexchart type="line" height="370px" :options="chartOptions.chartOptions" :series="chartOptions.series" />
      </div>
    </v-card-item>
  </v-card>
</template>
