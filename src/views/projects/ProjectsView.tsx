import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Github, 
  Edit2, 
  Save, 
  X, 
  Search, 
  Filter, 
  ArrowLeft, 
  Globe, 
  Calendar, 
  Tag, 
  Code2, 
  Layout, 
  CheckCircle2, 
  Clock, 
  CalendarClock,
  Pin
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  status: 'completed' | 'ongoing' | 'planned';
  description: string;
  cover: string;
  techStack: string[];
  tags: string[];
  demoUrl: string;
  sourceUrl: string;
  homepageUrl: string;
  startDate: string;
  endDate?: string;
  pinned: boolean;
}

export const ProjectsView: React.FC = () => {
  const [mode, setMode] = useState<'list' | 'edit' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: '个人博客系统',
      category: 'Web 开发',
      status: 'completed',
      description: '基于 React 和 Vite 构建的现代化个人博客系统，支持 Markdown 编辑和动态主题。',
      cover: 'https://picsum.photos/seed/blog/800/450',
      techStack: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
      tags: ['开源', '个人项目'],
      demoUrl: 'https://example.com',
      sourceUrl: 'https://github.com',
      homepageUrl: 'https://example.com',
      startDate: '2026-01-01',
      endDate: '2026-03-01',
      pinned: true
    },
    {
      id: '2',
      title: 'AI 辅助设计工具',
      category: '人工智能',
      status: 'ongoing',
      description: '利用生成式 AI 技术辅助设计师进行 UI/UX 设计的实验性工具。',
      cover: 'https://picsum.photos/seed/ai/800/450',
      techStack: ['Python', 'PyTorch', 'Next.js'],
      tags: ['AI', '设计'],
      demoUrl: '',
      sourceUrl: 'https://github.com',
      homepageUrl: '',
      startDate: '2026-02-15',
      pinned: false
    }
  ]);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={14} className="text-emerald-500" />;
      case 'ongoing': return <Clock size={14} className="text-blue-500" />;
      case 'planned': return <CalendarClock size={14} className="text-slate-400" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'ongoing': return '进行中';
      case 'planned': return '已计划';
      default: return status;
    }
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setMode('edit');
  };

  const handleAdd = () => {
    setCurrentProject({
      status: 'planned',
      techStack: [],
      tags: [],
      pinned: false,
      startDate: new Date().toISOString().split('T')[0]
    });
    setMode('add');
  };

  if (mode === 'list') {
    return (
      <div className="flex-1 overflow-y-auto p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">项目管理</h2>
              <p className="text-primary/60 font-medium">管理您的项目作品集和开发经历</p>
            </div>
            <button onClick={handleAdd} className="btn-primary shadow-xl">
              <Plus size={18} />
              <span>添加新项目</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="搜索项目标题或类别..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="material-card group overflow-hidden flex flex-col">
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img 
                    src={project.cover} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {project.pinned && (
                    <div className="absolute top-4 left-4 p-2 bg-primary text-white rounded-xl shadow-lg">
                      <Pin size={16} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl flex items-center gap-2 shadow-sm">
                      {getStatusIcon(project.status)}
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 block">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(project)}
                        className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.slice(0, 4).map(t => (
                      <span key={t} className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex gap-4">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                          <Globe size={18} />
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {project.homepageUrl && (
                        <a href={project.homepageUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Calendar size={12} />
                      {project.startDate} {project.endDate ? `~ ${project.endDate}` : '~ 至今'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button 
            onClick={() => setMode('list')}
            className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            返回列表
          </button>
          <div className="flex gap-3">
            <button className="btn-primary shadow-xl">
              <Save size={18} />
              <span>保存项目</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <section className="material-card p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">基本信息</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">项目标题</label>
                  <input 
                    className="w-full bg-primary/5 border-none rounded-xl p-4 font-bold text-lg outline-none focus:ring-2 focus:ring-primary/40" 
                    placeholder="输入项目名称..."
                    value={currentProject.title || ''}
                    onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">项目类别</label>
                    <input 
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                      placeholder="例如: Web 开发, AI..."
                      value={currentProject.category || ''}
                      onChange={(e) => setCurrentProject({...currentProject, category: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">项目状态</label>
                    <select 
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40 appearance-none"
                      value={currentProject.status || 'planned'}
                      onChange={(e) => setCurrentProject({...currentProject, status: e.target.value as any})}
                    >
                      <option value="completed">已完成</option>
                      <option value="ongoing">进行中</option>
                      <option value="planned">已计划</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="form-label">项目描述</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="简要介绍项目的功能和目标..."
                    value={currentProject.description || ''}
                    onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Links & Dates */}
            <section className="material-card p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">链接与日期</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <Globe size={12} /> 演示网址
                    </label>
                    <input 
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-xs outline-none focus:ring-2 focus:ring-primary/40" 
                      placeholder="https://..."
                      value={currentProject.demoUrl || ''}
                      onChange={(e) => setCurrentProject({...currentProject, demoUrl: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <Github size={12} /> 源码网址
                    </label>
                    <input 
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-xs outline-none focus:ring-2 focus:ring-primary/40" 
                      placeholder="https://github.com/..."
                      value={currentProject.sourceUrl || ''}
                      onChange={(e) => setCurrentProject({...currentProject, sourceUrl: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <ExternalLink size={12} /> 项目主页
                    </label>
                    <input 
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-xs outline-none focus:ring-2 focus:ring-primary/40" 
                      placeholder="https://..."
                      value={currentProject.homepageUrl || ''}
                      onChange={(e) => setCurrentProject({...currentProject, homepageUrl: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <Calendar size={12} /> 开始日期
                    </label>
                    <input 
                      type="date"
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-xs outline-none focus:ring-2 focus:ring-primary/40" 
                      value={currentProject.startDate || ''}
                      onChange={(e) => setCurrentProject({...currentProject, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <Calendar size={12} /> 结束日期 (选填)
                    </label>
                    <input 
                      type="date"
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-xs outline-none focus:ring-2 focus:ring-primary/40" 
                      value={currentProject.endDate || ''}
                      onChange={(e) => setCurrentProject({...currentProject, endDate: e.target.value})}
                    />
                  </div>
                  <div className="pt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${currentProject.pinned ? 'bg-primary border-primary' : 'border-primary/20 group-hover:border-primary/40'}`}>
                        {currentProject.pinned && <Pin size={14} className="text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={currentProject.pinned || false}
                        onChange={(e) => setCurrentProject({...currentProject, pinned: e.target.checked})}
                      />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-600">置顶此项目</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* Cover Image */}
            <section className="material-card p-6 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">项目封面</h3>
              <div className="aspect-video rounded-2xl bg-primary/5 border-2 border-dashed border-primary/20 overflow-hidden relative group cursor-pointer">
                {currentProject.cover ? (
                  <>
                    <img src={currentProject.cover} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => setCurrentProject({...currentProject, cover: ''})}
                        className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Plus size={32} className="text-primary/40" />
                    <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">上传封面</span>
                  </div>
                )}
              </div>
              <input 
                className="w-full bg-primary/5 border-none rounded-xl p-2 text-[10px] font-bold outline-none" 
                placeholder="或输入图片 URL..."
                value={currentProject.cover || ''}
                onChange={(e) => setCurrentProject({...currentProject, cover: e.target.value})}
              />
            </section>

            {/* Tech Stack & Tags */}
            <section className="material-card p-6 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">技术与标签</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Code2 size={12} /> 技术栈
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(currentProject.techStack || []).map(tech => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-[9px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                        {tech}
                        <button onClick={() => setCurrentProject({...currentProject, techStack: currentProject.techStack?.filter(t => t !== tech)})}><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                  <input 
                    className="w-full bg-primary/5 border-none rounded-xl p-2 font-bold text-xs outline-none" 
                    placeholder="按回车添加技术..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val && !currentProject.techStack?.includes(val)) {
                          setCurrentProject({...currentProject, techStack: [...(currentProject.techStack || []), val]});
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Tag size={12} /> 标签
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(currentProject.tags || []).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-[9px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                        {tag}
                        <button onClick={() => setCurrentProject({...currentProject, tags: currentProject.tags?.filter(t => t !== tag)})}><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                  <input 
                    className="w-full bg-primary/5 border-none rounded-xl p-2 font-bold text-xs outline-none" 
                    placeholder="按回车添加标签..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val && !currentProject.tags?.includes(val)) {
                          setCurrentProject({...currentProject, tags: [...(currentProject.tags || []), val]});
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
