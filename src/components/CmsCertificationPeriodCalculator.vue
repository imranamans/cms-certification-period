<template>
  <article class="message is-info">
    <div class="message-body">
      {{ message }}
    </div>
  </article>
  <div class="tile is-ancestor is-vertical">
    <div class="tile is-parent is-8">
      <div class="tabs is-centered">
        <ul>
          <li :class="{ 'is-active': tab === 'A' }">
            <a @click="tab = 'A'">A</a>
          </li>
          <li :class="{ 'is-active': tab === 'B' }">
            <a @click="tab = 'B'">B</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child is-8">
        <div class="block" v-if="tab === 'A'">
          <StartOfCareDateSelection
            :dateFormat="dateFormat"
            @updated="onSocUpdated"
          />
        </div>
        <div class="block" v-if="tab === 'B'">
          <StartOfCareDateSelectionB :dateFormat="dateFormat" />
        </div>
      </div>

      <div class="tile is-child is-4">
        <div class="buttons has-addons">
          <button
            type="button"
            class="button"
            @click="dateFormat = 'MM/dd/yyyy'"
            :class="{ 'is-selected is-info': dateFormat === 'MM/dd/yyyy' }"
          >
            mm/dd/yyyy
          </button>
          <button
            type="button"
            class="button"
            @click="dateFormat = 'yyyy-MM-dd'"
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
          :socDate="socDate"
          :dateFormat="dateFormat"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import CertificationPeriodDisplay from "./CertificationPeriodDisplay.vue";
import StartOfCareDateSelection from "./StartOfCareDateSelection.vue";
import StartOfCareDateSelectionB from "./StartOfCareDateSelectionB.vue";

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
      dateFormat: "MM/dd/yyyy",
      socDate: DateTime.local().startOf("day").toISODate(),
      defaultCertPeriodDisplayCount: 10,
      tab: "B",
    };
  },
  methods: {
    onSocUpdated(newSoCDate) {
      this.socDate = newSoCDate;
    },
  },
};
</script>

<style scoped>
</style>