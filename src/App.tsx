import { useState, useEffect } from 'react';
import { Sidebar, ViewType } from './components/Sidebar';
import { CommandCenter } from './components/CommandCenter';
import { CSVUpload } from './components/CSVUpload';
import { AgentMonitoring } from './components/AgentMonitoring';
import { ReviewQueue } from './components/ReviewQueue';
import { Analytics } from './components/Analytics';
import { QCManager } from './components/QCManager';
import { BusinessRecord, GOVERNORATES } from './types';

// Mock Data Generators
const generateMockRecords = (governorateId: string): BusinessRecord[] => {
  const categories = ['Restaurant', 'Retail', 'Healthcare', 'Tech', 'Education'];
  const statuses: ('verified' | 'pending' | 'rejected' | 'flagged')[] = ['verified', 'pending', 'rejected', 'flagged'];
  
  return Array.from({ length: 8 }).map((_, i) => ({
    id: `REC-${governorateId.slice(0, 3).toUpperCase()}-${1000 + i}`,
    name: `${GOVERNORATES.find(g => g.id === governorateId)?.name} ${categories[i % categories.length]} ${i + 1}`,
    organization_type: 'Private Sector',
    category: categories[i % categories.length],
    governorate: GOVERNORATES.find(g => g.id === governorateId)?.name || 'Unknown',
    phone: '+964 770 123 4567',
    website: 'https://example.com',
    address: 'Main St, District 4',
    source_url: 'https://facebook.com/somepage',
    validation_status: statuses[i % statuses.length],
    confidence_score: 75 + Math.random() * 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    location: {
      lat: 33.3152 + (Math.random() - 0.5) * 2,
      lng: 44.3661 + (Math.random() - 0.5) * 2,
    },
  }));
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedGovId, setSelectedGovId] = useState(GOVERNORATES[0].id);
  const [records, setRecords] = useState<BusinessRecord[]>([]);

  useEffect(() => {
    setRecords(generateMockRecords(selectedGovId));
  }, [selectedGovId]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <CommandCenter selectedGovId={selectedGovId} onGovSelect={setSelectedGovId} records={records} />;
      case 'upload':
        return <CSVUpload />;
      case 'agents':
        return <AgentMonitoring />;
      case 'review':
        return <ReviewQueue />;
      case 'analytics':
        return <Analytics />;
      case 'qc-manager':
        return <QCManager />;
      default:
        return <CommandCenter selectedGovId={selectedGovId} onGovSelect={setSelectedGovId} records={records} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1a0f00] text-slate-100">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        selectedGovId={selectedGovId} 
        onGovSelect={setSelectedGovId} 
      />
      
      <main className="flex-1 ml-72 p-8 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
