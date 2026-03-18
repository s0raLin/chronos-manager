import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Save, 
  MapPin, 
  Tag, 
  Smile, 
  Frown, 
  Meh, 
  Laugh,
  Calendar,
  Clock,
  Send,
  Image as ImageIcon,
  X,
  Search,
  Edit3,
  ArrowLeft,
  MoreVertical
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export function DiaryView(){
  const [searchParams] = useSearchParams();
  const newMode = searchParams.get("mode") ?? "list";
  const [mode, setMode] = useState<'list' | 'edit' | 'add'>(newMode);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('satisfied');
  const [location, setLocation] = useState('上海, 中国');
  const [tags, setTags] = useState<string[]>(['日常']);
  const [newTag, setNewTag] = useState('');

  const moods = [
    { id: 'very_dissatisfied', icon: Frown, label: '难过', color: 'text-red-500' },
    { id: 'dissatisfied', icon: Meh, label: '一般', color: 'text-amber-500' },
    { id: 'satisfied', icon: Smile, label: '开心', color: 'text-green-500' },
    { id: 'very_satisfied', icon: Laugh, label: '非常棒', color: 'text-emerald-500' },
  ];

  const diaries = [
    { id: 1, content: '今天去看了樱花，真的很美...', date: '2026-03-15', time: '13:26', mood: 'satisfied', location: '上海, 中国', tags: ['日常', '旅行'] },
    { id: 2, content: '关于未来的一些思考...', date: '2026-03-13', time: '22:10', mood: 'dissatisfied', location: '北京, 中国', tags: ['思考'] },
  ];

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const getMoodIcon = (moodId: string) => {
    const m = moods.find(m => m.id === moodId);
    if (!m) return Smile;
    return m.icon;
  };

  const getMoodColor = (moodId: string) => {
    const m = moods.find(m => m.id === moodId);
    if (!m) return 'text-slate-400';
    return m.color;
  };

  if (mode === 'list') {
    return (
      <div className="flex-1 overflow-y-scroll scrollbar-visible p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">日记列表</h2>
              <p className="text-primary/60 font-medium">记录生活中的点点滴滴</p>
            </div>
            <button 
              onClick={() => setMode('add')}
              className="btn-primary shadow-xl"
            >
              <Plus size={18} />
              <span>新增日记</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diaries.map((diary) => {
              const MoodIcon = getMoodIcon(diary.mood);
              return (
                <div key={diary.id} className="material-card p-6 group hover:scale-[1.01] transition-all cursor-pointer relative">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setMode('edit'); }}
                      className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`size-10 rounded-xl bg-primary/5 flex items-center justify-center ${getMoodColor(diary.mood)}`}>
                      <MoodIcon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Calendar size={12} /> {diary.date}
                        <span className="text-primary/20">•</span>
                        <Clock size={12} /> {diary.time}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest mt-0.5">
                        <MapPin size={10} /> {diary.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                    {diary.content}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {diary.tags && diary.tags.length > 0 ? (
                      diary.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-primary/5 text-primary text-[9px] font-black rounded-full uppercase tracking-widest">
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-[9px] font-black rounded-full uppercase tracking-widest">
                        暂无标签
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-scroll scrollbar-visible p-8 lg:px-24">
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
            <button className="px-6 py-2.5 rounded-xl border-2 border-primary/20 font-black text-primary hover:bg-primary/5 transition-all text-sm flex items-center gap-2">
              <Save size={18} />
              <span>保存草稿</span>
            </button>
            <button className="btn-primary shadow-xl">
              <Send size={18} />
              <span>发布日记</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="material-card p-8 space-y-6">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> 2026年3月15日</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 13:26</span>
                </div>
                <span>ID: #DR-992</span>
              </div>
              
              <textarea 
                className="form-input-lg min-h-[400px]" 
                placeholder="今天发生了什么有趣的事？尽情书写吧..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <div className="space-y-4 pt-4 border-t border-primary/10">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={14} />
                  媒体附件
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square rounded-xl bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-all group">
                    <Plus size={32} className="text-primary/40 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black text-primary/60 mt-2">添加照片</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="material-card p-6 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">当前心情</h3>
              <div className="grid grid-cols-2 gap-3">
                {moods.map(m => (
                  <button 
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${mood === m.id ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100'}`}
                  >
                    <m.icon size={24} className={m.color} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{m.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="material-card p-6 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">位置与标签</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="form-label">地理位置</label>
                  <div className="relative">
                    <input 
                      className="form-input-sm pl-10" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="form-label">标签</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-primary/10 text-primary text-[9px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      className="form-input-sm" 
                      placeholder="添加标签..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <button onClick={addTag} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
