<template>
  <div class="field is-horizontal">
    <div class="field-label">
      <label for="socDate" class="label">Start of Care Date</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input
            id="socDate"
            v-model="theDate"
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
import { DateTime } from "luxon/src/luxon";
import { mapActions, mapState } from "vuex";

export default {

  data() {
    return {
      theDate: DateTime.local().startOf("day").toISODate()
    };
  },

  computed: {
    ...mapState({
      dateFormat: (state) => state.userDateFormat,
      socDate: "socDate",
    }),

    today() {
      return DateTime.local().startOf("day").toFormat(this.dateFormat);
    },
  },

  activated() {
    this.update();
  },

  methods: {
    ...mapActions(["updateSocDate"]),

    makeTodayAsSocDate() {
      const today = DateTime.local().startOf("day").toISODate();
      this.theDate = today;
      this.update();
    },

    update() {
      this.updateSocDate(this.theDate);
    },
  },
};
</script>

<style>
</style>