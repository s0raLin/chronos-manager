import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { TimelineView } from './views/TimelineView';
import { DiaryView } from './views/DiaryView';
import { AlbumsView } from './views/AlbumsView';
import { CMSView } from './views/CMSView';
import { DashboardView } from './views/DashboardView';
import { ProjectsView } from './views/ProjectsView';
import { SkillsView } from './views/SkillsView';
import { FriendsView } from './views/FriendsView';
import { EquipmentView } from './views/EquipmentView';
import { AboutView } from './views/AboutView';
import { ViewType } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'timeline':
        return <TimelineView />;
      case 'diary':
        return <DiaryView />;
      case 'albums':
        return <AlbumsView />;
      case 'cms':
        return <CMSView />;
      case 'projects':
        return <ProjectsView />;
      case 'skills':
        return <SkillsView />;
      case 'friends':
        return <FriendsView />;
      case 'equipment':
        return <EquipmentView />;
      case 'about':
        return <AboutView />;
      default:
        return <CMSView />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return '仪表盘';
      case 'cms': return '文章管理';
      case 'diary': return '日记管理';
      case 'albums': return '专辑管理';
      case 'timeline': return '时间线';
      case 'projects': return '项目经历';
      case 'skills': return '技能管理';
      case 'friends': return '友链管理';
      case 'equipment': return '设备管理';
      case 'about': return '关于页面';
      default: return '博客后台';
    }
  };

  const getSubtitle = () => {
    switch (currentView) {
      case 'dashboard': return '欢迎回来，今天想做点什么？';
      case 'cms': return '撰写并发布您的精彩博文';
      case 'diary': return '记录生活中的点点滴滴';
      case 'albums': return '管理您的摄影期刊与相册';
      case 'timeline': return '回顾您的成长历程';
      case 'projects': return '展示您的技术实力与作品';
      case 'skills': return '管理您的专业技能树';
      case 'friends': return '维护您的社交网络';
      case 'equipment': return '罗列您的生产力工具';
      case 'about': return '向世界介绍您自己';
      default: return '欢迎回来，管理员';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar title={getTitle()} subtitle={getSubtitle()} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-hidden flex flex-col"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
