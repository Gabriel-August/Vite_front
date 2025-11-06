// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJkX_9KPdn-2KdxTqOO6kfK1cAA0KxeUI",
  authDomain: "muralboard-c568a.firebaseapp.com",
  projectId: "muralboard-c568a",
  storageBucket: "muralboard-c568a.firebasestorage.app",
  messagingSenderId: "91943478271",
  appId: "1:91943478271:web:f632d0cb0616e4b2bc7dca",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addRecado = async (recado) => {
  try {
    await addDoc(collection(db, "recados"), recado);
  } catch (e) {
    console.error("Erro ao adicionar recado: ", e);
  }
};

export const getRecados = (callback) => {
  const q = query(collection(db, "recados"), orderBy("data", "desc"));
  onSnapshot(q, callback);
};

export const deleteRecado = async (id) => {
  try {
    await deleteDoc(doc(db, "recados", id));
  } catch (e) {
    console.error("Erro ao excluir recado: ", e);
  }
};

export const updateRecado = async (id, novosDados) => {
  try {
    const ref = doc(db, "recados", id);
    await updateDoc(ref, novosDados);
  } catch (e) {
    console.error("Erro ao atualizar recado: ", e);
  }
};

export default db;
