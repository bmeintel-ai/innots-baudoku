import React from 'react';
import { Page } from '../types';

interface TopBarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const TopBar: React.FC<TopBarProps> = ({ currentPage, setPage }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="font-bold text-xl">Innots Baudoku</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setPage('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'dashboard'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setPage('sites')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'sites'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🏗️ Projekte
            </button>
            <button
              onClick={() => setPage('team')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'team'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              👥 Team
            </button>
            <button
              onClick={() => setPage('measures')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'measures'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              📋 Maßnahmen
            </button>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden sm:block relative w-64">
            <input
              type="text"
              placeholder="Suche nach Baustellen, Personen, Dokumenten..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none text-sm"
            />
          </div>

          {/* Icons */}
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            🔔
          </button>
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            ✉️
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            + Neues Projekt
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
