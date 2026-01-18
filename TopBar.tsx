
import React from 'react';

const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 z-40 flex items-center justify-between px-8">
      <div className="relative w-96">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input
          type="text"
          placeholder="Suche nach Baustellen, Personen, Dokumenten..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <i className="far fa-bell text-xl"></i>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <i className="far fa-envelope text-xl"></i>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          <i className="fas fa-plus"></i>
          Neues Projekt
        </button>
      </div>
    </header>
  );
};

export default TopBar;
