interface TaskFilterProps {
    filter: "all" | "active" | "completed";
    setFilter: React.Dispatch<React.SetStateAction<"all" | "active" | "completed">>;
    filterText: (type: "all" | "active" | "completed") => string;
  }
  
  const TaskFilter = ({ filter, setFilter, filterText }: TaskFilterProps) => (
    <div className="flex space-x-4 mb-4 text-sm">
      {["all", "active", "completed"].map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type as "all" | "active" | "completed")}
          className={`uppercase font-semibold ${filter === type ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
        >
          {filterText(type as "all" | "active" | "completed").toUpperCase()}
        </button>
      ))}
    </div>
  );
  
  export default TaskFilter;
  