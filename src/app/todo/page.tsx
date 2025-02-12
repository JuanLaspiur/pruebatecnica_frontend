'use client';

import { useEffect, useState } from 'react';

const TodoPage = () => {
    type User ={
        _id: string;
        name: string;
        email: string;
        password: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      }
  const [user, setUser] = useState<User>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); 
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (!user) {
    return <div>No estás logueado. Inicia sesión.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Datos del Usuario</h1>
      <div className="space-y-4">
        <div>
          <strong>ID: </strong> {user._id}
        </div>
        <div>
          <strong>Nombre: </strong> {user.name}
        </div>
        <div>
          <strong>Email: </strong> {user.email}
        </div>
        <div>
          <strong>Fecha de creación: </strong> {new Date(user.createdAt).toLocaleString()}
        </div>
        <div>
          <strong>Fecha de actualización: </strong> {new Date(user.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
