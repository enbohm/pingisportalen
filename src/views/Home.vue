<script setup>
import IconBat from '../components/icons/IconBat.vue'
</script>

<template>

  <div class="greetings">
    <h1 class="green">Välkommen till Pingisportalen!</h1>
    <h3>
      Pingisportalen - stället för alla pingisintresserade! Här finns en massa bra länkar och information om bordtennis
      - den enda sida du behöver om du gillar pingis :)
    </h3>
  </div>
  <IconBat />
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>