import React from 'react';
import { UserProfile } from '../types.ts';

interface AnalyticsViewProps {
  profile: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ profile }) => {
  const weeklyData = [
    { day: '월 (21)', kcal: 1120, target: 2100, status: 'LOW' },
    { day: '화 (22)', kcal: 2540, target: 2100, status: 'BAD' },
    { day: '수 (23)', kcal: 2050, target: 2100, status: 'GOOD' },
    { day: '목 (24)', kcal: 1640, target: 2100, status: 'GOOD', isToday: true },
    { day: '금 (25)', kcal: 1980, target: 2100, status: 'GOOD' },
    { day: '토 (26)', kcal: 2100, target: 2100, status: 'GOOD' },
    { day: '일 (27)', kcal: 1850, target: 2100, status: 'GOOD' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Overview Stat Cards */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">주간 평균 섭취</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              1,840
            </span>
            <span className="text-xs text-slate-500 font-bold">kcal</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            목표 대비 -260 kcal 안정권
          </span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">연속 기록 달성</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-blue-600 tabular-nums">
              14
            </span>
            <span className="text-xs text-slate-500 font-bold">일 연속</span>
          </div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
            🔥 식단 기록 스트릭 진행 중
          </span>
        </div>
      </section>

      {/* Weekly Bar Chart */}
      <section className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-blue-600" />
            <h3 className="text-base font-bold text-slate-900">주간 칼로리 섭취 추이</h3>
          </div>
          <span className="text-xs text-slate-400">기준선 2,100 kcal</span>
        </div>

        {/* Bar container */}
        <div className="flex items-end justify-between gap-2 h-44 pt-6 pb-2 border-b border-slate-100">
          {weeklyData.map((item, idx) => {
            const heightPercent = Math.min(100, Math.round((item.kcal / 2800) * 100));
            const isTargetExceeded = item.kcal > item.target;

            let barColor = 'bg-blue-500';
            if (item.isToday) barColor = 'bg-blue-600 ring-2 ring-blue-400/40';
            if (isTargetExceeded) barColor = 'bg-rose-500';
            if (item.kcal < 1300) barColor = 'bg-amber-400';

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-500 tabular-nums">
                  {item.kcal}
                </span>
                <div className="w-full max-w-[28px] bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${barColor}`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span
                  className={`text-[11px] font-semibold mt-1 ${
                    item.isToday ? 'text-blue-600 font-bold' : 'text-slate-500'
                  }`}
                >
                  {item.day.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>정상 범위</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>목표 초과</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>섭취 부족</span>
          </div>
        </div>
      </section>

      {/* Macro Ratio */}
      <section className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-4 rounded-full bg-cyan-500" />
          <h3 className="text-base font-bold text-slate-900">영양 성분 섭취 비율</h3>
        </div>

        <div className="w-full h-3 rounded-full flex overflow-hidden gap-1">
          <div className="bg-blue-600 h-full rounded-l-full" style={{ width: '48%' }} />
          <div className="bg-emerald-500 h-full" style={{ width: '32%' }} />
          <div className="bg-amber-500 h-full rounded-r-full" style={{ width: '20%' }} />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-xs text-slate-500 font-medium">탄수화물 (48%)</span>
            <p className="text-base font-bold text-blue-700 mt-0.5">185g</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-xs text-slate-500 font-medium">단백질 (32%)</span>
            <p className="text-base font-bold text-emerald-600 mt-0.5">120g</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-xs text-slate-500 font-medium">지방 (20%)</span>
            <p className="text-base font-bold text-amber-600 mt-0.5">48g</p>
          </div>
        </div>
      </section>
    </div>
  );
};
