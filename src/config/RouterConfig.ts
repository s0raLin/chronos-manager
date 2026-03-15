import { BookOpen, Calendar, ImageIcon, LayoutDashboard, MessageSquare, PenTool, Tag, Users, FileArchive } from "lucide-react";
import { RouteConfig } from "../types";


/**
 * 统一路由配置
 * 在此文件中集中管理所有路由信息，避免手动维护
 */
export const routes: RouteConfig[] = [
  // 主导航
  {
    id: 'dashboard',
    path: '/dashboard',
    label: '仪表盘',
    subtitle: '欢迎回来，今天想做点什么？',
    icon: LayoutDashboard,
    selectedIcon: LayoutDashboard,
    group: 'main',
  },
  {
    id: 'cms',
    path: '/cms',
    label: '文章管理',
    subtitle: '撰写并发布您的精彩博文',
    icon: PenTool,
    selectedIcon: PenTool,
    group: 'main',
  },
  {
    id: 'diary',
    path: '/diary',
    label: '日记管理',
    subtitle: '记录生活中的点点滴滴',
    icon: BookOpen,
    selectedIcon: BookOpen,
    group: 'main',
  },
  {
    id: 'albums',
    path: '/albums',
    label: '专辑管理',
    subtitle: '管理您的摄影期刊与相册',
    icon: ImageIcon,
    selectedIcon: ImageIcon,
    group: 'main',
  },
  {
    id: 'timeline',
    path: '/timeline',
    label: '时间线',
    subtitle: '回顾您的成长历程',
    icon: Calendar,
    selectedIcon: Calendar,
    group: 'main',
  },
  {
    id: 'projects',
    path: '/projects',
    label: '项目经历',
    subtitle: '展示您的技术实力与作品',
    icon: LayoutDashboard,
    selectedIcon: LayoutDashboard,
    group: 'main',
  },
  // 次要导航
  {
    id: 'skills',
    path: '/skills',
    label: '技能管理',
    subtitle: '管理您的专业技能树',
    icon: Tag,
    selectedIcon: Tag,
    group: 'secondary',
  },
  {
    id: 'friends',
    path: '/friends',
    label: '友链管理',
    subtitle: '维护您的社交网络',
    icon: Users,
    selectedIcon: Users,
    group: 'secondary',
  },
  {
    id: 'equipment',
    path: '/equipment',
    label: '设备管理',
    subtitle: '罗列您的生产力工具',
    icon: LayoutDashboard,
    selectedIcon: LayoutDashboard,
    group: 'secondary',
  },
  {
    id: 'about',
    path: '/about',
    label: '关于页面',
    subtitle: '向世界介绍您自己',
    icon: MessageSquare,
    selectedIcon: MessageSquare,
    group: 'secondary',
  },
  {
    id: 'drafts',
    path: '/drafts',
    label: '草稿箱',
    subtitle: '管理您的文章和日记草稿',
    icon: FileArchive,
    selectedIcon: FileArchive,
    group: 'secondary',
  },
];



/**
 * 获取主导航路由
 */
export const mainRoutes = routes.filter(route => route.group === 'main');

/**
 * 获取次要导航路由
 */
export const secondaryRoutes = routes.filter(route => route.group === 'secondary');