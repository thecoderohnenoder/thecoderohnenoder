import firebase from "firebase/app"


const firebaseConfig = {
    apiKey: "AIzaSyC0a_sOg4gdb8HffaN7CnC-XKvYE_R4g_A",
    authDomain: "der-kasseler.firebaseapp.com",
    databaseURL: "https://der-kasseler.firebaseio.com",
    projectId: "der-kasseler",
    storageBucket: "der-kasseler.appspot.com",
    messagingSenderId: "500494128709",
    appId: "1:500494128709:web:efba3807ded8329521752c"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)