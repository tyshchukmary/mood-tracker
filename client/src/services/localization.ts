import { create } from 'zustand';

export const LOCALE_KEYS = {
  HOW_ARE_YOU: 'HOW_ARE_YOU',
  ADD_NOTE: 'ADD_NOTE',
  SELECT_ACTIVITY: 'SELECT_ACTIVITY',
  DASHBOARD: 'DASHBOARD',
  HISTORY: 'HISTORY',
  STATS: 'STATS',
  SETTINGS: 'SETTINGS',
  SAVE: 'SAVE',
  CANCEL: 'CANCEL',
  MOOD_LEVEL_1: 'MOOD_LEVEL_1',
  MOOD_LEVEL_2: 'MOOD_LEVEL_2',
  MOOD_LEVEL_3: 'MOOD_LEVEL_3',
  MOOD_LEVEL_4: 'MOOD_LEVEL_4',
  MOOD_LEVEL_5: 'MOOD_LEVEL_5',
  AVERAGE_MOOD: 'AVERAGE_MOOD',
  TOP_ACTIVITY: 'TOP_ACTIVITY',
  THEME_LIGHT: 'THEME_LIGHT',
  THEME_DARK: 'THEME_DARK',
  NOTIFICATIONS: 'NOTIFICATIONS',
  RECENT_MOODS: 'RECENT_MOODS',
  NO_ENTRIES: 'NO_ENTRIES',
  FILTER_BY_MOOD: 'FILTER_BY_MOOD',
  ALL_MOODS: 'ALL_MOODS',
  AI_INSIGHTS_TITLE: 'AI_INSIGHTS_TITLE',
  AI_INSIGHTS_LOW: 'AI_INSIGHTS_LOW',
  AI_INSIGHTS_MEDIUM: 'AI_INSIGHTS_MEDIUM',
  AI_INSIGHTS_HIGH: 'AI_INSIGHTS_HIGH',
  AI_INSIGHTS_NO_DATA: 'AI_INSIGHTS_NO_DATA',
} as const;

type Locale = 'en' | 'uk';

const translations: Record<Locale, Record<string, string>> = {
  en: {
    [LOCALE_KEYS.HOW_ARE_YOU]: 'How are you feeling?',
    [LOCALE_KEYS.ADD_NOTE]: 'Add Note',
    [LOCALE_KEYS.SELECT_ACTIVITY]: 'Select Activity',
    [LOCALE_KEYS.DASHBOARD]: 'Dashboard',
    [LOCALE_KEYS.HISTORY]: 'History',
    [LOCALE_KEYS.STATS]: 'Stats',
    [LOCALE_KEYS.SETTINGS]: 'Settings',
    [LOCALE_KEYS.SAVE]: 'Save',
    [LOCALE_KEYS.CANCEL]: 'Cancel',
    [LOCALE_KEYS.MOOD_LEVEL_1]: 'Awful',
    [LOCALE_KEYS.MOOD_LEVEL_2]: 'Bad',
    [LOCALE_KEYS.MOOD_LEVEL_3]: 'Okay',
    [LOCALE_KEYS.MOOD_LEVEL_4]: 'Good',
    [LOCALE_KEYS.MOOD_LEVEL_5]: 'Amazing',
    [LOCALE_KEYS.AVERAGE_MOOD]: 'Average Mood',
    [LOCALE_KEYS.TOP_ACTIVITY]: 'Top Activity',
    [LOCALE_KEYS.THEME_LIGHT]: 'Light',
    [LOCALE_KEYS.THEME_DARK]: 'Dark',
    [LOCALE_KEYS.NOTIFICATIONS]: 'Notifications',
    [LOCALE_KEYS.RECENT_MOODS]: 'Recent Moods',
    [LOCALE_KEYS.NO_ENTRIES]: 'No entries yet.',
    [LOCALE_KEYS.FILTER_BY_MOOD]: 'Filter by mood',
    [LOCALE_KEYS.ALL_MOODS]: 'All Moods',
    [LOCALE_KEYS.AI_INSIGHTS_TITLE]: 'AI Insights',
    [LOCALE_KEYS.AI_INSIGHTS_LOW]: "It looks like the month has been tough. AI suggests taking some time for rest and trying breathing techniques.",
    [LOCALE_KEYS.AI_INSIGHTS_MEDIUM]: "Your state is stable. AI recommends maintaining a balance between work and study.",
    [LOCALE_KEYS.AI_INSIGHTS_HIGH]: "Great result! Your energy level is high, it's a good time for new achievements.",
    [LOCALE_KEYS.AI_INSIGHTS_NO_DATA]: "Not enough data for analysis yet. Keep tracking your mood!",
  },
  uk: {
    [LOCALE_KEYS.HOW_ARE_YOU]: 'Як ви почуваєтесь?',
    [LOCALE_KEYS.ADD_NOTE]: 'Додати замітку',
    [LOCALE_KEYS.SELECT_ACTIVITY]: 'Оберіть активність',
    [LOCALE_KEYS.DASHBOARD]: 'Дашборд',
    [LOCALE_KEYS.HISTORY]: 'Історія',
    [LOCALE_KEYS.STATS]: 'Статистика',
    [LOCALE_KEYS.SETTINGS]: 'Налаштування',
    [LOCALE_KEYS.SAVE]: 'Зберегти',
    [LOCALE_KEYS.CANCEL]: 'Скасувати',
    [LOCALE_KEYS.MOOD_LEVEL_1]: 'Жахливо',
    [LOCALE_KEYS.MOOD_LEVEL_2]: 'Погано',
    [LOCALE_KEYS.MOOD_LEVEL_3]: 'Нормально',
    [LOCALE_KEYS.MOOD_LEVEL_4]: 'Добре',
    [LOCALE_KEYS.MOOD_LEVEL_5]: 'Чудово',
    [LOCALE_KEYS.AVERAGE_MOOD]: 'Середній настрій',
    [LOCALE_KEYS.TOP_ACTIVITY]: 'Топ активність',
    [LOCALE_KEYS.THEME_LIGHT]: 'Світла',
    [LOCALE_KEYS.THEME_DARK]: 'Темна',
    [LOCALE_KEYS.NOTIFICATIONS]: 'Сповіщення',
    [LOCALE_KEYS.RECENT_MOODS]: 'Останні записи',
    [LOCALE_KEYS.NO_ENTRIES]: 'Записів ще немає.',
    [LOCALE_KEYS.FILTER_BY_MOOD]: 'Фільтрувати за настроєм',
    [LOCALE_KEYS.ALL_MOODS]: 'Всі настрої',
    [LOCALE_KEYS.AI_INSIGHTS_TITLE]: 'ШІ-поради',
    [LOCALE_KEYS.AI_INSIGHTS_LOW]: 'Схоже, місяць видався непростим. ШІ радить приділити час відпочинку та спробувати техніки дихання.',
    [LOCALE_KEYS.AI_INSIGHTS_MEDIUM]: 'Твій стан стабільний. ШІ рекомендує підтримувати баланс між роботою та навчанням.',
    [LOCALE_KEYS.AI_INSIGHTS_HIGH]: 'Чудовий результат! Твій рівень енергії високий, це гарний час для нових звершень.',
    [LOCALE_KEYS.AI_INSIGHTS_NO_DATA]: 'Ще недостатньо даних для аналізу. Продовжуйте відзначати свій настрій!',
  },
};

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
}));

export function useTranslation() {
  const { locale } = useLocaleStore();
  
  const t = (key: keyof typeof LOCALE_KEYS) => {
    return translations[locale][key] || key;
  };
  
  return { t, locale, setLocale: useLocaleStore.getState().setLocale };
}
