import { Sparkles } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { useTranslation } from '@/services/localization';
import { useAIInsights } from '@/hooks/useAIInsights';
import { cn } from '@/services/utils';

export function AIInsights() {
  const { t } = useTranslation();
  const { averageMood, adviceKey } = useAIInsights();

  return (
    <Card 
      glass 
      className="mb-8 overflow-hidden relative border-primary/20 bg-primary/5 dark:bg-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="absolute top-0 right-0 -mr-4 -mt-4 p-8 opacity-10 dark:opacity-20 pointer-events-none">
        <Sparkles size={120} className="text-primary" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Sparkles size={20} />
          </div>
          <h3 className="font-semibold text-lg dark:text-white">
            {t('AI_INSIGHTS_TITLE')}
          </h3>
          {averageMood !== 0 && (
            <span className={cn(
              "ml-auto text-xs font-medium px-2.5 py-1 rounded-full",
              Number(averageMood) < 3 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
              Number(averageMood) <= 4 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
              "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            )}>
              {t('AVERAGE_MOOD')}: {averageMood}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {t(adviceKey)}
        </p>
      </div>
    </Card>
  );
}
