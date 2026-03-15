export type GovernorateStatus = 'fresh' | 'stale';

export interface Governorate {
  id: string;
  name: string;
  status: GovernorateStatus;
}

export type ValidationStatus = 'verified' | 'pending' | 'rejected' | 'flagged';

export interface BusinessRecord {
  id: string;
  name: string;
  organization_type: string;
  category: string;
  governorate: string;
  phone: string;
  website: string;
  address: string;
  source_url: string;
  validation_status: ValidationStatus;
  confidence_score: number;
  flag_reason?: string;
  created_at: string;
  updated_at: string;
  location: {
    lat: number;
    lng: number;
  };
}

export type AgentStatus = 'Idle' | 'Running' | 'Paused' | 'Error';

export interface AIAgent {
  id: string;
  name: string;
  status: AgentStatus;
  recordsProcessed: number;
  errors: number;
  lastActivity: string;
  region: string;
}

export interface AgentLog {
  id: string;
  agentId: string;
  agentName: string;
  governorate: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  task?: string;
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

export const CATEGORIES = [
  'Healthcare',
  'Education',
  'Retail',
  'Restaurant',
  'Technology',
  'Manufacturing',
  'Finance',
  'Non-Profit',
  'Government'
];
