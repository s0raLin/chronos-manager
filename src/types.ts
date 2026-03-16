import { BookOpen, Calendar, ImageIcon, LayoutDashboard, LucideIcon, MessageSquare, PenTool, Tag, Users } from "lucide-react";

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
  | 'about'
  | 'drafts';

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

/**
 * 路由配置类型
 */
export interface RouteConfig {
  id: ViewType;
  path: string;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  selectedIcon: LucideIcon;
  group: 'main' | 'secondary';
}


interface NameCount {
  name: string,
  count: number,
}

export interface StatsRes {
  postCount: string,
  categoryCount: string,
  categories: NameCount[],
  tagCount: string,
  tags: NameCount[],
  totalWords: string,
  runningDays: string,
  siteStartDate: string,
  lastActivity: string,
  lastActivityDaysAgo: string
}

export interface DraftItem {
  id: string;
  filename: string;
  title: string;
  created: string;
  updated: string;
  category?: string;  // 文章特有
  mood?: string;      // 日记特有
  tags: string;       // JSON 字符串
  body: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DraftsRes {
  posts: {
    count: number,
    items: DraftItem[],
  },
  diary: {
    count: number,
    items: DraftItem[],
  },
}

// }{
//   "postCount": 19,
//   "categoryCount": 3,
//   "categories": [
//     {
//       "name": "编程语言",
//       "count": 14
//     },
//     {
//       "name": "教程",
//       "count": 1
//     },
//     {
//       "name": "提示词工程",
//       "coun t": 4
//     }
//   ],
//   "tagCount": 8,
//   "tags": [
//     {
//       "name": "欢迎",
//       "count": 1
//     },
//     {
//       "name": "基础",
//       "count": 5
//     },
//     {
//       "name": "教程",
//       "count": 1
//     },
//     {
//       "name": "提示词",
//       "count": 4
//     },
//     {
//       "name": "演示",
//       "count": 1
//     },
//     {
//       "name": "语法",
//       "count": 1
//     },
//     {
//       "name": "AI",
//       "count": 4
//     },
//     {
//       "name": "TypeScript",
//       "count": 14
//     }
//   ],
//   "totalWords": 31604,
//   "runningDays": 12,
//   "siteStartDate": "2026-03-04",
//   "lastActivity": "2026-03-06T00:00:00.000Z",
//   "lastActivityDaysAgo": 9
// }