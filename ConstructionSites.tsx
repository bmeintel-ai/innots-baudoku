
import React, { useState } from 'react';
import { ConstructionSite } from '../types';
import { generateSiteSummary } from '../services/geminiService';

interface ConstructionSitesProps {
  sites: ConstructionSite[];
  onOpenProject: (projectId: string) => void;
  onAddSite: (site: Omit<ConstructionSite, 'id' | 'progress'>) => void;
}

const ConstructionSites: React.FC<ConstructionSitesProps> = ({ sites, onOpenProject, onAddSite }) => {
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    manager: '',
    deadline: '',
    status: 'planning' as ConstructionSite['status'],
    image: 'https://picsum.photos/seed/newsite/800/600'
  });

  const handleGetSummary = async (site: ConstructionSite) => {
    setLoading(prev => ({ ...prev, [site.id]: true }));
    const summary = await generateSiteSummary(site.name, site.progress, site.status);
    setSummaries(prev => ({ ...prev, [site.id]: summary }));
    setLoading(prev => ({ ...prev, [site.id]: false }));
  };

  const getStatusBadge = (status: ConstructionSite['status']) => {
    switch (status) {
      case 'active': return <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Aktiv</span>;
      case 'planning': return <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Planung</span>;
      case 'on-hold': return <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pausiert</span>;
      case 'completed': return <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Erledigt</span>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSite(formData);
    setIsModalOpen(false);
    setFormData({
      name: '',
      location: '',
      manager: '',
      deadline: '',
      status: 'planning',
      image: 'https://picsum.photos/seed/newsite/800/600'
    });
  };

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Baustellen</h2>
          <p className="text-slate-500">Verwalten Sie Ihre aktiven Bauvorhaben.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
            <i className="fas fa-filter mr-2"></i> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 shadow-lg shadow-orange-500/20"
          >
            <i className="fas fa-plus mr-2"></i> Baustelle hinzufügen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {sites.map((site) => (
          <div key={site.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img src={site.image} alt={site.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-4 right-4">
                {getStatusBadge(site.status)}
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <div className="glass text-slate-900 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md">
                   {site.location}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{site.name}</h3>
                <button className="text-slate-400 hover:text-orange-500">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500 font-medium">Fortschritt</span>
                    <span className="text-orange-600 font-bold">{site.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 transition-all duration-1000" 
                      style={{ width: `${site.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-400 uppercase tracking-tighter">Manager</p>
                    <p className="text-slate-900 font-semibold">{site.manager}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase tracking-tighter">Deadline</p>
                    <p className="text-slate-900 font-semibold">{new Date(site.deadline).toLocaleDateString('de-DE')}</p>
                  </div>
                </div>
              </div>

              {summaries[site.id] && (
                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-700 text-sm italic">
                  {summaries[site.id]}
                </div>
              )}

              <div className="flex gap-2">
                <button 
                  onClick={() => handleGetSummary(site)}
                  disabled={loading[site.id]}
                  className="flex-1 bg-slate-50 text-slate-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  {loading[site.id] ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-magic text-orange-500"></i>
                  )}
                  KI-Bericht
                </button>
                <button 
                  onClick={() => onOpenProject(site.id)}
                  className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Details öffnen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NEW PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Neues Bauprojekt anlegen</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Projektname</label>
                <input 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="z.B. Wohnpark Sonnenallee"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Standort</label>
                <input 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="z.B. Berlin"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Bauleiter</label>
                  <input 
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Vor- und Nachname"
                    value={formData.manager}
                    onChange={e => setFormData({...formData, manager: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Deadline</label>
                  <input 
                    required
                    type="date"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    value={formData.deadline}
                    onChange={e => setFormData({...formData, deadline: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Initialer Status</label>
                <select 
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="planning">Planung</option>
                  <option value="active">Aktiv</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Abbrechen
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-colors"
                >
                  Projekt erstellen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstructionSites;
