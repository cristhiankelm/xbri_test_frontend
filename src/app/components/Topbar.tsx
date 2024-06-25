'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token', { path: '/' });
    router.push('/login');
  };

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex justify-between items-center px-4">
      <Link href="/dashboard">
        <p className="text-xl font-bold">Xbri ecommerce</p>
      </Link>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}