'use client';
import { useEffect, useState, useCallback } from "react";
import { Header, Calendar, UpcomingTasks, Clock, Timer} from "@/components";
import { useAuth, useTheme } from "@/contexts";
import {Task, getAllMyTask } from "@/lib/task";
import { useLocale } from "next-intl";


export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  const locale = useLocale() as 'es' ||'en';
  const { user, token } = useAuth();
  const  [tasks, setTask] = useState<Task[]>([]);

 
const fetchAllTasks =  useCallback( async () => {
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
      }, [token]);
   
    
      useEffect(() => {
        fetchAllTasks();
      }, [token, fetchAllTasks]);  
    
  if(!user){
    return null
  }

  return (
    <div className={`min-h-screen pb-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Header isDarkMode={isDarkMode} user={user} /> 
     
      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/4 pb-4 px-2 lg:px-4"> 
         <Calendar  isDarkMode={isDarkMode}  token={token}/>
          <Timer isDarkMode={isDarkMode} language={locale}/>
        </aside>
        <main className="md:w-2/4 flex p-2 lg:p-4">
          {children}
        </main>
        <aside className="md:w-1/4  p-2 lg:p-4"> 
         <Clock isDarkMode={isDarkMode} />
          <div className="mt-2">
            <UpcomingTasks tasks={tasks} isDarkMode={isDarkMode} fetchAllTasks={fetchAllTasks}/>
          </div>
        
        </aside>
      </div> 
    </div>
  );
}
