'use client';
import { useState, useEffect } from "react";
import { Task } from '@/components/TaskList'; 
import UpcomingTaskItem from "./subcomponents/upcomingtasks/UpcomingTaskItem"; // Importamos el nuevo componente

interface UpcomingTasksProps {
  tasks: Task[];
  isDarkMode: boolean;
}

export default function UpcomingTasks({ tasks, isDarkMode }: UpcomingTasksProps) {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

  useEffect(() => {
    const next7Tasks = tasks.slice(0, 7);
    setUpcomingTasks(next7Tasks);
  }, [tasks]);

  return (
    <div className={`max-w-md p-4 shadow-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold mb-4">Próximas Tareas</h2>
      <ul className="rounded-md">
        {upcomingTasks.map((task) => (
          <UpcomingTaskItem key={task.id} task={task} isDarkMode={isDarkMode} />
        ))}
      </ul>
    </div>
  );
}
