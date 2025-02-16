import { fetchFromAPI } from './api';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  status: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getAllMyTask = async (token: string): Promise<Task[] | null> => {
  try {
    const response = await fetchFromAPI('GET', '/tasks',undefined,token);
    if (!response) {
      throw new Error(`Error en la solicitud: ${response.status}`);
      // TO-DO verificar errores
    }
    const tasks: Task[] = response;
    return tasks;
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return null;
  }
};
