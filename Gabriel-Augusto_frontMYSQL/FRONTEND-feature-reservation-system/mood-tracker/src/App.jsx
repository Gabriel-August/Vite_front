import { useState, useEffect } from "react";
import MoodForm from "./components/MoodForm.jsx";
import MoodList from "./components/MoodList.jsx";
import MoodSummary from "./components/MoodSummary.jsx";
import "./App.css";

function App() {
  // Estado para armazenar a lista de humores
  const [moods, setMoods] = useState([]);
  // Estado para controlar qual humor está sendo editado
  const [editingMood, setEditingMood] = useState(null);

  // Efeito para carregar os humores do LocalStorage na primeira vez que o app abre
  useEffect(() => {
    const savedMoods = localStorage.getItem("moods");
    if (savedMoods) {
      setMoods(JSON.parse(savedMoods));
    }
  }, []);

  // Efeito para salvar os humores no LocalStorage sempre que a lista 'moods' mudar
  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  // Função para adicionar ou atualizar um humor
  const handleSaveMood = (moodEntry) => {
    if (moodEntry.id) {
      // Atualizar um humor existente
      setMoods(
        moods.map((mood) => (mood.id === moodEntry.id ? moodEntry : mood))
      );
    } else {
      // Adicionar um novo humor
      const newMood = {
        ...moodEntry,
        id: Date.now(),
        date: new Date().toISOString(),
      };
      setMoods([newMood, ...moods]);
    }
    setEditingMood(null); // Limpa o formulário de edição
  };

  // Função para deletar um humor
  const handleDeleteMood = (id) => {
    if (window.confirm("Tem certeza que deseja apagar este registro?")) {
      setMoods(moods.filter((mood) => mood.id !== id));
    }
  };

  // Função para definir qual humor será editado
  const handleEditMood = (mood) => {
    setEditingMood(mood);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Diário de Humor</h1>
      </header>
      <main>
        <MoodForm onSave={handleSaveMood} currentMood={editingMood} />
        <MoodSummary moods={moods} />
        <MoodList
          moods={moods}
          onDelete={handleDeleteMood}
          onEdit={handleEditMood}
        />
      </main>
      <footer>
        <p>Desenvolvido em equipe com React + Vite</p>
      </footer>
    </div>
  );
}

export default App;
