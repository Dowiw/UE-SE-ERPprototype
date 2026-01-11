import { useState } from 'react';
import amGroupLogo from '../assets/logo-amgroup.png';
import loginBg from '../assets/login-bgg.jpg';
import { User } from '../App';
import { AlertCircle, Lock, Mail, Shield } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showTooManyAttempts, setShowTooManyAttempts] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check for too many failed attempts
    if (failedAttempts >= 3) {
      setShowTooManyAttempts(true);
      return;
    }

    // Mock authentication - predefined users
    const mockUsers = {
      'admin': { id: '1', username: 'admin', role: 'Admin' as const, email: 'admin@amgroup.com' },
      'manager': { id: '2', username: 'manager', role: 'Manager' as const, email: 'manager@amgroup.com' },
      'agent': { id: '3', username: 'agent', role: 'Agent' as const, email: 'agent@amgroup.com' },
      'accountant': { id: '4', username: 'accountant', role: 'Accountant' as const, email: 'accountant@amgroup.com' }
    };

    const user = mockUsers[username.toLowerCase() as keyof typeof mockUsers];

    if (user && password === 'password123') {
      onLogin(user);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 3) {
        setShowTooManyAttempts(true);
      } else {
        setErrors({ password: 'Invalid username or password' });
      }
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSent(true);
      setTimeout(() => {
        setShowForgotPassword(false);
        setEmailSent(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${loginBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'darken',
          }}
        >
      <div className="bg-white rounded-md shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img
            src={amGroupLogo}
            alt="AM Group Logo"
            style={{ width: '120px', margin: '0 auto 16px auto', display: 'block' }}
          />
          <h1 className="text-3xl font-bold text-gray-900">AM Group ERP</h1>
          <p className="text-gray-600 mt-2">Enterprise Resource Planning System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: undefined });
              }}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:border-transparent transition-all ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              style={!errors.username ? { outlineColor: '#D4AF37' } : {}}
              placeholder="Enter your username"
              aria-label="Username"
              aria-invalid={!!errors.username}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-gray-700 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: undefined });
              }}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:border-transparent transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              style={!errors.password ? { outlineColor: '#D4AF37' } : {}}
              placeholder="Enter your password"
              aria-label="Password"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-gray-700 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
            style={{ color: '#D4AF37' }}
            aria-label="Forgot password"
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            className="w-full text-black py-3 rounded-md transition-all font-medium focus:outline-none focus:ring-4"
            style={{ backgroundColor: '#D4AF37', outlineColor: '#D4AF37' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B8941C'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
            aria-label="Login"
          >
            Login
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock className="w-4 h-4" />
            <p>Data encrypted via HTTPS (TLS) - GDPR Compliant</p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-md" style={{ backgroundColor: '#F4E8C6' }}>
          <p className="text-sm text-gray-700 font-medium mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600">Username: admin, manager, agent, or accountant</p>
          <p className="text-xs text-gray-600">Password: password123</p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Reset Password
            </h2>

            {emailSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F4E8C6' }}>
                  <Mail className="w-8 h-8" style={{ color: '#D4AF37' }} />
                </div>
                <p className="font-medium" style={{ color: '#D4AF37' }}>Email sent successfully!</p>
                <p className="text-sm text-gray-600 mt-2">Check your inbox for password reset instructions.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <div className="mb-4">
                  <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
                    style={{ outlineColor: '#D4AF37' }}
                    placeholder="Enter your email"
                    required
                    aria-label="Email address for password reset"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setEmail('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-black rounded-md transition-colors"
                    style={{ backgroundColor: '#D4AF37' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B8941C'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Too Many Attempts Warning */}
      {showTooManyAttempts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ backgroundColor: '#F4E8C6' }}>
                <AlertCircle className="w-6 h-6" style={{ color: '#D4AF37' }} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Too Many Failed Attempts</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Your account has been temporarily locked due to multiple failed login attempts.
              Please try again in 15 minutes or contact your system administrator.
            </p>

            <button
              onClick={() => {
                setShowTooManyAttempts(false);
                setFailedAttempts(0);
              }}
              className="w-full px-4 py-2 text-black rounded-md transition-colors"
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
