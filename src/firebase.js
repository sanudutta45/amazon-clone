import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQjx4--tWDxAqh7D90Jfxoc-OF6W5wBxM",
  authDomain: "clone-56a19.firebaseapp.com",
  projectId: "clone-56a19",
  storageBucket: "clone-56a19.appspot.com",
  messagingSenderId: "439725073264",
  appId: "1:439725073264:web:03c6dc5442053b383d25b5",
  measurementId: "G-J6GQGPF0WV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export const auth = firebase.auth();
