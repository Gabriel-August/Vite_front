

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// LINHA CORRETA
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL-7vtRK3JVg_CbRjIxymtZ6VGsve3tVE",
  authDomain: "meu-app1-9bd42.firebaseapp.com",
  projectId: "meu-app1-9bd42",
  storageBucket: "meu-app1-9bd42.firebasestorage.app",
  messagingSenderId: "904760516009",
  appId: "1:904760516009:web:eccaf2738f00cb2c8ef8b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
