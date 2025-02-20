import { useState, useEffect } from "react";
import { Task } from "@/lib/task";
import { getStartAndEndOfWeek } from "@/utils/dateUtils";

export const useUpcomingTasks = (tasks: Task[]) => {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const { startDateFormatted, endDateFormatted, startOfWeekDate, endOfWeekDate } = getStartAndEndOfWeek(new Date());

  useEffect(() => {
    const upcomingThisWeek = tasks.filter(({ dueDate }) => {
      if (!dueDate) return false;

      const taskDueDate = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
      const isInWeek = taskDueDate >= startOfWeekDate && taskDueDate <= endOfWeekDate;

      return isInWeek;
    });

    setUpcomingTasks(upcomingThisWeek.slice(0, 5));
  }, [tasks, startOfWeekDate, endOfWeekDate]);  

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
