import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { firebaseAuth } from 'src/boot/firebase'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ( { store, ssrContext } ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to,from,next) => {
    console.log("WTF")
    const user = await new Promise( (resolve,reject) => {
      firebaseAuth.onAuthStateChanged( user => {
        // store.dispatch('myFirebaseUserAction', user.toJSON())
        console.log("ONAUTHSTATUSCHANGE",user)
        if (user) {
          store.dispatch('users/getUser',user.uid,{root:true}).then(res =>{
            console.log("tengo el user desde db",res.data)
            if (res.data) {
              store.commit('firebase/setUserDetails',{
                  name: res.data.name,
                  email: res.data.email,
                  photo: res.data.photo,
                  userId: res.data.id,
                  online:1,
              })
              resolve(user)
            }
          })
        }
        resolve(user)
      })
    })


    console.log("USER DESDE ROUTEs",user)
    const requiresAuth = to.matched.some(recordedRoute => recordedRoute.meta.requiresAuth)
    // console.log("auth",requiresAuth)
    if (requiresAuth && !user) {
      next('login')
    }else{
      next();
    }
    
  })

  return Router
}
