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
