import { useState } from 'react';
import { Monitor, Smartphone, Tablet, Chrome, Globe, Database, Wifi, CheckCircle, XCircle } from 'lucide-react';

export function SystemConfiguration() {
  const [activeTab, setActiveTab] = useState<'hardware' | 'software' | 'ports' | 'database'>('hardware');
  const [responsiveMode, setResponsiveMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [dbStatus, setDbStatus] = useState<'connected' | 'disconnected'>('connected');

  const browsers = [
    { name: 'Chrome', version: '120+', supported: true, icon: Chrome },
    { name: 'Firefox', version: '115+', supported: true, icon: Globe },
    { name: 'Safari', version: '16+', supported: true, icon: Globe },
    { name: 'Edge', version: '120+', supported: true, icon: Globe },
  ];

  const ports = [
    { port: '443', protocol: 'HTTPS', status: 'Active', description: 'Secure web traffic' },
    { port: '22', protocol: 'SSH', status: 'Active', description: 'Secure shell access' },
    { port: '5432', protocol: 'PostgreSQL', status: 'Active', description: 'Database connection' },
    { port: '80', protocol: 'HTTP', status: 'Redirect', description: 'Redirects to HTTPS' },
  ];

  const handleTestConnection = () => {
    setDbStatus('disconnected');
    setTimeout(() => {
      setDbStatus('connected');
    }, 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
        <p className="text-gray-600 mt-2">Hardware and Software Interface Settings</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-4" aria-label="Configuration sections">
          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'hardware'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Monitor className="w-4 h-4 inline mr-2" />
            Hardware Requirements
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'software'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Globe className="w-4 h-4 inline mr-2" />
            Software Interfaces
          </button>
          <button
            onClick={() => setActiveTab('ports')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'ports'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Wifi className="w-4 h-4 inline mr-2" />
            Port Configuration
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'database'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Database className="w-4 h-4 inline mr-2" />
            Database Interface
          </button>
        </nav>
      </div>

      {/* Hardware Requirements Tab */}
      {activeTab === 'hardware' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Responsive Design Toggle</h2>
            <p className="text-gray-600 mb-4">Preview the application in different device modes</p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setResponsiveMode('desktop')}
                className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                  responsiveMode === 'desktop'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Monitor className={`w-8 h-8 mx-auto mb-2 ${
                  responsiveMode === 'desktop' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <p className="font-medium">Desktop</p>
                <p className="text-sm text-gray-600">1920x1080</p>
              </button>

              <button
                onClick={() => setResponsiveMode('tablet')}
                className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                  responsiveMode === 'tablet'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Tablet className={`w-8 h-8 mx-auto mb-2 ${
                  responsiveMode === 'tablet' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <p className="font-medium">Tablet</p>
                <p className="text-sm text-gray-600">768x1024</p>
              </button>

              <button
                onClick={() => setResponsiveMode('mobile')}
                className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                  responsiveMode === 'mobile'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className={`w-8 h-8 mx-auto mb-2 ${
                  responsiveMode === 'mobile' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <p className="font-medium">Mobile</p>
                <p className="text-sm text-gray-600">375x667</p>
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                Currently viewing in: <strong>{responsiveMode.charAt(0).toUpperCase() + responsiveMode.slice(1)}</strong> mode
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Minimum Requirements</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">Processor</p>
                <p className="font-medium">Intel Core i5 or equivalent</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">RAM</p>
                <p className="font-medium">8 GB minimum</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">Storage</p>
                <p className="font-medium">256 GB SSD</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">Network</p>
                <p className="font-medium">Broadband connection</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Software Interfaces Tab */}
      {activeTab === 'software' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Browser Compatibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {browsers.map((browser) => (
                <div
                  key={browser.name}
                  className={`p-4 border-2 rounded-lg flex items-center justify-between ${
                    browser.supported
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <browser.icon className="w-8 h-8 text-gray-700" />
                    <div>
                      <p className="font-medium">{browser.name}</p>
                      <p className="text-sm text-gray-600">Version {browser.version}</p>
                    </div>
                  </div>
                  {browser.supported ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Operating System Support</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                <span>Windows 10/11</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                <span>macOS 12+</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                <span>Linux (Ubuntu 20.04+)</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Port Configuration Tab */}
      {activeTab === 'ports' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Network Port Configuration</h2>
          </div>
          
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Port</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Protocol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ports.map((port) => (
                <tr key={port.port} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-medium">{port.port}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {port.protocol}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      port.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {port.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{port.description}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Database Interface Tab */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Database Connection Status</h2>
            
            <div className={`p-6 rounded-lg border-2 ${
              dbStatus === 'connected'
                ? 'border-green-300 bg-green-50'
                : 'border-red-300 bg-red-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${
                    dbStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-lg">
                      {dbStatus === 'connected' ? 'Connected' : 'Disconnected'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {dbStatus === 'connected' 
                        ? 'Connected to primary database' 
                        : 'Connection lost - attempting to reconnect...'}
                    </p>
                  </div>
                </div>
                <Database className={`w-12 h-12 ${
                  dbStatus === 'connected' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>

              <button
                onClick={handleTestConnection}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Connection
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Database Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Database Type</span>
                <span className="font-medium">PostgreSQL 15.2</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Host</span>
                <span className="font-medium font-mono">localhost:5432</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Database Name</span>
                <span className="font-medium font-mono">amgroup_erp</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-600">SSL Mode</span>
                <span className="font-medium">Required</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-600">Pool Size</span>
                <span className="font-medium">20 connections</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">Query Response Time</p>
                <p className="text-2xl font-bold text-green-600">12ms</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">Active Connections</p>
                <p className="text-2xl font-bold text-blue-600">8/20</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">Database Size</p>
                <p className="text-2xl font-bold text-purple-600">2.4 GB</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
