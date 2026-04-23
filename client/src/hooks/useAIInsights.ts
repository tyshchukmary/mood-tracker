import { useMemo } from 'react';
import { useMoodStore } from '@/store/useMoodStore';
import { LOCALE_KEYS } from '@/services/localization';

export function useAIInsights() {
  const { entries } = useMoodStore();

  const currentMonthInsights = useMemo(() => {
    if (entries.length === 0) {
      return {
        averageMood: 0,
        adviceKey: LOCALE_KEYS.AI_INSIGHTS_NO_DATA
      };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthEntries = entries.filter(entry => {
      const entryDate = new Date(entry.created_at);
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });

    if (monthEntries.length === 0) {
      return {
        averageMood: 0,
        adviceKey: LOCALE_KEYS.AI_INSIGHTS_NO_DATA
      };
    }

    const sum = monthEntries.reduce((acc, entry) => acc + entry.mood_level, 0);
    const average = sum / monthEntries.length;

    let adviceKey: keyof typeof LOCALE_KEYS;
    if (average < 3) {
      adviceKey = LOCALE_KEYS.AI_INSIGHTS_LOW;
    } else if (average <= 4) {
      adviceKey = LOCALE_KEYS.AI_INSIGHTS_MEDIUM;
    } else {
      adviceKey = LOCALE_KEYS.AI_INSIGHTS_HIGH;
    }

    return {
      averageMood: average.toFixed(1),
      adviceKey
    };
  }, [entries]);

  return currentMonthInsights;
}
