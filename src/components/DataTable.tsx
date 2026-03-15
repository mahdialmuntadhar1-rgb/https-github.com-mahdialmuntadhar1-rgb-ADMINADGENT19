import React from 'react';
import { BusinessRecord } from '../types';
import { Search, Filter, MoreHorizontal, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface DataTableProps {
  records: BusinessRecord[];
}

export const DataTable: React.FC<DataTableProps> = ({ records }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Business Records</h2>
          <p className="text-sm text-slate-400">Manage and verify regional business data</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search records..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-64 transition-all"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-200">{record.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{record.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-400">{record.category}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-400 font-mono">
                    {record.location.lat.toFixed(4)}, {record.location.lng.toFixed(4)}
                  </div>
                  <div className="text-[10px] text-orange-400/60 font-medium uppercase tracking-tighter">{record.governorate}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {record.status === 'verified' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    )}
                    {record.status === 'pending' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                    {record.status === 'rejected' && (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-lg">
                        <XCircle size={12} /> Rejected
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-white/5 bg-white/2 flex items-center justify-between">
        <p className="text-xs text-slate-500">Showing {records.length} of 30,421 records</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white transition-colors">Previous</button>
          <button className="px-3 py-1 rounded-lg bg-orange-600 text-xs font-bold text-white hover:bg-orange-500 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};
