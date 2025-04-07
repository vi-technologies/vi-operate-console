export const inboundCallCenterMockData = {
  callVolumeData: [
    { name: 'Jan', General: 1100, Appointment: 850, Technical: 600, Billing: 450 },
    { name: 'Feb', General: 1200, Appointment: 900, Technical: 550, Billing: 500 },
    { name: 'Mar', General: 1300, Appointment: 950, Technical: 650, Billing: 550 },
    { name: 'Apr', General: 1250, Appointment: 1000, Technical: 700, Billing: 500 },
    { name: 'May', General: 1400, Appointment: 1100, Technical: 750, Billing: 600 },
    { name: 'Jun', General: 1500, Appointment: 1200, Technical: 800, Billing: 650 },
    { name: 'Jul', General: 1600, Appointment: 1300, Technical: 850, Billing: 700 },
    { name: 'Aug', General: 1700, Appointment: 1400, Technical: 900, Billing: 750 },
    { name: 'Sep', General: 1600, Appointment: 1300, Technical: 850, Billing: 700 },
    { name: 'Oct', General: 1500, Appointment: 1200, Technical: 800, Billing: 650 },
    { name: 'Nov', General: 1400, Appointment: 1100, Technical: 750, Billing: 600 },
    { name: 'Dec', General: 1300, Appointment: 1000, Technical: 700, Billing: 550 }
  ],
  staffingRequirements: [
    { name: 'Jan', Current: 32, Projected: 32 },
    { name: 'Feb', Current: 32, Projected: 34 },
    { name: 'Mar', Current: 32, Projected: 35 },
    { name: 'Apr', Current: 32, Projected: 36 },
    { name: 'May', Current: 32, Projected: 38 },
    { name: 'Jun', Current: 32, Projected: 40 },
    { name: 'Jul', Current: 32, Projected: 45 },
    { name: 'Aug', Current: 32, Projected: 48 },
    { name: 'Sep', Current: 32, Projected: 46 },
    { name: 'Oct', Current: 32, Projected: 42 },
    { name: 'Nov', Current: 32, Projected: 38 },
    { name: 'Dec', Current: 32, Projected: 36 }
  ],
  quarterlyVolume: [
    {
      name: 'Q1',
      General: 3600,
      Appointment: 2700,
      Technical: 1800,
      Billing: 1500
    },
    {
      name: 'Q2',
      General: 4150,
      Appointment: 3300,
      Technical: 2250,
      Billing: 1750
    },
    {
      name: 'Q3',
      General: 4900,
      Appointment: 4000,
      Technical: 2600,
      Billing: 2150
    },
    {
      name: 'Q4',
      General: 4200,
      Appointment: 3300,
      Technical: 2250,
      Billing: 1800
    }
  ],
  historicalCallData: {
    weekday: {
      name: 'Weekday',
      color: '#1890ff',
      points: Array.from({ length: 30 }, (_, i) => ({
        x: 8 + Math.random() * 8,
        y: 80 + Math.random() * 50
      }))
    },
    saturday: {
      name: 'Saturday',
      color: '#52c41a',
      points: Array.from({ length: 15 }, (_, i) => ({
        x: 8 + Math.random() * 6,
        y: 50 + Math.random() * 40
      }))
    },
    holiday: {
      name: 'Sunday/Holiday',
      color: '#f5222d',
      points: Array.from({ length: 15 }, (_, i) => ({
        x: 10 + Math.random() * 4,
        y: 30 + Math.random() * 30
      }))
    }
  },
  weekDemand: [
    { name: 'Mon', 'Call Volume': 120, 'Service Level': 92 },
    { name: 'Tue', 'Call Volume': 110, 'Service Level': 95 },
    { name: 'Wed', 'Call Volume': 105, 'Service Level': 96 },
    { name: 'Thu', 'Call Volume': 100, 'Service Level': 97 },
    { name: 'Fri', 'Call Volume': 115, 'Service Level': 94 },
    { name: 'Sat', 'Call Volume': 80, 'Service Level': 98 },
    { name: 'Sun', 'Call Volume': 60, 'Service Level': 99 }
  ],
  calendarData: Array.from({ length: 180 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      value: 10 + Math.floor(Math.random() * 90)
    };
  })
};
