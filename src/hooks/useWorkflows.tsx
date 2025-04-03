export default function useWorkflows() {
  return {
    workflows: [
      {
        title: 'Labor Forecast Workflow',
        content: <>Automated call volume prediction and staffing requirements</>
      },
      {
        title: 'Scheduling Workflow',
        content: <>Generate optimized staff schedules based on forecasts</>
      }
    ]
  };
}
