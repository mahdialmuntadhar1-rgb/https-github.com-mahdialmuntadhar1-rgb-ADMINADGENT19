import React, { useState } from 'react';
import { AgentLog, GOVERNORATES } from '../types';
import { 
  MessageSquare, 
  Send, 
  User, 
  Cpu, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QCManager: React.FC = () => {
  const [messages, setMessages] = useState<AgentLog[]>(
    Array.from({ length: 6 }).map((_, i) => ({
      id: `report-${i}`,
      agentId: `agent-${i}`,
      agentName: `Agent ${GOVERNORATES[i].name}`,
      governorate: GOVERNORATES[i].name,
      message: i % 2 === 0 
        ? `Completed processing 250 records. Found 12 duplicates in ${GOVERNORATES[i].name}.`
        : `Warning: Source link timeout for 5 records. Retrying in 5 minutes.`,
      timestamp: new Date(Date.now() - i * 1000 * 60 * 15).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: i % 2 === 0 ? 'success' : 'warning',
      task: i % 2 === 0 ? 'Data Normalization' : 'Source Verification'
    }))
  );

  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // In a real app, this would send instructions to the agents
    setInput('');
  };

  return (
    <div className="space-y-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">QC Manager Communication</h2>
          <p className="text-slate-400 mt-1">Direct communication channel with the 18-agent regional network</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel rounded-3xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-orange-400" />
              <h3 className="font-bold text-white">Agent Activity Feed</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time Reports</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                    msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 
                    msg.type === 'warning' ? 'bg-amber-500/10 text-amber-400' : 
                    'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    <Cpu size={20} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{msg.agentName}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter bg-white/5 px-1.5 py-0.5 rounded">
                          {msg.task}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-slate-300 leading-relaxed">
                      {msg.message}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-6 border-t border-white/5 bg-black/20">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send instructions to agents (e.g., 'Reprocess flagged records in Basra')..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-white"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-lg shadow-orange-500/20"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide">
          <div className="glass-orange p-6 rounded-3xl border border-orange-500/20">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Info size={18} className="text-orange-400" />
              Quick Instructions
            </h4>
            <div className="space-y-2">
              {[
                'Reprocess flagged records',
                'Skip invalid sources',
                'Focus on Baghdad',
                'Pause all scraping',
                'Export daily report'
              ].map((cmd, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(cmd)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-between group"
                >
                  {cmd}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              Agent Health
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Online Agents</span>
                <span className="text-xs font-bold text-emerald-400">18 / 18</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Avg. Confidence</span>
                <span className="text-xs font-bold text-white">92.4%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[92%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
