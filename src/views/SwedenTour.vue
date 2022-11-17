<script>
import BarChart from '../components/BarChart.vue'

export default {
  name: 'App',
  components: {
    BarChart
  }
}
</script>
<template>
  <h2>Sweden Tour</h2>
  <p>Information om Sweden Tour kan du hitta på <a
      href="https://www.svenskbordtennis.com/tavling/nationellatavlingar/SwedenTour/" target="_blank">denna
      länk</a>. Nedan finns statisk om de olika spelarna på touren.</p>
  <BarChart :height="600" :width="600"/>
</template>