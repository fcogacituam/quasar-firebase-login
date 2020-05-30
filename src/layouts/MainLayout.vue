<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>{{userDetails.name}}</q-toolbar-title>
        <q-btn
          v-if="!userDetails.userId"
          :ripple="{ center: true }"
          label="Login"
          flat
          dense
          icon="fas fa-sign-out-alt"
          to="/login"
        />
        <q-btn
          v-else
          flat
          :ripple="{ center: true }"
          label="Logout"
          dense
          icon="fas fa-sign-out-alt"
          @click="logoutUser"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <!-- <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" /> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import { mapState, mapActions } from "vuex";
export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },
  computed: {
    ...mapState("example", ["userDetails"])
  },
  methods: {
    ...mapActions("example", ["logoutUser"])
    // logout() {
    //   this.logoutUser().then(res => {
    //     this.$router.push("/");
    //   });
    // }
  },
  data: function() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
