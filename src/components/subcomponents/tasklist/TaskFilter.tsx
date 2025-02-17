interface TaskFilterProps {
  filter: "all" | "active" | "completed";
  setFilter: React.Dispatch<React.SetStateAction<"all" | "active" | "completed">>;
  filterText: (type: "all" | "active" | "completed") => string;
}

const TaskFilter = ({ filter, setFilter, filterText }: TaskFilterProps) => (
  <div className="flex space-x-4 mb-4 text-sm lg:text-base">
    {["all", "active", "completed"].map((type) => (
      <button
        key={type}
        onClick={() => setFilter(type as "all" | "active" | "completed")}
        className={`uppercase font-semibold relative overflow-hidden 
          ${filter === type 
            ? "text-blue-500" 
            : "text-gray-500"}`}
      >
        <span>{filterText(type as "all" | "active" | "completed").toUpperCase()}</span>
        <span
          className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 
            ${filter === type ? "transform scale-x-100 transition-transform duration-500" : "transform scale-x-0"}`}
        />
      </button>
    ))}
  </div>
);

export default TaskFilter;


