interface TaskItemProps {
    task: { id: number; text: string; completed: boolean };
    toggleTask: (id: number) => void;
    isDarkMode: boolean;
  }
  
  const TaskItem = ({ task, toggleTask }: TaskItemProps) => (
    // TO-DO usar
    <li
      key={task.id}
      className={`flex items-center px-4 py-2 border-b last:border-none ${task.completed ? "line-through text-gray-400" : ""}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="mr-3"
      />
      {task.text}
    </li>
  );
  
  export default TaskItem;
  