<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label for="theDate" class="label">The date</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input
            id="theDate"
            v-model="theDate"
            type="date"
            class="input"
            @change="calculateSocDate()"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label for="dayOrdinal" class="label">is day</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input
            id="dayOrdinal"
            v-model="dayOrdinal"
            type="number"
            class="input"
            min="1"
            max="60"
            placeholder="nth day, 1 to 60"
            @change="calculateSocDate()"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label for="anyDateCertificationPeriodOrdinal" class="label">of Cert Period</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input
            id="anyDateCertificationPeriodOrdinal"
            v-model="certificationPeriodOrdinal"
            type="number"
            min="1"
            max="100"
            class="input"
            placeholder="nth Cert Period"
            @change="calculateSocDate()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon/src/luxon";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      theDate: DateTime.local().startOf("day").toISODate(),
      dayOrdinal: 1,
      certificationPeriodOrdinal: 1,
    };
  },

  computed: {
    ...mapState({
      socDate: "socDate",
    }),
  },

  activated() {
    this.calculateSocDate();
  },

  methods: {
    ...mapActions(["updateSocDate"]),

    calculateSocDate() {
      const calcDate = DateTime.fromISO(this.theDate)
        .startOf("day")
        .minus({
          days:
            60 * this.certificationPeriodOrdinal - (60 - (this.dayOrdinal - 1)),
        })
        .toISODate();

      this.updateSocDate(calcDate);
    },
  },
};
</script>

<style>
</style>