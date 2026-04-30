import { useEffect, useMemo, useCallback } from 'react';
import { useMoodStore, type MoodEntry } from '@/store/useMoodStore';
import { supabase } from '@/services/supabase';

// Тимчасові дані, якщо база порожня
const MOCK_ENTRIES: MoodEntry[] = [
  {
    id: '1',
    user_id: 'user1',
    mood_level: 5,
    note: 'Вітаємо! Тут з’являться твої записи.',
    activities: [],
    created_at: new Date().toISOString(),
  }
];

export function useMoods() {
  const { entries, setEntries, isLoading, setLoading, addEntry: addEntryToStore } = useMoodStore();

  // 1. ЗАВАНТАЖЕННЯ ЗАПИСІВ
  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*') // Беремо всі колонки
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedEntries: MoodEntry[] = data.map((entry: any) => ({
          id: entry.id,
          user_id: entry.user_id || 'guest',
          mood_level: entry.mood_level,
          note: entry.note || '',
          created_at: entry.created_at,
          activities: [], // Поки що пустий масив, щоб не ламати інтерфейс
        }));
        setEntries(formattedEntries);
      } else if (entries.length === 0) {
        setEntries(MOCK_ENTRIES);
      }
    } catch (error) {
      console.error('Supabase fetch failed:', error);
      if (entries.length === 0) setEntries(MOCK_ENTRIES);
    } finally {
      setLoading(false);
    }
  }, [setEntries, setLoading, entries.length]);

  // Завантажуємо при старті додатка
  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // 2. ДОДАВАННЯ НОВОГО ЗАПИСУ
  const addMoodEntry = async (entry: Omit<MoodEntry, 'id' | 'created_at'>) => {
    setLoading(true);
    try {
      // Записуємо в Supabase
      const { error: moodError } = await supabase
        .from('mood_entries')
        .insert({
          mood_level: entry.mood_level,
          note: entry.note,
          // user_id не передаємо, бо ми зробили його необов'язковим у SQL
        });

      if (moodError) throw moodError;

      // Після успішного запису оновлюємо список з бази
      await fetchEntries();
      
    } catch (error) {
      console.error('Error adding mood entry to Supabase:', error);
      // Якщо помилка (наприклад, немає інтернету) — зберігаємо локально
      addEntryToStore(entry); 
    } finally {
      setLoading(false);
    }
  };

  // 3. СТАТИСТИКА (залишаємо без змін)
  const moodTrends = useMemo(() => {
    return entries.slice(0, 7).map(entry => ({
      date: new Date(entry.created_at).toLocaleDateString(undefined, { weekday: 'short' }),
      level: entry.mood_level
    })).reverse();
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
    averageMood,
    refreshEntries: fetchEntries
  };
}