import { 
  products, 
  archetypes, 
  sources, 
  automations, 
  workflows, 
  agents, 
  forecasts, 
  schedules,
  dashboards,
  reports
} from './schema';

export const mockProducts = [
  {
    id: 1,
    imageUrl: '/placeholder.svg',
    name: 'Apple iPhone 14 Pro',
    status: 'active',
    price: '999.00',
    stock: 343,
    availableAt: new Date('2023-01-20')
  },
  {
    id: 2,
    imageUrl: '/placeholder.svg',
    name: 'Samsung Galaxy S23',
    status: 'active',
    price: '799.00',
    stock: 234,
    availableAt: new Date('2023-02-01')
  },
  {
    id: 3,
    imageUrl: '/placeholder.svg',
    name: 'Sony PlayStation 5',
    status: 'active',
    price: '499.00',
    stock: 45,
    availableAt: new Date('2023-03-10')
  },
  {
    id: 4,
    imageUrl: '/placeholder.svg',
    name: 'MacBook Pro 16"',
    status: 'active',
    price: '2499.00',
    stock: 89,
    availableAt: new Date('2023-04-01')
  },
  {
    id: 5,
    imageUrl: '/placeholder.svg',
    name: 'Apple AirPods Pro',
    status: 'active',
    price: '249.00',
    stock: 132,
    availableAt: new Date('2023-04-15')
  }
];

// Mock data for call center workforce management
export const mockArchetypes = [
  {
    id: 1,
    name: 'Call Volume Forecasting',
    description: 'Predicts call volumes based on historical data and seasonal patterns',
    type: 'forecasting',
    configParams: {
      timeFrame: 'daily',
      lookbackPeriod: 90,
      seasonalPatterns: true
    },
    status: 'active',
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-01')
  },
  {
    id: 2,
    name: 'Agent Scheduling Optimization',
    description: 'Optimizes agent schedules based on forecasted call volumes',
    type: 'scheduling',
    configParams: {
      shiftDuration: 8,
      breakDuration: 1,
      minAgentsPerShift: 3
    },
    status: 'active',
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date('2023-10-05')
  },
  {
    id: 3,
    name: 'Support Knowledge Base',
    description: 'Retrieves relevant information from knowledge base for agent assistance',
    type: 'support',
    configParams: {
      sourceMaterials: ['faq', 'procedures', 'policies'],
      maxSuggestions: 3
    },
    status: 'active',
    createdAt: new Date('2023-10-10'),
    updatedAt: new Date('2023-10-10')
  }
];

export const mockSources = [
  {
    id: 1,
    name: 'Epic Scheduling System',
    description: 'Integration with Epic Scheduling System',
    type: 'scheduling',
    connectionConfig: {
      apiKey: 'MOCK_API_KEY',
      endpoint: 'https://api.epicscheduling.example.com/v1',
      refreshInterval: 60
    },
    status: 'active',
    lastSyncAt: new Date('2023-11-01T08:00:00'),
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-09-01')
  },
  {
    id: 2,
    name: 'Call Center CRM',
    description: 'Customer data and call history from CRM',
    type: 'crm',
    connectionConfig: {
      apiKey: 'MOCK_API_KEY_2',
      endpoint: 'https://api.callcentercrm.example.com/v2',
      refreshInterval: 30
    },
    status: 'active',
    lastSyncAt: new Date('2023-11-01T09:00:00'),
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-09-05')
  },
  {
    id: 3,
    name: 'WFM System',
    description: 'Workforce management system integration',
    type: 'wfm',
    connectionConfig: {
      apiKey: 'MOCK_API_KEY_3',
      endpoint: 'https://api.wfm.example.com/v1',
      refreshInterval: 120
    },
    status: 'active',
    lastSyncAt: new Date('2023-11-01T07:30:00'),
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2023-09-10')
  }
];

export const mockAutomations = [
  {
    id: 1,
    name: 'Call Volume Forecasting',
    description: 'Automated call volume prediction based on historical patterns',
    type: 'forecasting',
    status: 'active',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15')
  },
  {
    id: 2,
    name: 'Agent Scheduling',
    description: 'Optimized agent scheduling based on forecast data',
    type: 'scheduling',
    status: 'active',
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2023-10-20')
  },
  {
    id: 3,
    name: 'Agent Assistance',
    description: 'Real-time agent assistance with knowledge retrieval',
    type: 'assistance',
    status: 'active',
    createdAt: new Date('2023-10-25'),
    updatedAt: new Date('2023-10-25')
  }
];

export const mockWorkflows = [
  {
    id: 1,
    automationId: 1,
    name: 'Daily Call Volume Forecast',
    description: 'Creates daily forecast for call volumes',
    steps: [
      { name: 'importData', params: { sourceId: 2, days: 90 } },
      { name: 'applyArchetype', params: { archetypeId: 1 } },
      { name: 'generateForecast', params: { interval: 30, days: 7 } }
    ],
    schedule: '0 1 * * *', // Run at 1 AM daily
    status: 'active',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15')
  },
  {
    id: 2,
    automationId: 2,
    name: 'Weekly Staff Scheduling',
    description: 'Creates weekly staff schedules based on forecasts',
    steps: [
      { name: 'getForecast', params: { forecastId: 'latest' } },
      { name: 'applyArchetype', params: { archetypeId: 2 } },
      { name: 'generateSchedules', params: { days: 7 } }
    ],
    schedule: '0 2 * * 1', // Run at 2 AM every Monday
    status: 'active',
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2023-10-20')
  },
  {
    id: 3,
    automationId: 3,
    name: 'Agent Knowledge Retrieval',
    description: 'Provides real-time knowledge support for agents',
    steps: [
      { name: 'listenForTrigger', params: { channels: ['chat', 'voice'] } },
      { name: 'retrieveKnowledge', params: { archetypeId: 3 } },
      { name: 'presentSuggestions', params: { format: 'sidebar' } }
    ],
    schedule: null, // Event-triggered workflow
    status: 'active',
    createdAt: new Date('2023-10-25'),
    updatedAt: new Date('2023-10-25')
  }
];

export const mockAgents = [
  {
    id: 1,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Senior Agent',
    status: 'active',
    skills: ['technical', 'billing', 'returns'],
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2023-09-01')
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Junior Agent',
    status: 'active',
    skills: ['general', 'information'],
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-09-05')
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Team Lead',
    status: 'active',
    skills: ['technical', 'billing', 'escalations', 'management'],
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2023-09-10')
  }
];

export const mockForecasts = [
  {
    id: 1,
    archetypeId: 1,
    sourceId: 2,
    name: 'Weekly Call Volume Forecast Nov 1-7',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2023-11-07'),
    interval: 30, // 30-minute intervals
    forecastData: {
      // Sample forecast data for demonstration
      intervals: [
        { 
          time: '2023-11-01T09:00:00', 
          predictedVolume: 120, 
          confidence: 0.85 
        },
        { 
          time: '2023-11-01T09:30:00', 
          predictedVolume: 145, 
          confidence: 0.83 
        },
        // Additional intervals would be here
      ]
    },
    createdAt: new Date('2023-10-31'),
    updatedAt: new Date('2023-10-31')
  },
  {
    id: 2,
    archetypeId: 1,
    sourceId: 2,
    name: 'Monthly Call Volume Forecast November',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2023-11-30'),
    interval: 60, // 60-minute intervals
    forecastData: {
      // High-level monthly forecast
      dailyAverages: [
        { date: '2023-11-01', predictedVolume: 1250, confidence: 0.82 },
        { date: '2023-11-02', predictedVolume: 1320, confidence: 0.81 },
        // Additional days would be here
      ]
    },
    createdAt: new Date('2023-10-28'),
    updatedAt: new Date('2023-10-28')
  }
];

export const mockSchedules = [
  {
    id: 1,
    agentId: 1,
    forecastId: 1,
    startTime: new Date('2023-11-01T08:00:00'),
    endTime: new Date('2023-11-01T16:00:00'),
    shiftType: 'standard',
    status: 'scheduled',
    createdAt: new Date('2023-10-25'),
    updatedAt: new Date('2023-10-25')
  },
  {
    id: 2,
    agentId: 2,
    forecastId: 1,
    startTime: new Date('2023-11-01T10:00:00'),
    endTime: new Date('2023-11-01T18:00:00'),
    shiftType: 'standard',
    status: 'scheduled',
    createdAt: new Date('2023-10-25'),
    updatedAt: new Date('2023-10-25')
  },
  {
    id: 3,
    agentId: 3,
    forecastId: 1,
    startTime: new Date('2023-11-01T12:00:00'),
    endTime: new Date('2023-11-01T20:00:00'),
    shiftType: 'evening',
    status: 'scheduled',
    createdAt: new Date('2023-10-25'),
    updatedAt: new Date('2023-10-25')
  }
];

export const mockDashboards = [
  {
    id: 1,
    name: 'Inbound Call Center Staffing',
    description: 'Overview of inbound call center metrics and staffing',
    config: {
      widgets: [
        { type: 'chart', title: 'Call Volume Forecast vs Actual', dataSource: 'forecasts', chartType: 'line' },
        { type: 'table', title: 'Today\'s Schedules', dataSource: 'schedules', filter: 'current_day' },
        { type: 'kpi', title: 'Service Level', dataSource: 'call_metrics', metric: 'service_level' }
      ],
      layout: {
        columns: 3,
        rows: 2
      }
    },
    status: 'active',
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-01')
  },
  {
    id: 2,
    name: 'Outbound Call Center Staffing',
    description: 'Overview of outbound campaign performance and staffing',
    config: {
      widgets: [
        { type: 'chart', title: 'Campaign Success Rate', dataSource: 'call_metrics', chartType: 'bar' },
        { type: 'table', title: 'Agent Performance', dataSource: 'agents', filter: 'active' },
        { type: 'kpi', title: 'Conversion Rate', dataSource: 'call_metrics', metric: 'conversion_rate' }
      ],
      layout: {
        columns: 3,
        rows: 2
      }
    },
    status: 'active',
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-10-15')
  }
];

export const mockReports = [
  {
    id: 1,
    name: 'Historical Call Center Usage',
    description: 'Detailed analysis of historical call center metrics',
    config: {
      timeframe: 'last_90_days',
      metrics: ['call_volume', 'avg_handle_time', 'service_level', 'abandon_rate'],
      groupBy: ['day_of_week', 'hour_of_day'],
      format: 'tabular'
    },
    status: 'active',
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-09-15')
  },
  {
    id: 2,
    name: 'Labor Forecast for Inbound',
    description: 'Projected staffing needs based on forecast models',
    config: {
      timeframe: 'next_14_days',
      metrics: ['predicted_volume', 'required_agents', 'scheduled_agents', 'coverage'],
      groupBy: ['day', 'hour'],
      format: 'chart_and_table'
    },
    status: 'active',
    createdAt: new Date('2023-09-20'),
    updatedAt: new Date('2023-09-20')
  }
];

export const mockData = {
  products: mockProducts,
  archetypes: mockArchetypes,
  sources: mockSources,
  automations: mockAutomations,
  workflows: mockWorkflows,
  agents: mockAgents,
  forecasts: mockForecasts,
  schedules: mockSchedules,
  dashboards: mockDashboards,
  reports: mockReports
};