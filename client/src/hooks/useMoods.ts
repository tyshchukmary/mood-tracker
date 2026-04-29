import { useEffect, useMemo, useCallback } from 'react';
import { useMoodStore, type MoodEntry } from '@/store/useMoodStore';
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/useAuthStore';

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
  const { entries, setEntries, isLoading, setLoading, addEntry: addEntryToStore } = useMoodStore();
  const { user } = useAuthStore();

  const fetchEntries = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select(`
          id,
          mood_level,
          note,
          created_at,
          activities:mood_entry_activities(
            activity:activities(name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedEntries: MoodEntry[] = data.map((entry: any) => ({
          id: entry.id,
          user_id: user.id,
          mood_level: entry.mood_level,
          note: entry.note,
          created_at: entry.created_at,
          activities: entry.activities.map((a: any) => a.activity.name),
        }));
        setEntries(formattedEntries);
      }
    } catch (error) {
      console.warn('Supabase fetch failed, falling back to local state/mocks:', error);
      if (entries.length === 0) {
        setEntries(MOCK_ENTRIES);
      }
    } finally {
      setLoading(false);
    }
  }, [user, setEntries, setLoading, entries.length]);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user, fetchEntries]);

  const addMoodEntry = async (entry: Omit<MoodEntry, 'id' | 'created_at'>) => {
    if (!user) {
      addEntryToStore(entry);
      return;
    }

    setLoading(true);
    try {
      // 1. Add mood entry
      const { data: moodData, error: moodError } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood_level: entry.mood_level,
          note: entry.note,
        })
        .select()
        .single();

      if (moodError) throw moodError;

      // 2. Add activities (assuming they exist in the 'activities' table)
      if (entry.activities.length > 0) {
        // First, get activity IDs
        const { data: actData } = await supabase
          .from('activities')
          .select('id, name')
          .in('name', entry.activities);

        if (actData && actData.length > 0) {
          const activityLinks = actData.map(act => ({
            mood_entry_id: moodData.id,
            activity_id: act.id,
          }));
          await supabase.from('mood_entry_activities').insert(activityLinks);
        }
      }

      await fetchEntries();
    } catch (error) {
      console.error('Error adding mood entry to Supabase:', error);
      addEntryToStore(entry); // Fallback to local
    } finally {
      setLoading(false);
    }
  };

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
    addEntry: addMoodEntry,
    moodTrends,
    topActivityOnHappyDays,
    averageMood,
    refreshEntries: fetchEntries
  };
}
