// Mapeamento de humor para cores e ícones para visualização
const moodVisuals = {
  Feliz: { icon: "😄", color: "#4CAF50" },
  Triste: { icon: "😢", color: "#2196F3" },
  Estressado: { icon: "😠", color: "#F44336" },
  Animado: { icon: "🎉", color: "#FFC107" },
  Cansado: { icon: "😴", color: "#607D8B" },
  Normal: { icon: "😐", color: "#9E9E9E" },
};

function MoodList({ moods, onDelete, onEdit }) {
  if (moods.length === 0) {
    return (
      <p className="empty-message">
        Nenhum humor registrado ainda. Comece adicionando um!
      </p>
    );
  }

  return (
    <div className="mood-list">
      <h3>Histórico de Humor</h3>
      <ul>
        {moods.map((mood) => (
          <li
            key={mood.id}
            style={{
              borderLeft: `5px solid ${
                moodVisuals[mood.mood]?.color || "#ccc"
              }`,
            }}
          >
            <div className="mood-item-header">
              <span className="mood-icon">
                {moodVisuals[mood.mood]?.icon || "❓"} {mood.mood}
              </span>
              <span className="mood-date">
                {new Date(mood.date).toLocaleDateString("pt-BR")} -{" "}
                {new Date(mood.date).toLocaleTimeString("pt-BR")}
              </span>
            </div>
            <p className="mood-description">
              {mood.description || "Nenhuma descrição."}
            </p>
            <div className="mood-actions">
              <button onClick={() => onEdit(mood)} className="edit-btn">
                Editar
              </button>
              <button onClick={() => onDelete(mood.id)} className="delete-btn">
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodList;
