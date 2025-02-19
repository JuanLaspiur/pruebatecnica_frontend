import AnimatedButton from "@/components/buttons/tasklist/AnimatedButton";
import { useTranslations } from "next-intl";

interface TaskInputProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
  isDarkMode: boolean;
}

const TaskInput = ({
  newTask,
  setNewTask,
  addTask,
  isDarkMode
}: TaskInputProps) => {
   const t = useTranslations('TaskList-todoPage');
  return(
  <div className="flex mb-4">
    <input
      type="text"
      placeholder={t('newTask')}
      className={`flex-1 mr-3 p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-l text-sm lg:text-base`}
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
    />
    <AnimatedButton
      onClick={addTask}
      isDarkMode={isDarkMode}
    />
  </div>
);}

export default TaskInput;

