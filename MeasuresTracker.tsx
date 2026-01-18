
import React, { useState } from 'react';
import { Measure, ConstructionSite } from '../types';
import { analyzeMeasureRisks } from '../services/geminiService';

interface MeasuresTrackerProps {
  measures: Measure[];
  sites: ConstructionSite[];
}

const MeasuresTracker: React.FC<MeasuresTrackerProps> = ({ measures, sites }) => {
  const [riskAnalysis, setRiskAnalysis] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleAnalyze = async (measure: Measure) => {
    setLoading(prev => ({ ...prev, [measure.id]: true }));
    const analysis = await analyzeMeasureRisks(measure.title);
    setRiskAnalysis(prev => ({ ...prev, [measure.id]: analysis }));
    setLoading(prev => ({ ...prev, [measure.id]: false }));
  };

  const getPriorityStyle = (priority: Measure['priority']) => {
    switch (priority) {
      case 'low': return 'bg-slate-100 text-slate-600';
      case 'medium': return 'bg-blue-100 text-blue-600';
      case 'high': return 'bg-orange-100 text-orange-600';
      case 'urgent': return 'bg-red-100 text-red-600';
    }
  };

  const getStatusStyle = (status: Measure['status']) => {
    switch (status) {
      case 'open': return 'bg-slate-100 text-slate-400';
      case 'in-progress': return 'bg-orange-500 text-white shadow-sm';
      case 'review': return 'bg-purple-100 text-purple-600';
      case 'done': return 'bg-green-100 text-green-600';
    }
  };

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Maßnahmen-Tracker</h2>
          <p className="text-slate-500">Überwachen Sie Aufgaben und Mängel über alle Baustellen hinweg.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          <i className="fas fa-plus mr-2"></i> Neue Maßnahme
        </button>
      </div>

      <div className="space-y-4">
        {measures.map((measure) => {
          const site = sites.find(s => s.id === measure.siteId);
          return (
            <div key={measure.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getPriorityStyle(measure.priority)}`}>
                      {measure.priority}
                    </span>
                    <span className="text-slate-400 text-xs font-semibold">Projekt: {site?.name}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{measure.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><i className="far fa-calendar"></i> Fällig: {new Date(measure.dueDate).toLocaleDateString('de-DE')}</span>
                    <span className="flex items-center gap-1"><i className="far fa-user"></i> {measure.assignedTo}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {riskAnalysis[measure.id] ? (
                    <div className="max-w-xs text-xs text-slate-600 bg-orange-50 p-3 rounded-xl border border-orange-100 italic">
                      {riskAnalysis[measure.id]}
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAnalyze(measure)}
                      disabled={loading[measure.id]}
                      className="text-orange-500 hover:text-orange-600 text-xs font-bold flex items-center gap-1 bg-orange-50 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-orange-200"
                    >
                      {loading[measure.id] ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-brain"></i>}
                      KI-RISIKO-CHECK
                    </button>
                  )}
                  
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <span className={`text-center py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${getStatusStyle(measure.status)}`}>
                      {measure.status}
                    </span>
                    <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium py-1.5 px-2 outline-none focus:ring-1 focus:ring-orange-500">
                      <option>Status ändern</option>
                      <option>In Bearbeitung</option>
                      <option>Prüfung</option>
                      <option>Erledigt</option>
                    </select>
                  </div>
                  
                  <button className="text-slate-300 hover:text-slate-500 p-2">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeasuresTracker;
