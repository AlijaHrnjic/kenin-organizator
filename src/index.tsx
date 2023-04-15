import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB8VYzI6buEde9bwYt9ltfesccjatwzJQk",
    authDomain: "kenin-organizator.firebaseapp.com",
    projectId: "kenin-organizator",
    storageBucket: "kenin-organizator.appspot.com",
    messagingSenderId: "787916874999",
    appId: "1:787916874999:web:7d62c5885e719aad6a1ff2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
