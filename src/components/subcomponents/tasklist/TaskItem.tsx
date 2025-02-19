import { useState } from "react";
import { motion } from "framer-motion";
import { Task } from "@/lib/task";
import { FiTrash2 } from "react-icons/fi"; 
import { useLocale } from "next-intl";
import  ConfirmationModal  from "@/components/subcomponents/common/ConfirmationModal";

interface TaskItemProps {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void; 
  isDarkMode: boolean;
}

const TaskItem = ({ task, toggleTask, deleteTask, isDarkMode }: TaskItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const locale= useLocale() as string |'es' | 'en'
  const message = locale === 'es' ? "¿Estás seguro de que deseas eliminar esta tarea?": "Are you sure you want to delete this task?"
  const handleDelete = (id: string) => {
    setIsModalOpen(false); 
    deleteTask(id); 
  };

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          message={message}
          onConfirm={() => handleDelete(task._id)} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      <motion.li
        key={task._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`
          flex items-center p-4 rounded-lg cursor-pointer transition-all
          ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}
          ${task.completed ? `line-through text-gray-400 ${isDarkMode ? 'border border-blue-500' : ' border border-black-800'}` : ""}
          hover:scale-105 hover:${isDarkMode ? "bg-gray-600" : "bg-gray-200"}
        `}
        onClick={() => toggleTask(task._id)}
      >
        <motion.input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task._id)}
          className="mr-4 w-6 h-6 cursor-pointer accent-blue-500"
          whileTap={{ scale: 0.9 }}
        />
        <motion.span
          initial={false}
          animate={{
            color: task.completed ? "#9CA3AF" : isDarkMode ? "#FFF" : "#000",
            textDecoration: task.completed ? "line-through" : "none",
          }}
          transition={{ duration: 0.3 }}
          className="text-base"
        >
          {task.title}
        </motion.span>
        
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true); 
          }}
          className="ml-auto text-gray-400 hover:text-red-600 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiTrash2 className="w-5 h-5" />
        </motion.button>
      </motion.li>
    </>
  );
};

export default TaskItem;

