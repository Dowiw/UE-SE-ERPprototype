import { useState } from 'react';
import { Shield, Download, Trash2, Eye, Calendar, CheckCircle, FileText, Database } from 'lucide-react';

interface DataAccessLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  dataType: string;
}

export function GDPRCompliance() {
  const [showDataAuditModal, setShowDataAuditModal] = useState(false);
  const [showAnonymizeModal, setShowAnonymizeModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const [dataAccessLogs] = useState<DataAccessLog[]>([
    { id: '1', timestamp: '2026-01-10 14:30:22', user: 'admin@amgroup.com', action: 'VIEW', dataType: 'User Profile' },
    { id: '2', timestamp: '2026-01-10 14:25:15', user: 'agent@amgroup.com', action: 'EXPORT', dataType: 'Property Data' },
    { id: '3', timestamp: '2026-01-10 14:20:08', user: 'manager@amgroup.com', action: 'UPDATE', dataType: 'Financial Records' },
    { id: '4', timestamp: '2026-01-10 14:15:33', user: 'accountant@amgroup.com', action: 'VIEW', dataType: 'Transaction History' },
  ]);

  const complianceChecklist = [
    { id: 1, item: 'Data encryption at rest and in transit', completed: true },
    { id: 2, item: 'User consent management', completed: true },
    { id: 3, item: 'Right to access (data export)', completed: true },
    { id: 4, item: 'Right to be forgotten (data deletion)', completed: true },
    { id: 5, item: 'Data breach notification procedures', completed: true },
    { id: 6, item: 'Privacy policy published', completed: true },
    { id: 7, item: 'Data protection officer appointed', completed: true },
    { id: 8, item: 'Regular security audits', completed: true },
  ];

  const handleDataExport = () => {
    setExportComplete(false);
    setTimeout(() => {
      setExportComplete(true);
    }, 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">GDPR Compliance Dashboard</h1>
        <p className="text-gray-600 mt-2">Data Protection & Privacy Management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <Shield className="w-8 h-8 mb-2" />
          <p className="text-blue-100 text-sm">Compliance Score</p>
          <p className="text-3xl font-bold">100%</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <Database className="w-8 h-8 mb-2" />
          <p className="text-green-100 text-sm">Data Subjects</p>
          <p className="text-3xl font-bold">1,248</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <Eye className="w-8 h-8 mb-2" />
          <p className="text-purple-100 text-sm">Access Requests</p>
          <p className="text-3xl font-bold">23</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <Calendar className="w-8 h-8 mb-2" />
          <p className="text-orange-100 text-sm">Last Backup</p>
          <p className="text-xl font-bold">2 hours ago</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setShowDataAuditModal(true)}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500"
        >
          <Eye className="w-6 h-6 text-blue-600 mb-2" />
          <p className="font-medium">Data Audit</p>
          <p className="text-sm text-gray-600">View access logs</p>
        </button>

        <button
          onClick={() => setShowAnonymizeModal(true)}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500"
        >
          <Trash2 className="w-6 h-6 text-purple-600 mb-2" />
          <p className="font-medium">Anonymize Data</p>
          <p className="text-sm text-gray-600">For inactive users</p>
        </button>

        <button
          onClick={() => setShowExportModal(true)}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-500"
        >
          <Download className="w-6 h-6 text-green-600 mb-2" />
          <p className="font-medium">Export Data</p>
          <p className="text-sm text-gray-600">GDPR right to access</p>
        </button>

        <button
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-500"
        >
          <Calendar className="w-6 h-6 text-orange-600 mb-2" />
          <p className="font-medium">Backup Schedule</p>
          <p className="text-sm text-gray-600">Configure backups</p>
        </button>
      </div>

      {/* Compliance Checklist */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          GDPR Compliance Checklist
        </h2>
        
        <div className="space-y-3">
          {complianceChecklist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">{item.item}</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Compliant
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Backup Schedule Visualizer */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Backup Schedule (SRS 3.4)
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div>
              <p className="font-medium">Daily Backups</p>
              <p className="text-sm text-gray-600">Automated at 2:00 AM UTC</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div>
              <p className="font-medium">Weekly Full Backup</p>
              <p className="text-sm text-gray-600">Every Sunday at 1:00 AM UTC</p>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <p className="font-medium">Retention Period</p>
              <p className="text-sm text-gray-600">30 days for daily, 1 year for weekly</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Configured
            </span>
          </div>
        </div>
      </div>

      {/* Data Audit Modal */}
      {showDataAuditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Data Access Logs</h2>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dataAccessLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
                        <td className="px-6 py-4 text-sm">{log.user}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            log.action === 'VIEW' ? 'bg-blue-100 text-blue-800' :
                            log.action === 'EXPORT' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{log.dataType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setShowDataAuditModal(false)}
                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anonymize Data Modal */}
      {showAnonymizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Anonymize Inactive User Data</h2>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                This will anonymize data for users who have been inactive for more than 2 years, as per GDPR requirements.
              </p>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> This action cannot be undone. Anonymized data cannot be recovered.
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Inactive users found:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Data to anonymize:</span>
                  <span className="font-medium">Personal info, contacts</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowAnonymizeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAnonymizeModal(false)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Anonymize Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Request Data Export</h2>
            
            {!exportComplete ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">
                    Export user data in compliance with GDPR Article 15 (Right to Access).
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span>Personal Information</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span>Activity Logs</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span>Transaction History</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span>Communication Records</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDataExport}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-green-600 font-medium mb-2">Export Complete!</p>
                  <p className="text-sm text-gray-600">Your data has been exported successfully.</p>
                </div>

                <button
                  onClick={() => {
                    setShowExportModal(false);
                    setExportComplete(false);
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download File
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
