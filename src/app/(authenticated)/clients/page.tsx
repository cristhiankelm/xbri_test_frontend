'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../services/api';

interface Client {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/clientes');
        setClients(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Tem certeza de que deseja excluir este cliente?');
    if (confirmed) {
      try {
        await api.delete(`/cliente/${id}`);
        setClients(clients.filter(client => client.id !== id));
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Clientes</h1>
      <Link href="/clients/new">
        <p className="inline-block bg-blue-500 text-white py-2 px-4 rounded mb-4">Adicionar Cliente</p>
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Nome</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Telefone</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {clients.map(client => (
              <tr key={client.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{client.name}</td>
                <td className="py-3 px-6">{client.email}</td>
                <td className="py-3 px-6">{client.phone_number}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center items-center">
                    <Link href={`/clients/${client.id}/edit`}>
                      <p className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">Editar</p>
                    </Link>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}