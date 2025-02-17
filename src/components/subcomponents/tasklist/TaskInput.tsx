import AnimatedButton from "@/components/buttons/tasklist/AnimatedButton";

interface TaskInputProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
  buttonText: string;
  placeholderText: string;
  isDarkMode: boolean;
}

const TaskInput = ({
  newTask,
  setNewTask,
  addTask,
  buttonText,
  placeholderText,
  isDarkMode
}: TaskInputProps) => (
  <div className="flex mb-4">
    <input
      type="text"
      placeholder={placeholderText}
      className={`flex-1 mr-3 p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-l text-sm lg:text-base`}
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
    />
    <AnimatedButton
      onClick={addTask}
      buttonText={buttonText}
      isDarkMode={isDarkMode}
      className="text-sm lg:text-base"
    />
  </div>
);

export default TaskInput;

