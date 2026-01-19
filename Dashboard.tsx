
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ConstructionSite, Measure } from '../types';

interface DashboardProps {
  sites: ConstructionSite[];
  measures: Measure[];
}

const Dashboard: React.FC<DashboardProps> = ({ sites, measures }) => {
  const stats = useMemo(() => {
    return {
      totalSites: sites.length,
      activeSites: sites.filter(s => s.status === 'active').length,
      pendingMeasures: measures.filter(m => m.status !== 'done').length,
      avgProgress: Math.round(sites.reduce((acc, s) => acc + s.progress, 0) / sites.length),
    };
  }, [sites, measures]);

  const chartData = useMemo(() => {
    return sites.slice(0, 5).map(s => ({
      name: s.name.length > 15 ? s.name.substring(0, 12) + '...' : s.name,
      fortschritt: s.progress,
    }));
  }, [sites]);

  const statusData = useMemo(() => {
    return [
      { name: 'Aktiv', value: sites.filter(s => s.status === 'active').length, color: '#f97316' },
      { name: 'Planung', value: sites.filter(s => s.status === 'planning').length, color: '#94a3b8' },
      { name: 'Gestoppt', value: sites.filter(s => s.status === 'on-hold').length, color: '#ef4444' },
      { name: 'Fertig', value: sites.filter(s => s.status === 'completed').length, color: '#22c55e' },
    ];
  }, [sites]);

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500">Willkommen zurück! Hier ist Ihre heutige Projektübersicht.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <i className="fas fa-building text-2xl"></i>
            </div>
            <span className="text-sm font-medium text-green-600">+2 diesen Monat</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Gesamtprojekte</p>
          <h3 className="text-3xl font-bold">{stats.totalSites}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <i className="fas fa-hard-hat text-2xl"></i>
            </div>
            <span className="text-sm font-medium text-slate-400">85% Auslastung</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Aktive Baustellen</p>
          <h3 className="text-3xl font-bold">{stats.activeSites}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <i className="fas fa-tasks text-2xl"></i>
            </div>
            <span className="text-sm font-medium text-red-600">3 Kritisch</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Offene Maßnahmen</p>
          <h3 className="text-3xl font-bold">{stats.pendingMeasures}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <i className="fas fa-chart-line text-2xl"></i>
            </div>
            <span className="text-sm font-medium text-green-600">+5% vs. Vormonat</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Ø Fortschritt</p>
          <h3 className="text-3xl font-bold">{stats.avgProgress}%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6">Fortschritt Top Projekte</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="fortschritt" fill="#f97316" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6">Projekt-Status</h3>
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
              {statusData.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></div>
                  <span className="text-xs text-slate-500">{s.name}: {s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
