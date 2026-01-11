import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { PropertyManagement } from './components/PropertyManagement';
import { FinancialManagement } from './components/FinancialManagement';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SystemConfiguration } from './components/SystemConfiguration';
import { GDPRCompliance } from './components/GDPRCompliance';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { SessionTimeoutModal } from './components/SessionTimeoutModal';

export type UserRole = 'Admin' | 'Manager' | 'Agent' | 'Accountant';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);
  const [textScale, setTextScale] = useState(1);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [deniedModule, setDeniedModule] = useState('');

  // Session timeout logic
  useEffect(() => {
    if (!isLoggedIn) return;

    const checkTimeout = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > 300000) { // 5 minutes
        setShowSessionTimeout(true);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkTimeout);
  }, [isLoggedIn, lastActivity]);

  // Track activity
  useEffect(() => {
    if (!isLoggedIn) return;

    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('click', updateActivity);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('click', updateActivity);
    };
  }, [isLoggedIn]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setLastActivity(Date.now());
    
    // Role-based redirect
    if (user.role === 'Admin') {
      setCurrentView('admin-dashboard');
    } else if (user.role === 'Agent') {
      setCurrentView('properties');
    } else if (user.role === 'Manager') {
      setCurrentView('analytics');
    } else if (user.role === 'Accountant') {
      setCurrentView('financial');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleSessionTimeout = () => {
    setShowSessionTimeout(false);
    handleLogout();
  };

  // RBAC: Check if user can access a view
  const canAccessView = (view: string): boolean => {
    if (!currentUser) return false;
    
    const role = currentUser.role;
    
    // Admin can ONLY access admin-dashboard, system-config, and gdpr
    if (role === 'Admin') {
      return ['admin-dashboard', 'system-config', 'gdpr'].includes(view);
    }
    
    // Manager can access everything except admin-specific pages
    if (role === 'Manager') {
      return ['properties', 'financial', 'analytics'].includes(view);
    }
    
    // Agent can access properties
    if (role === 'Agent') {
      return ['properties'].includes(view);
    }
    
    // Accountant can access financial
    if (role === 'Accountant') {
      return ['financial'].includes(view);
    }
    
    return false;
  };

  const handleNavigation = (view: string) => {
    if (canAccessView(view)) {
      setCurrentView(view);
    } else {
      setDeniedModule(view);
      setShowAccessDenied(true);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{ fontSize: `${textScale}rem` }}
    >
      <AccessibilityToolbar
        textScale={textScale}
        setTextScale={setTextScale}
      />

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 min-h-screen bg-black border-gray-800 border-r">
          <div className="p-6">
            <h1 className="text-xl font-bold" style={{ color: '#D4AF37' }}>AM Group ERP</h1>
            <p className="text-sm text-gray-400 mt-1">
              {currentUser?.role} - {currentUser?.username}
            </p>
          </div>

          <nav className="px-4 space-y-1">
            {/* Admin Dashboard - Only for Admin */}
            {currentUser?.role === 'Admin' && (
              <button
                onClick={() => handleNavigation('admin-dashboard')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'admin-dashboard'
                    ? 'text-black'
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
                style={currentView === 'admin-dashboard' ? { backgroundColor: '#D4AF37' } : {}}
              >
                Dashboard
              </button>
            )}

            {/* Properties - NOT for Admin */}
            {currentUser?.role !== 'Admin' && (
              <button
                onClick={() => handleNavigation('properties')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'properties'
                    ? 'text-black'
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
                style={currentView === 'properties' ? { backgroundColor: '#D4AF37' } : {}}
              >
                {currentUser?.role === 'Agent' ? 'View Properties' : 'Properties'}
              </button>
            )}

            {/* Financial - NOT for Admin */}
            {currentUser?.role !== 'Admin' && (
              <button
                onClick={() => handleNavigation('financial')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'financial'
                    ? 'text-black'
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
                style={currentView === 'financial' ? { backgroundColor: '#D4AF37' } : {}}
              >
                Financial
              </button>
            )}

            {/* Analytics - Only for Manager */}
            {currentUser?.role === 'Manager' && (
              <button
                onClick={() => handleNavigation('analytics')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'analytics'
                    ? 'text-black'
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
                style={currentView === 'analytics' ? { backgroundColor: '#D4AF37' } : {}}
              >
                Analytics
              </button>
            )}

            {/* System Config - Only for Admin */}
            {currentUser?.role === 'Admin' && (
              <button
                onClick={() => handleNavigation('system-config')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'system-config'
                    ? 'text-black'
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
                style={currentView === 'system-config' ? { backgroundColor: '#D4AF37' } : {}}
              >
                System Config
              </button>
            )}

            {/* GDPR Compliance - Only for Admin */}
            {currentUser?.role === 'Admin' && (
              <button
                onClick={() => handleNavigation('gdpr')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'gdpr'
                    ? 'text-black'
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
                style={currentView === 'gdpr' ? { backgroundColor: '#D4AF37' } : {}}
              >
                GDPR Compliance
              </button>
            )}

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-900 transition-colors mt-8"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {currentView === 'admin-dashboard' && <AdminDashboard user={currentUser!} />}
          {currentView === 'properties' && <PropertyManagement user={currentUser!} />}
          {currentView === 'financial' && <FinancialManagement user={currentUser!} />}
          {currentView === 'analytics' && <AnalyticsDashboard user={currentUser!} />}
          {currentView === 'system-config' && <SystemConfiguration />}
          {currentView === 'gdpr' && <GDPRCompliance />}
        </main>
      </div>

      {showSessionTimeout && (
        <SessionTimeoutModal onConfirm={handleSessionTimeout} />
      )}

      {/* Access Denied Modal */}
      {showAccessDenied && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F4E8C6' }}>
                <svg className="w-6 h-6" style={{ color: '#D4AF37' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                This module is restricted to your role. {currentUser?.role === 'Admin' 
                  ? 'As an Administrator, you have access limited to System Administration only.' 
                  : 'You do not have permission to access this module.'}
              </p>
              
              <div className="p-4 border rounded-lg" style={{ backgroundColor: '#F4E8C6', borderColor: '#D4AF37' }}>
                <p className="text-sm text-gray-800">
                  <strong>Your Role:</strong> {currentUser?.role}
                </p>
                <p className="text-sm text-gray-800 mt-2">
                  {currentUser?.role === 'Admin' && (
                    <>Property, Financial, and Analytics modules are restricted per SRS UC0001/UC0002. You have access to User Management, System Logs, Configuration, and GDPR Compliance.</>
                  )}
                  {currentUser?.role === 'Manager' && (
                    <>You have access to Properties, Financial, and Analytics modules.</>
                  )}
                  {currentUser?.role === 'Agent' && (
                    <>You have access to Property Management module only.</>
                  )}
                  {currentUser?.role === 'Accountant' && (
                    <>You have access to Financial Management module only.</>
                  )}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAccessDenied(false)}
              className="w-full px-4 py-2 text-black rounded-lg transition-colors"
              style={{ backgroundColor: '#D4AF37' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B8941C'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}