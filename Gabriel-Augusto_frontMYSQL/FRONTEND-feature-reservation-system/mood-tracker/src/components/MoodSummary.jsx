function MoodSummary({ moods }) {
  const summary = moods.reduce((acc, current) => {
    acc[current.mood] = (acc[current.mood] || 0) + 1;
    return acc;
  }, {});

  const sortedSummary = Object.entries(summary).sort(([, a], [, b]) => b - a);

  if (moods.length === 0) {
    return null; // Não mostra nada se não houver registros
  }

  return (
    <div className="mood-summary">
      <h3>Resumo Geral</h3>
      <div className="summary-items">
        {sortedSummary.map(([mood, count]) => (
          <div key={mood} className="summary-item">
            <span className="summary-mood">{mood}:</span>
            <span className="summary-count">
              {count} {count > 1 ? "vezes" : "vez"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodSummary;
