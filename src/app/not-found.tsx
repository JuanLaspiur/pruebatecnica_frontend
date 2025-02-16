import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Página no encontrada</p>
      <Link href="/">
        <a className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Volver al inicio
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
