import { UPCOMING_TASKS_TITLE } from "@/utils/constants/UpcomingTasksConstants";

export const getTextForKey = (key: keyof typeof UPCOMING_TASKS_TITLE["en"], language: "en" | "es") => {
  return UPCOMING_TASKS_TITLE[language]?.[key] || UPCOMING_TASKS_TITLE.en[key];
};
