<template>
  <q-layout view="hHh Lpr fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="bg-primary glossy text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          <q-avatar size="md">
            <img v-if="userDetails.photo" :src="userDetails.photo" />
            <img v-else src="https://cdn.quasar.dev/app-icons/icon-128x128.png" />
          </q-avatar>

          {{userDetails.name}}
        </q-toolbar-title>
        <Language />
        <q-toggle
          size="lg"
          v-model="dark"
          checked-icon="brightness_5"
          color="blue"
          unchecked-icon="far fa-moon"
          keep-color
        />

        <q-btn dense flat round icon="message" @click="right = !right" />

        <q-btn
          v-if="!userDetails.userId"
          :ripple="{ center: true }"
          :label="$t('login')"
          flat
          dense
          icon="fas fa-sign-out-alt"
          to="/login"
        />
        <q-btn
          v-else
          flat
          :ripple="{ center: true }"
          :label="$t('logout')"
          dense
          icon="fas fa-sign-out-alt"
          @click="logoutUser"
        />
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>-->
      <q-tabs align="right"></q-tabs>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      class="test"
    >
      <q-list>
        <q-item-label header class="text-grey-8">{{$t('hello')}}</q-item-label>
      </q-list>
    </q-drawer>
    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-scroll-area style="height:100%;  border-right: 1px solid #ddd">
        <q-input debounce="500" filled placeholder="Buscar" v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
        <q-list bordered separator>
          <q-item v-for="contact in contacts" :key="contact.id" class clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">{{ contact.letter }}</q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contact.name }}</q-item-label>
              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="chat_bubble" color="green" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!-- <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 90px"
      >
      <div class="absolute-bottom bg-transparent">-->
      <!-- <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>-->
      <!-- <div class="text-weight-bold">Razvan Stoenescu</div>
      <div>@rstoenescu</div>-->

      <!-- </div>
      </q-img>-->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <!-- 

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
          <q-avatar size="md">
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
        <Language />
        <q-btn label="Send message" @click="sendMessage('wenaaaaaaa')" />
        <q-btn
          v-if="!userDetails.userId"
          :ripple="{ center: true }"
          :label="$t('login')"
          flat
          dense
          icon="fas fa-sign-out-alt"
          to="/login"
        />
        <q-btn
          v-else
          flat
          :ripple="{ center: true }"
          :label="$t('logout')"
          dense
          icon="fas fa-sign-out-alt"
          @click="logoutUser"
        />
      </q-toolbar>
    </q-header>
    <Chat />

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      class="test"
    >
      <q-list>
        <q-item-label header class="text-grey-8">{{$t('hello')}}</q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>-->
</template>

<script>
import WebSocket from "ws";
import Language from "components/Language";
import Chat from "components/Chat";
import { mapState, mapActions } from "vuex";
import io from "socket.io-client";
export default {
  name: "MainLayout",

  components: {
    Language
  },
  data: function() {
    return {
      right: false,
      leftDrawerOpen: true,
      dark: false,
      socket: false,
      text: "",
      contacts: [
        {
          id: 1,
          name: "Ruddy Jedrzej",
          email: "rjedrzej0@discuz.net",
          letter: "R"
        },
        {
          id: 2,
          name: "Mallorie Alessandrini",
          email: "malessandrini1@marketwatch.com",
          letter: "M"
        },
        {
          id: 3,
          name: "Elisabetta Wicklen",
          email: "ewicklen2@microsoft.com",
          letter: "E"
        },
        {
          id: 4,
          name: "Seka Fawdrey",
          email: "sfawdrey3@wired.com",
          letter: "S"
        }
      ]
    };
  },
  computed: {
    ...mapState("firebase", ["userDetails"])
  },
  created() {
    this.socket = this.$socket;

    console.log("en el creado", this.userDetails);
    // var socket = io("http://localhost:3000/logged");
    // this.socket = io.on('')
    // this.connection = new WebSocket("wss://echo.websocket.org");
    // this.connection = new WebSocket.Server({ port: 8080 });

    // this.connection.onopen = event => {
    //   console.log(event);
    //   console.log("Successfully connected");
    // };
    // this.connection.onerror = error => {
    //   console.log(`WebSocket error: ${error}`);
    // };

    // this.connection.onmessage = event => {
    //   console.log(event);
    // };
  },
  mounted() {},

  watch: {
    dark: function(newstate, oldstate) {
      if (newstate) {
        this.$q.dark.set(true);
      } else {
        this.$q.dark.set(false);
      }
    },
    userDetails: function(newstate, oldstate) {
      if (newstate) {
        console.log("desde el watch", this.userDetails);
        this.joinWs();
      }
    }
  },

  methods: {
    ...mapActions("firebase", ["logoutUser"]),
    sendMessage(msg) {
      this.$socket.send(msg);
    },
    joinWs() {
      this.$socket.emit("join", {
        user: this.userDetails,
        room: "global"
      });
    }
    // sendMessage(message) {
    //   console.log(this.connection);
    //   this.connection.send(message);
    // }
    // logout() {
    //   this.logoutUser().then(res => {
    //     this.$router.push("/");
    //   });
    // }
  }
};
</script>

<style lang="stylus"></style>