<template>
  <div class="notification is-info is-light">{{ message }}</div>
  <div class="tile is-parent is-vertical">
    <div class="tile is-child">
      <div id="certPeriodInputsForm">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Start of Care Date</label>
          </div>
          <div class="field-body">
            <p class="control">
              <input
                id="socDate"
                v-model="socDate"
                class="input"
                type="date"
                placeholder="mm/dd/yyyy"
              />
            </p>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal"></div>
          <div class="field-body">
            <p>Or</p>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Today is in the</label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="certWindow"
                    id="first55Days"
                    value="dayInFirst55Days"
                    v-model="todayIsDay"
                    @change="calculateSocDate()"
                  />
                  first 55 days of the Current Certification Period, optionally
                  pick a day
                </label>
              </div>
            </div>
            <div class="field is-narrow">
              <div class="control">
                <div class="select is-fullwidth">
                  <select
                    id="dayInFirst55Days"
                    v-model.number="dayInFirst55Days"
                    @change="
                      (todayIsDay = 'dayInFirst55Days'), calculateSocDate()
                    "
                  >
                    <option v-for="n in 55" :key="n">{{ n }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label"></div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="certWindow"
                    id="last5Days"
                    value="dayInLast5Days"
                    v-model="todayIsDay"
                    @change="calculateSocDate()"
                  />
                  last 5 days of the Current Certification Period, optionally
                  pick a day
                </label>
              </div>
            </div>
            <div class="field is-narrow">
              <div class="control">
                <div class="select is-fullwidth">
                  <select
                    id="dayInLast5Days"
                    v-model.number="dayInLast5Days"
                    @change="
                      (todayIsDay = 'dayInLast5Days'), calculateSocDate()
                    "
                  >
                    <option v-for="n in range(56, 61)" :key="n">
                      {{ n }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tile is-child">
      <ul class="is-family-monospace has-text-weight-bold block">
        <li v-for="n in defaultCertPeriodDisplayCount" :key="n">
          Certification Period #{{ ("00" + n).slice(-2) }}
          <span class="has-background-link-light">{{ getFormattedCertPeriod(getNextCertPeriod(socDate, n)) }}</span>
        </li>
        <li>
          <a
            @click="
              defaultCertPeriodDisplayCount = defaultCertPeriodDisplayCount + 3
            "
            >more</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { DateTime } from "luxon";
import { range } from "lodash-es";

export default {
  data() {
    return {
      message:
        "Select or enter a patient's start of care date to display the patient's home health certification period.",
      socDate: DateTime.local().toISODate(),
      defaultCertPeriodDisplayCount: 10,
      dayInFirst55Days: 2,
      dayInLast5Days: 56,
      todayIsDay: "",
    };
  },
  methods: {
    getNextCertPeriod(socDate, index) {
      const certStart = DateTime.fromISO(socDate).plus({
        days: (index - 1) * 60,
      });
      const certEnd = certStart.plus({ days: 59 });
      return {
        start: certStart,
        end: certEnd,
        isCurrent: this.isCurrentCertPeriod(certStart, certEnd),
      };
    },
    isCurrentCertPeriod(start, end) {
      const today = DateTime.local().startOf("day");
      return today <= end && today >= start;
    },
    getFormattedCertPeriod(certPeriod) {
      const { start, end, isCurrent } = certPeriod;
      return `${start.toFormat("MM/dd/yyyy")} to ${end.toFormat(
        "MM/dd/yyyy"
      )} ${isCurrent ? "< Current" : ""}`;
    },
    range,
    calculateSocDate() {
      this.socDate = DateTime.local()
        .minus({ days: this.$data[this.todayIsDay] - 1 })
        .toISODate();
    },
  },
};
</script>

<style scoped>
</style>
