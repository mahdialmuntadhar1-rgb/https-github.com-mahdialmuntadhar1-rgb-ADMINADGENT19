import React, { useState } from 'react';
import { Send, Terminal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommandResponse {
  id: string;
  command: string;
  response: string;
  timestamp: string;
}

export const NaturalLanguageConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandResponse[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmd = input.trim();
    setInput('');
    setIsProcessing(true);

    // Simulate AI interpretation
    setTimeout(() => {
      let response = "I've interpreted your command. ";
      
      if (cmd.toLowerCase().includes('clean') && cmd.toLowerCase().includes('baghdad')) {
        response += "Initiating data normalization for 1,240 records in Baghdad. Agents are now standardizing addresses and phone formats.";
      } else if (cmd.toLowerCase().includes('validate') && cmd.toLowerCase().includes('erbil')) {
        response += "Starting source verification for all 'Restaurant' entries in Erbil. 450 links queued for checking.";
      } else if (cmd.toLowerCase().includes('pause')) {
        response += "All active scraping agents have been paused. System state preserved.";
      } else if (cmd.toLowerCase().includes('flagged')) {
        response += "Filtering view to show 128 flagged records in Basra for your review.";
      } else {
        response += `Command received: "${cmd}". Executing appropriate backend functions across the agent network.`;
      }

      setHistory(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        command: cmd,
        response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }, ...prev].slice(0, 5));
      
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="glass-orange rounded-2xl flex flex-col overflow-hidden border border-orange-500/20">
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-orange-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Natural Language Console</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-orange-400 animate-pulse" />
          <span className="text-[10px] font-bold text-orange-400/60 uppercase">AI Interpreter Active</span>
        </div>
      </div>

      <div className="p-4 h-48 overflow-y-auto space-y-4 scrollbar-hide flex flex-col-reverse">
        <AnimatePresence initial={false}>
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                <span className="text-xs font-bold text-orange-400">&gt; {item.command}</span>
              </div>
              <p className="text-xs text-slate-300 pl-4 border-l border-orange-500/20 italic">
                {item.response}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        {history.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs italic">
            Type a command like "Clean Baghdad entries" or "Validate restaurants in Erbil"
          </div>
        )}
      </div>

      <form onSubmit={handleCommand} className="p-4 bg-black/20 border-t border-white/5">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type natural language command..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-white placeholder:text-slate-600"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
