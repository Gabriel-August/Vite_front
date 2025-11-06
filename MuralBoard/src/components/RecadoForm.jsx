// src/components/RecadoForm.jsx
import React, { useState } from 'react';
import { addRecado } from '../firebase';

const RecadoForm = () => {
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [categoria, setCategoria] = useState('Agradecimento');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo && mensagem) {
      const recado = {
        titulo,
        mensagem,
        categoria,
        data: new Date(),
      };
      addRecado(recado);
      setTitulo('');
      setMensagem('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <textarea
        placeholder="Mensagem"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        required
      />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="Agradecimento">Agradecimento</option>
        <option value="Aviso">Aviso</option>
        <option value="Sugestão">Sugestão</option>
      </select>
      <button type="submit">Enviar Recado</button>
    </form>
  );
};

export default RecadoForm;
