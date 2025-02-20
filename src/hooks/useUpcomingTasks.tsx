import { useState, useEffect, useMemo } from "react";
import { Task } from "@/lib/task";
import { getStartAndEndOfWeek } from "@/utils/dateUtils";

export const useUpcomingTasks = (tasks: Task[]) => {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");

  // Memoriza las fechas para que no cambien en cada render
  const { startDateFormatted, endDateFormatted, startOfWeekDate, endOfWeekDate } = useMemo(
    () => getStartAndEndOfWeek(new Date()),
    []
  );

  useEffect(() => {
    const upcomingThisWeek = tasks.filter(({ dueDate }) => {
      if (!dueDate) return false;
      const taskDueDate = new Date(dueDate);
      return taskDueDate >= startOfWeekDate && taskDueDate <= endOfWeekDate;
    });

    setUpcomingTasks(upcomingThisWeek.slice(0, 5));
  }, [tasks, endOfWeekDate, startOfWeekDate]); 

  const filteredTasks = upcomingTasks.filter((task) => {
    switch (filterStatus) {
      case "completed":
        return task.completed;
      case "pending":
        return !task.completed;
      default:
        return true;
    }
  });

  return {
    filteredTasks,
    startDate: startDateFormatted,
    endDate: endDateFormatted,
    filterStatus,
    setFilterStatus,
  };
};

