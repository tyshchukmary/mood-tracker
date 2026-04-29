import { Moon, Sun, LogIn, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/services/supabase';

export function Header() {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const { user, signOut } = useAuthStore();

  const handleAuth = async () => {
    if (user) {
      await signOut();
    } else {
      // In a real app, this would redirect to a login page or open a modal
      // For this prototype, we'll use Google OAuth as an example
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    }
  };

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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white md:hidden">
          Mood Tracker
        </h1>
        <div className="hidden md:block" /> {/* Spacer for desktop */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleAuth}>
            {user ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
