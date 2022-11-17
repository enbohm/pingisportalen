<script>
import BarChart from '../components/BarChart.vue'

export default {
  name: 'App',
  components: {
    BarChart
  },
  data() {
    return {
      chartData: {
        labels: ['Halmstad', 'Rekordspelen', 'Ängby', 'Flyman', 'Söderspelen', 'Eslövsspelen', 'Safir', 'Spårvägsspelen'],
        datasets: [{
          data: [9, 16, 9, 0, 0, 0, 0, 0],
          backgroundColor: '#33BBFF',
          label: "Jane Doe"
        },
        {
          data: [9, 5, 14, 0, 0, 0, 0, 0],
          backgroundColor: 'red',
          label: "John Doe"
        }],
        chartId: "bar-chart"
      },
      chartOptions: {
        responsive: true,
      }
    }
  }
}
</script>
<template>
  <h2>Sweden Tour</h2>
  <p>Information om Sweden Tour kan du hitta på <a
      href="https://www.svenskbordtennis.com/tavling/nationellatavlingar/SwedenTour/" target="_blank">denna
      länk</a>. Nedan finns statisk om de olika spelarna på touren.</p>
  <BarChart :height="300" :chart-data="chartData"/>
</template>