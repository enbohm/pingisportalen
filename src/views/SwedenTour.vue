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
    <p>Sweden Tour är samlingsnamnet för svenska elittävlingar i bordtennis och omfattar både senior- och
      ungdomsklasser. Sweden Tour spelas genom ett antal
      deltävlingar där spelarena samlar poäng i varje tävling (totalt 8 deltävlingar). Tolv spelare som samlat mest poäng 
      (räknas ihop genom att ta de sex tävlingar där spelaren samlat mest poäng bäst) möts sedan i 
      Tourfinalerna. Mer information om Sweden Tour kan du
      hitta på <a href="https://www.svenskbordtennis.com/tavling/nationellatavlingar/SwedenTour/" target="_blank">denna
        länk</a>.
    </p>
    <p>Nedan kan du söka efter en spelare som finns på touren, se statistik samt jämföra spelare. Välj
      en klass sedan sök efter spelare. Vill du jämföra spelare med varandra väljer du först en spelare i sökresultatet
      sedan kan du göra en ny sökning och välja nästa.</p>
  </div>

  <PlayerStats />

</template>

