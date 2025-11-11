import TaskItem from './TaskItem';

export default function TaskList({ tarefas, onToggle, onDelete }) {
  if (tarefas.length === 0) {
    return <p className="no-tasks">Nenhuma tarefa cadastrada ainda 🌱</p>;
  }

  return (
    <ul className="task-list">
      {tarefas.map((tarefa) => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
