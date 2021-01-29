<template>
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
            @change="resetSelectByToday();$emit('updated', this.socDate)"
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
              @change="(todayIsDay = 'dayInFirst55Days'), calculateSocDate()"
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
</template>

<script>
import { DateTime } from "luxon";
import { range } from "lodash-es";

export default {
  data() {
    return {
      today: DateTime.local().startOf("day").toFormat("MM/dd/yyyy"),
      socDate: DateTime.local().startOf("day").toISODate(),
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
  emits: ['updated'],
  methods: {
    range,
    calculateSocDate() {
      this.socDate = DateTime.local()
        .startOf("day")
        .minus({ days: this.$data[this.todayIsDay] - 1 })
        .minus({ days: 60 * (this.certificationPeriodOrdinal - 1) })
        .toISODate();

      this.$emit("updated", this.socDate);
    },
    makeTodayAsSocDate() {
      this.socDate = DateTime.local().startOf("day").toISODate();

      this.$emit("updated", this.socDate);
    },
    resetSelectByToday() {
      this.todayIsDay = "";
    },
    ordinal(number) {
      return (
        number + this.ordinalSuffixes[this.englishOrdinalRules.select(number)]
      );
    },
  },
};
</script>

<style>
</style>