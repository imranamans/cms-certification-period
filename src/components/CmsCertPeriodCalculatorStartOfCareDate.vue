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
            :value="socDate"
            class="input"
            type="date"
            @input="update"
          />
        </div>
      </div>
      <div class="field is-narrow">
        <div class="control">
          <a
            class="button is-text"
            @click="
              makeTodayAsSocDate()
            "
            title="Set start of care to today"
            >Today {{ today }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { range } from "lodash-es";
import { mapActions, mapState } from "vuex";

export default {

  computed: {
    ...mapState({
      dateFormat: (state) => state.userDateFormat,
      socDate: "socDate",
    }),

    today() {
      return DateTime.local().startOf("day").toFormat(this.dateFormat);
    },
  },

  methods: {
    range,
    ...mapActions(["updateSocDate"]),

    makeTodayAsSocDate() {
      const today = DateTime.local().startOf("day").toISODate();

      this.updateSocDate(today);
    },

    update(e) {
      this.updateSocDate(e.target.value);
    },
  },
};
</script>

<style>
</style>