<template>
  <div class="notification is-info is-light">{{ message }}</div>
  <div class="tile is-parent is-vertical">
    <div class="tile is-child">
      <start-of-care-date-selection @updated="onSocUpdated"/>
    </div>

    <div class="tile is-child">
      <certification-period-display
        :defaultCertPeriodDisplayCount="defaultCertPeriodDisplayCount"
        :socDate="socDate"
      />
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import CertificationPeriodDisplay from "./CertificationPeriodDisplay.vue";
import StartOfCareDateSelection from "./StartOfCareDateSelection.vue";

export default {
  components: { CertificationPeriodDisplay, StartOfCareDateSelection },
  data() {
    return {
      message:
        "Select or enter a patient's start of care date to display the patient's home health certification period.",
      today: DateTime.local().startOf("day").toFormat("MM/dd/yyyy"),
      socDate: DateTime.local().startOf("day").toISODate(),
      defaultCertPeriodDisplayCount: 10,
    };
  },
  methods: {
    onSocUpdated(newSoCDate) {
      this.socDate = newSoCDate;
    }
  },
};
</script>

<style scoped>
</style>