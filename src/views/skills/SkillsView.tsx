import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit2, Zap, Star, Save, X, ArrowLeft, Search } from 'lucide-react';

type ProficiencyLevel = '入门' | '中等' | '高级' | '专家';

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  proficiency: ProficiencyLevel;
  experienceYears: number;
  experienceMonths: number;
  icon?: string; // Iconify icon name
  color: string; // Hex color
}

export const SkillsView: React.FC = () => {
  const [mode, setMode] = useState<'list' | 'edit' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});

  const [skills, setSkills] = useState<Skill[]>([
    { 
      id: '1', 
      name: 'React / Next.js', 
      description: '熟练使用 React 及其生态系统，包括 Next.js, Redux, Tailwind CSS 等。',
      proficiency: '高级', 
      category: 'Frontend',
      experienceYears: 3,
      experienceMonths: 6,
      icon: 'logos:react',
      color: '#61DAFB'
    },
    { 
      id: '2', 
      name: 'TypeScript', 
      description: '在多个大型项目中使用 TypeScript，能够编写高质量的类型定义。',
      proficiency: '高级', 
      category: 'Language',
      experienceYears: 2,
      experienceMonths: 0,
      icon: 'logos:typescript-icon',
      color: '#3178C6'
    }
  ]);

  const proficiencyLevels: ProficiencyLevel[] = ['入门', '中等', '高级', '专家'];

  const filteredSkills = skills.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (skill: Skill) => {
    setCurrentSkill(skill);
    setMode('edit');
  };

  const handleAdd = () => {
    setCurrentSkill({
      proficiency: '入门',
      category: 'Frontend',
      experienceYears: 0,
      experienceMonths: 0,
      color: '#6366f1'
    });
    setMode('add');
  };

  if (mode === 'list') {
    return (
      <div className="flex-1 overflow-y-auto p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">技能管理</h2>
              <p className="text-primary/60 font-medium">展示您的技术栈和专业技能</p>
            </div>
            <button onClick={handleAdd} className="btn-primary shadow-xl">
              <Plus size={18} />
              <span>添加新技能</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="搜索技能名称或类别..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map(skill => (
              <div 
                key={skill.id} 
                className="material-card p-6 group hover:scale-[1.02] transition-all border-t-4"
                style={{ borderTopColor: skill.color }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="size-10 rounded-xl flex items-center justify-center text-white overflow-hidden shadow-sm"
                      style={{ backgroundColor: skill.color }}
                    >
                      <Zap size={20} />
                    </div>
                    <div>
                      <h3 className="font-black tracking-tight">{skill.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{skill.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(skill)}
                      className="p-1.5 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 h-8">
                  {skill.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Star size={12} className="text-amber-400" />
                    <span>经验: {skill.experienceYears}年 {skill.experienceMonths}月</span>
                  </div>
                  <span 
                    className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                    style={{ backgroundColor: `${skill.color}15`, color: skill.color }}
                  >
                    {skill.proficiency}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ 
                        width: skill.proficiency === '入门' ? '25%' : 
                               skill.proficiency === '中等' ? '50%' : 
                               skill.proficiency === '高级' ? '75%' : '100%',
                        backgroundColor: skill.color 
                      }}
                    />
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
            <span>保存技能</span>
          </button>
        </div>

        <section className="material-card p-8 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">技能详情</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">技能名称</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="例如: React, TypeScript..."
                  value={currentSkill.name || ''}
                  onChange={(e) => setCurrentSkill({...currentSkill, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">所属类别</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="例如: Frontend, Backend..."
                  value={currentSkill.category || ''}
                  onChange={(e) => setCurrentSkill({...currentSkill, category: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">图标 (Iconify 名称)</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="例如: logos:react"
                  value={currentSkill.icon || ''}
                  onChange={(e) => setCurrentSkill({...currentSkill, icon: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">定制颜色</label>
                <div className="flex gap-3">
                  <input 
                    type="color"
                    className="size-11 p-1 bg-primary/5 border-none rounded-xl cursor-pointer"
                    value={currentSkill.color || '#6366f1'}
                    onChange={(e) => setCurrentSkill({...currentSkill, color: e.target.value})}
                  />
                  <input 
                    type="text"
                    className="flex-1 bg-primary/5 border-none rounded-xl p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                    placeholder="#6366f1"
                    value={currentSkill.color || ''}
                    onChange={(e) => setCurrentSkill({...currentSkill, color: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">经验 (年)</label>
                  <input 
                    type="number"
                    className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                    value={currentSkill.experienceYears || 0}
                    onChange={(e) => setCurrentSkill({...currentSkill, experienceYears: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">经验 (月)</label>
                  <input 
                    type="number"
                    max="11"
                    className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                    value={currentSkill.experienceMonths || 0}
                    onChange={(e) => setCurrentSkill({...currentSkill, experienceMonths: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">适应度 (掌握程度)</label>
                <div className="grid grid-cols-4 gap-2">
                  {proficiencyLevels.map(level => (
                    <button
                      key={level}
                      onClick={() => setCurrentSkill({...currentSkill, proficiency: level})}
                      className={`py-2 rounded-xl text-[10px] font-black transition-all border-2 ${
                        currentSkill.proficiency === level
                          ? 'bg-primary border-primary text-white shadow-md'
                          : 'bg-primary/5 border-transparent text-slate-400 hover:bg-primary/10'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="form-label">描述</label>
              <textarea 
                className="form-textarea" 
                placeholder="详细描述您的技能应用经验..."
                value={currentSkill.description || ''}
                onChange={(e) => setCurrentSkill({...currentSkill, description: e.target.value})}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
