import { useState, useEffect } from "react";

const MOOD_OPTIONS = [
  "Feliz",
  "Triste",
  "Estressado",
  "Animado",
  "Cansado",
  "Normal",
];

function MoodForm({ onSave, currentMood }) {
  const [mood, setMood] = useState(MOOD_OPTIONS[0]);
  const [description, setDescription] = useState("");

  // Efeito para preencher o formulário quando um humor é selecionado para edição
  useEffect(() => {
    if (currentMood) {
      setMood(currentMood.mood);
      setDescription(currentMood.description);
    } else {
      // Limpa o formulário se não houver edição em andamento
      setMood(MOOD_OPTIONS[0]);
      setDescription("");
    }
  }, [currentMood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: currentMood ? currentMood.id : null,
      mood,
      description,
      date: currentMood ? currentMood.date : new Date().toISOString(),
    });
    // Limpa o formulário após salvar
    setMood(MOOD_OPTIONS[0]);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mood-form">
      <h3>{currentMood ? "Editar Registro" : "Como você está hoje?"}</h3>
      <div className="form-group">
        <label htmlFor="mood-select">Selecione o humor:</label>
        <select
          id="mood-select"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          {MOOD_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição (opcional):</label>
        <input
          type="text"
          id="description"
          placeholder="Ex: Tive uma reunião produtiva."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">
        {currentMood ? "Atualizar" : "Salvar Humor"}
      </button>
    </form>
  );
}

export default MoodForm;
