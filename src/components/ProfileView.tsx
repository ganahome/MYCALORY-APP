import React, { useState } from 'react';
import { UserProfile } from '../types.ts';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onOpenWeightModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenWeightModal,
}) => {
  const [targetCalories, setTargetCalories] = useState(profile.targetCalories);
  const [targetCarbs, setTargetCarbs] = useState(profile.targetCarbs);
  const [targetProtein, setTargetProtein] = useState(profile.targetProtein);
  const [targetFat, setTargetFat] = useState(profile.targetFat);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    onUpdateProfile({
      targetCalories,
      targetCarbs,
      targetProtein,
      targetFat,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Profile Card */}
      <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
        <div className="relative">
          <img
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/20"
            src={profile.avatarUrl}
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
            <span className="text-xs text-blue-600 font-semibold">
              {profile.englishName}
            </span>
          </div>
          <p className="text-xs text-slate-500">{profile.handle}</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={onOpenWeightModal}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium transition-colors"
            >
              현재 {profile.currentWeight.toFixed(1)}kg (수정)
            </button>
            <span className="text-xs text-slate-400">
              목표 {profile.targetWeight.toFixed(1)}kg
            </span>
          </div>
        </div>
      </section>

      {/* Target Goals Configuration */}
      <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-blue-600" />
            <h3 className="text-base font-bold text-slate-900">목표 설정 및 칼로리</h3>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-600 font-bold">
              ✓ 저장되었습니다!
            </span>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            일일 목표 칼로리 (kcal)
          </label>
          <input
            type="number"
            step="50"
            value={targetCalories}
            onChange={(e) => setTargetCalories(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              탄수화물 (g)
            </label>
            <input
              type="number"
              value={targetCarbs}
              onChange={(e) => setTargetCarbs(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              단백질 (g)
            </label>
            <input
              type="number"
              value={targetProtein}
              onChange={(e) => setTargetProtein(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              지방 (g)
            </label>
            <input
              type="number"
              value={targetFat}
              onChange={(e) => setTargetFat(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors mt-2"
        >
          목표 설정 저장
        </button>
      </section>

      {/* Connected Services */}
      <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-4 rounded-full bg-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">연동된 서비스</h3>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600 text-2xl">
              calendar_month
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Google Calendar</p>
              <span className="text-xs text-slate-500">일정 자동 동기화 활성화</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            연동됨
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-rose-500 text-2xl">
              favorite
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Apple / Samsung Health</p>
              <span className="text-xs text-slate-500">걸음 수 및 활동 소모 칼로리</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700 text-xs font-medium">
            동기화 중
          </span>
        </div>
      </section>
    </div>
  );
};
