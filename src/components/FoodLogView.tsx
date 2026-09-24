import React from 'react';
import { TodoItem, UserProfile } from '../types.ts';

interface FoodLogViewProps {
  profile: UserProfile;
  todos: TodoItem[];
  caloriesEaten: number;
  carbs: number;
  protein: number;
  fat: number;
  onOpenAddModal: () => void;
  onToggleTodo: (id: string) => void;
}

export const FoodLogView: React.FC<FoodLogViewProps> = ({
  profile,
  todos,
  caloriesEaten,
  carbs,
  protein,
  fat,
  onOpenAddModal,
  onToggleTodo,
}) => {
  const dietItems = todos.filter((t) => t.type === 'diet');
  const workoutItems = todos.filter((t) => t.type === 'workout');

  return (
    <div className="flex flex-col gap-5">
      {/* Top Banner Summary */}
      <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">오늘의 식단 리포트</h2>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
            목표 {profile.targetCalories.toLocaleString()} kcal
          </span>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-around text-center">
          <div>
            <span className="text-xs text-slate-500 font-medium">섭취 칼로리</span>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5 tabular-nums">
              {caloriesEaten.toLocaleString()}
              <span className="text-xs font-normal text-slate-500 ml-1">kcal</span>
            </p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <span className="text-xs text-slate-500 font-medium">남은 여유</span>
            <p className="text-xl font-extrabold text-blue-600 mt-0.5 tabular-nums">
              {Math.max(0, profile.targetCalories - caloriesEaten).toLocaleString()}
              <span className="text-xs font-normal text-blue-500 ml-1">kcal</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 text-center">
            <span className="text-[11px] text-blue-800 font-semibold">탄수화물</span>
            <p className="text-sm font-bold text-blue-900 mt-0.5">{carbs}g</p>
            <span className="text-[10px] text-slate-400">/ {profile.targetCarbs}g</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-center">
            <span className="text-[11px] text-emerald-800 font-semibold">단백질</span>
            <p className="text-sm font-bold text-emerald-900 mt-0.5">{protein}g</p>
            <span className="text-[10px] text-slate-400">/ {profile.targetProtein}g</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 text-center">
            <span className="text-[11px] text-amber-800 font-semibold">지방</span>
            <p className="text-sm font-bold text-amber-900 mt-0.5">{fat}g</p>
            <span className="text-[10px] text-slate-400">/ {profile.targetFat}g</span>
          </div>
        </div>
      </section>

      {/* Diet Items */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">식단 기록 목록</h3>
          </div>
          <button
            onClick={onOpenAddModal}
            className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            식단 추가
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {dietItems.length === 0 ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 text-center text-slate-400 text-sm">
              기록된 식단이 없습니다.
            </div>
          ) : (
            dietItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      restaurant
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-400">{item.time}</span>
                      <span className="text-xs font-bold text-blue-600">
                        +{item.calories || 0} kcal
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <span className="text-xs text-slate-400">{item.subtext}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleTodo(item.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    item.completed
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {item.completed ? 'check' : 'radio_button_unchecked'}
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Workout Items */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">운동 &amp; 활동 소모</h3>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {workoutItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    directions_run
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-slate-400">{item.time}</span>
                    <span className="text-xs font-bold text-emerald-600">
                      소모 {Math.abs(item.calories || 0)} kcal
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <span className="text-xs text-slate-400">{item.subtext}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleTodo(item.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                  item.completed
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-xs'
                    : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {item.completed ? 'done' : 'radio_button_unchecked'}
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
