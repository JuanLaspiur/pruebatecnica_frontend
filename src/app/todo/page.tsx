"use client";

import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTask, setNewTask] = useState("");

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

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New task..."
          className="flex-1 p-2 border border-gray-300 rounded-l"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          ADD
        </button>
      </div>

      <div className="flex space-x-4 mb-4 text-sm">
        {["all", "active", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as "all" | "active" | "completed")}
            className={`uppercase font-semibold ${
              filter === type ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <ul className="bg-gray-100 rounded-md">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center px-4 py-2 border-b last:border-none ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
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
