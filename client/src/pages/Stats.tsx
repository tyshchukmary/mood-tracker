import { useTranslation, LOCALE_KEYS } from '@/services/localization';
import { useMoods } from '@/hooks/useMoods';
import { Card } from '@/components/common/Card';
import { TrendingUp, Activity, Star } from 'lucide-react';

export function Stats() {
  const { t } = useTranslation();
  const { averageMood, topActivityOnHappyDays, moodTrends } = useMoods();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t(LOCALE_KEYS.STATS)}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center p-8 space-y-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border-none">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <Star className="h-8 w-8 text-indigo-500 fill-indigo-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t(LOCALE_KEYS.AVERAGE_MOOD)}</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{averageMood}</p>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center p-8 space-y-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-none">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <Activity className="h-8 w-8 text-purple-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t(LOCALE_KEYS.TOP_ACTIVITY)}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{topActivityOnHappyDays}</p>
          </div>
        </Card>
      </div>

      <Card className="space-y-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Last 7 Days Trend</h3>
        </div>
        
        <div className="flex items-end justify-between h-48 px-4">
          {moodTrends.map((trend, i) => (
            <div key={i} className="flex flex-col items-center space-y-3 flex-1">
              <div className="relative group w-full flex flex-col items-center">
                <div 
                  className="w-full max-w-[24px] bg-indigo-500/80 hover:bg-indigo-500 rounded-t-xl transition-all duration-500 ease-out cursor-pointer"
                  style={{ height: `${(trend.level / 5) * 160}px` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Level: {trend.level}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">{trend.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
