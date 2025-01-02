// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfqyjFSnzDMI4SdKxy--OEcqsjv795d5Y",
  authDomain: "todolist-f981b.firebaseapp.com",
  databaseURL: "https://todolist-f981b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-f981b",
  storageBucket: "todolist-f981b.appspot.com",
  messagingSenderId: "939110213913",
  appId: "1:939110213913:web:071a457d81ef3e1fdc7d88",
  measurementId: "G-JE7G9NTR98",
};

// Инициализация приложения
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
