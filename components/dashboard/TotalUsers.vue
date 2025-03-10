<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "vuetify";

const props = defineProps<{
  data?: any;
}>()

const theme = useTheme();
const primary = theme.current.value.colors.primary;
const lightprimary = theme.current.value.colors.lightprimary;
const dataUser = computed(() => props.data ? Object.values(props.data) : []);
const totalUsers = computed(() =>
  props.data ? Object.values(props.data).reduce((acc, val) => acc as any + val as any, 0) : 0
);

const chartOptions = computed(() => {
  return {
    labels: ["Komunitas", "Peserta"],
    chart: {
      type: "donut",
      fontFamily: `inherit`,
      foreColor: "#a1aab2",
      toolbar: {
        show: false,
      },
    },
    colors: [primary, lightprimary, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    stroke: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: { theme: "light", fillSeriesColor: false },
  };
});;
</script>
<template>
  <v-card elevation="10" class="withbg">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">Total User</v-card-title>
      </div>
      <v-row>
        <v-col cols="7" sm="7">
          <div class="mt-6">
            <h3 class="text-h1">{{ totalUsers }}</h3>
            <div class="d-flex align-center mt-sm-12 mt-10">
              <h6 class="text-subtitle-1 text-muted">
                <v-icon
                  icon="mdi mdi-checkbox-blank-circle"
                  class="mr-1"
                  size="10"
                  color="primary"
                ></v-icon>
                Komunitas
              </h6>
              <h6 class="text-subtitle-1 text-muted pl-5">
                <v-icon
                  icon="mdi mdi-checkbox-blank-circle"
                  class="mr-1"
                  size="10"
                  color="lightprimary"
                ></v-icon>
                Peserta
              </h6>
            </div>
          </div>
        </v-col>
        <v-col cols="5" sm="5" class="pl-lg-0">
          <div class="d-flex align-center flex-shrink-0">
            <apexchart
              class="pt-6"
              type="donut"
              height="145"
              :options="chartOptions"
              :series="dataUser"
            >
            </apexchart>
          </div>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
