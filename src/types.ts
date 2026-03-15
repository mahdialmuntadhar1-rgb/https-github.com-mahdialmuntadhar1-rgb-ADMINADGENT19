export type GovernorateStatus = 'fresh' | 'stale';

export interface Governorate {
  id: string;
  name: string;
  status: GovernorateStatus;
}

export interface BusinessRecord {
  id: string;
  name: string;
  category: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'verified' | 'pending' | 'rejected';
  governorate: string;
}

export interface AgentLog {
  id: string;
  agentId: string;
  governorate: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export const GOVERNORATES: Governorate[] = [
  { id: 'baghdad', name: 'Baghdad', status: 'fresh' },
  { id: 'erbil', name: 'Erbil', status: 'fresh' },
  { id: 'sulaymaniyah', name: 'Sulaymaniyah', status: 'stale' },
  { id: 'basra', name: 'Basra', status: 'fresh' },
  { id: 'nineveh', name: 'Nineveh', status: 'fresh' },
  { id: 'kirkuk', name: 'Kirkuk', status: 'fresh' },
  { id: 'najaf', name: 'Najaf', status: 'fresh' },
  { id: 'karbala', name: 'Karbala', status: 'stale' },
  { id: 'anbar', name: 'Anbar', status: 'fresh' },
  { id: 'babil', name: 'Babil', status: 'fresh' },
  { id: 'dhi-qar', name: 'Dhi Qar', status: 'fresh' },
  { id: 'maysan', name: 'Maysan', status: 'fresh' },
  { id: 'muthanna', name: 'Muthanna', status: 'fresh' },
  { id: 'qadisiyah', name: 'Qadisiyah', status: 'fresh' },
  { id: 'diyala', name: 'Diyala', status: 'fresh' },
  { id: 'saladin', name: 'Saladin', status: 'stale' },
  { id: 'duhok', name: 'Duhok', status: 'fresh' },
  { id: 'wasit', name: 'Wasit', status: 'fresh' },
];
