import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDhbpcr4ZKaCygd4eJw73fvBAUDWYJa83g",
    authDomain: "todo-project-418eb.firebaseapp.com",
    projectId: "todo-project-418eb",
    storageBucket: "todo-project-418eb.appspot.com",
    messagingSenderId: "522577888382",
    appId: "1:522577888382:web:4e5be20f745b849df9442f",
    measurementId: "G-4D2P2MVGB2"
  };

  //počáteční nastavení firebase (init)
  firebase.initializeApp(firebaseConfig)

  //počáteční nastavení služeb (services)
  const projectFirestore = firebase.firestore()

  export { projectFirestore }