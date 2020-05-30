<template>
  <div class="absolute-center q-pa-md">
    <div class="row">
      <q-card class="col-12">
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="q-pa-md">
              <q-form @submit="submitLogin" @reset="resetLogin" class="q-gutter-md">
                <q-input
                  filled
                  type="email"
                  v-model="loginForm.email"
                  label="Your email *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  v-model="loginForm.password"
                  filled
                  :type="isPwd ? 'password' : 'text'"
                  label="Your password *"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                <div>
                  <q-btn :loading="loadingSubmit" label="Submit" type="submit" color="primary" />
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
            </div>
          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="q-pa-md">
              <q-form @submit="submitRegister" @reset="resetRegister" class="q-gutter-md">
                <q-input
                  filled
                  type="text"
                  v-model="registerForm.name"
                  label="Your name *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type your name']"
                />
                <q-input
                  filled
                  type="email"
                  v-model="registerForm.email"
                  label="Your email *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  v-model="registerForm.password"
                  filled
                  :type="isPwd ? 'password' : 'text'"
                  label="Your password *"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                <div>
                  <q-btn :loading="loadingRegister" label="Submit" type="submit" color="primary" />
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  data: function() {
    return {
      tab: "login",
      loginForm: {
        email: null,
        password: null
      },
      registerForm: {
        email: null,
        password: null,
        name: null
      },
      isPwd: true,
      loadingSubmit: false,
      loadingRegister: false
      // accept: false
    };
  },
  methods: {
    ...mapActions("example", ["registerUser", "loginUser"]),
    submitRegister() {
      this.loadingRegister = true;
      this.registerUser(this.registerForm)
        .then(res => {
          this.loadingRegister = false;
          console.log("se creó correctamente :D");
          this.$router.push("/");
        })
        .catch(err => {
          this.loadingRegister = false;
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: err.message
          });
        });
    },
    submitLogin() {
      this.loadingSubmit = true;
      this.loginUser(this.loginForm)
        .then(res => {
          this.loadingSubmit = false;
          this.$router.push("/");
        })
        .catch(err => {
          this.loadingSubmit = false;
          let message;
          switch (err.code) {
            case "auth/user-disabled":
              message =
                "El correo ingresado ha sido temporalmente deshabilitado";
              break;
            case "auth/user-not-found":
              message = "El correo ingresado no se encuentra registrado.";
              break;
            case "auth/wrong-password":
              message = "La contraseña es incorrecta.";
              break;
            default:
              message = "Login fallido.";
              break;
          }
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: message
          });
        });
    },
    resetRegister() {
      this.registerForm.email = null;
      this.registerForm.password = null;
      this.registerForm.name = null;
      this.accept = false;
    },
    resetLogin() {
      this.loginForm.email = null;
      this.loginForm.password = null;
      this.accept = false;
    }
  }
};
</script>
