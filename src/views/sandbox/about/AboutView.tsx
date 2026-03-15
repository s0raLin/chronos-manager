import React, { useState } from 'react';
import { MessageSquare, Save, Eye, Edit3, User, Globe, Mail, Github, Twitter } from 'lucide-react';

export function AboutView(){
  const [content, setContent] = useState('你好！我是一名热爱技术的开发者。');
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">关于页面</h2>
            <p className="text-primary/60 font-medium">编写您的个人介绍和博客关于信息</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsPreview(!isPreview)}
              className={`px-6 py-2.5 rounded-xl font-black transition-all text-sm flex items-center gap-2 ${isPreview ? 'bg-primary text-white shadow-xl' : 'border-2 border-primary/20 text-primary hover:bg-primary/5'}`}
            >
              {isPreview ? <Edit3 size={18} /> : <Eye size={18} />}
              <span>{isPreview ? '返回编辑' : '预览页面'}</span>
            </button>
            <button className="btn-primary shadow-xl">
              <Save size={18} />
              <span>保存更新</span>
            </button>
          </div>
        </div>

        {!isPreview ? (
          <div className="grid grid-cols-1 gap-8">
            <section className="material-card p-8 space-y-6">
              <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
                <User className="text-primary" size={24} />
                个人基本信息
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="form-label">昵称</label>
                  <input className="form-input" placeholder="您的昵称" defaultValue="Alex Chen" />
                </div>
                <div className="space-y-2">
                  <label className="form-label">邮箱</label>
                  <input className="form-input" placeholder="您的邮箱" defaultValue="alex@example.com" />
                </div>
              </div>
            </section>

            <section className="material-card p-8 space-y-6">
              <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
                <Edit3 className="text-primary" size={24} />
                详细自我介绍 (Markdown)
              </h3>
              <textarea 
                className="form-input-lg min-h-[400px]" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在此输入您的个人介绍..."
              />
            </section>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 p-16 shadow-2xl min-h-[600px] prose prose-slate dark:prose-invert max-w-none">
              <div className="flex flex-col items-center text-center mb-16">
                <div className="size-32 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 shadow-inner overflow-hidden">
                  <img src="https://picsum.photos/seed/avatar/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h1 className="text-4xl font-black tracking-tighter mb-2">Alex Chen</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">全栈开发工程师 / 开源爱好者</p>
                <div className="flex gap-4 mt-6">
                  <Github className="text-slate-400 hover:text-primary cursor-pointer transition-colors" size={20} />
                  <Twitter className="text-slate-400 hover:text-primary cursor-pointer transition-colors" size={20} />
                  <Mail className="text-slate-400 hover:text-primary cursor-pointer transition-colors" size={20} />
                  <Globe className="text-slate-400 hover:text-primary cursor-pointer transition-colors" size={20} />
                </div>
              </div>
              <div className="whitespace-pre-wrap">
                {content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
