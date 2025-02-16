import { useState, useEffect } from "react";
import { isToday, parseISO } from "date-fns";

import TaskInput from "./subcomponents/tasklist/TaskInput";
import TaskFilter from "./subcomponents/tasklist/TaskFilter";
import TaskItem from "./subcomponents/tasklist/TaskItem";
import { TASK_FILTERS, BUTTON_TEXT, PLACEHOLDER_TEXT, FILTER_TEXT } from '@/utils/constants/taskConstants';
import { filterTasks } from '@/utils/taskUtils';  
import { getAllMyTask, createTask, deleteTask } from "@/lib/task";

import { Task } from "@/lib/task";

interface TaskListProps  {
  isDarkMode: boolean;
  language: string;
  token:  string | null  
}

export default function TaskList({ isDarkMode, language, token }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (token) {
        try {
          const result = await getAllMyTask(token);
          if (result) {
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

  const addTask = async () => {
    if (newTask.trim() === "") return;

    const result = await createTask(token, newTask);
    if (result) setTasks([...tasks, result]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => 
      task._id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTaskFromList = async (id: string) => {
    try {
      await deleteTask(token, id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const buttonText = language === 'es' ? BUTTON_TEXT.ES : BUTTON_TEXT.EN;
  const placeholderText = language === 'es' ? PLACEHOLDER_TEXT.ES : PLACEHOLDER_TEXT.EN;

  const filterText = (type: "all" | "active" | "completed") => {
    return language === 'es' 
      ? FILTER_TEXT.ES[type] 
      : FILTER_TEXT.EN[type];
  };

  const filteredTasks = filterTasks(tasks, filter, TASK_FILTERS).filter(task => 
    task.dueDate && isToday(parseISO(task.dueDate))
  );

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
              {language === 'es' ? "No hay tareas para hoy" : "No tasks for today"}
            </li>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem 
                key={task._id} 
                task={task} 
                toggleTask={toggleTask} 
                deleteTask={deleteTaskFromList} 
                isDarkMode={isDarkMode} 
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
