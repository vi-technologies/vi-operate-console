export function useAgents() {
  return {
    agents: [
      {
        title: 'Forecasting Agent',
        children: <>Analyzes historical data to generate accurate forecasts</>
      },
      {
        title: 'Scheduling Agent',
        children: (
          <>Creates optimal schedules based on forecasts and constraints</>
        )
      },
      {
        title: 'Support Knowledge Agent',
        children: <>Retrieves relevant knowledge to assist human agents</>
      }
    ]
  };
}
