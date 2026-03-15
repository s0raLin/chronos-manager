import React, { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { mainRoutes, secondaryRoutes } from '../config/RouterConfig';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = mainRoutes;
  const secondaryItems = secondaryRoutes;

  return (
    <aside className={`${isExpanded ? 'w-64' : 'w-20'} flex-shrink-0 bg-surface-variant/20 border-r border-outline/10 flex flex-col h-full transition-all duration-300 relative group`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 size-6 bg-surface border border-outline/20 rounded-full flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform z-20"
      >
        {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <nav className="pt-8 flex-1 px-4 space-y-2 overflow-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            title={!isExpanded ? item.label : ''}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-3 py-3 rounded-full transition-all ${
                isActive 
                  ? 'bg-primary-container text-on-primary-container shadow-sm' 
                  : 'hover:bg-primary/10 text-on-surface-variant'
              }`
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            {isExpanded && <span className="font-medium truncate animate-in fade-in slide-in-from-left-2">{item.label}</span>}
          </NavLink>
        ))}
        
        <div className="py-4">
          <div className="h-px bg-outline/10 w-full" />
        </div>

        {secondaryItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            title={!isExpanded ? item.label : ''}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-3 py-3 rounded-full transition-all ${
                isActive 
                  ? 'bg-primary-container text-on-primary-container shadow-sm' 
                  : 'hover:bg-primary/10 text-on-surface-variant'
              }`
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            {isExpanded && <span className="font-medium truncate animate-in fade-in slide-in-from-left-2">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-outline/10">
        <div className="px-3 py-3 text-on-surface-variant/50 text-[10px] font-black uppercase tracking-widest text-center">
          {isExpanded ? 'V1.0.0 Stable' : 'V1'}
        </div>
      </div>
    </aside>
  );
};
