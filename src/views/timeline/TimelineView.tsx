import React, { useState } from 'react';
import { Rocket, Palette, Code, Trash2, Plus, Calendar, MapPin, Building2, ChevronDown, Save, Edit2, X, ArrowLeft, Search } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  location: string;
  organization: string;
  skills: string[];
  pinned: boolean;
  icon: any;
}

export const TimelineView: React.FC = () => {
  const [mode, setMode] = useState<'list' | 'edit' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEvent, setCurrentEvent] = useState<Partial<TimelineEvent>>({});

  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: '#MK-402',
      title: '项目启动与策略规划',
      description: '与利益相关者进行初步会议，定义产品路线图和第三季度的关键绩效指标。',
      date: '2023-10-12',
      location: '创新中心',
      organization: '全球科技集团',
      type: '里程碑',
      skills: ['项目管理', '战略规划'],
      pinned: true,
      icon: Rocket,
    }
  ]);

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (event: TimelineEvent) => {
    setCurrentEvent(event);
    setMode('edit');
  };

  const handleAdd = () => {
    setCurrentEvent({
      id: `#EV-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      skills: [],
      icon: Rocket,
      type: '里程碑',
      pinned: false
    });
    setMode('add');
  };

  if (mode === 'list') {
    return (
      <div className="flex-1 overflow-y-auto p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">时间线管理</h2>
              <p className="text-primary/60 font-medium">记录并编辑您的重要里程碑和项目节点</p>
            </div>
            <button onClick={handleAdd} className="btn-primary shadow-xl">
              <Plus size={18} />
              <span>添加新事件</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="搜索事件标题或组织..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
            {filteredEvents.map((event, idx) => (
              <div key={event.id} className={`relative flex items-center justify-between md:justify-normal group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background-light dark:bg-background-dark text-primary shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                  <event.icon size={20} />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 material-card relative group/card">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(event)}
                      className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-primary/50 uppercase tracking-widest">ID: {event.id}</span>
                      {event.pinned && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[9px] font-black rounded-full uppercase tracking-widest">置顶</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-bold cursor-pointer hover:bg-primary/10 transition-colors">
                      {event.type}
                      <ChevronDown size={12} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-3 tracking-tight">{event.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mb-6">
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                      <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                        <Calendar size={14} />
                      </div>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                      <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                        <MapPin size={14} />
                      </div>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                      <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                        <Building2 size={14} />
                      </div>
                      <span>{event.organization}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/5">
                    {event.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-full bg-primary/5 text-[9px] font-black text-primary uppercase tracking-widest">
                        #{skill}
                      </span>
                    ))}
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
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setMode('list')}
            className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            返回列表
          </button>
          <button className="btn-primary shadow-xl">
            <Save size={18} />
            <span>保存事件</span>
          </button>
        </div>

        <section className="material-card p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">事件详情</h3>
            <label className="flex items-center gap-2 cursor-pointer group">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">置顶</span>
              <div 
                onClick={() => setCurrentEvent({...currentEvent, pinned: !currentEvent.pinned})}
                className={`w-10 h-5 rounded-full transition-colors relative ${currentEvent.pinned ? 'bg-primary' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 size-3 bg-white rounded-full transition-all ${currentEvent.pinned ? 'left-6' : 'left-1'}`} />
              </div>
            </label>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">事件标题</label>
              <input 
                className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                placeholder="例如: 项目启动..."
                value={currentEvent.title || ''}
                onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">日期</label>
                <input 
                  type="date"
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  value={currentEvent.date || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">事件类型</label>
                <select 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40 appearance-none"
                  value={currentEvent.type || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, type: e.target.value})}
                >
                  <option value="里程碑">里程碑</option>
                  <option value="教育">教育</option>
                  <option value="工作">工作</option>
                  <option value="项目">项目</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">地点</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="例如: 创新中心..."
                  value={currentEvent.location || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">组织和结构</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="例如: 全球科技集团..."
                  value={currentEvent.organization || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, organization: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="form-label">描述</label>
              <textarea 
                className="form-textarea" 
                placeholder="详细描述该事件..."
                value={currentEvent.description || ''}
                onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">相关技能 (逗号分隔)</label>
              <input 
                className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                placeholder="项目管理, 战略规划..."
                value={currentEvent.skills?.join(', ') || ''}
                onChange={(e) => setCurrentEvent({...currentEvent, skills: e.target.value.split(',').map(t => t.trim())})}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
