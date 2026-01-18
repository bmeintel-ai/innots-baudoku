
export type Page = 'dashboard' | 'sites' | 'team' | 'tracker' | 'project-detail';

export interface ConstructionSite {
  id: string;
  name: string;
  location: string;
  progress: number;
  status: 'active' | 'planning' | 'on-hold' | 'completed';
  manager: string;
  deadline: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  activeProjects: number;
}

export interface Measure {
  id: string;
  title: string;
  siteId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'review' | 'done';
  assignedTo: string;
  dueDate: string;
}

export interface DailyReport {
  id: string;
  projectId: string;
  date: string;
  authors: string[];
  startTime: string;
  endTime: string;
  weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
  temperature: number;
  activities: string;
  summary: string;
  images: string[];
  signature?: string;
}
