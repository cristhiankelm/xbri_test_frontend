import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="h-full w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Menu</h1>
      </div>
      <ul className="mt-6">
        <li className="p-4 hover:bg-gray-700">
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}