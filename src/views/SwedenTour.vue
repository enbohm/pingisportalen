<script>
import PlayerStats from '../components/PlayerStats.vue'

export default {
  name: 'SwedenTour',
  components: {
    PlayerStats
  }
}
</script>

<template>

  <div class="info">
    <h2>Sweden Tour</h2>
    <p>Information om Sweden Tour kan du hitta på <a
        href="https://www.svenskbordtennis.com/tavling/nationellatavlingar/SwedenTour/" target="_blank">denna
        länk</a>. Nedan kan du söka efter en spelare som finns på touren, se statistik samt jämföra två spelare. Välj för vilken klass sedan fyll ett ett namn (förnamn eller efternamn)</p>
  </div>

  <PlayerStats />

</template>

