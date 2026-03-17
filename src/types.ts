import {
  BookOpen,
  Calendar,
  ImageIcon,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  PenTool,
  Tag,
  Users,
} from "lucide-react";

export type ViewType =
  | "dashboard"
  | "cms"
  | "diary"
  | "albums"
  | "timeline"
  | "projects"
  | "skills"
  | "friends"
  | "equipment"
  | "about"
  | "drafts";

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
  mood: "very_dissatisfied" | "dissatisfied" | "satisfied" | "very_satisfied";
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
  group: "main" | "secondary";
}

interface NameCount {
  name: string;
  count: number;
}

export interface StatsRes {
  postCount: string;
  categoryCount: string;
  categories: NameCount[];
  tagCount: string;
  tags: NameCount[];
  totalWords: string;
  runningDays: string;
  siteStartDate: string;
  lastActivity: string;
  lastActivityDaysAgo: string;
}

export interface DraftItem {
  id: string;
  filename: string;
  title: string;
  created: string;
  updated: string;
  category?: string; // 文章特有
  mood?: string; // 日记特有
  tags: string[]; // JSON 字符串
  description?: string;
  body: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DraftsRes {
  posts: {
    count: number;
    items: DraftItem[];
  };
  diary: {
    count: number;
    items: DraftItem[];
  };
}

export interface Post {
  id: string;
  title: string;
  published?: string;
  updated: string;
  description: string; 
  image: string; // 图片路径
  tags: string[]; // 标签
  category: string; // 分类
  draft: boolean; // 草稿箱
  pinned: boolean; //固定
  comment: boolean; // 评论
  lang: string;
  priority: number;
}

export interface PostRes {
  success: boolean,
  count: number,
  items: Post[],
}
// { id: 1, title: '数学理论', date: '2026-03-04', category: '教程', status: '已发布', pinned: true },
// "title",
// "published",
// "updated",
// "description",
// "image",
// "tags",
// "category",
// "draft",
// "pinned",
// "comment",
// "lang",
// "priority",
// "author",
// "sourceLink",
// "licenseName",
// "licenseUrl",
// "encrypted",
// "password",
// "alias",
// "permalink",
