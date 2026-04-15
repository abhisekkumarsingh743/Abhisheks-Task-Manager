import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-white shadow-sm">
            TM
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 uppercase">Task Manager</span>
        </div>
        
        <nav className="flex items-center gap-8">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink 
            to="/stats" 
            className={({ isActive }) => `flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <BarChart3 size={18} /> Statistics
          </NavLink>
        </nav>
      </div>
    </header>
  );
}