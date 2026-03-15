import React from 'react';
import { AgentLog } from '../types';
import { Terminal, Cpu, Zap, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

interface AgentPanelProps {
  logs: AgentLog[];
}

export const AgentPanel: React.FC<AgentPanelProps> = ({ logs }) => {
  return (
    <div className="glass-purple rounded-2xl flex flex-col h-full">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">18 Agents Network</h2>
            <p className="text-[10px] text-indigo-300/60 font-bold uppercase tracking-widest">Real-time Scraping Logs</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Wifi size={12} className="text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Live</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 scrollbar-hide">
        {logs.map((log, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={log.id} 
            className="flex gap-3 group"
          >
            <span className="text-slate-600 min-w-[80px]">{log.timestamp}</span>
            <span className={`font-bold min-w-[100px] ${
              log.type === 'success' ? 'text-emerald-400' : 
              log.type === 'error' ? 'text-rose-400' : 
              log.type === 'warning' ? 'text-amber-400' : 'text-indigo-400'
            }`}>
              [{log.governorate.toUpperCase()}]
            </span>
            <span className="text-slate-300 flex-1">{log.message}</span>
            <Zap size={12} className="text-slate-700 group-hover:text-amber-400 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-black/20 border-t border-white/5 flex items-center gap-4">
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
          />
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase">Global Sync: 65%</span>
      </div>
    </div>
  );
};
