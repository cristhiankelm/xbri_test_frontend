import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="h-full w-64 bg-gray-800 text-white">
      <ul className="mt-6">
        <li className="hover:bg-gray-700">
          <Link href="/dashboard">
            <p className="block p-4">Dashboard</p>
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link href="/clients">
            <p className="block p-4">Clientes</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}