<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label for="" class="label">Date</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input
            v-model="theDate"
            type="text"
            class="input"
            :placeholder="this.dateFormat"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="field">
    <label for="" class="label">is day</label>
    <div class="control">
      <InputText v-model.number="isDay" />
      <Slider v-model="isDay" :min="1" :max="60" />
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";

export default {
  components: {
      InputText
  },
  props: {
    dateFormat: {
      type: String,
      default: "MM/dd/yyyy",
    },
  },
  data() {
    return {
      isDay: 2,
      theDate: "",
    };
  },
};
</script>

<style>
</style>