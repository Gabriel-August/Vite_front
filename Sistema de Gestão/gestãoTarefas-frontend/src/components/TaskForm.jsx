import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !categoria.trim()) {
      alert('Preencha todos os campos!');
      return;
    }
    onAdd({ titulo, categoria });
    setTitulo('');
    setCategoria('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da tarefa"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoria (ex: Reciclagem)"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
