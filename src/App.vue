<script setup>
import PPWelcome from './components/PPWelcome.vue'
import TheWelcome from './components/TheWelcome.vue'
import IconBat from './components/icons/IconBat.vue'
</script>

<template>
  <header>
    <!-- <link rel="icon" type="image/x-icon" src="./public/favicon.ico"> -->
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <link rel="icon" href="favicon.ico">
    <div class="wrapper">
      <PPWelcome msg="Välkommen till Pingisportalen!" />
      <IconBat />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
