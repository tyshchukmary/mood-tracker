import { useState } from 'react';
import { useTranslation, LOCALE_KEYS } from '@/services/localization';
import { useMoods } from '@/hooks/useMoods';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Frown, Meh, Smile, Heart, Star } from 'lucide-react';
import { cn } from '@/services/utils';

const MOODS = [
  { level: 1, icon: Frown, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30' },
  { level: 2, icon: Meh, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { level: 3, icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-950/30' },
  { level: 4, icon: Heart, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30' },
  { level: 5, icon: Star, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
];

const ACTIVITIES = ['Work', 'Gym', 'Sleep', 'Reading', 'Music', 'Walk', 'Friends', 'Family', 'Healthy Food'];

export function Dashboard() {
  const { t } = useTranslation();
  const { addEntry, moodTrends } = useMoods();
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const handleMoodSelect = (level: number) => {
    setSelectedMood(level);
    setStep(2);
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    );
  };

  const handleSave = () => {
    if (selectedMood) {
      addEntry({
        user_id: 'user1',
        mood_level: selectedMood,
        activities: selectedActivities,
        note: note,
      });
      // Reset form
      setStep(1);
      setSelectedMood(null);
      setSelectedActivities([]);
      setNote('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t(LOCALE_KEYS.HOW_ARE_YOU)}
        </h2>
        
        <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/10 dark:to-purple-950/10">
          {step === 1 && (
            <div className="grid grid-cols-5 gap-2 py-4">
              {MOODS.map((mood) => (
                <button
                  key={mood.level}
                  onClick={() => handleMoodSelect(mood.level)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 hover:scale-110",
                    mood.bg
                  )}
                >
                  <mood.icon className={cn("h-10 w-10 mb-2", mood.color)} />
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {t(`MOOD_LEVEL_${mood.level}` as any)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 px-1">
                  {t(LOCALE_KEYS.SELECT_ACTIVITY)}
                </label>
                <div className="flex flex-wrap gap-2">
                  {ACTIVITIES.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => toggleActivity(activity)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                        selectedActivities.includes(activity)
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-400"
                      )}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 px-1">
                  {t(LOCALE_KEYS.ADD_NOTE)}
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 resize-none h-24 text-gray-900 dark:text-white"
                  placeholder="Optional..."
                />
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                  {t(LOCALE_KEYS.CANCEL)}
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  {t(LOCALE_KEYS.SAVE)}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t(LOCALE_KEYS.RECENT_MOODS)}
        </h3>
        <Card className="p-0 overflow-hidden">
          <div className="flex items-end justify-between h-32 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/20">
            {moodTrends.map((trend, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 flex-1">
                <div 
                  className="w-full max-w-[20px] bg-indigo-500 rounded-t-full transition-all duration-1000 ease-out"
                  style={{ height: `${(trend.level / 5) * 100}%` }}
                />
                <span className="text-[10px] text-gray-500 font-medium">{trend.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
