import { useState } from 'react';
import { User } from '../App';
import { DollarSign, Plus, Download, FileText, TrendingUp, AlertTriangle, ArrowUpDown } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'Payment' | 'Invoice' | 'Expense';
  property: string;
  status: 'Completed' | 'Pending';
}

interface FinancialManagementProps {
  user: User;
}

export function FinancialManagement({ user }: FinancialManagementProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2026-01-10', amount: 2500, type: 'Payment', property: '123 Main St', status: 'Completed' },
    { id: '2', date: '2026-01-09', amount: 1800, type: 'Payment', property: '456 Oak Ave', status: 'Completed' },
    { id: '3', date: '2026-01-08', amount: 450, type: 'Expense', property: '789 Pine Rd', status: 'Completed' },
    { id: '4', date: '2026-01-07', amount: 3200, type: 'Invoice', property: '321 Elm St', status: 'Pending' },
  ]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDataInconsistency, setShowDataInconsistency] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const [newPayment, setNewPayment] = useState({
    amount: 0,
    date: '',
    property: '123 Main St'
  });

  const [kpiData, setKpiData] = useState({
    totalRevenue: 145200,
    totalExpenses: 28400,
    pendingInvoices: 12,
    profitMargin: 80.4
  });

  const canEdit = user.role === 'Accountant' || user.role === 'Manager' || user.role === 'Admin';
  const isReadOnly = user.role === 'Agent';

  const handleRecordPayment = () => {
    if (!newPayment.amount || !newPayment.date) {
      setShowDataInconsistency(true);
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      date: newPayment.date,
      amount: newPayment.amount,
      type: 'Payment',
      property: newPayment.property,
      status: 'Completed'
    };

    setTransactions([transaction, ...transactions]);

    // Update KPIs
    setKpiData({
      ...kpiData,
      totalRevenue: kpiData.totalRevenue + newPayment.amount,
      profitMargin: ((kpiData.totalRevenue + newPayment.amount - kpiData.totalExpenses) / (kpiData.totalRevenue + newPayment.amount)) * 100
    });

    setShowPaymentModal(false);
    setNewPayment({ amount: 0, date: '', property: '123 Main St' });
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aVal = a[sortColumn as keyof Transaction];
    let bVal = b[sortColumn as keyof Transaction];

    if (sortColumn === 'amount') {
      aVal = a.amount;
      bVal = b.amount;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gold-400">Financial Management</h1>
        <p className="text-gold-200 mt-2">
          {isReadOnly ? 'Read-Only Mode - Limited Access' : 'Full Financial Access'}
        </p>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-lg p-6 text-gold-400 border border-gold-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gold-200">Total Revenue</p>
            <TrendingUp className="w-5 h-5 text-gold-300" />
          </div>
          <p className="text-3xl font-bold">${kpiData.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gold-200 mt-2">+12.5% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-lg p-6 text-gold-400 border border-gold-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gold-200">Total Expenses</p>
            <DollarSign className="w-5 h-5 text-gold-300" />
          </div>
          <p className="text-3xl font-bold">${kpiData.totalExpenses.toLocaleString()}</p>
          <p className="text-sm text-gold-200 mt-2">+3.2% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-lg p-6 text-gold-400 border border-gold-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gold-200">Pending Invoices</p>
            <FileText className="w-5 h-5 text-gold-300" />
          </div>
          <p className="text-3xl font-bold">{kpiData.pendingInvoices}</p>
          <p className="text-sm text-gold-200 mt-2">Awaiting payment</p>
        </div>

        <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-lg p-6 text-gold-400 border border-gold-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gold-200">Profit Margin</p>
            <TrendingUp className="w-5 h-5 text-gold-300" />
          </div>
          <p className="text-3xl font-bold">{kpiData.profitMargin.toFixed(1)}%</p>
          <p className="text-sm text-gold-200 mt-2">Above target</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => canEdit ? setShowPaymentModal(true) : null}
          disabled={isReadOnly}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            isReadOnly
              ? 'bg-gray-700 text-gold-700 cursor-not-allowed'
              : 'bg-gold-400 text-[#181818] hover:bg-gold-300'
          }`}
        >
          <Plus className="w-4 h-4" />
          Record Payment
        </button>

        <button
          onClick={() => canEdit ? setShowInvoiceModal(true) : null}
          disabled={isReadOnly}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            isReadOnly
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Generate Invoice
        </button>

        <button
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          View Financial Report
        </button>
      </div>

      {isReadOnly && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <p className="text-yellow-800">
            You are in read-only mode. Contact your administrator to request financial management permissions.
          </p>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Transaction History</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Date
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center gap-2">
                  Amount
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    transaction.type === 'Payment' ? 'bg-green-100 text-green-800' :
                    transaction.type === 'Invoice' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{transaction.property}</td>
                <td className="px-6 py-4 font-medium">
                  <span className={transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'}>
                    {transaction.type === 'Expense' ? '-' : '+'}${transaction.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Record Payment</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={newPayment.amount || ''}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Linked Property</label>
                <select
                  value={newPayment.property}
                  onChange={(e) => setNewPayment({ ...newPayment, property: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="123 Main St">123 Main St</option>
                  <option value="456 Oak Ave">456 Oak Ave</option>
                  <option value="789 Pine Rd">789 Pine Rd</option>
                  <option value="321 Elm St">321 Elm St</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRecordPayment}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Invoice Preview</h2>

            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">INVOICE</h3>
                  <p className="text-gray-600">INV-2026-001</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">AM Group ERP</p>
                  <p className="text-sm text-gray-600">123 Business St</p>
                  <p className="text-sm text-gray-600">New York, NY 10001</p>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Bill To:</p>
                    <p className="font-medium">John Tenant</p>
                    <p className="text-sm text-gray-600">123 Main St</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Invoice Date:</p>
                    <p className="font-medium">January 10, 2026</p>
                    <p className="text-sm text-gray-600 mt-2">Due Date:</p>
                    <p className="font-medium">January 31, 2026</p>
                  </div>
                </div>
              </div>

              <table className="w-full mb-6">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Monthly Rent - January 2026</td>
                    <td className="text-right py-2">$2,500.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>$2,500.00</span>
                  </div>
                  <div className="flex justify-between py-2 border-t font-bold text-lg">
                    <span>Total:</span>
                    <span>$2,500.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Financial Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Report - January 2026</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-600">${kpiData.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">${kpiData.totalExpenses.toLocaleString()}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Revenue Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span>Rental Income</span>
                  <span className="font-medium">$120,000</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span>Property Sales</span>
                  <span className="font-medium">$25,200</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Expense Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span>Maintenance</span>
                  <span className="font-medium">$15,400</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span>Utilities</span>
                  <span className="font-medium">$8,200</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span>Insurance</span>
                  <span className="font-medium">$4,800</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export to Excel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export to PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Inconsistency Warning */}
      {showDataInconsistency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Data Inconsistency</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Required fields are missing or invalid. Please ensure all required fields are filled correctly before submitting.
            </p>

            <button
              onClick={() => setShowDataInconsistency(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
