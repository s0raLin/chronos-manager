import React, { useState, useEffect } from 'react';
import { Search, Palette, Moon, Sun, X } from 'lucide-react';



export function TopBar({ title, subtitle })  {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hue, setHue] = useState(35);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    // Update Material 3 tokens based on hue and theme
    const root = document.documentElement;
    const isDarkTheme = root.classList.contains('dark');

    if (isDarkTheme) {
      // Dark Mode - 深色背景配浅色文字
      root.style.setProperty('--md-sys-color-primary', `hsl(${hue}, 90%, 70%)`);
      root.style.setProperty('--md-sys-color-on-primary', `hsl(${hue}, 90%, 15%)`);
      root.style.setProperty('--md-sys-color-primary-container', `hsl(${hue}, 90%, 25%)`);
      root.style.setProperty('--md-sys-color-on-primary-container', `hsl(${hue}, 90%, 95%)`);
      
      root.style.setProperty('--md-sys-color-secondary', `hsl(${hue}, 25%, 70%)`);
      root.style.setProperty('--md-sys-color-on-secondary', `hsl(${hue}, 25%, 15%)`);
      root.style.setProperty('--md-sys-color-secondary-container', `hsl(${hue}, 25%, 25%)`);
      root.style.setProperty('--md-sys-color-on-secondary-container', `hsl(${hue}, 25%, 95%)`);
      
      root.style.setProperty('--md-sys-color-surface', `hsl(${hue}, 5%, 8%)`);
      root.style.setProperty('--md-sys-color-on-surface', `hsl(${hue}, 5%, 95%)`);
      root.style.setProperty('--md-sys-color-surface-variant', `hsl(${hue}, 5%, 15%)`);
      root.style.setProperty('--md-sys-color-on-surface-variant', `hsl(${hue}, 5%, 75%)`);
      
      root.style.setProperty('--md-sys-color-outline', `hsl(${hue}, 5%, 40%)`);
    } else {
      // Light Mode - 浅色背景配深色文字
      root.style.setProperty('--md-sys-color-primary', `hsl(${hue}, 90%, 45%)`);
      root.style.setProperty('--md-sys-color-on-primary', `hsl(${hue}, 90%, 100%)`);
      root.style.setProperty('--md-sys-color-primary-container', `hsl(${hue}, 90%, 85%)`);
      root.style.setProperty('--md-sys-color-on-primary-container', `hsl(${hue}, 90%, 15%)`);
      
      root.style.setProperty('--md-sys-color-secondary', `hsl(${hue}, 25%, 45%)`);
      root.style.setProperty('--md-sys-color-on-secondary', `hsl(${hue}, 25%, 100%)`);
      root.style.setProperty('--md-sys-color-secondary-container', `hsl(${hue}, 25%, 85%)`);
      root.style.setProperty('--md-sys-color-on-secondary-container', `hsl(${hue}, 25%, 15%)`);
      
      root.style.setProperty('--md-sys-color-surface', `hsl(${hue}, 10%, 98%)`);
      root.style.setProperty('--md-sys-color-on-surface', `hsl(${hue}, 10%, 10%)`);
      root.style.setProperty('--md-sys-color-surface-variant', `hsl(${hue}, 8%, 92%)`);
      root.style.setProperty('--md-sys-color-on-surface-variant', `hsl(${hue}, 10%, 35%)`);
      
      root.style.setProperty('--md-sys-color-outline', `hsl(${hue}, 8%, 40%)`);
    }
  }, [hue, isDark]);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-outline/10 bg-surface/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-on-surface">{title}</h1>
        {subtitle && (
          <>
            <span className="text-outline/40">/</span>
            <span className="text-on-surface-variant text-sm font-medium">{subtitle}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* 1. 搜索 */}
        <button className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors" title="搜索">
          <Search size={18} />
        </button>

        {/* 2. 主题颜色 */}
        <div className="relative">
          <button 
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`p-2 rounded-full transition-all flex items-center gap-2 ${
              showColorPicker ? 'bg-primary text-on-primary' : 'hover:bg-primary/10 text-primary'
            }`}
            title="主题颜色"
          >
            <Palette size={18} />
          </button>

          {showColorPicker && (
            <div className="absolute right-0 mt-2 p-4 bg-surface rounded-3xl shadow-2xl border border-outline/10 min-w-[240px] z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">调整色相</span>
                <button onClick={() => setShowColorPicker(false)} className="text-on-surface-variant hover:text-on-surface">
                  <X size={14} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="h-4 w-full rounded-full relative" style={{ 
                  background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' 
                }}>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={hue} 
                    onChange={(e) => setHue(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 size-5 bg-on-primary border-2 border-primary rounded-full shadow-md pointer-events-none transition-all"
                    style={{ left: `calc(${(hue / 360) * 100}% - 10px)` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="size-8 rounded-lg shadow-inner border border-outline/10" style={{ backgroundColor: `hsl(${hue}, 100%, 25%)` }} />
                  <span className="text-xs font-mono font-bold text-primary">色相: {hue}°</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. 切换亮暗模式 */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
          title={isDark ? "切换到亮色模式" : "切换到暗色模式"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};
