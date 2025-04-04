export function useCronJobs() {
  return {
    cronJobs: [
      {
        title: 'Daily Forecast Update',
        children: 'Runs at 1 AM daily to update forecasts. Schedule: 0 1 * * *'
      },
      {
        title: 'Weekly Schedule Generation',
        children:
          'Runs every Monday at 2 AM to create weekly schedules. Schedule: 0 2 * * 1'
      },
      {
        title: 'Data Cleanup Job',
        children:
          'Archives old data and cleans up temporary storage. Schedule: 0 3 * * 0'
      }
    ]
  };
}
