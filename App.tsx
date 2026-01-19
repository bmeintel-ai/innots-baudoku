
import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ConstructionSites from './pages/ConstructionSites';
import TeamManagement from './pages/TeamManagement';
import MeasuresTracker from './pages/MeasuresTracker';
import ProjectDetail from './pages/ProjectDetail';
import { Page, ConstructionSite, DailyReport } from './types';
import { INITIAL_SITES, INITIAL_TEAM, INITIAL_MEASURES } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  const [sites, setSites] = useState<ConstructionSite[]>(INITIAL_SITES);
  const [team] = useState(INITIAL_TEAM);
  const [measures] = useState(INITIAL_MEASURES);
  const [reports, setReports] = useState<DailyReport[]>([]);

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('project-detail');
  };

  const handleBackToSites = () => {
    setSelectedProjectId(null);
    setCurrentPage('sites');
  };

  const handleAddSite = (newSite: Omit<ConstructionSite, 'id' | 'progress'>) => {
    const site: ConstructionSite = {
      ...newSite,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
    };
    setSites(prev => [site, ...prev]);
  };

  const handleAddReport = (newReport: Omit<DailyReport, 'id'>) => {
    const report: DailyReport = {
      ...newReport,
      id: Math.random().toString(36).substr(2, 9),
    };
    setReports(prev => [report, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard sites={sites} measures={measures} />;
      case 'sites':
        return <ConstructionSites sites={sites} onOpenProject={handleOpenProject} onAddSite={handleAddSite} />;
      case 'team':
        return <TeamManagement team={team} />;
      case 'tracker':
        return <MeasuresTracker measures={measures} sites={sites} />;
      case 'project-detail':
        const site = sites.find(s => s.id === selectedProjectId);
        const projectReports = reports.filter(r => r.projectId === selectedProjectId);
        return site ? (
          <ProjectDetail 
            site={site} 
            reports={projectReports}
            team={team}
            onBack={handleBackToSites} 
            onAddReport={handleAddReport}
          />
        ) : (
          <ConstructionSites sites={sites} onOpenProject={handleOpenProject} onAddSite={handleAddSite} />
        );
      default:
        return <Dashboard sites={sites} measures={measures} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="flex-1 flex flex-col">
        <TopBar  currentPage={currentPage} setPage={setCurrentPage} />
        <main className="flex-1 transition-all duration-300">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
