import React from 'react';
import { GOVERNORATES } from '../types';
import { MapPin, Activity, ShieldCheck, AlertCircle } from 'lucide-react';

interface SidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedId, onSelect }) => {
  return (
    <aside className="w-72 h-screen fixed left-0 top-0 glass-panel border-r border-white/5 flex flex-col z-50">
      <div className="p-6 border-bottom border-white/5">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Command Center</h1>
            <p className="text-xs text-purple-300/60 font-medium uppercase tracking-widest">Admin Portal</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Governorates</p>
          <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 scrollbar-hide">
            {GOVERNORATES.map((gov) => (
              <button
                key={gov.id}
                onClick={() => onSelect(gov.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  selectedId === gov.id 
                    ? 'bg-purple-600/20 text-white border border-purple-500/30' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${selectedId === gov.id ? 'text-purple-400' : 'text-slate-500 group-hover:text-purple-400'}`} />
                  <span className="text-sm font-medium">{gov.name}</span>
                </div>
                <div className={`w-2 h-2 rounded-full shadow-sm ${gov.status === 'fresh' ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-rose-500 shadow-rose-500/50'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-6 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">Mahdi Al-Muntadhar</p>
            <p className="text-[10px] text-slate-500 truncate">Super Admin</p>
          </div>
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
};
