export default function useEvents() {
  return {
    events: [
      {
        title: 'Agent Knowledge Assistance',
        children: (
          <>
            Triggered when agents need knowledge support
            <div className="mt-2 text-xs text-muted-foreground">
              Trigger: Chat/Voice Pattern Match
            </div>
          </>
        )
      },
      {
        title: 'Call Volume Spike Alert',
        children: (
          <>
            Triggered when call volume exceeds forecast by 20%
            <div className="mt-2 text-xs text-muted-foreground">
              Trigger: Metric Threshold
            </div>
          </>
        )
      },
      {
        title: 'Schedule Conflict Resolution',
        children: (
          <>
            Triggered when schedule conflicts are detected
            <div className="mt-2 text-xs text-muted-foreground">
              Trigger: Data Validation Error
            </div>
          </>
        )
      }
    ]
  };
}
