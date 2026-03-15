export type ViewType = 
  | 'dashboard'
  | 'cms' 
  | 'diary' 
  | 'albums'
  | 'timeline' 
  | 'projects' 
  | 'skills' 
  | 'friends' 
  | 'equipment' 
  | 'about';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  company: string;
  category: string;
  tags: string[];
  icon: string;
}

export interface DiaryEntry {
  id: string;
  content: string;
  date: string;
  time: string;
  mood: 'very_dissatisfied' | 'dissatisfied' | 'satisfied' | 'very_satisfied';
  location: string;
  tags: string[];
  attachments: string[];
}
