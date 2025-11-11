import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = 'http://localhost:5000/tarefas'; // backend virá depois

export default function App() {
  const [tarefas, setTarefas] = useState([]);

  // 🔹 Buscar tarefas no backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTarefas(data))
      .catch(err => console.error('Erro ao carregar tarefas:', err));
  }, []);

  // 🔹 Adicionar tarefa
  const addTarefa = (tarefa) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefa)
    })
      .then(res => res.json())
      .then(nova => setTarefas([...tarefas, nova]))
      .catch(err => console.error('Erro ao adicionar tarefa:', err));
  };

  // 🔹 Atualizar status (concluída / pendente)
  const toggleStatus = (id, status) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(() => {
        setTarefas(tarefas.map(t =>
          t.id === id ? { ...t, status } : t
        ));
      })
      .catch(err => console.error('Erro ao atualizar tarefa:', err));
  };

  // 🔹 Excluir tarefa
  const deleteTarefa = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setTarefas(tarefas.filter(t => t.id !== id)))
      .catch(err => console.error('Erro ao excluir tarefa:', err));
  };

  return (
    <div className="app-container">
      <h1>🌿 EcoTasks</h1>
      <TaskForm onAdd={addTarefa} />
      <TaskList
        tarefas={tarefas}
        onToggle={toggleStatus}
        onDelete={deleteTarefa}
      />
    </div>
  );
}
