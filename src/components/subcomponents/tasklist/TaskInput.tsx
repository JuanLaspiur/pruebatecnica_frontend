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
  );
  
  export default TaskInput;
  