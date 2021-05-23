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
            <a @click="tab = 'A'">I know the start of care date</a>
          </li>
          <li :class="{ 'is-active': tab === 'B' }">
            <a @click="tab = 'B'">Calculate using any date</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child is-8">
        <div class="block" v-if="tab === 'A'">
          <StartOfCareDateSelection />
        </div>
        <div class="block" v-if="tab === 'B'">
          <StartOfCareDateSelectionB />
        </div>
      </div>

      <div class="tile is-child is-4">
        <div class="buttons has-addons">
          <button
            type="button"
            class="button"
            @click="updateUserDateFormat('MM/dd/yyyy')"
            :class="{ 'is-selected is-info': dateFormat === 'MM/dd/yyyy' }"
          >
            mm/dd/yyyy
          </button>
          <button
            type="button"
            class="button"
            @click="updateUserDateFormat('yyyy-MM-dd')"
            :class="{ 'is-selected is-info': dateFormat === 'yyyy-MM-dd' }"
          >
            yyyy-mm-dd
          </button>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child is-12">
        <CertificationPeriodDisplay
          :defaultCertPeriodDisplayCount="defaultCertPeriodDisplayCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CertificationPeriodDisplay from "./CertificationPeriodDisplay.vue";
import StartOfCareDateSelection from "./StartOfCareDateSelection.vue";
import StartOfCareDateSelectionB from "./StartOfCareDateSelectionB.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    CertificationPeriodDisplay,
    StartOfCareDateSelection,
    StartOfCareDateSelectionB,
  },

  data() {
    return {
      message:
        "Select or enter a patient's start of care date to display the patient's home health certification period.",
      defaultCertPeriodDisplayCount: 10,
      tab: "B",
    };
  },

  computed: {
    ...mapState({
      dateFormat: (state) => state.userDateFormat,
      socDate: 'socDate'
    }),
  },

  methods: {
    ...mapActions(["updateUserDateFormat"]),
  },
};
</script>

<style scoped>
</style>