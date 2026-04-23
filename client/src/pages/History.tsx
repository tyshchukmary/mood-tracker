import { useState, useMemo } from 'react';
import { useTranslation, LOCALE_KEYS } from '@/services/localization';
import { useMoods } from '@/hooks/useMoods';
import { Card } from '@/components/common/Card';
import { Frown, Meh, Smile, Heart, Star } from 'lucide-react';
import { cn } from '@/services/utils';

const MOOD_ICONS: Record<number, any> = {
  1: { icon: Frown, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30' },
  2: { icon: Meh, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  3: { icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-950/30' },
  4: { icon: Heart, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30' },
  5: { icon: Star, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
};

export function History() {
  const { t } = useTranslation();
  const { entries, isLoading } = useMoods();
  const [filter, setFilter] = useState<number | null>(null);

  const filteredEntries = useMemo(() => {
    if (!filter) return entries;
    return entries.filter(e => e.mood_level === filter);
  }, [entries, filter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t(LOCALE_KEYS.HISTORY)}</h2>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border whitespace-nowrap",
              filter === null
                ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
            )}
          >
            {t(LOCALE_KEYS.ALL_MOODS)}
          </button>
          {[1, 2, 3, 4, 5].map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border flex items-center space-x-1 whitespace-nowrap",
                filter === level
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
              )}
            >
              <span>{level}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
        {filteredEntries.length === 0 ? (
          <p className="text-center text-gray-500 py-12">{t(LOCALE_KEYS.NO_ENTRIES)}</p>
        ) : (
          filteredEntries.map((entry, i) => {
            const MoodIcon = MOOD_ICONS[entry.mood_level].icon;
            const moodData = MOOD_ICONS[entry.mood_level];
            
            return (
              <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 shadow-sm z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 bg-white dark:bg-gray-800">
                  <MoodIcon className={cn("h-5 w-5", moodData.color)} />
                </div>
                
                {/* Content */}
                <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-400">
                      {new Date(entry.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider", moodData.bg, moodData.color)}>
                       {t(`MOOD_LEVEL_${entry.mood_level}` as any)}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-3 line-clamp-2">
                      "{entry.note}"
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {entry.activities.map(activity => (
                      <span key={activity} className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        {activity}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}
