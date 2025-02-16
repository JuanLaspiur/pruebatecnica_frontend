import { Task } from "@/lib/task";
export const filterTasks = (
    tasks: Task[],
    filter: "all" | "active" | "completed",
    TASK_FILTERS: { ALL: string; ACTIVE: string; COMPLETED: string }
  ) => {
    return tasks.filter((task) => {
      if (filter === TASK_FILTERS.ACTIVE) return !task.completed;
      if (filter === TASK_FILTERS.COMPLETED) return task.completed;
      return true;
    });
  };
  
