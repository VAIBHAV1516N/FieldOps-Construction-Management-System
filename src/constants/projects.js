export const PROJECTS = [
  {
    id: 1,
    name: 'Riverside Tower Block A',
    status: 'active',
    startDate: '2025-01-15',
    location: 'Mumbai, MH',
    progress: 68,
    team: 24,
  },
  {
    id: 2,
    name: 'NH-48 Highway Extension',
    status: 'on-hold',
    startDate: '2024-11-03',
    location: 'Pune, MH',
    progress: 34,
    team: 41,
  },
  {
    id: 3,
    name: 'Skyline Commercial Complex',
    status: 'active',
    startDate: '2025-03-01',
    location: 'Bangalore, KA',
    progress: 12,
    team: 18,
  },
  {
    id: 4,
    name: 'Eastern Reservoir Dam',
    status: 'completed',
    startDate: '2024-06-10',
    location: 'Nashik, MH',
    progress: 100,
    team: 56,
  },
  {
    id: 5,
    name: 'Metro Depot Facility',
    status: 'active',
    startDate: '2025-02-20',
    location: 'Chennai, TN',
    progress: 47,
    team: 33,
  },
];

export const STATUS_CONFIG = {
  active: {
    label: 'Active',
    bg: '#d1fae5',
    color: '#065f46',
    dot: '#10b981',
  },
  'on-hold': {
    label: 'On Hold',
    bg: '#fef3c7',
    color: '#92400e',
    dot: '#f59e0b',
  },
  completed: {
    label: 'Completed',
    bg: '#dbeafe',
    color: '#1e40af',
    dot: '#3b82f6',
  },
};

export const WEATHER_OPTIONS = [
  { value: 'Sunny',        label: '☀️  Sunny' },
  { value: 'Partly Cloudy',label: '🌤️  Partly Cloudy' },
  { value: 'Cloudy',       label: '☁️  Cloudy' },
  { value: 'Rainy',        label: '🌧️  Rainy' },
  { value: 'Stormy',       label: '⛈️  Stormy' },
];

export const MOCK_CREDENTIALS = {
  email: 'test@test.com',
  password: '123456',
};
