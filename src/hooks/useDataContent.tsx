export default function useDataContent() {
  return {
    dataContent: [
      {
        title: 'Real-Time Call Center Metrics',
        children: (
          <>
            Live stream of call center performance metrics
            <div className="mt-2 text-xs text-muted-foreground">Status: Active</div>
          </>
        )
      },
      {
        title: 'Epic Scheduling Integration',
        children: (
          <>
            Continuous sync with Epic Scheduling System
            <div className="mt-2 text-xs text-muted-foreground">Status: Active</div>
          </>
        )
      },
      {
        title: 'Agent Activity Monitor',
        children: (
          <>
            Real-time monitoring of agent activity and status
            <div className="mt-2 text-xs text-muted-foreground">Status: Paused</div>
          </>
        )
      }
    ]
  };
}
