
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage }) => {
  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: 'sites' as Page, label: 'Projekte', icon: 'fa-hard-hat' },
    { id: 'team' as Page, label: 'Team', icon: 'fa-users' },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-white shadow-xl z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-orange-500 p-2 rounded-lg">
          <i className="fas fa-building text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">Innots</h1>
          <p className="text-xs text-slate-400">Baudoku</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-6`}></i>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-xl">
          <img
            src="https://i.pravatar.cc/100?u=admin"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-slate-700"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@innots.de</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
