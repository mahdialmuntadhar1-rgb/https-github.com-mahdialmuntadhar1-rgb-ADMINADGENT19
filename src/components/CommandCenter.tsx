import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { DataTable } from './DataTable';
import { NaturalLanguageConsole } from './NaturalLanguageConsole';
import { Database, Users, FileCheck, RefreshCw, Search, Filter, ChevronDown, AlertCircle } from 'lucide-react';
import { BusinessRecord, GOVERNORATES, CATEGORIES } from '../types';

interface CommandCenterProps {
  selectedGovId: string;
  onGovSelect: (id: string) => void;
  records: BusinessRecord[];
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ selectedGovId, onGovSelect, records }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <div className="space-y-8">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Agent Command Center</h2>
          <p className="text-slate-400 mt-1">Central control panel for managing agents and regional data</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Governorate Dropdown */}
          <div className="relative group">
            <select 
              value={selectedGovId}
              onChange={(e) => onGovSelect(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer hover:bg-white/10 transition-all"
            >
              {GOVERNORATES.map(gov => (
                <option key={gov.id} value={gov.id} className="bg-[#1a0f00]">{gov.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          {/* Category Dropdown */}
          <div className="relative group">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer hover:bg-white/10 transition-all"
            >
              <option value="All Categories" className="bg-[#1a0f00]">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="bg-[#1a0f00]">{cat}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          <div className="h-8 w-px bg-white/10 mx-2 hidden lg:block" />

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Locate organization..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-64 transition-all text-white"
            />
          </div>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard 
          title="Total Records" 
          value="30,421" 
          icon={Database} 
          trend={{ value: "+12%", isPositive: true }}
          delay={0.1}
        />
        <StatCard 
          title="Processed Today" 
          value="1,240" 
          icon={RefreshCw} 
          trend={{ value: "+8%", isPositive: true }}
          delay={0.2}
        />
        <StatCard 
          title="Pending Validation" 
          value="1,284" 
          icon={FileCheck} 
          delay={0.3}
        />
        <StatCard 
          title="Flagged Records" 
          value="258" 
          icon={AlertCircle} 
          trend={{ value: "-2%", isPositive: true }}
          delay={0.4}
        />
        <StatCard 
          title="Active AI Agents" 
          value="18" 
          icon={Users} 
          delay={0.5}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 space-y-8">
          <DataTable records={records} />
        </div>
        
        <div className="xl:col-span-1 space-y-8">
          <NaturalLanguageConsole />
          
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <RefreshCw size={18} className="text-orange-400" />
              Live Processing Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Baghdad Agent</span>
                <span className="text-emerald-400 font-bold">Running</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[75%] animate-pulse" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Erbil Agent</span>
                <span className="text-emerald-400 font-bold">Running</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[45%] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
