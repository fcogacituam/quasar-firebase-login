import * as firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyAsCtob8dpDNSn-duPAov-GEyfYcPfMKZM",
    authDomain: "scrum-6919e.firebaseapp.com",
    databaseURL: "https://scrum-6919e.firebaseio.com",
    projectId: "scrum-6919e",
    storageBucket: "scrum-6919e.appspot.com",
    messagingSenderId: "220112386529",
    appId: "1:220112386529:web:b54323b67539df85f5faa0"
  };
  // Initialize Firebase
  let firebaseApp =firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth();
  let firebaseDb = firebaseApp.database();
//   let db = firebase.firestore();

  export {firebaseAuth,firebaseDb}