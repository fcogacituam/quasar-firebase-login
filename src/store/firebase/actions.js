
import {
    firebaseAuth, 
    firebaseDb,
    googleProvider, 
    facebookProvider,
    githubProvider,
    twitterProvider
} from "boot/firebase";

export function registerUser ({commit,dispatch},payload) {
    return new Promise((resolve, reject) =>{
        firebaseAuth.createUserWithEmailAndPassword(payload.email,payload.password)
        .then(async response => {
            let userId = firebaseAuth.currentUser.uid;
            let user = {
                id: userId,
                name: payload.name,
                email:payload.email,
                online:1,
            }
            await dispatch('users/saveUser',user,{root:true}).then(res =>{
                resolve();
            }).catch(err => {
                reject();
            })
            // firebaseDb.ref('users/'+userId).set({
            //     name: payload.name,
            //     email:payload.email,
            //     photo:payload.photoURL,
            //     online:true,

            // })
            
        })
        .catch(error => {
            reject(error);
        })
    })
    
}

export function loginUser({commit,dispatch},payload){
   return new Promise((resolve,reject) =>{
       firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
       .then(response => {
            let userId = firebaseAuth.currentUser.uid;
            dispatch('users/setOnline',userId,{root:true})
            resolve();
       })
       .catch(err => {
           console.log(err)
           reject(err)
       })
   })
}


export function loginWithSocialNetwork({commit,dispatch},payload){
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
        .then(async res =>{
            // var token = res.credential.accessToken;
            var user = res.user;
            let userId = user.uid;
            let new_user = {
                id: userId,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                online:1

            }
            await dispatch('users/saveUser',new_user,{root:true}).then( res => {
                resolve(res);
            }).catch(err => {
                reject(err)
            })
            // firebaseDb.ref('users/'+userId).set({
            //     name: user.displayName,
            //     email:user.email,
            //     photo:user.photoURL,
            // })
            
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

export async function logoutUser({commit,dispatch}){
    // return new Promise((resolve,reject)=>{
        let userId = firebaseAuth.currentUser.uid;
        await dispatch('users/setOffline',userId,{root:true})
        firebaseAuth.signOut();
        this.$router.push("/login")
    // })
}

export function handleAuthStateChanged({commit,dispatch}){
    // console.log("ME ACTIVEEE");
    firebaseAuth.onAuthStateChanged( user => {
        if(user){
            //user is logged in
            let userId = firebaseAuth.currentUser.uid;
            

            // firebaseDb.ref('users/'+userId).once('value',snapshot =>{
            //     let userDetails =  snapshot.val();
            //     commit('setUserDetails',{
            //         name: userDetails.name,
            //         email: userDetails.email,
            //         photo: userDetails.photo,
            //         userId: userId
            //     })

            // })
            
           
        }else{
            //user is logged out
            console.log("llegue al logout??")
            commit('setUserDetails',{})
            
        }
    })
}






