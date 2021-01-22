<template>
  <section class="hero is-light">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Home Health Certification Period Calculator</h1>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="notification is-success is-light">{{ message }}</div>

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
    <!-- container -->
  </section>

  <section class="section">
    <div class="container">
      <ul class="is-family-monospace has-text-weight-bold block">
        <li v-for="n in defaultCertPeriodDisplayCount" :key="n">
          Cert Period #{{ ("00" + n).slice(-2) }}
          {{ getFormattedCertPeriod(getNextCertPeriod(socDate, n)) }}
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
      const today = DateTime.local();
      return today <= end && today >= start;
    },
    getFormattedCertPeriod(certPeriod) {
      const { start, end, isCurrent } = certPeriod;
      return `Start: ${start.toFormat("MM/dd/yyyy")} End: ${end.toFormat(
        "MM/dd/yyyy"
      )} ${isCurrent ? "< Current Cert Period" : ""}`;
    },
    range,
    calculateSocDate() {
      console.log("1", this.todayIsDay);
      console.log("2", this.$data[this.todayIsDay]);
      console.log(
        "3",
        DateTime.local()
          .minus({ days: this.$data[this.todayIsDay] - 1 })
          .toISODate()
      );
      this.socDate = DateTime.local()
        .minus({ days: this.$data[this.todayIsDay] - 1 })
        .toISODate();
    },
  },
};
</script>

<style scoped>
</style>
