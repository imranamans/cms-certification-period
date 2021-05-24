<template>
  <!-- <article class="message is-info">
    <div class="message-body">
      Select or enter a patient's start of care date to display the patient's home health certification period.
    </div>
  </article> -->

  <div class="tile is-ancestor is-vertical">
    <div class="tile is-parent is-8">
      <div class="tabs is-centered">
        <ul>
          <li :class="{ 'is-active': tab === 'A' }">
            <a @click="tab = 'A'">Using start of care date</a>
          </li>
          <li :class="{ 'is-active': tab === 'B' }">
            <a @click="tab = 'B'">Using any date</a>
          </li>
          <li :class="{ 'is-active': tab === 'C' }">
            <a @click="tab = 'C'">Using today' date</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child is-8">
        <keep-alive>
          <cms-cert-period-calculator-start-of-care-date v-if="tab === 'A'"/>
          <cms-cert-period-calculator-any-date v-else-if="tab === 'B'"/>
          <cms-cert-period-calculator-current-date v-else-if="tab === 'C'"/>
        </keep-alive>
      </div>

      <div class="tile is-child is-4">
        <div class="buttons has-addons">
          <button
            type="button"
            class="button"
            @click="updateUserDateFormat('MM/dd/yyyy')"
            :class="{ 'is-selected is-link': dateFormat === 'MM/dd/yyyy' }"
          >
            mm/dd/yyyy
          </button>
          <button
            type="button"
            class="button"
            @click="updateUserDateFormat('yyyy-MM-dd')"
            :class="{ 'is-selected is-link': dateFormat === 'yyyy-MM-dd' }"
          >
            yyyy-mm-dd
          </button>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child is-12">
        <CmsCertPeriodViewer
          :defaultCertPeriodDisplayCount="defaultCertPeriodDisplayCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CmsCertPeriodViewer from "./CmsCertPeriodViewer.vue";
import CmsCertPeriodCalculatorStartOfCareDate from "./CmsCertPeriodCalculatorStartOfCareDate.vue";
import CmsCertPeriodCalculatorAnyDate from "./CmsCertPeriodCalculatorAnyDate.vue";
import CmsCertPeriodCalculatorCurrentDate from './CmsCertPeriodCalculatorCurrentDate.vue';

export default {
  components: {
    CmsCertPeriodViewer,
    CmsCertPeriodCalculatorStartOfCareDate,
    CmsCertPeriodCalculatorAnyDate,
    CmsCertPeriodCalculatorCurrentDate,
  },

  data() {
    return {
      defaultCertPeriodDisplayCount: 10,
      tab: "B",
    };
  },

  computed: {
    ...mapState({
      dateFormat: (state) => state.userDateFormat,
      socDate: "socDate",
    }),
  },

  methods: {
    ...mapActions(["updateUserDateFormat"]),
  },
};
</script>

<style scoped>
</style>