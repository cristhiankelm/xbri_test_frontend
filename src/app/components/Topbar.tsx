'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token', { path: '/' });
    router.push('/login');
  };

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex justify-between items-center px-4">
      <h1 className="text-xl font-bold">Meu App</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}