'use client';
import { useState } from "react";
import { useLanguage } from '@/contexts/languageContext';
import { useTheme } from "@/contexts/themeContext";
import TaskInput from "./subcomponents/tasklist/TaskInput";
import TaskFilter from "./subcomponents/tasklist/TaskFilter";
import TaskItem from "./subcomponents/tasklist/TaskItem";
import { TASK_FILTERS, BUTTON_TEXT, PLACEHOLDER_TEXT, FILTER_TEXT } from '@/utils/constants/taskConstants';
import { filterTasks } from '@/utils/taskUtils';  
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskList() {
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

  const buttonText = language === 'es' ? BUTTON_TEXT.ES : BUTTON_TEXT.EN;
  const placeholderText = language === 'es' ? PLACEHOLDER_TEXT.ES : PLACEHOLDER_TEXT.EN;

  const filterText = (type: "all" | "active" | "completed") => {
    return language === 'es' 
      ? FILTER_TEXT.ES[type] 
      : FILTER_TEXT.EN[type];
  };

  const filteredTasks = filterTasks(tasks, filter, TASK_FILTERS);

  return (
    <div className={`w-[100%] p-4 shadow-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        buttonText={buttonText}
        placeholderText={placeholderText}
        isDarkMode={isDarkMode}
      />
      <TaskFilter filter={filter} setFilter={setFilter} filterText={filterText} />
      <ul className={` rounded-md space-y-1`}>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} toggleTask={toggleTask} isDarkMode={isDarkMode} />
        ))}
      </ul>
    </div>
  );
}
