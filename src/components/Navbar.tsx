import React from 'react';
import { AuthUser } from '../types/healthPassport';
import { LogOut } from 'lucide-react';

interface NavbarProps {
  currentUser: AuthUser | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark & Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-teal-200 bg-white p-0.5 flex items-center justify-center shrink-0">
              <img
                src="/src/assets/images/health_passport_logo_1793885371336.jpg"
                alt="Health Passport Logo"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                Health Passport
              </span>
              <span className="text-[11px] font-medium text-teal-700 whitespace-nowrap">
                School Medical Registry
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation / Active Role Indicator */}
          {currentUser && (
            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-600">
              <span className="text-slate-400">Portal:</span>
              <span className="font-semibold text-slate-900 uppercase tracking-wide px-2 py-0.5 bg-slate-100 rounded-md">
                {currentUser.role === 'nurse' ? 'Nurse' : 'Parent'}
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
                <span className="font-semibold text-slate-900">{currentUser.name}</span>
                {currentUser.childName && (
                  <span className="text-slate-500">({currentUser.childName}&apos;s Parent)</span>
                )}
              </div>
            </div>
          )}

          {/* Zone 3: Primary Action - Logout only */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser && (
              <button
                onClick={onLogout}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
