"use client";

import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { Task } from "@/lib/task";
import { UPCOMING_TASKS_TITLE } from "@/utils/constants/UpcomingTasksConstants";

export const useUpcomingTasks = (tasks: Task[], language: "en" | "es") => {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");

  const startDate = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "dd/MM");
  const endDate = format(endOfWeek(new Date(), { weekStartsOn: 1 }), "dd/MM");

  const getText = (key: keyof typeof UPCOMING_TASKS_TITLE["en"]) => {
    return UPCOMING_TASKS_TITLE[language]?.[key] || UPCOMING_TASKS_TITLE.en[key];
  };

  useEffect(() => {
    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

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
    startDate,
    endDate,
    filterStatus,
    setFilterStatus,
    getText,
  };
};
