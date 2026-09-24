import React from 'react';
import { TabType } from '../types.ts';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: '홈', icon: 'home' },
    { id: 'log', label: '기록', icon: 'edit_calendar' },
    { id: 'analytics', label: '통계', icon: 'insights' },
    { id: 'profile', label: '내정보', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span className="text-[12px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
