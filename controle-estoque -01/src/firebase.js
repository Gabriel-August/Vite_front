// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCAiR6pGvQzhUBr6p8HeYMjXWhbSNYHVU",
  authDomain: "estoque-f994f.firebaseapp.com",
  projectId: "estoque-f994f",
  storageBucket: "estoque-f994f.firebasestorage.app",
  messagingSenderId: "332192093531",
  appId: "1:332192093531:web:acf0a9194a3c73bb72f67e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);