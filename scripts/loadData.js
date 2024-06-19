import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
const db = getFirestore(app);

// utilidades para obtener el nombre del direcctorio y subir el json a la base de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// funcion para leer el json
const loadJSON = (filePath) => {
  try {
    const absolutePath = path.join(__dirname, filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error(`Error reading JSON file from ${filePath}:`, err);
    return null;
  }
};

// funcion para subir el archivo
const loadSalesData = async () => {
    try {
        const data = loadJSON("../data/sales.json"); // direccion del json almacenado en la app

        if (!data) {
          console.error("No data found or failed to read JSON file");
          return;
        }

        // agrega los datos a Firestore
        for (const item of data) {
            await addDoc(collection(db, "sales"), item);
        }
        console.log("Data uploaded successfully!");
    } catch (error) {
        console.error("Error uploading data: ", error);
    }
};

// ejecuta la funcion 
loadSalesData();
