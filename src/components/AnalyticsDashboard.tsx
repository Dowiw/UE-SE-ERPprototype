import { useState } from 'react';
import { User } from '../App';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Filter, AlertCircle, Loader } from 'lucide-react';

interface AnalyticsDashboardProps {
  user: User;
}

const propertyData = [
  { name: 'Jan', properties: 45, revenue: 125000 },
  { name: 'Feb', properties: 52, revenue: 138000 },
  { name: 'Mar', properties: 48, revenue: 132000 },
  { name: 'Apr', properties: 61, revenue: 155000 },
  { name: 'May', properties: 58, revenue: 148000 },
  { name: 'Jun', properties: 67, revenue: 172000 },
];

const financialData = [
  { name: 'Rent', value: 450000 },
  { name: 'Sales', value: 280000 },
  { name: 'Services', value: 120000 },
  { name: 'Other', value: 55000 },
];

const agentData = [
  { name: 'John Smith', sales: 12, revenue: 245000 },
  { name: 'Sarah Johnson', sales: 15, revenue: 320000 },
  { name: 'Mike Brown', sales: 9, revenue: 185000 },
  { name: 'Lisa Davis', sales: 11, revenue: 225000 },
  { name: 'Tom Wilson', sales: 8, revenue: 165000 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export function AnalyticsDashboard({ user }: AnalyticsDashboardProps) {
  const [selectedDataset, setSelectedDataset] = useState<'properties' | 'finances' | 'agents'>('properties');
  const [isLoading, setIsLoading] = useState(false);
  const [showCharts, setShowCharts] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [flagInconsistentData, setFlagInconsistentData] = useState(false);
  const [drillDownData, setDrillDownData] = useState<any>(null);

  const handleRunAnalysis = () => {
    setIsLoading(true);
    setShowCharts(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowCharts(true);
    }, 1500);
  };

  const handleChartClick = (data: any) => {
    setDrillDownData(data);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Data Analytics Dashboard</h1>
        <p className="text-gray-500 mt-2">Overview of property and financial data</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-md shadow p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Select Dataset
            </label>
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 bg-white text-gray-700"
            >
              <option value="properties">Properties</option>
              <option value="finances">Finances</option>
              <option value="agents">Agents</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunAnalysis}
              className="w-full bg-gold-400 text-[#181818] px-4 py-2 rounded-md hover:bg-gold-300 transition-colors flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Run Analysis
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setShowExportModal(true)}
              className="w-full bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-gray-400" />
              Export Report
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={flagInconsistentData}
              onChange={(e) => setFlagInconsistentData(e.target.checked)}
              className="w-4 h-4 text-gold-400 rounded-md focus:ring-2 focus:ring-gold-400 bg-[#181818] border border-gold-700"
            />
            <span className="text-sm text-gold-200">Flag Inconsistent Data</span>
          </label>

          <div className="ml-auto flex items-center gap-2 text-sm text-gold-300">
            <AlertCircle className="w-4 h-4" />
            <span>Predictive forecasting enabled</span>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-md shadow p-12 mb-8">
          <div className="flex flex-col items-center justify-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Running analysis on {selectedDataset}...</p>
          </div>
        </div>
      )}

      {/* Charts */}
      {showCharts && !isLoading && (
        <div className="space-y-8">
          {/* Properties Dataset */}
          {selectedDataset === 'properties' && (
            <>
              <div className="bg-white rounded-md shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Property Trends Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={propertyData} onClick={handleChartClick}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="properties" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 mt-4">
                  Click on any data point to drill down into details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-md shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Property Performance</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={propertyData} onClick={handleChartClick}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="properties" fill="#6B7280" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-md shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">Total Properties</p>
                      <p className="text-3xl font-bold text-gray-800">331</p>
                      <p className="text-sm text-gray-500 mt-1">12% increase from last period</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">Average Value</p>
                      <p className="text-3xl font-bold text-gray-800">$485K</p>
                      <p className="text-sm text-gray-500 mt-1">8% increase from last period</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">Occupancy Rate</p>
                      <p className="text-3xl font-bold text-gray-800">94.2%</p>
                      <p className="text-sm text-gray-500 mt-1">2.5% increase from last period</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Finances Dataset */}
          {selectedDataset === 'finances' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-md shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Revenue Distribution</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart onClick={handleChartClick}>
                      <Pie
                        data={financialData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {financialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-md shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Revenue by Source</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={financialData} onClick={handleChartClick}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6B7280" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-md shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$905K</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-600">Net Profit</p>
                    <p className="text-2xl font-bold text-gray-800">$685K</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <p className="text-2xl font-bold text-gray-800">75.7%</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-gray-800">+18.3%</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Agents Dataset */}
          {selectedDataset === 'agents' && (
            <>
              <div className="bg-white rounded-md shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Agent Performance Comparison</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={agentData} onClick={handleChartClick}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="#6B7280" name="Number of Sales" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#A3A3A3" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-md shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Agent Leaderboard</h2>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Deal Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {agentData
                      .sort((a, b) => b.revenue - a.revenue)
                      .map((agent, index) => (
                        <tr key={agent.name} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-700">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium">{agent.name}</td>
                          <td className="px-6 py-4">{agent.sales}</td>
                          <td className="px-6 py-4 text-green-600 font-medium">
                            ${agent.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            ${Math.round(agent.revenue / agent.sales).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Inconsistent Data Warning */}
          {flagInconsistentData && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">Data Inconsistencies Detected</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                    <li>3 properties missing valuation data</li>
                    <li>2 transactions with mismatched dates</li>
                    <li>1 agent record with incomplete information</li>
                  </ul>
                  <button className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm">
                    Review Issues
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Drill Down Modal */}
      {drillDownData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md shadow-xl w-full max-w-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Breakdown</h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-gray-600">Selected Data Point</p>
                <p className="text-lg font-semibold">{JSON.stringify(drillDownData)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-600">Sample Metric 1</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-600">Sample Metric 2</p>
                  <p className="text-2xl font-bold">$56,789</p>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                This is a drill-down view showing detailed information about the selected data point.
                In a production environment, this would show comprehensive analytics and insights.
              </p>
            </div>

            <button
              onClick={() => setDrillDownData(null)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Export Report</h2>

            <div className="space-y-3">
              <button className="w-full p-4 border-2 border-gray-200 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium">Export as PDF</p>
                    <p className="text-sm text-gray-600">Printable report format</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 border-2 border-gray-200 rounded-md hover:border-green-500 hover:bg-green-50 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Export as Excel</p>
                    <p className="text-sm text-gray-600">Editable spreadsheet format</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 border-2 border-gray-200 rounded-md hover:border-purple-500 hover:bg-purple-50 transition-all text-left">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Export as CSV</p>
                    <p className="text-sm text-gray-600">Raw data format</p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowExportModal(false)}
              className="mt-6 w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
