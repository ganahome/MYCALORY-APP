export type TabType = 'home' | 'log' | 'analytics' | 'profile';

export type TodoCategory = 'google-calendar' | 'diet' | 'sync-calendar' | 'pending';

export interface TodoItem {
  id: string;
  time: string;
  category: TodoCategory;
  categoryLabel: string;
  title: string;
  subtext: string;
  completed: boolean;
  calories?: number; // positive for intake, negative for burned
  type: 'diet' | 'workout' | 'schedule';
  location?: string;
}

export interface DayRecord {
  dateStr: string; // e.g., "24(목)"
  dayName: string; // "월", "화", ...
  dayNum: number;  // 21, 22, ...
  isToday?: boolean;
  caloriesEaten: number;
  calorieTarget: number;
  percentage: number;
  status: 'GOOD' | 'BAD' | 'LOW';
  statusText: string;
  carbs: number; // in grams
  protein: number;
  fat: number;
}

export interface UserProfile {
  name: string;
  englishName: string;
  handle: string;
  currentWeight: number;
  weeklyChange: number; // e.g. -0.3
  targetWeight: number;
  targetCalories: number;
  targetCarbs: number;
  targetProtein: number;
  targetFat: number;
  avatarUrl: string;
  isCalendarSynced: boolean;
}
