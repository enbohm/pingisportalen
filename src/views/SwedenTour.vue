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
    <p>Sweden Tour är samlingsnamnet för svenska elittävlingar i bordtennis och omfattar både senior- och ungdomsklasser
      identifierade under en ny Elit-standard för tävlingstillstånd. Touren administreras och marknadsförs nationellt
      och internationellt med Svenska Bordtennisförbundet som drivande aktör. Sweden Trou spelare som ett antal
      deltävlingar där spelarena samlar poäng i varje tävling. Resultaten i Sweden Tours deltävlingar är kvalificerande
      för Tourfinalerna, men räknas även som SM-kvalificerande. Finalerna spelas för HE, DE samt U20-klasser i december
      medan fina-ler för 12, 14 och 17 spelas i maj. Mer information om Sweden Tour kan du
      hitta på <a href="https://www.svenskbordtennis.com/tavling/nationellatavlingar/SwedenTour/" target="_blank">denna
        länk</a>.
    </p>
    <p>Nedan kan du söka efter en spelare som finns på touren, se statistik samt jämföra spelare. Välj först
    en klass sedan namn på spelare. Vill du jämför spelare med varandra väljer du först en spelare i sökresultatet
    sedan kan du göra en ny sökning och välja nästa.</p>
  </div>

  <PlayerStats />

</template>

