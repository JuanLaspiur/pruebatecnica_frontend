'use client';
import { useState, useEffect } from "react";
import { useLanguage } from '@/contexts/languageContext';
import { useTheme } from "@/contexts/themeContext";
import TaskInput from "./subcomponents/tasklist/TaskInput";
import TaskFilter from "./subcomponents/tasklist/TaskFilter";
import TaskItem from "./subcomponents/tasklist/TaskItem";
import { TASK_FILTERS, BUTTON_TEXT, PLACEHOLDER_TEXT, FILTER_TEXT } from '@/utils/constants/taskConstants';
import { filterTasks } from '@/utils/taskUtils';  
import { getAllMyTask } from "@/lib/task";
import { useAuth } from "@/contexts/authcontext";

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  status: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTask, setNewTask] = useState("");
  
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { token } = useAuth();

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (token) {
        try {
          const result = await getAllMyTask(token);
          if (result !== null && result !== undefined) {
            setTasks(result);
          } else {
            console.error('No tasks found');
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      } else {
        console.error('Token no disponible');
      }
    };
  
    fetchAllTasks();
  }, [token]);
  

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = { 
      _id: Date.now().toString(),
      title: newTask, 
      description: "", 
      completed: false, 
      status: "pendiente", 
      user: "", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(),
      __v: 0
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => 
      task._id === id ? { ...task, completed: !task.completed } : task
    ));
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
    <div className={`w-full max-h-screen p-4 shadow-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        buttonText={buttonText}
        placeholderText={placeholderText}
        isDarkMode={isDarkMode}
      />
      <TaskFilter filter={filter} setFilter={setFilter} filterText={filterText} />
      <div className="max-h-[70vh] overflow-auto">
        <ul className="rounded-md space-y-1">
          {filteredTasks.length === 0 ? (
            <li className="text-center text-gray-500">
              {language === 'es' ? "No hay tareas" : "No tasks available"}
            </li>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem key={task._id} task={task} toggleTask={toggleTask} isDarkMode={isDarkMode} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}