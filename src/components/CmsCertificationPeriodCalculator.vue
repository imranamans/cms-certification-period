<template>
  <div class="notification is-info is-light">{{ message }}</div>
  <div class="tile is-parent is-vertical">
    <div class="tile is-child" id="startOfCareDateSelection">
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Start of Care Date</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <input
                id="socDate"
                v-model="socDate"
                class="input"
                type="date"
                placeholder="mm/dd/yyyy"
                @change="resetSelectByToday()"
              />
            </div>
          </div>
          <div class="field is-narrow">
            <div class="control">
              <a
                class="button is-text"
                @click="
                  makeTodayAsSocDate();
                  resetSelectByToday();
                "
                title="Set start of care to today"
                >Today {{ today }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <p><strong>Or</strong></p>
        </div>
      </div>

      <div id="todayInFirst55Days" class="field is-horizontal">
        <div class="field-label">
          <label class="label">Today is in the</label>
        </div>
        <div class="field-body">
          <div class="field is-horizontal is-grouped">
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
                first 55 days, optionally pick a day
              </label>
            </div>

            <div class="control">
              <div class="select">
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

      <div id="todayInLast5Days" class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field is-horizontal is-grouped">
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
                last 5 days, optionally pick a day
              </label>
            </div>

            <div class="control">
              <div class="select">
                <select
                  id="dayInLast5Days"
                  v-model.number="dayInLast5Days"
                  @change="(todayIsDay = 'dayInLast5Days'), calculateSocDate()"
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

      <div class="field is-horizontal" v-show="todayIsDay">
        <div class="field-label">
          <label class="label">of the</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <div class="select">
                <select
                  v-model.number="certificationPeriodOrdinal"
                  @change="calculateSocDate()"
                >
                  <option v-for="n in range(1, 21)" :key="n" :value="n">
                    {{ ordinal(n) }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="field is-narrow">
            <span>Certification Period</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tile is-child">
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
      today: DateTime.local().startOf("day").toFormat("MM/dd/yyyy"),
      socDate: DateTime.local().startOf("day").toISODate(),
      defaultCertPeriodDisplayCount: 10,
      dayInFirst55Days: 2,
      dayInLast5Days: 56,
      todayIsDay: "",
      certificationPeriodOrdinal: 1,
      englishOrdinalRules: new Intl.PluralRules("en", { type: "ordinal" }),
      ordinalSuffixes: {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th",
      },
    };
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
    range,
    calculateSocDate() {
      this.socDate = DateTime.local()
        .startOf("day")
        .minus({ days: this.$data[this.todayIsDay] - 1 })
        .minus({ days: 60 * (this.certificationPeriodOrdinal - 1) })
        .toISODate();
    },
    makeTodayAsSocDate() {
      this.socDate = DateTime.local().startOf("day").toISODate();
    },
    resetSelectByToday() {
      this.todayIsDay = "";
    },
    isValidSoc() {
      return this.socDate ? DateTime.fromISO(this.socDate).isValid : false;
    },
    ordinal(number) {
      return (
        number + this.ordinalSuffixes[this.englishOrdinalRules.select(number)]
      );
    },
  },
};
</script>

<style scoped>
</style>