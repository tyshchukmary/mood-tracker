import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, BarChart3, Settings } from 'lucide-react';
import { useTranslation, LOCALE_KEYS } from '@/services/localization';
import { cn } from '@/services/utils';

export function Sidebar() {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t(LOCALE_KEYS.DASHBOARD) },
    { to: '/history', icon: History, label: t(LOCALE_KEYS.HISTORY) },
    { to: '/stats', icon: BarChart3, label: t(LOCALE_KEYS.STATS) },
    { to: '/settings', icon: Settings, label: t(LOCALE_KEYS.SETTINGS) },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 hidden h-full w-20 flex-col items-center border-r border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl py-8 md:flex lg:w-64 lg:items-start lg:px-6">
      <div className="mb-10 hidden lg:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          MoodTracker
        </h1>
      </div>
      
      <div className="flex flex-col space-y-4 w-full">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center justify-center p-3 rounded-2xl transition-all duration-300 lg:justify-start lg:space-x-4 w-full',
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              )
            }
          >
            <item.icon className="h-6 w-6 shrink-0" />
            <span className="hidden lg:block font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
