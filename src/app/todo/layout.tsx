'use client';

import Header from "@/components/Header";
import Calendar from "@/components/Calendar";
import UpcomingTasks from "@/components/UpcomingTasks";
import Clock from "@/components/Clock";
import { useTheme } from "@/contexts/themeContext";
import { useAuth } from "@/contexts/authcontext";
import { useLanguage } from '@/contexts/languageContext';
import { Task } from "@/lib/task";
import { useEffect, useState } from "react";
import Timer from "@/components/Timer";
import { getAllMyTask } from "@/lib/task";


export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage() as { language: "es" | "en" };
  const { user, token, logout } = useAuth();
  const  [tasks, setTask] = useState<Task[]>([]);

  useEffect(() => {
    if (!user || !token) {
      logout();
    }
  }, []); 

   useEffect(() => {
      const fetchAllTasks = async () => {
        if (token) {
          try {
            const result = await getAllMyTask(token);
            if (result !== null && result !== undefined) {
              setTask(result);
            } else {
              console.error('No tasks found');
            }
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        } else {
          console.error('Token no disponible');
        }
      };
    
      fetchAllTasks();
    }, [token]);

  if(!user){
    return null
  }

  return (
    <div className={`min-h-screen pb-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Header isDarkMode={isDarkMode} user={user} language={language}/> 
     
      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/4 pb-4 px-2 lg:px-4"> 
         <Calendar  isDarkMode={isDarkMode} language={language} token={token}/>
          <Timer isDarkMode={isDarkMode} language={language}/>
        </aside>
        <main className="md:w-2/4 flex p-2 lg:p-4">
          {children}
        </main>
        <aside className="md:w-1/4  p-2 lg:p-4"> 
         <Clock isDarkMode={isDarkMode} />
          <div className="mt-2">
            <UpcomingTasks tasks={tasks} isDarkMode={isDarkMode} language={language}/>
          </div>
        
        </aside>
      </div> 
    </div>
  );
}
