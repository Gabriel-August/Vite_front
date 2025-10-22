import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import "./Crud.css"; 
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Crud.css"; // Importa o arquivo CSS

export default function Crud() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const itemsCollection = collection(db, "items");

  const fetchItems = async () => {
    try {
      const data = await getDocs(itemsCollection);
      setItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o refresh da página
    if (editingId) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
  };

  const handleAdd = async () => {
    if (input.trim() === "") return;
    await addDoc(itemsCollection, { name: input });
    setInput("");
    fetchItems();
  };

  const handleUpdate = async () => {
    if (input.trim() === "") return;
    const itemDoc = doc(db, "items", editingId);
    await updateDoc(itemDoc, { name: input });
    setInput("");
    setEditingId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    const itemDoc = doc(db, "items", id);
    await deleteDoc(itemDoc);
    fetchItems();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setInput(item.name || "")
  };

  return (
    <div className="crud-container">
      <h1>Mural de Recados</h1>

      <form className="crud-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={editingId ? "Editando item..." : "Digite um recado..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="crud-input"
        />
        {editingId ? (
          <button type="submit" className="crud-btn btn-update">
            Atualizar
          </button>
        ) : (
          <button type="submit" className="crud-btn btn-add">
            Adicionar
          </button>
        )}
      </form>

      <ul className="crud-list">
        {items.length === 0 ? (
          <li className="empty-message">Nenhum recado encontrado.</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="crud-item">
              <span className="item-name">{item.name}</span>
              <div className="item-actions">
                <button
                  onClick={() => startEdit(item)}
                  className="crud-btn btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="crud-btn btn-delete"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
