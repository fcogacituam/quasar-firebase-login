<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    dense
    borderless
    options-dense
    emit-value
    map-options
  >
    <template v-slot:selected-item="scope">
      <!-- <q-avatar color="secondary" text-color="white" :icon="scope.opt.icon" /> -->
      <q-icon :name="scope.opt.icon" size="md" />
      <!-- {{ scope.opt.icon }} -->
    </template>
  </q-select>
</template>
<script>
export default {
  name: "Language",
  data() {
    return {
      lang: this.$q.lang.getLocale(),
      langOptions: [
        { value: "en-us", label: "English", icon: "img:statics/images/en.png" },
        { value: "es-es", label: "Español", icon: "img:statics/images/es.png" }
      ]
    };
  },
  mounted() {
    this.$i18n.locale = this.$q.lang.getLocale();
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
    }
  }
};
</script>