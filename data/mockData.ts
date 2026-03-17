
import { ChartDataPoint, BusinessData, Transaction, Warehouse, Invoice } from '../types';

export const generateRevenueTrend = (): ChartDataPoint[] => [
  { name: 'Jan', value: 45000, profit: 12000, expenses: 33000, forecast: 0 },
  { name: 'Feb', value: 52000, profit: 15000, expenses: 37000, forecast: 0 },
  { name: 'Mar', value: 48000, profit: 13500, expenses: 34500, forecast: 0 },
  { name: 'Apr', value: 61000, profit: 19000, expenses: 42000, forecast: 0 },
  { name: 'May', value: 55000, profit: 16500, expenses: 38500, forecast: 0 },
  { name: 'Jun', value: 67000, profit: 21000, expenses: 46000, forecast: 0 },
  { name: 'Jul', value: 72000, profit: 24000, expenses: 48000, forecast: 0 },
  { name: 'Aug', value: 69000, profit: 22500, expenses: 46500, forecast: 0 },
  { name: 'Sep', value: 75000, profit: 26000, expenses: 49000, forecast: 0 },
  { name: 'Oct', value: 82000, profit: 29000, expenses: 53000, forecast: 0 },
  { name: 'Nov', value: 95000, profit: 35000, expenses: 60000, forecast: 110000 },
  { name: 'Dec', value: 120000, profit: 45000, expenses: 75000, forecast: 145000 },
];

export const categorySales = [
  { name: 'Electronics', value: 450000, color: '#3b82f6' },
  { name: 'Apparel', value: 320000, color: '#10b981' },
  { name: 'Home & Kitchen', value: 210000, color: '#f59e0b' },
  { name: 'Beauty', value: 140000, color: '#ef4444' },
  { name: 'Books', value: 85000, color: '#8b5cf6' },
];

export const topProducts = [
  { name: 'Pro Wireless Headphones', revenue: 152000, units: 1200, trend: 12, margin: 35, category: 'Electronics', velocity: 'High' },
  { name: 'Cotton Crew Neck Tee', revenue: 124000, units: 8500, trend: -5, margin: 22, category: 'Apparel', velocity: 'Very High' },
  { name: 'Ergonomic Desk Chair', revenue: 98000, units: 450, trend: 24, margin: 40, category: 'Home', velocity: 'Medium' },
  { name: 'Smart Fitness Tracker', revenue: 85000, units: 1100, trend: 8, margin: 28, category: 'Electronics', velocity: 'High' },
  { name: 'Stainless Steel Water Bottle', revenue: 72000, units: 3400, trend: 15, margin: 45, category: 'Home', velocity: 'High' },
];

export const initialInvoices: Invoice[] = [
  { id: 'INV-2025-001', customerName: 'Rahul Sharma', date: '2025-05-10', amount: 12450, status: 'Paid', items: 3, taxAmount: 2241 },
  { id: 'INV-2025-002', customerName: 'Priya Verma', date: '2025-05-12', amount: 890, status: 'Paid', items: 1, taxAmount: 160 },
  { id: 'INV-2025-003', customerName: 'Anita Gupta', date: '2025-05-14', amount: 4500, status: 'Unpaid', items: 2, taxAmount: 810 },
  { id: 'INV-2025-004', customerName: 'Vikram Singh', date: '2025-05-15', amount: 22100, status: 'Unpaid', items: 5, taxAmount: 3978 },
  { id: 'INV-2025-005', customerName: 'Suresh Kumar', date: '2025-05-16', amount: 1500, status: 'Overdue', items: 1, taxAmount: 270 },
];

export const recentTransactions: Transaction[] = [
  { id: 'ORD-8821', customer: 'Rahul Sharma', date: '2025-05-12 14:30', amount: 12450, method: 'UPI', status: 'Paid', items: 3 },
  { id: 'ORD-8820', customer: 'Priya Verma', date: '2025-05-12 12:15', amount: 890, method: 'Cash', status: 'Paid', items: 1 },
  { id: 'ORD-8819', customer: 'Anita Gupta', date: '2025-05-12 11:05', amount: 4500, method: 'Card', status: 'Pending', items: 2 },
  { id: 'ORD-8818', customer: 'Vikram Singh', date: '2025-05-11 18:45', amount: 22100, method: 'UPI', status: 'Paid', items: 5 },
  { id: 'ORD-8817', customer: 'Suresh Kumar', date: '2025-05-11 16:20', amount: 1500, method: 'Cash', status: 'Overdue', items: 1 },
  { id: 'ORD-8816', customer: 'Sneha Patel', date: '2025-05-11 14:10', amount: 6780, method: 'Card', status: 'Paid', items: 3 },
];

export const warehouseStock: Warehouse[] = [
  { id: 'WH-01', name: 'Bengaluru Main', location: 'Whitefield', stockValue: 850000, capacity: 92 },
  { id: 'WH-02', name: 'Mumbai Hub', location: 'Andheri', stockValue: 420000, capacity: 65 },
  { id: 'WH-03', name: 'Delhi Express', location: 'Okhla', stockValue: 180000, capacity: 40 },
];

export const currentBusinessState: BusinessData = {
  revenue: 852400,
  profit: 243500,
  transactions: 1420,
  aov: 600.02,
  customers: 4500,
  newCustomers: 320,
  inventoryValue: 1250000,
  pendingReceivables: 184500,
  yesterdayRevenue: 24500,
  healthScore: 84
};

export const customerSegments = [
  { name: 'Champions', value: 450, color: '#10b981', description: 'Recent & High Frequency' },
  { name: 'New Customers', value: 1250, color: '#3b82f6', description: 'Joined in last 30 days' },
  { name: 'At Risk', value: 320, color: '#f59e0b', description: 'High churn probability' },
  { name: 'Loyal', value: 2480, color: '#8b5cf6', description: 'Regular purchasers' },
];

export const supplierPerformance = [
  { name: 'TechCorp Solutions', onTimeRate: 98.5, defectRate: 0.12, status: 'Excellent', leadTime: '3 days', contact: { email: ' Rahul@techcorp.in', phone: '+91 987', person: 'Rahul' }, paymentTerms: 'Net 30', products: ['Audio', 'Wearables'] },
  { name: 'Apparel Hub', onTimeRate: 92.0, defectRate: 1.45, status: 'Good', leadTime: '7 days', contact: { email: ' Priya@hub.in', phone: '+91 888', person: 'Priya' }, paymentTerms: 'Net 15', products: ['Tees', 'Jackets'] },
];

export const opexBreakdown = [
  { name: 'Salaries', value: 85000, color: '#3b82f6' },
  { name: 'Rent', value: 45000, color: '#10b981' },
  { name: 'Marketing', value: 32000, color: '#f59e0b' },
  { name: 'Logistics', value: 18000, color: '#ef4444' },
  { name: 'Utilities', value: 5000, color: '#8b5cf6' },
];

export const inventoryAgingData = [
  { range: '0-30 Days', value: 65 },
  { range: '31-60 Days', value: 20 },
  { range: '61-90 Days', value: 10 },
  { range: '90+ Days', value: 5 },
];

export const deadStockItems = [
  { sku: 'EL-992', name: 'Vintage Radio Speaker', stock: 12, value: 45000, lastSold: '2024-11-10' },
  { sku: 'AP-441', name: 'Woolen Winter Coat (Old)', stock: 45, value: 82000, lastSold: '2024-12-05' },
  { sku: 'HM-112', name: 'Glass Vase Set', stock: 8, value: 12000, lastSold: '2025-01-15' },
];

export const geographicData = [
  { state: 'Maharashtra', revenue: 450000 },
  { state: 'Karnataka', revenue: 380000 },
  { state: 'Delhi', revenue: 320000 },
  { state: 'Tamil Nadu', revenue: 280000 },
  { state: 'Telangana', revenue: 210000 },
];

export const salesByDayAndTime = [
  { day: 'Mon', '12-18': 4500, '18-00': 6200 },
  { day: 'Tue', '12-18': 5200, '18-00': 5800 },
  { day: 'Wed', '12-18': 4800, '18-00': 6100 },
  { day: 'Thu', '12-18': 6100, '18-00': 7500 },
  { day: 'Fri', '12-18': 7500, '18-00': 9200 },
  { day: 'Sat', '12-18': 9800, '18-00': 12000 },
  { day: 'Sun', '12-18': 11000, '18-00': 13500 },
];
