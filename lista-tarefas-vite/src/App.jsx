import React, { useState, useMemo } from 'react';


export default function App() {
  // --- ESTADOS DO COMPONENTE ---
  const [tarefa, setTarefa] = useState('');
  const [lista, setLista] = useState([
    // Adicionando alguns dados iniciais para exemplo
    { id: 1, texto: 'Aprender React', concluida: true },
    { id: 2, texto: 'Adicionar filtros', concluida: false },
    { id: 3, texto: 'Tomar um café', concluida: false },
  ]);
  const [filtro, setFiltro] = useState('todas'); 

  const [editingId, setEditingId] = useState(null); 
  const [editingText, setEditingText] = useState('');

  // --- LÓGICA DE FILTRAGEM ---
  // A lista de tarefas é filtrada com base no estado 'filtro'
  const tarefasFiltradas = useMemo(() => {
    return lista.filter(item => {
      if (filtro === 'concluidas') return item.concluida;
      if (filtro === 'pendentes') return !item.concluida;
      return true; // para 'todas'
    });
  }, [lista, filtro]);


  // --- LÓGICA DO CONTADOR ---
  // O contador agora se baseia na lista original, não na filtrada
  const totalTarefas = lista.length;
  const tarefasConcluidas = lista.filter(item => item.concluida).length;


  // --- FUNÇÕES DE MANIPULAÇÃO DAS TAREFAS ---
  function adicionarTarefa() {
    if (tarefa.trim() === '') return;
    // Adiciona um ID único para cada nova tarefa
    const novaTarefa = { id: Date.now(), texto: tarefa, concluida: false };
    setLista([...lista, novaTarefa]);
    setTarefa('');
  }

  // As funções agora usam o ID para encontrar a tarefa correta
  function alternarConclusao(id) {
    const novaLista = lista.map(item =>
      item.id === id ? { ...item, concluida: !item.concluida } : item
    );
    setLista(novaLista);
  }

  function removerTarefa(id) {
    setLista(lista.filter(item => item.id !== id));
  }

  function iniciarEdicao(id, textoAtual) {
    setEditingId(id);
    setEditingText(textoAtual);
  }

  function salvarEdicao(id) {
    if (editingText.trim() === '') {
      removerTarefa(id); // Se o texto estiver vazio, remove a tarefa
      setEditingId(null);
      return;
    }
    const novaLista = lista.map(item =>
      item.id === id ? { ...item, texto: editingText } : item
    );
    setLista(novaLista);
    setEditingId(null);
    setEditingText('');
  }


  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <div className="input-area">
        <input
          type="text"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Digite uma tarefa..."
          onKeyDown={(e) => e.key === 'Enter' && adicionarTarefa()}
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      {/* --- SEÇÃO DO CONTADOR DE TAREFAS --- */}
      <div className="contador-tarefas">
        <p>Total de tarefas: <strong>{totalTarefas}</strong></p>
        <p>Concluídas: <strong>{tarefasConcluidas} de {totalTarefas}</strong></p>
      </div>

      {/* --- BOTÕES DE FILTRO --- */}
      <div className="filtros">
        <button
          onClick={() => setFiltro('todas')}
          className={filtro === 'todas' ? 'ativo' : ''}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltro('pendentes')}
          className={filtro === 'pendentes' ? 'ativo' : ''}
        >
          Pendentes
        </button>
        <button
          onClick={() => setFiltro('concluidas')}
          className={filtro === 'concluidas' ? 'ativo' : ''}
        >
          Concluídas
        </button>
      </div>

      {/* A lista agora mapeia as 'tarefasFiltradas' */}
      <ul>
        {tarefasFiltradas.map(item => (
          <li key={item.id} className={item.concluida ? 'concluida' : ''}>
            {editingId === item.id ? (
              // MODO DE EDIÇÃO
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && salvarEdicao(item.id)}
                  onBlur={() => salvarEdicao(item.id)}
                  autoFocus
                />
                <div className="botoes">
                  <button onClick={() => salvarEdicao(item.id)}>Salvar</button>
                </div>
              </>
            ) : (
              // MODO DE VISUALIZAÇÃO
              <>
                <span
                  onClick={() => alternarConclusao(item.id)}
                  onDoubleClick={() => iniciarEdicao(item.id, item.texto)}
                >
                  {item.texto}
                </span>
                <div className="botoes">
                  <button onClick={() => iniciarEdicao(item.id, item.texto)}>Editar</button>
                  <button onClick={() => removerTarefa(item.id)}>Remover</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {/* Estilos para os novos botões - adicione ao seu App.css */}
      <style>{`
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #f4f7fc;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            margin: 0;
            padding-top: 40px;
        }

        .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
        }

        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 20px;
        }

        .input-area {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .input-area input {
            flex-grow: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
        }

        .input-area button {
            padding: 0 20px;
            border: none;
            background-color: #3498db;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }

        .input-area button:hover {
            background-color: #2980b9;
        }

        .contador-tarefas, .filtros {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
            padding: 10px;
            background-color: #ecf0f1;
            border-radius: 8px;
        }

        .contador-tarefas p {
            margin: 0;
            font-size: 14px;
        }

        .filtros button {
            padding: 8px 16px;
            border: 1px solid #bdc3c7;
            border-radius: 6px;
            background-color: white;
            cursor: pointer;
            transition: all 0.3s;
        }

        .filtros button:hover {
            background-color: #ecf0f1;
        }

        .filtros button.ativo {
            background-color: #3498db;
            color: white;
            border-color: #3498db;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #ecf0f1;
            transition: background-color 0.3s;
        }
        
        li:last-child {
            border-bottom: none;
        }

        li span {
            flex-grow: 1;
            cursor: pointer;
            user-select: none; /* Impede a seleção de texto ao clicar */
        }

        li.concluida span {
            text-decoration: line-through;
            color: #95a5a6;
        }
        
        li input[type="text"] {
            flex-grow: 1;
            padding: 8px;
            border: 1px solid #3498db;
            border-radius: 6px;
            font-size: 16px;
        }

        .botoes {
            display: flex;
            gap: 8px;
        }

        .botoes button {
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            background-color: #e0e0e0;
            font-size: 12px;
        }
        
        .botoes button:first-of-type {
           background-color: #2ecc71; /* Verde para Editar/Salvar */
           color: white;
        }
        
        .botoes button:last-of-type {
           background-color: #e74c3c; /* Vermelho para Remover */
           color: white;
        }
      `}</style>
    </div>
  );
}
