export function useApiContent() {
  return {
    apiContent: [
      {
        title: 'Forecast Data API',
        children:
          'Exposes forecast data to external systems. Endpoint: /api/forecasts'
      },
      {
        title: 'Schedule API',
        children:
          'Allows external systems to access and update schedules. Endpoint: /api/schedules'
      },
      {
        title: 'Metrics Webhook',
        children:
          'Pushes real-time metrics to external dashboards. Webhook: Configurable'
      }
    ]
  };
}
