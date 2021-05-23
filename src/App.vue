<template>
  <section class="hero is-small is-light">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <h1 class="title">CMS Certification Period Calculator</h1>
        <h2 class="subtitle">Home Health Care</h2>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container is-max-desktop">
      <CmsCertPeriodCalculator />
    </div>
  </section>

  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        CMS Certification Period Calculator by Imran Shah. The source code is
        licensed MIT.
      </p>
    </div>
  </footer>
</template>

<script setup>
import CmsCertPeriodCalculator from "./components/CmsCertPeriodCalculator.vue";
import "bulma/css/bulma.css";
</script>

<style>
</style>