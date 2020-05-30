
import {firebaseAuth, firebaseDb} from "boot/firebase";
export function registerUser ({},payload) {
    console.log("payload",payload)
    return new Promise((resolve, reject) =>{
        firebaseAuth.createUserWithEmailAndPassword(payload.email,payload.password)
        .then(response => {
            console.log(response)
            let userId = firebaseAuth.currentUser.uid;
            firebaseDb.ref('users/'+userId).set({
                name: payload.name,
                email:payload.email,
                online:true,

            })
            resolve();
            
        })
        .catch(error => {
            reject(error);
        })
    })
    
}

export function loginUser({},payload){
   return new Promise((resolve,reject) =>{
       firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
       .then(response => {
        //    console.log(response)
           resolve();
       })
       .catch(err => {
           console.log(err)
           reject(err)
       })
   })
}

export function logoutUser(){
    // return new Promise((resolve,reject)=>{
        firebaseAuth.signOut();
        this.$router.push("/login")
    // })
}

export function handleAuthStateChanged({commit}){
    firebaseAuth.onAuthStateChanged(user => {
        if(user){
            //user is logged in
            let userId = firebaseAuth.currentUser.uid;
            firebaseDb.ref('users/'+userId).once('value',snapshot =>{
                let userDetails =  snapshot.val();
                commit('setUserDetails',{
                    name: userDetails.name,
                    email: userDetails.email,
                    userId: userId
                })

            })
           
        }else{
            //user is logged out
            commit('setUserDetails',{})
            
        }
    })
}











export function toLogin(){
    this.$router.push('/login')
}
export function toHome(){
    this.$router.push('/')
}