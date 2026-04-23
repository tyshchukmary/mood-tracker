import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, BarChart3, Settings } from 'lucide-react';
import { useTranslation, LOCALE_KEYS } from '@/services/localization';
import { cn } from '@/services/utils';

export function BottomNav() {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t(LOCALE_KEYS.DASHBOARD) },
    { to: '/history', icon: History, label: t(LOCALE_KEYS.HISTORY) },
    { to: '/stats', icon: BarChart3, label: t(LOCALE_KEYS.STATS) },
    { to: '/settings', icon: Settings, label: t(LOCALE_KEYS.SETTINGS) },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center space-y-1 transition-colors duration-200',
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
