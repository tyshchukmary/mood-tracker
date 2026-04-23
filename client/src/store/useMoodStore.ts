import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MoodEntry {
  id: string;
  user_id: string;
  mood_level: number; // 1-5
  note: string;
  activities: string[];
  created_at: string;
}

export interface Activity {
  id: string;
  name: string;
  icon: string;
}

interface MoodState {
  entries: MoodEntry[];
  isLoading: boolean;
  addEntry: (entry: Omit<MoodEntry, 'id' | 'created_at'>) => void;
  setEntries: (entries: MoodEntry[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set) => ({
      entries: [],
      isLoading: false,
      addEntry: (entry) => {
        const newEntry: MoodEntry = {
          ...entry,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
        };
        set((state) => ({ entries: [newEntry, ...state.entries] }));
      },
      setEntries: (entries) => set({ entries }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'mood-storage',
    }
  )
);
