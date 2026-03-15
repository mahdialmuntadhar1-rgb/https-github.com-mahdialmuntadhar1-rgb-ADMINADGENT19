import React from 'react';
import { GOVERNORATES } from '../types';
import { 
  MapPin, 
  Activity, 
  ShieldCheck, 
  LayoutDashboard, 
  Upload, 
  Cpu, 
  ClipboardList, 
  BarChart3,
  MessageSquare
} from 'lucide-react';

export type ViewType = 'dashboard' | 'upload' | 'agents' | 'review' | 'analytics' | 'qc-manager';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedGovId: string;
  onGovSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, selectedGovId, onGovSelect }) => {
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'upload', label: 'CSV Import', icon: Upload },
    { id: 'agents', label: 'Agent Network', icon: Cpu },
    { id: 'review', label: 'Review Queue', icon: ClipboardList },
    { id: 'analytics', label: 'Data Progress', icon: BarChart3 },
    { id: 'qc-manager', label: 'QC Manager', icon: MessageSquare },
  ];

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 glass-panel border-r border-white/5 flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">ADMINADGENT19</h1>
            <p className="text-xs text-orange-300/60 font-medium uppercase tracking-widest">Data Factory</p>
          </div>
        </div>
        
        <nav className="space-y-1 mb-8">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Navigation</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id 
                  ? 'bg-orange-600/20 text-white border border-orange-500/30' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-4 h-4 ${currentView === item.id ? 'text-orange-400' : 'text-slate-500'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Governorates</p>
          <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-520px)] pr-2 scrollbar-hide">
            {GOVERNORATES.map((gov) => (
              <button
                key={gov.id}
                onClick={() => onGovSelect(gov.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  selectedGovId === gov.id 
                    ? 'bg-orange-600/10 text-white border border-orange-500/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${selectedGovId === gov.id ? 'text-orange-400' : 'text-slate-500 group-hover:text-orange-400'}`} />
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600" />
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
