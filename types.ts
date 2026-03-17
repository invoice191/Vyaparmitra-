
export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  ANALYST = 'Analyst',
  VIEWER = 'Viewer'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Metric {
  label: string;
  value: string | number;
  trend: number;
  prefix?: string;
  suffix?: string;
  description?: string;
}

export interface Transaction {
  id: string;
  customer: string;
  date: string;
  amount: number;
  method: 'Cash' | 'UPI' | 'Card' | 'Credit';
  status: 'Paid' | 'Pending' | 'Overdue';
  items: number;
}

export interface Invoice {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  items?: number;
  taxAmount?: number;
  imageUrl?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  stockValue: number;
  capacity: number;
}

export interface BusinessData {
  revenue: number;
  profit: number;
  transactions: number;
  aov: number;
  customers: number;
  newCustomers: number;
  inventoryValue: number;
  pendingReceivables: number;
  yesterdayRevenue: number;
  healthScore: number;
}

export interface BusinessInsightResponse {
  text: string;
  sources?: { uri: string; title: string }[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  profit: number;
  expenses: number;
  forecast: number;
}
