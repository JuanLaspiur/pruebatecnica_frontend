import { motion } from "framer-motion";
import { Task } from "@/lib/task";
interface TaskItemProps {
  task: Task;
  toggleTask: (id: string) => void;
  isDarkMode: boolean;
}

const TaskItem = ({ task, toggleTask, isDarkMode }: TaskItemProps) => {
  return (
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
    </motion.li>
  );
};

export default TaskItem;