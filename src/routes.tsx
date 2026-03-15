import { 
  PenTool, 
  BookOpen, 
  LayoutDashboard, 
  Image as ImageIcon, 
  Calendar,
  Users,
  Tag,
  MessageSquare
} from 'lucide-react';
import { ViewType } from './types';
import { ReactNode } from 'react';

/**
 * 路由配置类型
 */
export interface RouteConfig {
  id: ViewType;
  path: string;
  label: string;
  subtitle: string;
  icon: ReactNode;
  selectedIcon: ReactNode;
  group: 'main' | 'secondary';
}

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
    icon: <LayoutDashboard size={20} />,
    selectedIcon: <LayoutDashboard size={20} />,
    group: 'main',
  },
  {
    id: 'cms',
    path: '/cms',
    label: '文章管理',
    subtitle: '撰写并发布您的精彩博文',
    icon: <PenTool size={20} />,
    selectedIcon: <PenTool size={20} />,
    group: 'main',
  },
  {
    id: 'diary',
    path: '/diary',
    label: '日记管理',
    subtitle: '记录生活中的点点滴滴',
    icon: <BookOpen size={20} />,
    selectedIcon: <BookOpen size={20} />,
    group: 'main',
  },
  {
    id: 'albums',
    path: '/albums',
    label: '专辑管理',
    subtitle: '管理您的摄影期刊与相册',
    icon: <ImageIcon size={20} />,
    selectedIcon: <ImageIcon size={20} />,
    group: 'main',
  },
  {
    id: 'timeline',
    path: '/timeline',
    label: '时间线',
    subtitle: '回顾您的成长历程',
    icon: <Calendar size={20} />,
    selectedIcon: <Calendar size={20} />,
    group: 'main',
  },
  {
    id: 'projects',
    path: '/projects',
    label: '项目经历',
    subtitle: '展示您的技术实力与作品',
    icon: <LayoutDashboard size={20} />,
    selectedIcon: <LayoutDashboard size={20} />,
    group: 'main',
  },
  // 次要导航
  {
    id: 'skills',
    path: '/skills',
    label: '技能管理',
    subtitle: '管理您的专业技能树',
    icon: <Tag size={20} />,
    selectedIcon: <Tag size={20} />,
    group: 'secondary',
  },
  {
    id: 'friends',
    path: '/friends',
    label: '友链管理',
    subtitle: '维护您的社交网络',
    icon: <Users size={20} />,
    selectedIcon: <Users size={20} />,
    group: 'secondary',
  },
  {
    id: 'equipment',
    path: '/equipment',
    label: '设备管理',
    subtitle: '罗列您的生产力工具',
    icon: <LayoutDashboard size={20} />,
    selectedIcon: <LayoutDashboard size={20} />,
    group: 'secondary',
  },
  {
    id: 'about',
    path: '/about',
    label: '关于页面',
    subtitle: '向世界介绍您自己',
    icon: <MessageSquare size={20} />,
    selectedIcon: <MessageSquare size={20} />,
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

/**
 * 根据id获取路由配置
 */
export const getRouteById = (id: ViewType): RouteConfig | undefined => {
  return routes.find(route => route.id === id);
};

/**
 * 根据id获取路由标题
 */
export const getRouteTitle = (id: ViewType): string => {
  const route = getRouteById(id);
  return route?.label ?? '博客后台';
};

/**
 * 根据id获取路由副标题
 */
export const getRouteSubtitle = (id: ViewType): string => {
  const route = getRouteById(id);
  return route?.subtitle ?? '欢迎回来，管理员';
};
