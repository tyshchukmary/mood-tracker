import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-20 md:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <Outlet />
      </main>
      <BottomNav />
      {/* Desktop Sidebar could be added here for a more complete responsive experience */}
    </div>
  );
}
