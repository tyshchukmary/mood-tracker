import { useTranslation, LOCALE_KEYS } from '@/services/localization';
import { Card } from '@/components/common/Card';
import { Bell, Languages, Moon, Sun, Shield, Info } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/services/utils';

export function Settings() {
  const { t, locale, setLocale } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t(LOCALE_KEYS.SETTINGS)}</h2>
      
      <div className="space-y-4">
        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  {isDark ? <Moon className="h-5 w-5 text-orange-600 dark:text-orange-400" /> : <Sun className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {isDark ? t(LOCALE_KEYS.THEME_DARK) : t(LOCALE_KEYS.THEME_LIGHT)} Mode
                  </p>
                  <p className="text-xs text-gray-500">Switch between light and dark themes</p>
                </div>
              </div>
              <button 
                onClick={toggleTheme}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                  isDark ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"
                )}
              >
                <span className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  isDark ? "translate-x-6" : "translate-x-1"
                )} />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Languages className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Language</p>
                  <p className="text-xs text-gray-500">Select your preferred language</p>
                </div>
              </div>
              <select 
                value={locale}
                onChange={(e) => setLocale(e.target.value as any)}
                className="bg-transparent text-sm font-medium text-gray-900 dark:text-white outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="uk">Українська</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t(LOCALE_KEYS.NOTIFICATIONS)}</p>
                  <p className="text-xs text-gray-500">Get daily reminders to log your mood</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                  notifications ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"
                )}
              >
                <span className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  notifications ? "translate-x-6" : "translate-x-1"
                )} />
              </button>
            </div>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            <div className="flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Privacy & Security</p>
            </div>
            <div className="flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <div className="p-2 bg-gray-100 dark:bg-gray-900/30 rounded-xl">
                <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">About Mood Tracker</p>
            </div>
          </div>
        </Card>
      </div>
      
      <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-medium">
        Version 1.0.0 • Made with ❤️
      </p>
    </div>
  );
}
