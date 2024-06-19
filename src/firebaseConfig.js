// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdfysuig7r5PSPhOqHoj6C6iBrFrF2EEU",
  authDomain: "desafio-tecnico-581b7.firebaseapp.com",
  projectId: "desafio-tecnico-581b7",
  storageBucket: "desafio-tecnico-581b7.appspot.com",
  messagingSenderId: "256787205278",
  appId: "1:256787205278:web:fa1839b4bf60cf0792ff8f",
  measurementId: "G-MYKB7D1SHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db= getFirestore(app);

export {db};