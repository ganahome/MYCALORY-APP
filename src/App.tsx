import { useState } from 'react';
import { AddTodoModal } from './components/AddTodoModal.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { CalendarSection } from './components/CalendarSection.tsx';
import { FoodLogView } from './components/FoodLogView.tsx';
import { Header } from './components/Header.tsx';
import { ProfileView } from './components/ProfileView.tsx';
import { RecentReportSection } from './components/RecentReportSection.tsx';
import { TopHeroCard } from './components/TopHeroCard.tsx';
import { WeightModal } from './components/WeightModal.tsx';
import {
  INITIAL_PROFILE,
  INITIAL_REPORT_DAYS,
  INITIAL_TODOS,
} from './data/mockData.ts';
import { DayRecord, TabType, TodoItem, UserProfile } from './types.ts';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [reportDays, setReportDays] = useState<DayRecord[]>(INITIAL_REPORT_DAYS);
  const [selectedDayNum, setSelectedDayNum] = useState<number>(24);
  const [todos, setTodos] = useState<Record<number, TodoItem[]>>(INITIAL_TODOS);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [isCalendarSynced, setIsCalendarSynced] = useState(true);

  // Today's report record
  const todayRecord = reportDays.find((d) => d.dayNum === 24) || reportDays[0];

  // Current day's todos
  const currentTodos = todos[selectedDayNum] || [];

  // Toggle todo completion
  const handleToggleTodo = (id: string) => {
    setTodos((prev) => {
      const dayList = prev[selectedDayNum] || [];
      const updatedList = dayList.map((item) => {
        if (item.id === id) {
          const newCompleted = !item.completed;
          return { ...item, completed: newCompleted };
        }
        return item;
      });

      return { ...prev, [selectedDayNum]: updatedList };
    });

    // If on day 24, dynamically adjust calorie reflection if toggled
    const targetItem = (todos[selectedDayNum] || []).find((t) => t.id === id);
    if (targetItem && selectedDayNum === 24 && targetItem.calories) {
      const willBeCompleted = !targetItem.completed;
      const calorieDelta = willBeCompleted ? targetItem.calories : -targetItem.calories;

      setReportDays((prev) =>
        prev.map((d) => {
          if (d.dayNum === 24) {
            // For diet, intake increases. For workouts, burns do not increase intake
            const newEaten = targetItem.type === 'diet' 
              ? Math.max(0, d.caloriesEaten + calorieDelta)
              : d.caloriesEaten;
            const newPercentage = Math.round((newEaten / d.calorieTarget) * 100);
            return {
              ...d,
              caloriesEaten: newEaten,
              percentage: newPercentage,
              statusText: `${newPercentage}% 달성 (${newPercentage >= 115 ? '초과' : newPercentage >= 70 ? '순항 중' : '부족'})`,
            };
          }
          return d;
        })
      );
    }
  };

  // Add new todo/schedule/diet item
  const handleAddTodo = (newTodoData: Omit<TodoItem, 'id'>) => {
    const newId = `todo-${Date.now()}`;
    const newTodo: TodoItem = {
      ...newTodoData,
      id: newId,
    };

    setTodos((prev) => {
      const dayList = prev[selectedDayNum] || [];
      return {
        ...prev,
        [selectedDayNum]: [...dayList, newTodo],
      };
    });

    // If adding a meal to today (24th), optionally update eaten calories
    if (selectedDayNum === 24 && newTodoData.type === 'diet' && newTodoData.calories) {
      setReportDays((prev) =>
        prev.map((d) => {
          if (d.dayNum === 24) {
            const newEaten = d.caloriesEaten + (newTodoData.calories || 0);
            const newPct = Math.round((newEaten / d.calorieTarget) * 100);
            return {
              ...d,
              caloriesEaten: newEaten,
              percentage: newPct,
              statusText: `${newPct}% 달성 (${newPct >= 115 ? '초과' : newPct >= 70 ? '순항 중' : '부족'})`,
              carbs: d.carbs + Math.round((newTodoData.calories || 0) * 0.12),
              protein: d.protein + Math.round((newTodoData.calories || 0) * 0.08),
              fat: d.fat + Math.round((newTodoData.calories || 0) * 0.03),
            };
          }
          return d;
        })
      );
    }
  };

  // Update weight
  const handleUpdateWeight = (newWeight: number, newTarget?: number) => {
    setProfile((prev) => {
      const diff = Math.round((newWeight - prev.currentWeight) * 10) / 10;
      return {
        ...prev,
        currentWeight: newWeight,
        weeklyChange: diff !== 0 ? diff : prev.weeklyChange,
        targetWeight: newTarget ?? prev.targetWeight,
      };
    });
  };

  // Update profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    if (updated.targetCalories) {
      setReportDays((prev) =>
        prev.map((d) => {
          const newPct = Math.round((d.caloriesEaten / (updated.targetCalories || 2100)) * 100);
          return {
            ...d,
            calorieTarget: updated.targetCalories || 2100,
            percentage: newPct,
          };
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center">
      {/* Mobile Shell Wrapper */}
      <div className="w-full max-w-md bg-[#f8fafc] min-h-screen flex flex-col relative shadow-xl">
        {/* Top Header */}
        <Header
          profile={profile}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          targetCalories={profile.targetCalories}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative w-full pt-28 pb-24 px-4 bg-[#f8fafc]">
          {activeTab === 'home' && (
            <div className="flex flex-col w-full gap-5">
              {/* 1. [상단 영역: Top Box Section] */}
              <TopHeroCard
                profile={profile}
                caloriesEaten={todayRecord.caloriesEaten}
                targetCalories={todayRecord.calorieTarget}
                carbs={todayRecord.carbs}
                protein={todayRecord.protein}
                fat={todayRecord.fat}
                onOpenWeightModal={() => setIsWeightModalOpen(true)}
              />

              {/* 2. [중단 영역: Middle Section - Daily Achievement & Status] */}
              <RecentReportSection
                days={reportDays}
                selectedDayNum={selectedDayNum}
                onSelectDay={(dayNum) => setSelectedDayNum(dayNum)}
              />

              {/* 3. [하단 영역: Bottom Section - Calendar API Schedule & Todo List] */}
              <CalendarSection
                selectedDayNum={selectedDayNum}
                onSelectDay={(dayNum) => setSelectedDayNum(dayNum)}
                todos={currentTodos}
                onToggleTodo={handleToggleTodo}
                onOpenAddModal={() => setIsAddModalOpen(true)}
                isCalendarSynced={isCalendarSynced}
                onToggleSync={() => setIsCalendarSynced((prev) => !prev)}
              />
            </div>
          )}

          {activeTab === 'log' && (
            <FoodLogView
              profile={profile}
              todos={currentTodos}
              caloriesEaten={todayRecord.caloriesEaten}
              carbs={todayRecord.carbs}
              protein={todayRecord.protein}
              fat={todayRecord.fat}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onToggleTodo={handleToggleTodo}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView profile={profile} />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onOpenWeightModal={() => setIsWeightModalOpen(true)}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Modals */}
        <AddTodoModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          selectedDayNum={selectedDayNum}
          onAddTodo={handleAddTodo}
        />

        <WeightModal
          isOpen={isWeightModalOpen}
          onClose={() => setIsWeightModalOpen(false)}
          profile={profile}
          onUpdateWeight={handleUpdateWeight}
        />
      </div>
    </div>
  );
}
