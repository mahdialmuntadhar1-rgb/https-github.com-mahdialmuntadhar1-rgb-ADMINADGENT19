import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { GOVERNORATES } from '../types';
import { TrendingUp, CheckCircle2, Clock, AlertTriangle, Zap } from 'lucide-react';

const data = [
  { name: 'Mon', verified: 4000, pending: 2400, flagged: 400 },
  { name: 'Tue', verified: 3000, pending: 1398, flagged: 210 },
  { name: 'Wed', verified: 2000, pending: 9800, flagged: 229 },
  { name: 'Thu', verified: 2780, pending: 3908, flagged: 200 },
  { name: 'Fri', verified: 1890, pending: 4800, flagged: 218 },
  { name: 'Sat', verified: 2390, pending: 3800, flagged: 250 },
  { name: 'Sun', verified: 3490, pending: 4300, flagged: 210 },
];

const govData = GOVERNORATES.slice(0, 8).map(g => ({
  name: g.name,
  verified: Math.floor(Math.random() * 5000) + 1000,
  flagged: Math.floor(Math.random() * 500)
}));

const pieData = [
  { name: 'Verified', value: 30421, color: '#10b981' },
  { name: 'Pending', value: 1284, color: '#f59e0b' },
  { name: 'Flagged', value: 258, color: '#f43f5e' },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Data Progress Dashboard</h2>
          <p className="text-slate-400 mt-1">Comprehensive metrics on system throughput and data quality</p>
        </div>
        <div className="flex gap-3">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
            <Zap className="text-orange-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Processing Speed</p>
              <p className="text-lg font-bold text-white">1,240 <span className="text-xs font-normal text-slate-500">rec/hr</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-orange-400" />
              Processing Throughput
            </h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Verified</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500" /> Pending</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a0f00', border: '1px solid rgba(234, 88, 12, 0.2)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="verified" stroke="#10b981" fillOpacity={1} fill="url(#colorVerified)" />
                <Area type="monotone" dataKey="pending" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPending)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col">
          <h3 className="font-bold text-white mb-8">Database Composition</h3>
          <div className="flex-1 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-white/5">
          <h3 className="font-bold text-white mb-8">Governorate Breakdown</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={govData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a0f00', border: '1px solid rgba(234, 88, 12, 0.2)', borderRadius: '12px' }}
                />
                <Bar dataKey="verified" fill="#ea580c" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-white/5">
          <h3 className="font-bold text-white mb-8">System Health Metrics</h3>
          <div className="space-y-6">
            {[
              { label: 'Source Verification Accuracy', value: 99.4, icon: CheckCircle2, color: 'text-emerald-400' },
              { label: 'Avg. Processing Latency', value: 1.2, unit: 's', icon: Clock, color: 'text-amber-400' },
              { label: 'Duplicate Detection Rate', value: 12.5, icon: AlertTriangle, color: 'text-orange-400' },
              { label: 'AI Confidence Threshold', value: 85, icon: Zap, color: 'text-indigo-400' }
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl bg-white/5 ${metric.color}`}>
                    <metric.icon size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{metric.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-white">{metric.value}{metric.unit || '%'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
