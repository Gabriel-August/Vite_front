// src/components/RecadoItem.jsx
import React, { useState } from "react";
import { deleteRecado, updateRecado } from "../firebase";

const RecadoItem = ({ recado }) => {
  const [editando, setEditando] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(recado.titulo);
  const [novaMensagem, setNovaMensagem] = useState(recado.mensagem);
  const [novaCategoria, setNovaCategoria] = useState(recado.categoria);

  const handleExcluir = () => {
    if (confirm("Tem certeza que deseja excluir este recado?")) {
      deleteRecado(recado.id);
    }
  };

  const handleSalvar = () => {
    updateRecado(recado.id, {
      titulo: novoTitulo,
      mensagem: novaMensagem,
      categoria: novaCategoria,
      data: new Date(),
    });
    setEditando(false);
  };

  return (
    <div className="recado-item">
      {editando ? (
        <div className="edit-form">
          <input
            type="text"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
          />
          <textarea
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
          />
          <select
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
          >
            <option value="Agradecimento">Agradecimento</option>
            <option value="Aviso">Aviso</option>
            <option value="Sugestão">Sugestão</option>
          </select>
          <div className="btns-editar">
            <button className="salvar" onClick={handleSalvar}>
              Salvar
            </button>
            <button className="cancelar" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>{recado.titulo}</h3>
          <p>{recado.mensagem}</p>
          <small>{recado.categoria}</small>
          <div className="acoes">
            <button className="editar" onClick={() => setEditando(true)}>
              ✏️ Editar
            </button>
            <button className="excluir" onClick={handleExcluir}>
              🗑️ Excluir
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecadoItem;
