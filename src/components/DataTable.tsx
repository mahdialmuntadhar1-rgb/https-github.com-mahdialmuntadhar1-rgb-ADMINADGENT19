import React from 'react';
import { BusinessRecord } from '../types';
import { ExternalLink, MapPin, Phone, Globe, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface DataTableProps {
  records: BusinessRecord[];
}

export const DataTable: React.FC<DataTableProps> = ({ records }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'flagged': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'rejected': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle2 size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'flagged': return <AlertTriangle size={14} />;
      case 'rejected': return <AlertTriangle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <h3 className="font-bold text-white">Recent Regional Records</h3>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Database</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
              <th className="px-6 py-4 font-bold">Organization</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Contact & Source</th>
              <th className="px-6 py-4 font-bold">Confidence</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {records.map((record, i) => (
              <motion.tr 
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group border-b border-white/5 hover:bg-white/5 transition-all"
              >
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-orange-400 transition-colors">{record.name}</span>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
                      <MapPin size={12} />
                      <span>{record.governorate} • {record.address}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-medium text-slate-400">
                    {record.category}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Phone size={12} className="text-orange-500/50" />
                      <span>{record.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Globe size={12} className="text-orange-500/50" />
                      <a href={record.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors flex items-center gap-1">
                        Source <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          record.confidence_score! > 90 ? 'bg-emerald-500' : 
                          record.confidence_score! > 70 ? 'bg-orange-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${record.confidence_score}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">{record.confidence_score?.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-tighter ${getStatusColor(record.validation_status!)}`}>
                    {getStatusIcon(record.validation_status!)}
                    {record.validation_status}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:bg-orange-600 hover:text-white hover:border-orange-500 transition-all">
                    <ExternalLink size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
