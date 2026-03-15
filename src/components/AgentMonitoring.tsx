import React, { useState, useEffect } from 'react';
import { AIAgent, GOVERNORATES } from '../types';
import { Cpu, Play, Pause, RotateCcw, Activity, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const AgentMonitoring: React.FC = () => {
  const [agents, setAgents] = useState<AIAgent[]>([]);

  useEffect(() => {
    const initialAgents: AIAgent[] = GOVERNORATES.map((gov, i) => ({
      id: `agent-${gov.id}`,
      name: `Agent ${gov.name}`,
      status: i % 5 === 0 ? 'Paused' : i % 8 === 0 ? 'Error' : 'Running',
      recordsProcessed: Math.floor(Math.random() * 5000) + 1000,
      errors: Math.floor(Math.random() * 50),
      lastActivity: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      region: gov.name
    }));
    setAgents(initialAgents);

    // Simulate progress
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status !== 'Running') return agent;
        return {
          ...agent,
          recordsProcessed: agent.recordsProcessed + Math.floor(Math.random() * 5),
          lastActivity: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleAgent = (id: string, newStatus: AIAgent['status']) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">AI Agent Monitoring</h2>
          <p className="text-slate-400 mt-1">Real-time status and control of the 18-agent regional network</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
            <Pause size={16} /> Pause All
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-500 transition-all shadow-lg shadow-orange-500/20">
            <Play size={16} /> Start All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <motion.div
            layout
            key={agent.id}
            className={`glass-panel p-6 rounded-3xl border transition-all duration-300 ${
              agent.status === 'Error' ? 'border-rose-500/30' : 
              agent.status === 'Running' ? 'border-emerald-500/20' : 
              'border-white/5'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  agent.status === 'Running' ? 'bg-emerald-500/10 text-emerald-400' :
                  agent.status === 'Error' ? 'bg-rose-500/10 text-rose-400' :
                  'bg-slate-500/10 text-slate-400'
                }`}>
                  <Cpu size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{agent.name}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{agent.region}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  agent.status === 'Running' ? 'bg-emerald-500 animate-pulse' :
                  agent.status === 'Error' ? 'bg-rose-500' :
                  'bg-slate-500'
                }`} />
                <span className={`text-[10px] font-bold uppercase ${
                  agent.status === 'Running' ? 'text-emerald-400' :
                  agent.status === 'Error' ? 'text-rose-400' :
                  'text-slate-500'
                }`}>{agent.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Processed</p>
                <p className="text-lg font-bold text-white">{agent.recordsProcessed.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Errors</p>
                <p className={`text-lg font-bold ${agent.errors > 0 ? 'text-rose-400' : 'text-slate-400'}`}>{agent.errors}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
                <Clock size={12} /> {agent.lastActivity}
              </div>
              <div className="flex gap-2">
                {agent.status === 'Running' ? (
                  <button 
                    onClick={() => toggleAgent(agent.id, 'Paused')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                  >
                    <Pause size={14} />
                  </button>
                ) : (
                  <button 
                    onClick={() => toggleAgent(agent.id, 'Running')}
                    className="p-2 rounded-lg bg-orange-600/20 hover:bg-orange-600/40 text-orange-400 hover:text-white transition-all"
                  >
                    <Play size={14} />
                  </button>
                )}
                <button 
                  onClick={() => toggleAgent(agent.id, 'Running')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
