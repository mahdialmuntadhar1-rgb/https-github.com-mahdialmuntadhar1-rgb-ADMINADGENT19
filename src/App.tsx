import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { DataTable } from './components/DataTable';
import { AgentPanel } from './components/AgentPanel';
import { Database, Users, FileCheck, RefreshCw } from 'lucide-react';
import { BusinessRecord, AgentLog, GOVERNORATES } from './types';

// Mock Data Generators
const generateMockRecords = (governorateId: string): BusinessRecord[] => {
  const categories = ['Restaurant', 'Retail', 'Healthcare', 'Tech', 'Education'];
  const statuses: ('verified' | 'pending' | 'rejected')[] = ['verified', 'pending', 'rejected'];
  
  return Array.from({ length: 8 }).map((_, i) => ({
    id: `REC-${governorateId.slice(0, 3).toUpperCase()}-${1000 + i}`,
    name: `${GOVERNORATES.find(g => g.id === governorateId)?.name} ${categories[i % categories.length]} ${i + 1}`,
    category: categories[i % categories.length],
    location: {
      lat: 33.3152 + (Math.random() - 0.5) * 2,
      lng: 44.3661 + (Math.random() - 0.5) * 2,
    },
    status: statuses[i % statuses.length],
    governorate: GOVERNORATES.find(g => g.id === governorateId)?.name || 'Unknown',
  }));
};

const generateMockLogs = (): AgentLog[] => {
  const messages = [
    'Scraping business directory...',
    'Validating coordinates...',
    'Syncing with master database...',
    'New record detected: Al-Mansour Mall',
    'Verification request sent to local agent',
    'Data freshness check: OK',
  ];
  const types: ('info' | 'success' | 'warning' | 'error')[] = ['info', 'success', 'warning', 'error'];
  
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `log-${i}`,
    agentId: `agent-${Math.floor(Math.random() * 18)}`,
    governorate: GOVERNORATES[Math.floor(Math.random() * GOVERNORATES.length)].name,
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: new Date(Date.now() - i * 1000 * 60).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: types[Math.floor(Math.random() * types.length)],
  }));
};

export default function App() {
  const [selectedGovId, setSelectedGovId] = useState(GOVERNORATES[0].id);
  const [records, setRecords] = useState<BusinessRecord[]>([]);
  const [logs, setLogs] = useState<AgentLog[]>([]);

  useEffect(() => {
    setRecords(generateMockRecords(selectedGovId));
    setLogs(generateMockLogs());
  }, [selectedGovId]);

  return (
    <div className="flex min-h-screen bg-[#0f0720]">
      <Sidebar selectedId={selectedGovId} onSelect={setSelectedGovId} />
      
      <main className="flex-1 ml-72 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {GOVERNORATES.find(g => g.id === selectedGovId)?.name} Dashboard
            </h2>
            <p className="text-slate-400 mt-1">Regional data management and agent monitoring</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20">
              <RefreshCw size={16} /> Force Sync
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Records" 
            value="30,421" 
            icon={Database} 
            trend={{ value: "+12%", isPositive: true }}
            delay={0.1}
          />
          <StatCard 
            title="Active Agents" 
            value="18 / 18" 
            icon={Users} 
            delay={0.2}
          />
          <StatCard 
            title="Pending Verifications" 
            value="1,284" 
            icon={FileCheck} 
            trend={{ value: "-5%", isPositive: true }}
            delay={0.3}
          />
          <StatCard 
            title="Sync Status" 
            value="98.2%" 
            icon={RefreshCw} 
            delay={0.4}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <div className="xl:col-span-2 space-y-8">
            <DataTable records={records} />
          </div>
          
          <div className="xl:col-span-1 h-[calc(100vh-400px)] sticky top-8">
            <AgentPanel logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}
