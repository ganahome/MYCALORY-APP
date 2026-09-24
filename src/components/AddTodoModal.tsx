import React, { useState } from 'react';
import { TodoCategory, TodoItem } from '../types.ts';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDayNum: number;
  onAddTodo: (todo: Omit<TodoItem, 'id'>) => void;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isOpen,
  onClose,
  selectedDayNum,
  onAddTodo,
}) => {
  const [type, setType] = useState<'diet' | 'workout' | 'schedule'>('diet');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('13:00 PM');
  const [calories, setCalories] = useState<number>(350);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const quickPresets = {
    diet: [
      { name: '닭가슴살 샐러드', kcal: 320 },
      { name: '현미밥 & 소고기', kcal: 540 },
      { name: '단백질 쉐이크', kcal: 180 },
      { name: '그릭 요거트 & 그래놀라', kcal: 250 },
    ],
    workout: [
      { name: '하체 스쿼트 & 런지 40분', kcal: -320 },
      { name: '인터벌 트레드밀 러닝 30분', kcal: -280 },
      { name: '상체 덤벨 웨이트 50분', kcal: -310 },
      { name: '전신 스트레칭 & 코어 20분', kcal: -120 },
    ],
    schedule: [
      { name: '피트니스 센터 상담', kcal: 0 },
      { name: '인바디 체성분 측정', kcal: 0 },
      { name: '주간 식단 장보기', kcal: 0 },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let category: TodoCategory = 'pending';
    let categoryLabel = '미완료';

    if (type === 'diet') {
      category = 'diet';
      categoryLabel = '식단 체크리스트';
    } else if (type === 'workout') {
      category = 'sync-calendar';
      categoryLabel = '운동 일정';
    } else {
      category = 'google-calendar';
      categoryLabel = 'Google Calendar';
    }

    let subtext = note;
    if (!subtext) {
      if (type === 'diet') {
        subtext = `${calories} kcal 기록 예정`;
      } else if (type === 'workout') {
        subtext = `소모 ${Math.abs(calories)} kcal 예정`;
      } else {
        subtext = '캘린더 일정';
      }
    }

    onAddTodo({
      time,
      category,
      categoryLabel,
      title: title.trim(),
      subtext,
      completed: false,
      calories,
      type,
      location: type === 'schedule' ? note : undefined,
    });

    setTitle('');
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              새 일정 &amp; 식단 추가
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedDayNum}일 플래너에 항목을 추가합니다
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Type Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setType('diet');
              setCalories(350);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              type === 'diet'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🍽️ 식단 기록
          </button>
          <button
            type="button"
            onClick={() => {
              setType('workout');
              setCalories(-280);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              type === 'workout'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏃 운동 기록
          </button>
          <button
            type="button"
            onClick={() => {
              setType('schedule');
              setCalories(0);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              type === 'schedule'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📅 일반 일정
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-3">
          <span className="text-[11px] font-semibold text-slate-400">
            빠른 선택 프리셋
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {quickPresets[type].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setTitle(preset.name);
                  setCalories(preset.kcal);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700 text-xs hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                {preset.name}
                {preset.kcal !== 0 && (
                  <span className="ml-1 text-[10px] text-slate-400">
                    ({preset.kcal > 0 ? `+${preset.kcal}` : preset.kcal} kcal)
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              내용 및 제목
            </label>
            <input
              type="text"
              required
              placeholder={
                type === 'diet'
                  ? '예: 닭가슴살 볶음밥 & 방울토마토'
                  : type === 'workout'
                  ? '예: 실내 사이클 45분'
                  : '예: 헬스장 인바디 측정'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                시간
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="예: 12:30 PM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {type === 'workout' ? '소모 칼로리' : '칼로리 (kcal)'}
              </label>
              <input
                type="number"
                value={Math.abs(calories)}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCalories(type === 'workout' ? -Math.abs(val) : Math.abs(val));
                }}
                placeholder="0"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              메모 또는 장소 (선택)
            </label>
            <input
              type="text"
              placeholder="예: 강남 핏스튜디오 3층, 드레싱 적게"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
            >
              추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
