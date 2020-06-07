<template>
  <q-layout view="lHh Lpr lFf">
    <Language v-show="false" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Language from "components/Language";
export default {
  name: "MainLayout",

  components: {
    Language
  },

  data: function() {
    return {
      // leftDrawerOpen: false
    };
  }
};
</script>
