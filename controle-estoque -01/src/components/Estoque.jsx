import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from
"firebase/firestore";
export default function Estoque() {
const [produtos, setProdutos] = useState([]);
const [nome, setNome] = useState("");
const [quantidade, setQuantidade] = useState("");
const produtosCollectionRef = collection(db, "produtos");
useEffect(() => {
const getProdutos = async () => {
const data = await getDocs(produtosCollectionRef);
setProdutos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
};
getProdutos();
}, []);
const addProduto = async () => {
if(nome && quantidade){
await addDoc(produtosCollectionRef, { nome, quantidade: Number(quantidade) });
setNome("");
setQuantidade("");
const data = await getDocs(produtosCollectionRef);
setProdutos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
} else {
alert("Preencha todos os campos");
}
};
const updateProduto = async (id) => {
const novaQtd = prompt("Digite a nova quantidade:");
if(novaQtd){
const produtoDoc = doc(db, "produtos", id);
await updateDoc(produtoDoc, { quantidade: Number(novaQtd) });
const data = await getDocs(produtosCollectionRef);
setProdutos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
}
};
const deleteProduto = async (id) => {
const produtoDoc = doc(db, "produtos", id);

await deleteDoc(produtoDoc);
const data = await getDocs(produtosCollectionRef);
setProdutos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
};
return (
<div>
<h1>Controle de Estoque</h1>
<input placeholder="Nome do produto" value={nome} onChange={(e) =>
setNome(e.target.value)} />
<input placeholder="Quantidade" type="number" value={quantidade}
onChange={(e) => setQuantidade(e.target.value)} />
<button onClick={addProduto}>Adicionar</button>
<ul>
{produtos.map(prod => (
<li key={prod.id}>
{prod.nome} - {prod.quantidade}
<button onClick={() => updateProduto(prod.id)}>Atualizar</button>
<button onClick={() => deleteProduto(prod.id)}>Deletar</button>
</li>
))}
</ul>
</div>
);
}