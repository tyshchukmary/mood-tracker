import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 pb-20 md:pb-0">
      <Sidebar />
      <div className="flex flex-col md:pl-20 lg:pl-64 transition-all duration-300">
        <Header />
        <main className="container mx-auto px-4 py-8 md:px-6">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
