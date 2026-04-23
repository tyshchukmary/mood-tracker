import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';

const Dashboard = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const History = lazy(() => import('@/pages/History').then(m => ({ default: m.History })));
const Stats = lazy(() => import('@/pages/Stats').then(m => ({ default: m.Stats })));
const Settings = lazy(() => import('@/pages/Settings').then(m => ({ default: m.Settings })));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-indigo-200 dark:bg-indigo-900 rounded-full" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      }>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
