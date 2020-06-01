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

        <q-toolbar-title>
          <q-avatar size="28px">
            <img v-if="userDetails.photo" :src="userDetails.photo" />
            <img v-else src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
          </q-avatar>
          {{userDetails.name}}
        </q-toolbar-title>
        <q-toggle
          size="lg"
          v-model="dark"
          checked-icon="brightness_5"
          color="blue"
          unchecked-icon="far fa-moon"
          keep-color
        />
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      class="test"
    >
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
  mounted() {},
  methods: {
    ...mapActions("example", ["logoutUser"])
    // logout() {
    //   this.logoutUser().then(res => {
    //     this.$router.push("/");
    //   });
    // }
  },
  watch: {
    dark: function(newstate, oldstate) {
      if (newstate) {
        this.$q.dark.set(true);
      } else {
        this.$q.dark.set(false);
      }
    }
  },
  data: function() {
    return {
      leftDrawerOpen: true,
      dark: false
    };
  }
};
</script>

<style lang="stylus"></style>