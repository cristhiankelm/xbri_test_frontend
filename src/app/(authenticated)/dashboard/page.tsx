'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Vendas (R$)',
        data: [5000, 7000, 8000, 6000, 9000, 10000, 11000, 13000, 12000, 14000, 15000, 16000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Resumo de Vendas</h2>
          <p>Total de Vendas: <span className="font-semibold">R$ 150.000</span></p>
          <p>Vendas no Mês: <span className="font-semibold">R$ 20.000</span></p>
          <p>Meta do Mês: <span className="font-semibold">R$ 25.000</span></p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Estoque de Produtos</h2>
          <p>Pneus em Estoque: <span className="font-semibold">1.200</span></p>
          <p>Produtos Esgotados: <span className="font-semibold">5</span></p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Pedidos Recentes</h2>
          <ul className="list-disc pl-5">
            <li>Pedido #12345 - <span className="font-semibold">R$ 1.500</span></li>
            <li>Pedido #12346 - <span className="font-semibold">R$ 2.000</span></li>
            <li>Pedido #12347 - <span className="font-semibold">R$ 3.200</span></li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Desempenho dos Vendedores</h2>
          <p>Vendedor Top: <span className="font-semibold">João - R$ 50.000</span></p>
          <p>Vendedor Médio: <span className="font-semibold">Maria - R$ 30.000</span></p>
          <p>Vendedor Iniciante: <span className="font-semibold">Pedro - R$ 10.000</span></p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-blue-600">Gráfico de Vendas Mensais</h2>
        <div className="flex-grow">
          <Bar data={salesData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}