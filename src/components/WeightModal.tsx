import React, { useState } from 'react';
import { UserProfile } from '../types.ts';

interface WeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateWeight: (newWeight: number, targetWeight?: number) => void;
}

export const WeightModal: React.FC<WeightModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateWeight,
}) => {
  const [weight, setWeight] = useState<number>(profile.currentWeight);
  const [target, setTarget] = useState<number>(profile.targetWeight);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWeight(Number(weight), Number(target));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col animate-scale-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">체중 기록 &amp; 목표</h3>
            <p className="text-xs text-slate-500">오늘의 측정 체중을 업데이트하세요</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4 mt-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
            <span className="text-xs font-semibold text-slate-500">현재 체중</span>
            <div className="flex items-center justify-center gap-3 my-2">
              <button
                type="button"
                onClick={() => setWeight((prev) => Math.round((prev - 0.1) * 10) / 10)}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                  {weight.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-slate-500">kg</span>
              </div>
              <button
                type="button"
                onClick={() => setWeight((prev) => Math.round((prev + 0.1) * 10) / 10)}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              목표({target.toFixed(1)}kg)까지 {(weight - target).toFixed(1)}kg 남음
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              목표 체중 (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
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
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
