'use client';

import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../../services/dashboardService';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashboardData {
  total_sales: number;
  monthly_sales: number;
  total_products_in_stock: number;
  out_of_stock_products: number;
  recent_orders: { id: number; total_amount: number }[];
  top_sellers: { id: number; name: string; monthly_sales: number }[];
}

export default function Dashboard() {
  
  const [totalSales, setTotalSales] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);
  const [totalProductsInStock, setTotalProductsInStock] = useState<number>(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState<number>(0);
  const [recentOrders, setRecentOrders] = useState<{ id: number; total_amount: number }[]>([]);
  const [topSellers, setTopSellers] = useState<{ id: number; name: string; monthly_sales: number }[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data: DashboardData = await fetchDashboardData();
        setTotalSales(data.total_sales);
        setMonthlySales(data.monthly_sales);
        setTotalProductsInStock(data.total_products_in_stock);
        setOutOfStockProducts(data.out_of_stock_products);
        setRecentOrders(data.recent_orders);
        setTopSellers(data.top_sellers);
      } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error);
      }
    };

    getData();
  }, []);

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Vendas (USD)',
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
          <p>Total de Vendas: <span className="font-semibold">{totalSales.toLocaleString()}</span> USD</p>
          <p>Vendas no Mês: <span className="font-semibold">{monthlySales.toLocaleString()}</span> USD</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Estoque de Produtos</h2>
          <p>Pneus em Estoque: <span className="font-semibold">{totalProductsInStock}</span></p>
          <p>Produtos Esgotados: <span className="font-semibold">{outOfStockProducts}</span></p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Pedidos Recentes</h2>
          <ul className="list-disc pl-5">
            {recentOrders.map(order => (
              <li key={order.id}>
                Pedido #{order.id} - <span className="font-semibold">{order.total_amount.toLocaleString()}</span> USD
              </li> 
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Melhores vendedores no mês</h2>
          {topSellers.map(seller => (
            <p key={seller.id}>
              {seller.name} - <span className="font-semibold">{seller.monthly_sales.toLocaleString()}</span> USD
            </p>
          ))}
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