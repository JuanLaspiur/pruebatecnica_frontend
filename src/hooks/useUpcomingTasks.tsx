// hooks/useUpcomingTasks.ts
import { useState, useEffect } from "react";
import { Task } from "@/lib/task";
import { getStartAndEndOfWeek } from "@/utils/dateUtils";
import { getTextForKey } from "@/utils/textUtils";
import { UPCOMING_TASKS_TITLE } from "@/utils/constants/UpcomingTasksConstants";

export const useUpcomingTasks = (tasks: Task[], language: "en" | "es") => {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const { startDateFormatted, endDateFormatted, startOfWeekDate, endOfWeekDate } = getStartAndEndOfWeek(new Date());
  const getText = (key: keyof typeof UPCOMING_TASKS_TITLE["en"]) => getTextForKey(key, language);

  useEffect(() => {
    const upcomingThisWeek = tasks.filter(({ dueDate }) => {
      if (!dueDate) return false;

      const taskDueDate = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
      const isInWeek = taskDueDate >= startOfWeekDate && taskDueDate <= endOfWeekDate;

      return isInWeek;
    });

    setUpcomingTasks(upcomingThisWeek.slice(0, 5));
  }, [tasks]);

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
    getText,
  };
};
