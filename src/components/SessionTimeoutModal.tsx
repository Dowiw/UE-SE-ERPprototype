import { Clock, AlertCircle } from 'lucide-react';

interface SessionTimeoutModalProps {
  onConfirm: () => void;
}

export function SessionTimeoutModal({ onConfirm }: SessionTimeoutModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-[fadeIn_0.3s_ease-in-out]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F4E8C6' }}>
            <Clock className="w-6 h-6" style={{ color: '#D4AF37' }} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Session Expired</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Your session has expired due to 5 minutes of inactivity. For your security, you will be redirected to the login page.
          </p>
          
          <div className="flex items-start gap-2 p-3 border rounded-lg" style={{ backgroundColor: '#F4E8C6', borderColor: '#D4AF37' }}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
            <p className="text-sm text-gray-800">
              Any unsaved changes will be lost. Please save your work regularly to prevent data loss.
            </p>
          </div>
        </div>
        
        <button
          onClick={onConfirm}
          className="w-full px-4 py-3 text-black rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ backgroundColor: '#D4AF37', outlineColor: '#D4AF37' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B8941C'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
          autoFocus
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}