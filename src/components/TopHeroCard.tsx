import React from 'react';
import { UserProfile } from '../types.ts';

interface TopHeroCardProps {
  profile: UserProfile;
  caloriesEaten: number;
  targetCalories: number;
  carbs: number;
  protein: number;
  fat: number;
  onOpenWeightModal: () => void;
  onMacroClick?: (macroName: string) => void;
}

export const TopHeroCard: React.FC<TopHeroCardProps> = ({
  profile,
  caloriesEaten,
  targetCalories,
  carbs,
  protein,
  fat,
  onOpenWeightModal,
}) => {
  const remainingCalories = Math.max(0, targetCalories - caloriesEaten);
  const percentage = Math.round((caloriesEaten / targetCalories) * 100);

  return (
    <section className="w-full rounded-3xl p-5 relative overflow-hidden bg-white border border-slate-200/80 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
      {/* Subtle background ambient glow */}
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      {/* Top Profile & Weight Row */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              alt={`${profile.name} 프로필`}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-600/20 shadow-sm"
              src={profile.avatarUrl}
            />
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"
              title="활동 중"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] text-slate-900 font-bold leading-tight">
                {profile.name}
              </span>
              <span className="text-xs text-blue-600 font-semibold tracking-tight">
                {profile.englishName}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-normal">
              {profile.handle}
            </span>
          </div>
        </div>

        {/* Weight info - Clickable to log new weight */}
        <button
          onClick={onOpenWeightModal}
          className="flex flex-col items-end group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1 -mr-1 transition-transform active:scale-95 text-left"
          title="체중 기록 변경"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-slate-500">현재 체중</span>
            <span className="text-[16px] font-extrabold text-slate-900 tabular-nums group-hover:text-blue-600 transition-colors">
              {profile.currentWeight.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500">kg</span>
          </div>
          <div className="mt-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-emerald-600">
              trending_down
            </span>
            <span className="text-[11px] font-bold text-emerald-700 tabular-nums">
              {profile.weeklyChange > 0 ? `+${profile.weeklyChange}` : `${profile.weeklyChange}`}kg 이번주
            </span>
          </div>
        </button>
      </div>

      {/* Main Calorie Progress Details */}
      <div className="mt-5 pt-4 flex flex-col gap-3.5 relative z-10 border-t border-slate-100">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
              <span className="material-symbols-outlined text-[17px] text-blue-600">
                local_fire_department
              </span>
              <span className="font-medium text-slate-600">오늘 먹은 칼로리</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[36px] font-extrabold text-slate-900 tracking-tight leading-none tabular-nums">
                {caloriesEaten.toLocaleString()}
              </span>
              <span className="text-[18px] text-slate-400 font-medium">
                / {targetCalories.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 uppercase font-bold">
                kcal
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[11px] text-slate-500 font-semibold">
              남은 열량
            </span>
            <span className="text-[18px] font-extrabold text-blue-600 tracking-tight tabular-nums">
              {remainingCalories.toLocaleString()} kcal
            </span>
          </div>
        </div>

        {/* Progress Bar with Pill Badge */}
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 font-medium">일일 목표 달성</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-[0_2px_8px_rgba(37,99,235,0.35)] tabular-nums">
              {percentage}%
            </span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, percentage)}%` }}
            />
          </div>
        </div>

        {/* 3 Macro Cards */}
        <div className="grid grid-cols-3 gap-2.5 mt-1">
          {/* Carbs */}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-2.5 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold mb-0.5">
              탄수화물
            </span>
            <span className="text-[15px] font-bold text-blue-700 tabular-nums">
              {carbs}g
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 tabular-nums">
              권장 {profile.targetCarbs}g
            </span>
          </div>

          {/* Protein */}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-2.5 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold mb-0.5">
              단백질
            </span>
            <span className="text-[15px] font-bold text-emerald-600 tabular-nums">
              {protein}g
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 tabular-nums">
              권장 {profile.targetProtein}g
            </span>
          </div>

          {/* Fat */}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-2.5 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold mb-0.5">
              지방
            </span>
            <span className="text-[15px] font-bold text-amber-600 tabular-nums">
              {fat}g
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 tabular-nums">
              권장 {profile.targetFat}g
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
