<template>
    <Line :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>

<style>
.tabcontent {
  display: none;
  padding: 6px 12px;
  border-top: none;
  position: relative;
}

canvas {
  width: 100% !important;
  max-width: 400px;
  max-height: 400px;
  height: auto !important;
}
</style>

<script>
import { Line } from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale
)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    cssClasses: {
      default: '',
      type: String
    },
    height: {
      default: 600,
      type: Number
    },
    width: {
      default: 600,
      type: Number
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Object,
      default: () => { }
    },
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => { }
    }
  }
}
</script>