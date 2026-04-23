import { useEffect, useMemo } from 'react';
import { useMoodStore, type MoodEntry } from '@/store/useMoodStore';

const MOCK_ENTRIES: MoodEntry[] = [
  {
    id: '1',
    user_id: 'user1',
    mood_level: 5,
    note: 'Great day at the gym!',
    activities: ['Gym', 'Healthy Food'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '2',
    user_id: 'user1',
    mood_level: 3,
    note: 'Work was a bit stressful.',
    activities: ['Work'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: '3',
    user_id: 'user1',
    mood_level: 4,
    note: 'Had a nice walk.',
    activities: ['Walk', 'Music'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

export function useMoods() {
  const { entries, setEntries, isLoading, setLoading, addEntry } = useMoodStore();

  useEffect(() => {
    if (entries.length === 0) {
      setLoading(true);
      const timer = setTimeout(() => {
        setEntries(MOCK_ENTRIES);
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [entries.length, setEntries, setLoading]);

  const moodTrends = useMemo(() => {
    return entries.slice(0, 7).map(entry => ({
      date: new Date(entry.created_at).toLocaleDateString(undefined, { weekday: 'short' }),
      level: entry.mood_level
    })).reverse();
  }, [entries]);

  const topActivityOnHappyDays = useMemo(() => {
    const happyEntries = entries.filter(e => e.mood_level >= 4);
    const activityCounts: Record<string, number> = {};
    
    happyEntries.forEach(entry => {
      entry.activities.forEach(activity => {
        activityCounts[activity] = (activityCounts[activity] || 0) + 1;
      });
    });

    return Object.entries(activityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  }, [entries]);

  const averageMood = useMemo(() => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.mood_level, 0);
    return (sum / entries.length).toFixed(1);
  }, [entries]);

  return {
    entries,
    isLoading,
    addEntry,
    moodTrends,
    topActivityOnHappyDays,
    averageMood
  };
}
