import React, { useState } from 'react';
import { BusinessRecord, GOVERNORATES } from '../types';
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Edit3, 
  Search,
  Filter,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ReviewQueue: React.FC = () => {
  const [records, setRecords] = useState<BusinessRecord[]>(
    Array.from({ length: 10 }).map((_, i) => ({
      id: `FLAG-${i}`,
      name: `Suspicious Org ${i + 1}`,
      organization_type: 'Private Sector',
      category: 'Retail',
      governorate: GOVERNORATES[i % GOVERNORATES.length].name,
      phone: '+964 770 123 4567',
      website: i % 3 === 0 ? 'http://broken-link.com' : 'N/A',
      address: 'Main St, District 4',
      source_url: 'https://facebook.com/somepage',
      validation_status: 'flagged',
      confidence_score: 45 + Math.random() * 20,
      flag_reason: i % 2 === 0 ? 'Missing Source Link' : 'Duplicate Entry Detected',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      location: { lat: 33, lng: 44 }
    }))
  );

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Quality Control Review</h2>
          <p className="text-slate-400 mt-1">Review and verify records flagged by AI agents</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
            <ShieldAlert className="text-orange-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Flagged Records</p>
              <p className="text-lg font-bold text-white">{records.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search queue..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-64 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:text-white transition-all">
              <Filter size={16} /> Filter by Reason
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Flag Reason</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {records.map((record) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={record.id} 
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200">{record.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin size={10} /> {record.governorate}</span>
                        <span className="text-[10px] text-slate-500">• {record.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                        <AlertCircle size={14} />
                        {record.flag_reason}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
                        <div 
                          className={`h-full ${record.confidence_score > 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${record.confidence_score}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{record.confidence_score.toFixed(1)}% Confidence</span>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={record.source_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 transition-all inline-flex items-center gap-2 text-xs"
                      >
                        <ExternalLink size={14} /> View Source
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleAction(record.id, 'approve')}
                          className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                          title="Approve"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all" title="Edit">
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleAction(record.id, 'reject')}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {records.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Queue Clear</h3>
            <p className="text-slate-500">All flagged records have been processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};
