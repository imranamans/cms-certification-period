<template>
  <ul v-if="!isValidSoc()">
    <li class="notification is-danger is-light">
      Please select or enter a valid start of care date
    </li>
  </ul>
  <ul v-if="isValidSoc()" class="is-family-monospace">
    <li
      v-for="(certPeriod, index) in getNCertPeriods(
        socDate,
        defaultCertPeriodDisplayCount
      )"
      :key="index"
    >
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            Certification Period #{{ ("00" + (index + 1)).slice(-2) }}
          </div>
          <div
            class="level-item has-text-weight-bold has-text-weight-semibold is-size-5"
          >
            {{ certPeriod.start.toFormat("MM/dd/yyyy") }}
          </div>
          <div class="level-item">to</div>
          <div
            class="level-item has-text-weight-bold has-text-weight-semibold is-size-5"
          >
            {{ certPeriod.end.toFormat("MM/dd/yyyy") }}
          </div>
          <div
            class="level-item tag is-info is-light is-rounded ml-3 is-size-6"
            v-if="certPeriod.isCurrent"
          >
            Current
          </div>
        </div>
      </div>
    </li>
    <li>
      <a
        @click="
          defaultCertPeriodDisplayCount = defaultCertPeriodDisplayCount + 3
        "
        >more
      </a>
    </li>
  </ul>
</template>

<script>
import { DateTime } from "luxon";

export default {
  props: {
    socDate: {
      type: String,
      default: DateTime.local().startOf("day").toISODate(),
    },
    defaultCertPeriodDisplayCount: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    getNCertPeriods(socDate, n) {
      const result = [];
      for (let i = 1; i <= n; i++) {
        result.push(this.getNextCertPeriod(socDate, i));
      }
      return result;
    },
    getNextCertPeriod(socDate, index) {
      const start = DateTime.fromISO(socDate).plus({
        days: (index - 1) * 60,
      });
      const end = start.plus({ days: 59 });
      return {
        start,
        end,
        isCurrent: this.isCurrentCertPeriod(start, end),
      };
    },
    isCurrentCertPeriod(start, end) {
      const today = DateTime.local().startOf("day");
      return today <= end && today >= start;
    },
    isValidSoc() {
      return this.socDate ? DateTime.fromISO(this.socDate).isValid : false;
    },
  },
};
</script>

<style>
</style>