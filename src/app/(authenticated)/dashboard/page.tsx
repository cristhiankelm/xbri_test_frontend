'use client';

import { useState, useEffect } from 'react';
import { fetchDashboardData, fetchSalesDataForChart } from '../../services/dashboardService';
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
  const [salesData, setSalesData] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const getData = async () => {
      try {
        const dashboardData: DashboardData = await fetchDashboardData();
        setTotalSales(dashboardData.total_sales);
        setMonthlySales(dashboardData.monthly_sales);
        setTotalProductsInStock(dashboardData.total_products_in_stock);
        setOutOfStockProducts(dashboardData.out_of_stock_products);
        setRecentOrders(dashboardData.recent_orders);
        setTopSellers(dashboardData.top_sellers);

        const chartData: number[] = await fetchSalesDataForChart();
        setSalesData(chartData);
      } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error);
      }
    };

    getData();
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Vendas (USD)',
        data: salesData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col p-4">
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
          <h2 className="text-xl font-bold mb-2 text-blue-600">Melhores Vendedores no Mês</h2>
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
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}