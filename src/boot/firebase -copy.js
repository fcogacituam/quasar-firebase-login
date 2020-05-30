import * as firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
import "firebase/database";

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  let firebaseApp =firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth();
  let firebaseDb = firebaseApp.database();
//   let db = firebase.firestore();

  export {firebaseAuth,firebaseDb}