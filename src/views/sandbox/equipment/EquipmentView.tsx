import React, { useState } from 'react';
import { LayoutDashboard, Plus, Trash2, Edit2, Monitor, Smartphone, Laptop, Speaker, Save, X, ArrowLeft, Search, ExternalLink } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  specs: string;
  description: string;
  link?: string;
}

export function EquipmentView(){
  const [mode, setMode] = useState<'list' | 'edit' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEquipment, setCurrentEquipment] = useState<Partial<Equipment>>({});

  const [equipments, setEquipments] = useState<Equipment[]>([
    {
      id: '1',
      name: 'MacBook Pro 14"',
      brand: 'Apple',
      category: 'Laptop',
      image: 'https://picsum.photos/seed/mac/400/300',
      specs: 'M1 Pro (8C CPU/14C GPU), 16GB RAM, 512GB SSD',
      description: '主力开发机器，性能强劲且续航优秀。',
      link: 'https://www.apple.com/macbook-pro/'
    }
  ]);

  const filteredEquipments = equipments.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (equipment: Equipment) => {
    setCurrentEquipment(equipment);
    setMode('edit');
  };

  const handleAdd = () => {
    setCurrentEquipment({
      image: 'https://picsum.photos/seed/new-eq/400/300',
      specs: '',
      description: '',
      category: 'Laptop'
    });
    setMode('add');
  };

  if (mode === 'list') {
    return (
      <div className="flex-1 overflow-y-auto p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">设备管理</h2>
              <p className="text-primary/60 font-medium">展示您的工作环境和常用电子设备</p>
            </div>
            <button onClick={handleAdd} className="btn-primary shadow-xl">
              <Plus size={18} />
              <span>添加新设备</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="搜索设备名称、品牌或分类..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipments.map(item => (
              <div key={item.id} className="material-card group overflow-hidden flex flex-col">
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-primary shadow-lg hover:bg-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-red-500 shadow-lg hover:bg-white transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="absolute bottom-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-xl text-white shadow-lg hover:bg-black/70 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[10px] font-black text-primary/50 uppercase tracking-widest">{item.brand}</p>
                    <span className="text-[9px] font-bold bg-primary/5 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-black tracking-tight text-slate-800 dark:text-slate-100 mb-2">{item.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 line-clamp-1">
                    {item.specs}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
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
            <span>保存设备</span>
          </button>
        </div>

        <section className="material-card p-8 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">设备详情</h3>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">设备图片</label>
              <div className="aspect-video rounded-2xl bg-primary/5 border-2 border-dashed border-primary/20 overflow-hidden relative group cursor-pointer">
                {currentEquipment.image ? (
                  <img src={currentEquipment.image} alt="Equipment" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Plus size={32} className="text-primary/40" />
                  </div>
                )}
              </div>
              <input 
                className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-xs outline-none focus:ring-2 focus:ring-primary/40" 
                placeholder="图片 URL..."
                value={currentEquipment.image || ''}
                onChange={(e) => setCurrentEquipment({...currentEquipment, image: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">设备名称</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="例如: MacBook Pro..."
                  value={currentEquipment.name || ''}
                  onChange={(e) => setCurrentEquipment({...currentEquipment, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">品牌</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="例如: Apple, Sony..."
                  value={currentEquipment.brand || ''}
                  onChange={(e) => setCurrentEquipment({...currentEquipment, brand: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">设备类别</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="例如: Laptop, Smartphone..."
                  value={currentEquipment.category || ''}
                  onChange={(e) => setCurrentEquipment({...currentEquipment, category: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">详情链接</label>
                <input 
                  className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                  placeholder="https://..."
                  value={currentEquipment.link || ''}
                  onChange={(e) => setCurrentEquipment({...currentEquipment, link: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">配置和规格</label>
              <input 
                className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                placeholder="例如: M1 Pro, 16GB RAM..."
                value={currentEquipment.specs || ''}
                onChange={(e) => setCurrentEquipment({...currentEquipment, specs: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="form-label">描述</label>
              <textarea 
                className="form-textarea" 
                placeholder="关于此设备的更多信息..."
                value={currentEquipment.description || ''}
                onChange={(e) => setCurrentEquipment({...currentEquipment, description: e.target.value})}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
