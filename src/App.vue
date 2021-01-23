<template>
  <section class="hero is-light">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <h1 class="title">Home Health Certification Period Calculator</h1>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container is-max-desktop">
      <CmsCertificationPeriodCalculator />
    </div>
  </section>

  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        Home Health Certification Period Calculator by Imran Shah. The source
        code is licensed MIT.
      </p>
    </div>
  </footer>
</template>

<script setup>
import CmsCertificationPeriodCalculator from "./components/CmsCertificationPeriodCalculator.vue";
import "bulma/css/bulma.css";
</script>

<style>
</style>