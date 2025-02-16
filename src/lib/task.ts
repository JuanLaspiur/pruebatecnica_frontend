import { fetchFromAPI } from './api';

export interface Task {
  _id?: string;           
  title: string;        
  description: string;  
  completed?: boolean;    
  status?: string;       
  user?: string;          
  createdAt?: Date;    
  updatedAt?: Date;   
  dueDate?: Date;        
  __v?: number;          
}


export const getAllMyTask = async (token: string): Promise<Task[] | null> => {
  try {
    const response = await fetchFromAPI('GET', '/tasks',undefined,token);
    if (!response) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const tasks: Task[] = response;
    return tasks;
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return null;
  }
};


export const createTask = async (token:string | null, title:string): Promise<Task | null> => {
  if(!token) {
    return null
  }
  try {
    const response = await fetchFromAPI('POST', '/tasks',{title}, token);
    if (!response) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const tasks: Task = response;
    return tasks;
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return null;
  }
};