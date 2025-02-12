"use client";

import { useAuth } from "@/contexts/authcontext";
import { FiLogOut } from "react-icons/fi"; 
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700"></h1>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}
