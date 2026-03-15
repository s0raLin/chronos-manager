import React, { useState } from 'react';
import { 
  Edit3, 
  Calendar, 
  ChevronDown, 
  Plus, 
  X, 
  Eye,
  CheckCircle2,
  Image as ImageIcon,
  Type,
  Hash,
  MessageSquare,
  Pin,
  FileText,
  Languages,
  Layout,
  EyeOff,
  Search,
  MoreVertical,
  Trash2,
  ArrowLeft
} from 'lucide-react';

export const CMSView: React.FC = () => {
  const [mode, setMode] = useState<'list' | 'edit' | 'add'>('list');
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState('');
  
  // Metadata states
  const [title, setTitle] = useState('数学理论');
  const [published, setPublished] = useState('2026-03-04');
  const [description, setDescription] = useState('不同于自然语言，数学专门用于表达抽象和逻辑思想，由符号、公式和陈述组成，是一个严谨而统一的表达系统。');
  const [image, setImage] = useState('./cover.webp');
  const [tags, setTags] = useState(['欢迎', '演示', '教程']);
  const [category, setCategory] = useState('教程');
  const [isDraft, setIsDraft] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const [isCommentEnabled, setIsCommentEnabled] = useState(true);
  const [lang, setLang] = useState('zh-CN');

  const [newTag, setNewTag] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const articles = [
    { id: 1, title: '数学理论', date: '2026-03-04', category: '教程', status: '已发布', pinned: true },
    { id: 2, title: '深入理解量子力学', date: '2026-03-14', category: '物理', status: '草稿', pinned: false },
    { id: 3, title: 'React 19 新特性概览', date: '2026-03-12', category: '技术', status: '草稿', pinned: false },
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

  if (mode === 'list') {
    return (
      <div className="flex-1 overflow-y-auto p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">文章列表</h2>
              <p className="text-primary/60 font-medium">管理您的所有博文内容</p>
            </div>
            <button 
              onClick={() => setMode('add')}
              className="btn-primary shadow-xl"
            >
              <Plus size={18} />
              <span>新增文章</span>
            </button>
          </div>

          <div className="material-card overflow-hidden">
            <div className="p-6 border-b border-primary/10 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="搜索文章标题..." 
                  className="search-input text-sm"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              </div>
              <div className="flex items-center gap-3">
                <select className="bg-primary/5 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/40">
                  <option>所有分类</option>
                  <option>教程</option>
                  <option>技术</option>
                  <option>随笔</option>
                </select>
                <select className="bg-primary/5 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/40">
                  <option>所有状态</option>
                  <option>已发布</option>
                  <option>草稿</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">标题</th>
                    <th className="px-6 py-4">分类</th>
                    <th className="px-6 py-4">发布日期</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {article.pinned && <Pin size={14} className="text-primary" />}
                          <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">{article.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">{article.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 font-medium">{article.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${
                          article.status === '已发布' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setMode('edit')}
                            className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <button 
            onClick={() => setMode('list')}
            className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            返回列表
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPreview(!isPreview)}
              className={`p-2.5 rounded-xl transition-colors flex items-center gap-2 font-bold text-sm ${isPreview ? 'bg-primary text-white' : 'hover:bg-primary/5 text-slate-500'}`}
            >
              {isPreview ? <EyeOff size={20} /> : <Eye size={20} />}
              {isPreview ? '退出预览' : '实时预览'}
            </button>
            <button className="px-6 py-2.5 rounded-xl border-2 border-primary/20 font-black text-primary hover:bg-primary/5 transition-all text-sm">
              保存草稿
            </button>
            <button className="btn-primary shadow-xl">
              发布文章
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-primary/10 space-y-8 shadow-sm">
              <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
                <Edit3 className="text-primary" size={24} />
                文章元数据 (Frontmatter)
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">文章标题 (title)</label>
                  <input 
                    className="w-full bg-primary/5 border-none rounded-xl p-4 text-xl font-bold focus:ring-2 focus:ring-primary/40 focus:bg-primary/10 transition-all outline-none" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="请输入文章标题..." 
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">发布日期 (published)</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-primary/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/40 outline-none font-bold" 
                        type="date" 
                        value={published}
                        onChange={(e) => setPublished(e.target.value)}
                      />
                      <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">语言 (lang)</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-primary/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/40 outline-none appearance-none font-bold"
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                      >
                        <option value="zh-CN">简体中文 (zh-CN)</option>
                        <option value="en-US">English (en-US)</option>
                        <option value="ja-JP">日本語 (ja-JP)</option>
                      </select>
                      <Languages size={18} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">封面图片路径 (image)</label>
                  <div className="flex gap-2">
                    <input 
                      className="flex-1 bg-primary/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/40 outline-none font-bold" 
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="./cover.webp"
                    />
                    <button className="p-4 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors">
                      <ImageIcon size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="form-label">文章描述 (description)</label>
                  <textarea 
                    className="form-textarea" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="简短的文章总结..."
                  />
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-primary/10 space-y-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
                  <FileText className="text-primary" size={24} />
                  Markdown 编辑器
                </h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-slate-500" title="加粗">B</button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-slate-500 italic" title="斜体">I</button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-slate-500" title="链接">L</button>
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-slate-500" title="代码">C</button>
                </div>
              </div>
              
              <div className="relative">
                <textarea 
                  className="w-full bg-primary/5 border-none rounded-xl p-6 focus:ring-2 focus:ring-primary/40 outline-none min-h-[500px] font-mono text-sm leading-relaxed" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="在此输入 Markdown 内容..."
                />
                <div className="absolute bottom-4 right-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {content.length} 字符
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-primary/10 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-4">分类与标签</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">分类 (category)</label>
                  <div className="space-y-2">
                    <select 
                      className="w-full bg-primary/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/40 outline-none appearance-none font-bold text-sm"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="教程">教程</option>
                      <option value="随笔">随笔</option>
                      <option value="技术">技术</option>
                      <option value="custom">-- 自定义 --</option>
                    </select>
                    {category === 'custom' && (
                      <input 
                        className="w-full bg-primary/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/40 outline-none font-bold text-sm"
                        placeholder="输入自定义分类..."
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">标签 (tags)</label>
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
                      className="flex-1 bg-primary/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/40 outline-none font-bold text-sm"
                      placeholder="添加标签..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <button 
                      onClick={addTag}
                      className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-primary/10 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-4">状态控制</h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${isDraft ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">草稿模式 (draft)</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{isDraft ? '仅自己可见' : '公开发布'}</p>
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={isDraft} onChange={() => setIsDraft(!isDraft)} />
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${isDraft ? 'bg-amber-500' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${isDraft ? 'left-7' : 'left-1'}`} />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${isPinned ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                      <Pin size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">置顶文章 (pinned)</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{isPinned ? '已置顶' : '普通排序'}</p>
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={isPinned} onChange={() => setIsPinned(!isPinned)} />
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${isPinned ? 'bg-primary' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${isPinned ? 'left-7' : 'left-1'}`} />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${isCommentEnabled ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">开启评论 (comment)</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{isCommentEnabled ? '允许评论' : '禁止评论'}</p>
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={isCommentEnabled} onChange={() => setIsCommentEnabled(!isCommentEnabled)} />
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${isCommentEnabled ? 'bg-primary' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${isCommentEnabled ? 'left-7' : 'left-1'}`} />
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Preview Area (Full Width when active) */}
          {isPreview && (
            <div className="lg:col-span-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-primary/5 border border-primary/10 rounded-3xl p-10 space-y-8 shadow-inner">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black tracking-tight">文章实时预览</h3>
                  <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-primary/10">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">预览模式</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 p-16 max-w-4xl mx-auto shadow-2xl min-h-[600px]">
                  <div className="mb-8 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">{category === 'custom' ? customCategory : category}</span>
                      {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">#{tag}</span>
                      ))}
                    </div>
                    <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 leading-[1.1] tracking-tighter">{title}</h1>
                    <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <span>{published}</span>
                      <span>•</span>
                      <span>{lang}</span>
                      {isPinned && <span className="text-primary flex items-center gap-1"><Pin size={12} /> 已置顶</span>}
                    </div>
                  </div>

                  <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg bg-slate-100">
                    <img 
                      className="w-full h-full object-cover" 
                      src={image.startsWith('.') ? `https://picsum.photos/seed/${title}/1200/675` : image} 
                      alt="Cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-xl text-slate-500 dark:text-slate-400 italic mb-12 border-l-4 border-primary/30 pl-6 py-2 leading-relaxed">
                      {description}
                    </p>
                    <div className="whitespace-pre-wrap font-sans leading-relaxed text-slate-700 dark:text-slate-300">
                      {content || '开始编写您的精彩内容...'}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
