import React, { useState } from 'react';
import { DEMO_USERS } from '../data/initialStudents';
import { AuthUser } from '../types/healthPassport';
import { Lock, User, ShieldAlert, ArrowRight, Stethoscope, Users } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('nurse');
  const [password, setPassword] = useState('nurse 123');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const account = DEMO_USERS[username.trim().toLowerCase()];
    if (account && account.password.toLowerCase() === password.trim().toLowerCase()) {
      onLoginSuccess(account.user);
    } else {
      setError('Invalid username or password. Please use the demo logins below.');
    }
  };

  const handleQuickDemo = (demoUser: 'nurse' | 'parent') => {
    if (demoUser === 'nurse') {
      setUsername('nurse');
      setPassword('nurse 123');
      setError(null);
      const acc = DEMO_USERS['nurse'];
      if (acc) onLoginSuccess(acc.user);
    } else {
      setUsername('parent');
      setPassword('parents 123');
      setError(null);
      const acc = DEMO_USERS['parent'];
      if (acc) onLoginSuccess(acc.user);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-md">
        
        {/* App Logo & Name */}
        <div className="text-center mb-6">
          <div className="w-18 h-18 rounded-2xl mx-auto mb-3 shadow-lg border-2 border-teal-200 overflow-hidden bg-white p-1 flex items-center justify-center">
            <img
              src="/src/assets/images/health_passport_logo_1793885371336.jpg"
              alt="Health Passport Logo"
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Health Passport
          </h1>
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-widest mt-1">
            Student Medical Registry
          </p>
        </div>

        {/* Main Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-7">
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white text-slate-900 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white text-slate-900 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 shadow-md shadow-teal-600/20 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Logins */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Demo Logins
            </span>

            {/* Nurse Demo */}
            <button
              type="button"
              onClick={() => handleQuickDemo('nurse')}
              className="w-full text-left p-3 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/70 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Nurse (Sister Priya Nair)
                  </div>
                  <div className="text-[11px] text-teal-800 font-mono">
                    Username: <span className="font-bold">nurse</span> · Password: <span className="font-bold">nurse 123</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-md group-hover:bg-teal-200 transition-colors">
                Login
              </span>
            </button>

            {/* Parent Demo */}
            <button
              type="button"
              onClick={() => handleQuickDemo('parent')}
              className="w-full text-left p-3 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Parent (Sunita Sharma)
                  </div>
                  <div className="text-[11px] text-indigo-800 font-mono">
                    Username: <span className="font-bold">parent</span> · Password: <span className="font-bold">parents 123</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-md group-hover:bg-indigo-200 transition-colors">
                Login
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
