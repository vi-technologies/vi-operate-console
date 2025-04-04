export function useWorkflows() {
  return {
    workflows: [
      {
        title: 'Labor Forecast Workflow',
        children: (
          <>Automated call volume prediction and staffing requirements</>
        )
      },
      {
        title: 'Scheduling Workflow',
        children: <>Generate optimized staff schedules based on forecasts</>
      }
    ]
  };
}
