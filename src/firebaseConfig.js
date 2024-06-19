// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqRDjKg6xJ3DgQ36hsNuh6SIrkBkdx6SM",
  authDomain: "desafio-andes.firebaseapp.com",
  projectId: "desafio-andes",
  storageBucket: "desafio-andes.appspot.com",
  messagingSenderId: "542316852358",
  appId: "1:542316852358:web:0ecc2c76c768de2a990d07",
  measurementId: "G-FMQC7L7DY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db= getFirestore(app);

export {db};