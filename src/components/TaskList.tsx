import { useState, useEffect } from "react";
import { isToday, parseISO } from "date-fns";
import {TaskItem,TaskFilter, TaskInput  } from "./subcomponents";
import { TASK_FILTERS} from '@/utils/constants/taskConstants';
import { filterTasks } from '@/utils/taskUtils';  
import { getAllMyTask, createTask, deleteTask, updateTask } from "@/lib/task";

import { Task } from "@/lib/task";
import { useTranslations } from "next-intl";

interface TaskListProps  {
  isDarkMode: boolean;
  token:  string | null  
}

export default function TaskList({ isDarkMode, token }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTask, setNewTask] = useState("");


  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!token) 
        return 
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
     
    };

    fetchAllTasks();
  }, [token]);

  const addTask = async () => {
    if (newTask.trim() === "") return;

    const result = await createTask(token, newTask);
    if (result) setTasks([...tasks, result]);
    setNewTask("");
  };

  const toggleTask = async (id: string) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === id);
      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
  
        const result = await updateTask(token, id,updatedTask);
  
        if (result) {
          setTasks(tasks.map((task) => 
            task._id === id ? { ...task, completed: updatedTask.completed } : task
          ));
        } else {
          console.error('Error updating task');
        }
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };
  

  const deleteTaskFromList = async (id: string) => {
    try {
      await deleteTask(token, id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const filteredTasks = filterTasks(tasks, filter, TASK_FILTERS).filter(task => 
    task.dueDate && isToday(parseISO(task.dueDate))
  );
  const t = useTranslations('TaskList-todoPage');
  return (
    <div className={`w-full max-h-screen p-4 shadow-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        isDarkMode={isDarkMode}
      />
      <TaskFilter filter={filter} setFilter={setFilter}  />
      <div className="max-h-[70vh] overflow-auto">
        <ul className="rounded-md space-y-1">
          {filteredTasks.length === 0 ? (
            <li className="text-center text-gray-500">
              {t('anyTask')}
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
