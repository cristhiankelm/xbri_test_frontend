import api from './api';

interface DashboardData {
  total_sales: number;
  monthly_sales: number;
  total_products_in_stock: number;
  out_of_stock_products: number;
  recent_orders: { id: number; total_amount: number }[];
  top_sellers: { id: number; name: string; monthly_sales: number }[];
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await api.get<DashboardData>('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    throw error;
  }
};

export const fetchSalesDataForChart = async (): Promise<number[]> => {
  try {
    const response = await api.get<number[]>('/dashboard/sales-data');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do gráfico de vendas:', error);
    throw error;
  }
};