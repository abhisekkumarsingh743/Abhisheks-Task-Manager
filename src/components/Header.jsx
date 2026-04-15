import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">A</div>
          <span className="font-bold dark:text-white hidden sm:block">Task Manager</span>
        </div>
        
        <nav className="flex items-center gap-4">
          <NavLink to="/dashboard" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
            Dashboard
          </NavLink>
          <NavLink to="/stats" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
            Stats
          </NavLink>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-slate-700"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}