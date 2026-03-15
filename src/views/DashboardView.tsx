import React from 'react';
import { 
  FileText, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  PenTool,
  Calendar,
  Zap,
  TrendingUp,
  Users,
  Image as ImageIcon,
  Folder,
  Tag,
  Type,
  Timer,
  Activity
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const stats = [
    { label: '文章', value: '12', icon: FileText, color: 'text-primary', bg: 'bg-primary-container' },
    { label: '分类', value: '8', icon: Folder, color: 'text-secondary', bg: 'bg-secondary-container' },
    { label: '标签', value: '24', icon: Tag, color: 'text-primary', bg: 'bg-primary-container' },
    { label: '总字数', value: '45.2k', icon: Type, color: 'text-secondary', bg: 'bg-secondary-container' },
    { label: '运行天数', value: '156天', icon: Timer, color: 'text-primary', bg: 'bg-primary-container' },
    { label: '最后活动', value: '0天前', icon: Activity, color: 'text-secondary', bg: 'bg-secondary-container' },
  ];

  const articleDrafts = [
    { id: 1, title: '深入理解量子力学', date: '2026-03-14', category: '物理' },
    { id: 2, title: 'React 19 新特性概览', date: '2026-03-12', category: '技术' },
    { id: 3, title: '如何写出优雅的代码', date: '2026-03-10', category: '随笔' },
  ];

  const diaryDrafts = [
    { id: 1, content: '今天去看了樱花，真的很美...', date: '2026-03-15', mood: '开心' },
    { id: 2, content: '关于未来的一些思考...', date: '2026-03-13', mood: '一般' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Stats Grid - 站点统计 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="material-card p-4 flex items-center gap-3 group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className={`size-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-on-surface">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Article Drafts */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-3 tracking-tight text-on-surface">
                <PenTool className="text-primary" size={24} />
                文章草稿箱
              </h3>
              <button className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                查看全部 <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {articleDrafts.map(draft => (
                <div key={draft.id} className="material-card p-5 group cursor-pointer hover:bg-primary/5 transition-colors border-l-4 border-l-primary">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{draft.title}</h4>
                    <span className="text-[9px] font-black px-2 py-1 bg-primary-container text-on-primary-container rounded-full uppercase tracking-widest">草稿</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {draft.date}</span>
                    <span className="flex items-center gap-1"><Zap size={12} /> {draft.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Diary Drafts */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-3 tracking-tight text-on-surface">
                <BookOpen className="text-secondary" size={24} />
                日记草稿箱
              </h3>
              <button className="text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                查看全部 <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {diaryDrafts.map(draft => (
                <div key={draft.id} className="material-card p-5 group cursor-pointer hover:bg-secondary/5 transition-colors border-l-4 border-l-secondary">
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-3 leading-relaxed">
                    {draft.content}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock size={12} /> {draft.date}</span>
                    <span className="flex items-center gap-1"><Zap size={12} /> 心情: {draft.mood}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Quick Actions */}
        <section className="space-y-6">
          <h3 className="text-xl font-black tracking-tight text-on-surface">快速操作</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-6 rounded-3xl bg-primary-container/30 border border-outline/10 flex flex-col items-center gap-3 hover:bg-primary hover:text-on-primary transition-all group">
              <PenTool size={32} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">写新文章</span>
            </button>
            <button className="p-6 rounded-3xl bg-secondary-container/30 border border-outline/10 flex flex-col items-center gap-3 hover:bg-secondary hover:text-on-secondary transition-all group">
              <BookOpen size={32} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">记日记</span>
            </button>
            <button className="p-6 rounded-3xl bg-primary-container/30 border border-outline/10 flex flex-col items-center gap-3 hover:bg-primary hover:text-on-primary transition-all group">
              <ImageIcon size={32} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">传图片</span>
            </button>
            <button className="p-6 rounded-3xl bg-secondary-container/30 border border-outline/10 flex flex-col items-center gap-3 hover:bg-secondary hover:text-on-secondary transition-all group">
              <Zap size={32} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">发动态</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
