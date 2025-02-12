import { fetchFromAPI } from './api'; 

type LoginResponse = {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  token: string;
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetchFromAPI('POST', '/users/login', { email, password }) as LoginResponse;
    localStorage.setItem('token', response.token);
    return response as LoginResponse;  
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


type RegisterResponse = {
    name: string;
    email: string;
    password: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
      const response = await fetchFromAPI('POST', '/users', { name, email, password });
  
      return response as RegisterResponse;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };
