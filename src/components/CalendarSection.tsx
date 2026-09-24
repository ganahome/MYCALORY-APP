import React, { useState } from 'react';
import { WEEK_DAYS } from '../data/mockData.ts';
import { TodoItem } from '../types.ts';

interface CalendarSectionProps {
  selectedDayNum: number;
  onSelectDay: (dayNum: number) => void;
  todos: TodoItem[];
  onToggleTodo: (id: string) => void;
  onOpenAddModal: () => void;
  isCalendarSynced: boolean;
  onToggleSync: () => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  selectedDayNum,
  onSelectDay,
  todos,
  onToggleTodo,
  onOpenAddModal,
  isCalendarSynced,
  onToggleSync,
}) => {
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const handleSyncClick = () => {
    onToggleSync();
    setSyncToast('Google Calendar가 성공적으로 동기화되었습니다.');
    setTimeout(() => {
      setSyncToast(null);
    }, 2500);
  };

  return (
    <section className="flex flex-col gap-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-blue-600" />
          <h2 className="text-[18px] text-slate-900 font-bold tracking-tight">
            캘린더 일정 &amp; 식단·운동 할 일
          </h2>
        </div>

        <button
          onClick={handleSyncClick}
          type="button"
          className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          title="Google Calendar 동기화"
        >
          <span className="material-symbols-outlined text-[14px] animate-spin-reverse">
            sync
          </span>
          <span>{isCalendarSynced ? 'Google Cal 연동됨' : 'Google Cal 연동'}</span>
        </button>
      </div>

      {/* Sync Toast Notification */}
      {syncToast && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined text-[16px] text-emerald-600">
            check_circle
          </span>
          <span>{syncToast}</span>
        </div>
      )}

      {/* 7-Day Week Scroller */}
      <div className="grid grid-cols-7 gap-1.5 p-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        {WEEK_DAYS.map((day) => {
          const isActive = selectedDayNum === day.dayNum;
          const weekendColor = day.weekendColor || 'text-slate-700';

          if (isActive) {
            return (
              <button
                key={day.dayNum}
                onClick={() => onSelectDay(day.dayNum)}
                type="button"
                className="flex flex-col items-center py-2 rounded-xl bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.35)] transition-all transform scale-[1.02]"
              >
                <span className="text-[10px] font-bold">
                  {day.dayName}
                </span>
                <span className="text-[15px] font-extrabold mt-0.5 tabular-nums">
                  {day.dayNum}
                </span>
                <span className="w-1 h-1 rounded-full bg-white mt-1" />
              </button>
            );
          }

          return (
            <button
              key={day.dayNum}
              onClick={() => onSelectDay(day.dayNum)}
              type="button"
              className="flex flex-col items-center py-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <span className={`text-[10px] font-semibold ${day.weekendColor ? day.weekendColor : ''}`}>
                {day.dayName}
              </span>
              <span className={`text-[15px] font-semibold mt-0.5 tabular-nums ${weekendColor}`}>
                {day.dayNum}
              </span>
            </button>
          );
        })}
      </div>

      {/* Task & Todo List */}
      <div className="flex flex-col gap-2.5">
        {todos.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-slate-200/80 text-center text-slate-400 text-sm">
            <span className="material-symbols-outlined text-3xl mb-1 text-slate-300">
              event_available
            </span>
            <p>등록된 일정 또는 식단이 없습니다.</p>
          </div>
        ) : (
          todos.map((item) => {
            // Icon and styling based on category
            let iconName = 'directions_run';
            let iconBoxClass = 'bg-blue-50 border-blue-100 text-blue-600';
            let tagClass = 'bg-blue-50 border-blue-200/60 text-blue-700';

            if (item.category === 'diet') {
              iconName = 'restaurant';
              iconBoxClass = 'bg-emerald-50 border-emerald-100 text-emerald-600';
              tagClass = 'bg-emerald-50 border-emerald-200/60 text-emerald-700';
            } else if (item.category === 'sync-calendar') {
              iconName = 'fitness_center';
              iconBoxClass = 'bg-indigo-50 border-indigo-100 text-indigo-600';
              tagClass = 'bg-indigo-50 border-indigo-200/60 text-indigo-700';
            } else if (item.category === 'pending') {
              iconName = 'edit_note';
              iconBoxClass = 'bg-sky-50 border-sky-100 text-sky-600';
              tagClass = 'bg-slate-100 border-slate-200 text-slate-600';
            }

            // Checkbox styling
            let checkButton = (
              <button
                type="button"
                onClick={() => onToggleTodo(item.id)}
                aria-label={item.completed ? '완료 취소' : '완료 체크'}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 shrink-0 border border-slate-200 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">
                  radio_button_unchecked
                </span>
              </button>
            );

            if (item.completed) {
              if (item.category === 'google-calendar') {
                checkButton = (
                  <button
                    type="button"
                    onClick={() => onToggleTodo(item.id)}
                    aria-label="완료됨"
                    className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 transition-all active:scale-95 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      done
                    </span>
                  </button>
                );
              } else {
                checkButton = (
                  <button
                    type="button"
                    onClick={() => onToggleTodo(item.id)}
                    aria-label="완료됨"
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      check
                    </span>
                  </button>
                );
              }
            }

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start justify-between transition-all hover:border-slate-300"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center mt-0.5 shrink-0 ${iconBoxClass}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {iconName}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${tagClass}`}
                      >
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs text-slate-400 tabular-nums">
                        {item.time}
                      </span>
                    </div>

                    <p
                      className={`text-[14px] font-semibold leading-snug transition-colors ${
                        item.completed ? 'text-slate-900' : 'text-slate-800'
                      }`}
                    >
                      {item.title}
                    </p>

                    {/* Subtext info */}
                    {item.category === 'google-calendar' && (
                      <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          check
                        </span>
                        {item.subtext}
                      </span>
                    )}

                    {item.category === 'diet' && (
                      <span className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          restaurant_menu
                        </span>
                        {item.subtext}
                      </span>
                    )}

                    {item.category === 'sync-calendar' && (
                      <span className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">
                          location_on
                        </span>
                        {item.subtext}
                      </span>
                    )}

                    {item.category === 'pending' && (
                      <span className="text-[11px] text-slate-400 mt-1">
                        {item.subtext}
                      </span>
                    )}
                  </div>
                </div>

                {checkButton}
              </div>
            );
          })
        )}
      </div>

      {/* Add New Schedule / Meal Button */}
      <button
        type="button"
        onClick={onOpenAddModal}
        className="w-full h-12 rounded-2xl bg-white border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50/50 text-blue-700 flex items-center justify-center gap-2 transition-all duration-150 shadow-xs mt-1 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span className="material-symbols-outlined text-[20px] text-blue-600">
          add_circle
        </span>
        <span className="text-[14px] font-bold tracking-tight">
          + 새 일정 / 식단 추가
        </span>
      </button>
    </section>
  );
};
