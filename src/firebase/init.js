import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDuvFpeO3mgC-Gnd181_626yHQIWIX-VTQ",
    authDomain: "helppaw-c6660.firebaseapp.com",
    databaseURL: "https://helppaw-c6660.firebaseio.com",
    projectId: "helppaw-c6660",
    storageBucket: "helppaw-c6660.appspot.com",
    messagingSenderId: "1062016003790",
    appId: "1:1062016003790:web:f9ae84b187d5d59d8aaa9f"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  export default firebaseApp.firestore()