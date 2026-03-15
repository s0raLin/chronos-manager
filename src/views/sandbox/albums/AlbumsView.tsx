import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  ArrowLeft, 
  Search, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Tag, 
  LayoutGrid, 
  Columns, 
  Maximize2, 
  Star,
  X,
  Upload
} from 'lucide-react';

interface AlbumImage {
  id: string;
  url: string;
  caption: string;
  isCover: boolean;
}

interface Album {
  id: string;
  dirName: string;
  title: string;
  date: string;
  columns: number;
  layout: 'masonry' | 'grid';
  description: string;
  location: string;
  tags: string[];
  images: AlbumImage[];
}

export function AlbumsView(){
  const [mode, setMode] = useState<'list' | 'edit' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState<Partial<Album>>({});
  const [newTag, setNewTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const [albums, setAlbums] = useState<Album[]>([
    {
      id: '1',
      dirName: 'japan-2024',
      title: '2024 日本之行',
      date: '2024-03-15',
      columns: 3,
      layout: 'masonry',
      description: '记录在东京和京都的美好时光。',
      location: '日本',
      tags: ['旅行', '摄影', '日本'],
      images: [
        { id: 'i1', url: 'https://picsum.photos/seed/jp1/800/600', caption: '东京塔', isCover: true },
        { id: 'i2', url: 'https://picsum.photos/seed/jp2/600/800', caption: '京都寺庙', isCover: false },
      ]
    }
  ]);

  const filteredAlbums = albums.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.dirName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (album: Album) => {
    setCurrentAlbum(album);
    setMode('edit');
  };

  const handleAdd = () => {
    setCurrentAlbum({
      dirName: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      columns: 3,
      layout: 'masonry',
      description: '',
      location: '',
      tags: [],
      images: []
    });
    setMode('add');
  };

  const addTag = () => {
    if (newTag && currentAlbum.tags && !currentAlbum.tags.includes(newTag)) {
      setCurrentAlbum({ ...currentAlbum, tags: [...currentAlbum.tags, newTag] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (currentAlbum.tags) {
      setCurrentAlbum({ ...currentAlbum, tags: currentAlbum.tags.filter(t => t !== tagToRemove) });
    }
  };

  const addImage = () => {
    if (newImageUrl) {
      const newImg: AlbumImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: newImageUrl,
        caption: '',
        isCover: (currentAlbum.images?.length === 0)
      };
      setCurrentAlbum({
        ...currentAlbum,
        images: [...(currentAlbum.images || []), newImg]
      });
      setNewImageUrl('');
    }
  };

  const removeImage = (id: string) => {
    if (currentAlbum.images) {
      setCurrentAlbum({
        ...currentAlbum,
        images: currentAlbum.images.filter(img => img.id !== id)
      });
    }
  };

  const setCover = (id: string) => {
    if (currentAlbum.images) {
      setCurrentAlbum({
        ...currentAlbum,
        images: currentAlbum.images.map(img => ({
          ...img,
          isCover: img.id === id
        }))
      });
    }
  };

  const updateImageCaption = (id: string, caption: string) => {
    if (currentAlbum.images) {
      setCurrentAlbum({
        ...currentAlbum,
        images: currentAlbum.images.map(img => img.id === id ? { ...img, caption } : img)
      });
    }
  };

  if (mode === 'list') {
    return (
      <div className="flex-1 overflow-y-auto p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">专辑管理</h2>
              <p className="text-primary/60 font-medium">管理您的摄影期刊与相册</p>
            </div>
            <button onClick={handleAdd} className="btn-primary shadow-xl">
              <Plus size={18} />
              <span>创建新专辑</span>
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="搜索专辑标题或目录名..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map(album => {
              const cover = album.images.find(img => img.isCover) || album.images[0];
              return (
                <div key={album.id} className="material-card group overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    {cover ? (
                      <img 
                        src={cover.url} 
                        alt={album.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(album)}
                        className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-primary shadow-lg hover:bg-white transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-red-500 shadow-lg hover:bg-white transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                      {album.images.length} 张图片
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black text-primary/50 uppercase tracking-widest">{album.dirName}</p>
                      <span className="text-[10px] font-bold text-slate-400">{album.date}</span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 mb-3">{album.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
                      {album.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {album.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-black rounded-full uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
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
    <div className="flex-1 overflow-y-auto p-8 lg:px-24">
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
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
            <span>保存专辑</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <section className="material-card p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">基本信息</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">目录名称 (dirName)</label>
                    <input 
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                      placeholder="例如: japan-trip-2024"
                      value={currentAlbum.dirName || ''}
                      onChange={(e) => setCurrentAlbum({...currentAlbum, dirName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">期刊标题 (title)</label>
                    <input 
                      className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                      placeholder="例如: 2024 日本之行"
                      value={currentAlbum.title || ''}
                      onChange={(e) => setCurrentAlbum({...currentAlbum, title: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">日期 (date)</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                        type="date"
                        value={currentAlbum.date || ''}
                        onChange={(e) => setCurrentAlbum({...currentAlbum, date: e.target.value})}
                      />
                      <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">地点 (location)</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-primary/5 border-none rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-primary/40" 
                        placeholder="例如: 东京, 日本"
                        value={currentAlbum.location || ''}
                        onChange={(e) => setCurrentAlbum({...currentAlbum, location: e.target.value})}
                      />
                      <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="form-label">描述 (description)</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="关于此专辑的更多信息..."
                    value={currentAlbum.description || ''}
                    onChange={(e) => setCurrentAlbum({...currentAlbum, description: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Images Management */}
            <section className="material-card p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">图片管理</h3>
                <div className="flex gap-2">
                  <input 
                    className="bg-primary/5 border-none rounded-lg px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/40 w-48"
                    placeholder="输入图片 URL..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <button 
                    onClick={addImage}
                    className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                  >
                    <Upload size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentAlbum.images?.map((img) => (
                  <div key={img.id} className="relative group bg-slate-50 dark:bg-slate-900/50 rounded-2xl overflow-hidden border border-primary/5">
                    <div className="aspect-video relative">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setCover(img.id)}
                          className={`p-1.5 rounded-lg shadow-lg transition-colors ${img.isCover ? 'bg-amber-500 text-white' : 'bg-white/90 text-slate-400 hover:text-amber-500'}`}
                          title="设为封面"
                        >
                          <Star size={14} fill={img.isCover ? 'currentColor' : 'none'} />
                        </button>
                        <button 
                          onClick={() => removeImage(img.id)}
                          className="p-1.5 bg-white/90 text-red-500 rounded-lg shadow-lg hover:bg-white transition-colors"
                          title="删除图片"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      {img.isCover && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-[8px] font-black rounded-full uppercase tracking-widest shadow-lg">
                          封面
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <input 
                        className="w-full bg-transparent border-none p-0 text-xs font-bold outline-none placeholder:text-slate-300"
                        placeholder="添加图片说明..."
                        value={img.caption}
                        onChange={(e) => updateImageCaption(img.id, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                {currentAlbum.images?.length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-primary/10 rounded-3xl">
                    <ImageIcon size={48} className="mb-2 opacity-20" />
                    <p className="text-xs font-black uppercase tracking-widest opacity-40">暂无图片，请上传</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Layout Settings */}
            <section className="material-card p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">布局设置</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">相册列数 (columns)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="1" 
                      max="6" 
                      className="flex-1 accent-primary"
                      value={currentAlbum.columns || 3}
                      onChange={(e) => setCurrentAlbum({...currentAlbum, columns: parseInt(e.target.value)})}
                    />
                    <span className="text-sm font-black text-primary w-4">{currentAlbum.columns || 3}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">排列方式 (layout)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setCurrentAlbum({...currentAlbum, layout: 'masonry'})}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${currentAlbum.layout === 'masonry' ? 'border-primary bg-primary/5 text-primary' : 'border-transparent bg-primary/5 text-slate-400 hover:bg-primary/10'}`}
                    >
                      <Maximize2 size={16} />
                      <span className="text-xs font-bold">石工 (Masonry)</span>
                    </button>
                    <button 
                      onClick={() => setCurrentAlbum({...currentAlbum, layout: 'grid'})}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${currentAlbum.layout === 'grid' ? 'border-primary bg-primary/5 text-primary' : 'border-transparent bg-primary/5 text-slate-400 hover:bg-primary/10'}`}
                    >
                      <LayoutGrid size={16} />
                      <span className="text-xs font-bold">网格 (Grid)</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Tags */}
            <section className="material-card p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-3">标签管理</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {currentAlbum.tags?.map(tag => (
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
