'use client';
import { useEffect, useState } from "react";
import { Header, Calendar, UpcomingTasks, Clock, Timer} from "@/components";
import { useAuth,  useLanguage, useTheme } from "@/contexts";
import {Task, getAllMyTask } from "@/lib/task";
import { useRouter } from "next/navigation"; 


export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage() as { language: "es" | "en" };
  const { user, token } = useAuth();
  const  [tasks, setTask] = useState<Task[]>([]);
  const router = useRouter();
 
  // TO DO cambiar a ingles
  const cambiarIdioma = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    const path = window.location.pathname.split('/').slice(2).join('/'); 
    router.push(`/${newLanguage}/${path || 'todo'}`);
  };
 
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
   useEffect(() => {
      fetchAllTasks();
    }, [token]);

  if(!user){
    return null
  }

  return (
    <div className={`min-h-screen pb-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Header cambiarIdioma={cambiarIdioma} isDarkMode={isDarkMode} user={user} language={language}/> 
     
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
            <UpcomingTasks tasks={tasks} isDarkMode={isDarkMode} language={language} fetchAllTasks={fetchAllTasks}/>
          </div>
        
        </aside>
      </div> 
    </div>
  );
}
