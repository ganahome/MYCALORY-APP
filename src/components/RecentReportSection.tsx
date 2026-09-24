import React from 'react';
import { DayRecord } from '../types.ts';

interface RecentReportSectionProps {
  days: DayRecord[];
  selectedDayNum: number;
  onSelectDay: (dayNum: number) => void;
}

export const RecentReportSection: React.FC<RecentReportSectionProps> = ({
  days,
  selectedDayNum,
  onSelectDay,
}) => {
  return (
    <section className="flex flex-col gap-3">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-blue-600" />
          <h2 className="text-[18px] text-slate-900 font-bold tracking-tight">
            일일 목표 달성 현황
          </h2>
        </div>
        <span className="text-xs text-blue-600 font-semibold">
          최근 4일 리포트
        </span>
      </div>

      {/* 4-Day Report Cards */}
      <div className="flex flex-col gap-2.5">
        {days.map((item) => {
          const isSelected = selectedDayNum === item.dayNum;
          const isToday = item.isToday;

          // Badges and status visuals
          let statusBadge = (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isToday ? 'check_circle' : 'verified'}
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase">
                GOOD
              </span>
            </div>
          );

          if (item.status === 'BAD') {
            statusBadge = (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 shrink-0">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  error
                </span>
                <span className="text-[11px] font-bold tracking-wider uppercase">
                  BAD
                </span>
              </div>
            );
          } else if (item.status === 'LOW') {
            statusBadge = (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  warning
                </span>
                <span className="text-[11px] font-bold tracking-wider uppercase">
                  LOW
                </span>
              </div>
            );
          }

          if (isToday) {
            return (
              <div
                key={item.dateStr}
                onClick={() => onSelectDay(item.dayNum)}
                className={`rounded-2xl p-4 bg-white border cursor-pointer transition-all duration-150 relative overflow-hidden flex items-center justify-between ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-blue-200/90 shadow-[0_4px_12px_rgba(37,99,235,0.06)]'
                }`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />
                <div className="flex items-center gap-3 pl-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] text-blue-600 font-bold leading-tight">
                      오늘
                    </span>
                    <span className="text-[13px] font-extrabold text-blue-900 leading-tight">
                      {item.dateStr}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-slate-900 tabular-nums">
                      {item.caloriesEaten.toLocaleString()} / {item.calorieTarget.toLocaleString()} kcal
                    </span>
                    <span className="text-xs text-blue-600 font-medium">
                      {item.statusText}
                    </span>
                  </div>
                </div>

                {statusBadge}
              </div>
            );
          }

          // Other days
          const prefix = item.dayNum === 23 ? '어제' : item.dayName;
          const statusTextColor =
            item.status === 'BAD'
              ? 'text-rose-600 font-medium'
              : item.status === 'LOW'
              ? 'text-amber-600 font-medium'
              : 'text-slate-500';

          return (
            <div
              key={item.dateStr}
              onClick={() => onSelectDay(item.dayNum)}
              className={`rounded-2xl p-3.5 bg-white border cursor-pointer transition-all duration-150 flex items-center justify-between shadow-xs hover:border-slate-300 ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-slate-200/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] text-slate-500 font-semibold leading-tight">
                    {prefix}
                  </span>
                  <span className="text-[13px] font-bold text-slate-800 leading-tight">
                    {item.dateStr}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-slate-800 tabular-nums">
                    {item.caloriesEaten.toLocaleString()} / {item.calorieTarget.toLocaleString()} kcal
                  </span>
                  <span className={`text-xs ${statusTextColor}`}>
                    {item.statusText}
                  </span>
                </div>
              </div>

              {statusBadge}
            </div>
          );
        })}
      </div>
    </section>
  );
};
