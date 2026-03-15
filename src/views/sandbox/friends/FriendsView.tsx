import React, { useState } from 'react';
import { Users, Plus, Trash2, Edit2, ExternalLink, Link as LinkIcon, Save, X, ArrowLeft, Search } from 'lucide-react';

interface Friend {
  id: string;
  title: string;
  image: string;
  description: string;
  link: string;
  tags: string[];
}

export function FriendsView(){
  const [mode, setMode] = useState<'list' | 'edit' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFriend, setCurrentFriend] = useState<Partial<Friend>>({});

  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      title: '示例好友',
      link: 'https://example.com',
      image: 'https://picsum.photos/seed/friend1/100/100',
      description: '这是一个优秀的开发者博客。',
      tags: ['技术', '生活']
    }
  ]);

  const filteredFriends = friends.filter(f => 
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (friend: Friend) => {
    setCurrentFriend(friend);
    setMode('edit');
  };

  const handleAdd = () => {
    setCurrentFriend({
      image: 'https://picsum.photos/seed/new/100/100',
      tags: []
    });
    setMode('add');
  };

  if (mode === 'list') {
    return (
      <div className="flex-1 overflow-y-auto p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">友链管理</h2>
              <p className="text-primary/60 font-medium">管理您的合作伙伴和博友链接</p>
            </div>
            <button onClick={handleAdd} className="btn-primary shadow-xl">
              <Plus size={18} />
              <span>添加新友链</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="搜索标题、描述或标签..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.map(friend => (
              <div key={friend.id} className="material-card p-6 group hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={friend.image} 
                      alt={friend.title} 
                      className="size-14 rounded-2xl object-cover shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-black tracking-tight">{friend.title}</h3>
                      <a href={friend.link} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-widest">
                        <LinkIcon size={10} />
                        访问网站
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(friend)}
                      className="p-1.5 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2 h-8">
                  {friend.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {friend.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
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
            <span>保存友链</span>
          </button>
        </div>

        <section className="material-card p-8 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">友链详情</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="size-24 rounded-3xl bg-primary/5 border-2 border-dashed border-primary/20 overflow-hidden relative group cursor-pointer">
                {currentFriend.image ? (
                  <img src={currentFriend.image} alt="Image" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Plus size={24} className="text-primary/40" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">图片 URL</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-xs outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="https://..."
                  value={currentFriend.image || ''}
                  onChange={(e) => setCurrentFriend({...currentFriend, image: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">标题</label>
              <input 
                className="w-full bg-primary/5 border-none rounded-xl p-4 font-bold text-lg outline-none focus:ring-2 focus:ring-primary/40" 
                placeholder="输入友链标题..."
                value={currentFriend.title || ''}
                onChange={(e) => setCurrentFriend({...currentFriend, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">链接</label>
              <input 
                className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                placeholder="https://..."
                value={currentFriend.link || ''}
                onChange={(e) => setCurrentFriend({...currentFriend, link: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">标签 (逗号分隔)</label>
              <input 
                className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                placeholder="例如: 技术, 博客, 开发者..."
                value={currentFriend.tags?.join(', ') || ''}
                onChange={(e) => setCurrentFriend({...currentFriend, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '')})}
              />
            </div>

            <div className="space-y-2">
              <label className="form-label">描述</label>
              <textarea 
                className="form-textarea" 
                placeholder="简要介绍这个网站..."
                value={currentFriend.description || ''}
                onChange={(e) => setCurrentFriend({...currentFriend, description: e.target.value})}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
