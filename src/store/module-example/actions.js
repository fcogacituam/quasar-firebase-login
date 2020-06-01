
import {
    firebaseAuth, 
    firebaseDb,
    googleProvider, 
    facebookProvider,
    githubProvider,
    twitterProvider
} from "boot/firebase";



export function registerUser ({},payload) {
    return new Promise((resolve, reject) =>{
        firebaseAuth.createUserWithEmailAndPassword(payload.email,payload.password)
        .then(response => {
            let userId = firebaseAuth.currentUser.uid;
            firebaseDb.ref('users/'+userId).set({
                name: payload.name,
                email:payload.email,
                photo:payload.photoURL,
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


export function loginWithSocialNetwork({},payload){
    return new Promise((resolve,reject) => {
        let provider;
        switch (payload) {
            case 'google':
                provider = googleProvider;
                break;
            case 'facebook':
                provider= facebookProvider;
                break;
            case 'github':
                provider = githubProvider;
                break;
            case 'twitter':
                provider = twitterProvider;
            // default:
            //     reject("Invalid Provider")
            //     break;
        }
        firebaseAuth.signInWithPopup(provider)
        .then(res =>{
            // var token = res.credential.accessToken;
            var user = res.user;
            let userId = user.uid;
            firebaseDb.ref('users/'+userId).set({
                name: user.displayName,
                email:user.email,
                photo:user.photoURL,
            })
            resolve(res);
        })
        .catch(err => {
            // console.log(err)
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            reject(err);
        })
    });
    

}

export function logoutUser(){
    // return new Promise((resolve,reject)=>{
        firebaseAuth.signOut();
        this.$router.push("/login")
    // })
}

export function handleAuthStateChanged({commit}){
    // console.log("ME ACTIVEEE");
    firebaseAuth.onAuthStateChanged(user => {
        if(user){
            //user is logged in
            let userId = firebaseAuth.currentUser.uid;
            firebaseDb.ref('users/'+userId).once('value',snapshot =>{
                let userDetails =  snapshot.val();
                commit('setUserDetails',{
                    name: userDetails.name,
                    email: userDetails.email,
                    photo: userDetails.photo,
                    userId: userId
                })

            })
           
        }else{
            //user is logged out
            commit('setUserDetails',{})
            
        }
    })
}






