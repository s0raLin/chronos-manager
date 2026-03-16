import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { TopBar } from "./TopBar";
import { DashboardView } from "../views/sandbox/dashboard/DashboardView";
import { CMSView } from "../views/sandbox/cms/CMSView";
import { DiaryView } from "../views/sandbox/diary/DiaryView";
import { AlbumsView } from "../views/sandbox/albums/AlbumsView";
import { TimelineView } from "../views/sandbox/timeline/TimelineView";
import { ProjectsView } from "../views/sandbox/projects/ProjectsView";
import { SkillsView } from "../views/sandbox/skills/SkillsView";
import { FriendsView } from "../views/sandbox/friends/FriendsView";
import { AboutView } from "../views/sandbox/about/AboutView";
import { EquipmentView } from "../views/sandbox/equipment/EquipmentView";
import { DraftsView } from "../views/sandbox/drafts/DraftsView";

import { routes } from "@/src/config/RouterConfig";
import NoPermission from "../views/no-permission/NoPermission";
/**
 * 获取当前路由信息
 */
const getCurrentRouteInfo = (
  pathname: string,
): { title: string; subtitle: string } => {
  const route = routes.find((r) => r.path === pathname);
  if (route) {
    return {
      title: route.label,
      subtitle: route.subtitle,
    };
  }
  return {
    title: "仪表盘",
    subtitle: "欢迎回来，今天想做点什么？",
  };
};

/**
 * 主内容区域组件 - 包含路由配置和TopBar
 */
export default function MainContent() {
  const location = useLocation();
  const routeInfo = getCurrentRouteInfo(location.pathname);

  return (
    <div>
      <TopBar title={routeInfo.title} subtitle={routeInfo.subtitle} />

      <Routes>
        {/* 默认重定向到 dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 主导航路由 */}
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/cms" element={<CMSView />} />
        <Route path="/diary" element={<DiaryView />} />
        <Route path="/albums" element={<AlbumsView />} />
        <Route path="/timeline" element={<TimelineView />} />
        <Route path="/projects" element={<ProjectsView />} />

        {/* 次要导航路由 */}
        <Route path="/skills" element={<SkillsView />} />
        <Route path="/friends" element={<FriendsView />} />
        <Route path="/equipment" element={<EquipmentView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/drafts" element={<DraftsView />} />
        <Route path="/drafts" element={<DraftsView />} />

        {/* 404 重定向到 dashboard */}
        <Route path="*" element={<NoPermission />} />
      </Routes>
    </div>
  );
}
