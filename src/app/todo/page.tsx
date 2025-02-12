'use client';

import { useState } from "react";
import { useLanguage } from '@/contexts/languageContext';
import { useTheme } from "@/contexts/themeContext";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTask, setNewTask] = useState("");
  const { language } = useLanguage();
  const { isDarkMode } = useTheme(); 

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const buttonText = language === 'es' ? 'AÑADIR' : 'ADD';
  const placeholderText = language === 'es' ? 'Nueva tarea...' : 'New task...';
  const filterText = (type: "all" | "active" | "completed") => {
    if (language === 'es') {
      switch (type) {
        case "all":
          return "Todas";
        case "active":
          return "Activas";
        case "completed":
          return "Completadas";
        default:
          return "";
      }
    } else {
      switch (type) {
        case "all":
          return "All";
        case "active":
          return "Active";
        case "completed":
          return "Completed";
        default:
          return "";
      }
    }
  };

  return (
    <div
      className={`max-w-md p-4 shadow-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
    >
      <div className="flex mb-4">
        <input
          type="text"
          placeholder={placeholderText}
          className={`flex-1 mr-3 p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-l`}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className={`px-4 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-r`}
        >
          {buttonText}
        </button>
      </div>

      <div className="flex space-x-4 mb-4 text-sm">
        {["all", "active", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as "all" | "active" | "completed")}
            className={`uppercase font-semibold ${filter === type ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
          >
            {filterText(type as "all" | "active" | "completed").toUpperCase()}
          </button>
        ))}
      </div>

      <ul className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-md`}>
        {filteredTasks.map((task) => (
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
        ))}
      </ul>
    </div>
  );
}


