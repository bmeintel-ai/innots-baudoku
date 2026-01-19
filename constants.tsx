
import { ConstructionSite, TeamMember, Measure } from './types';

export const INITIAL_SITES: ConstructionSite[] = [
  { id: '1', name: 'Wohnpark Sonnenallee', location: 'Berlin', progress: 65, status: 'active', manager: 'Max Mustermann', deadline: '2024-12-15', image: 'https://picsum.photos/seed/site1/800/600' },
  { id: '2', name: 'Bürokomplex Nord', location: 'Hamburg', progress: 12, status: 'active', manager: 'Julia Schmidt', deadline: '2025-06-20', image: 'https://picsum.photos/seed/site2/800/600' },
  { id: '3', name: 'Kita Kleiner Spatz', location: 'München', progress: 95, status: 'active', manager: 'Hans Weber', deadline: '2024-05-10', image: 'https://picsum.photos/seed/site3/800/600' },
  { id: '4', name: 'Einkaufszentrum West', location: 'Köln', progress: 0, status: 'planning', manager: 'Sarah Meyer', deadline: '2025-09-01', image: 'https://picsum.photos/seed/site4/800/600' },
  { id: '5', name: 'Brückensanierung A1', location: 'Dortmund', progress: 45, status: 'on-hold', manager: 'Klaus Fischer', deadline: '2024-11-30', image: 'https://picsum.photos/seed/site5/800/600' },
  { id: '6', name: 'Logistikhalle Süd', location: 'Stuttgart', progress: 80, status: 'active', manager: 'Petra Wagner', deadline: '2024-08-15', image: 'https://picsum.photos/seed/site6/800/600' },
  { id: '7', name: 'Tiefgarage City', location: 'Frankfurt', progress: 30, status: 'active', manager: 'Michael Klein', deadline: '2025-02-28', image: 'https://picsum.photos/seed/site7/800/600' },
  { id: '8', name: 'Hotel Bellevue', location: 'Dresden', progress: 100, status: 'completed', manager: 'Andreas Wolf', deadline: '2024-03-01', image: 'https://picsum.photos/seed/site8/800/600' },
  { id: '9', name: 'U-Bahn Erweiterung', location: 'Leipzig', progress: 55, status: 'active', manager: 'Sabine Bauer', deadline: '2026-01-10', image: 'https://picsum.photos/seed/site9/800/600' },
];

export const INITIAL_TEAM: TeamMember[] = [
  { id: 't1', name: 'Max Mustermann', role: 'Projektleiter', email: 'max@innots.de', phone: '+49 123 456789', avatar: 'https://i.pravatar.cc/150?u=max', department: 'Bauleitung', activeProjects: 3 },
  { id: 't2', name: 'Julia Schmidt', role: 'Architektin', email: 'julia@innots.de', phone: '+49 123 456790', avatar: 'https://i.pravatar.cc/150?u=julia', department: 'Planung', activeProjects: 2 },
  { id: 't3', name: 'Hans Weber', role: 'Sicherheitsbeauftragter', email: 'hans@innots.de', phone: '+49 123 456791', avatar: 'https://i.pravatar.cc/150?u=hans', department: 'Qualität', activeProjects: 5 },
  { id: 't4', name: 'Sarah Meyer', role: 'Bauingenieurin', email: 'sarah@innots.de', phone: '+49 123 456792', avatar: 'https://i.pravatar.cc/150?u=sarah', department: 'Bauleitung', activeProjects: 1 },
];

export const INITIAL_MEASURES: Measure[] = [
  { id: 'm1', title: 'Fundament betonieren', siteId: '1', priority: 'high', status: 'in-progress', assignedTo: 'Max Mustermann', dueDate: '2024-05-20' },
  { id: 'm2', title: 'Brandschutzabnahme', siteId: '3', priority: 'urgent', status: 'open', assignedTo: 'Hans Weber', dueDate: '2024-05-15' },
  { id: 'm3', title: 'Elektroinstallation OG1', siteId: '6', priority: 'medium', status: 'done', assignedTo: 'Petra Wagner', dueDate: '2024-05-10' },
  { id: 'm4', title: 'Statikprüfung Balkone', siteId: '1', priority: 'high', status: 'review', assignedTo: 'Julia Schmidt', dueDate: '2024-05-18' },
];
