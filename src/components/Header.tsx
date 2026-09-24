import React from 'react';
import { TabType, UserProfile } from '../types.ts';

interface HeaderProps {
  profile: UserProfile;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  targetCalories: number;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onTabChange,
  targetCalories,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto">
        {/* Status Bar simulation */}
        <div className="flex items-center justify-between px-4 h-11 text-xs text-slate-800">
          <span className="font-bold tracking-tight text-slate-900 text-[14px]">9:41</span>
          <div className="flex items-center gap-1.5 text-slate-800">
            <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[15px]">wifi</span>
            <span className="material-symbols-outlined text-[18px]">battery_full</span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-0.5"
          >
            <img
              alt="MY CALORY Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Vrap0uOwIbbyXN6HD5nGm7yYUtm1cnEF2E7OP2Zp1HlapR0XYwfTGcNEvVFnwFuTIFDMzE-xbixRe9QE0CM0sdMB4y1AKlzJDnZedmiTGUbmSTUzryNiUrxexdUK3ExqjezhnWj3rADTMZIpJ6V1kgS-lMOKyotlPv9r334NKuw-35n6TJ0bzeWnWAA3-xrJAF8HGQCdhixSLymtwj3GTCzq7SeWh3QU22ikzwzBFjzuU2xCI-5BzF7yXM"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[17px] font-extrabold tracking-tight text-slate-900">
                  MY CALORY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-2">
            {/* LIVE Calories Indicator */}
            <div className="h-8 px-3 rounded-full bg-blue-50 border border-blue-200/70 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
                LIVE
              </span>
              <span className="text-[12px] font-bold text-blue-900 tabular-nums">
                {targetCalories.toLocaleString()} kcal
              </span>
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={() => onTabChange('profile')}
              aria-label="사용자 프로필 보기"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20 shadow-xs hover:ring-blue-500 transition-all"
                src={profile.avatarUrl}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
