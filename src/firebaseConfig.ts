import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB8VYzI6buEde9bwYt9ltfesccjatwzJQk",
  authDomain: "kenin-organizator.firebaseapp.com",
  projectId: "kenin-organizator",
  storageBucket: "kenin-organizator.appspot.com",
  messagingSenderId: "787916874999",
  appId: "1:787916874999:web:7d62c5885e719aad6a1ff2",
  databaseURL:
    "https://kenin-organizator-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const database = getDatabase(app);
