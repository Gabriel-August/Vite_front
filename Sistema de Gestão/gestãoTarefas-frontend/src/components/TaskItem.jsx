export default function TaskItem({ tarefa, onToggle, onDelete }) {
  return (
    <li className={`task-item ${tarefa.status ? 'done' : ''}`}>
      <div className="task-info">
        <span className="task-title">{tarefa.titulo}</span>
        <span className="task-category">{tarefa.categoria}</span>
      </div>

      <div className="task-actions">
        <button
          className={tarefa.status ? 'undo' : 'done-btn'}
          onClick={() => onToggle(tarefa.id, !tarefa.status)}
        >
          {tarefa.status ? 'Desfazer' : 'Concluir'}
        </button>

        <button className="delete-btn" onClick={() => onDelete(tarefa.id)}>
          Excluir
        </button>
      </div>
    </li>
  );
}
