'use client';

import React, { useState } from 'react';
import { useSources } from '@/hooks';
import { SourceConnectionCard } from '@/components/features/sources';
import { Button } from '@/components/_common/ui/button';
import { Card, CardContent } from '@/components/_common/ui/card';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ExistingSourcesProps {
  searchTerm: string;
}

export default function ExistingSources({ searchTerm }: ExistingSourcesProps) {
  const { sources } = useSources();
  const [expandedSourceId, setExpandedSourceId] = useState<number | null>(null);

  const toggleSourceExpand = (id: number) => {
    setExpandedSourceId(expandedSourceId === id ? null : id);
  };

  // Filter sources based on search term
  const filteredSources = sources.filter(
    (source) =>
      searchTerm === '' ||
      source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Existing Sources</h2>
      
      {filteredSources.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No sources found matching "{searchTerm}"
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSources.map((source) => (
            <SourceConnectionCard
              key={source.id}
              id={source.id}
              name={source.name}
              type={source.type}
              status={source.status}
              icon={source.icon}
              iconBg={source.iconBg}
              datasets={source.datasets}
              models={source.models}
              expandedId={expandedSourceId}
              onToggleExpand={toggleSourceExpand}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-2">
                      Connection Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Connection Type:
                        </span>
                        <span>{source.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Last Refresh:
                        </span>
                        <span>{source.lastRefresh}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Refresh Interval:
                        </span>
                        <span>{source.refreshInterval}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Schema Size:
                        </span>
                        <span>
                          {source.schema.tables} tables, {source.schema.views}{' '}
                          views
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" className="w-full">
                        <RefreshCw className="h-3 w-3 mr-2" />
                        Refresh Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-2">Health & Metrics</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="flex items-center">
                          {source.health.status === 'Healthy' ? (
                            <>
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                              {source.health.status}
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                              {source.health.status}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Availability:
                        </span>
                        <span>{source.health.metrics.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Latency:</span>
                        <span>{source.health.metrics.latency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Error Rate:</span>
                        <span>{source.health.metrics.errors}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" className="w-full">
                        <AlertTriangle className="h-3 w-3 mr-2" />
                        Run Diagnostics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2 justify-end mt-4">
                <Button size="sm" variant="outline">
                  View Datasets
                </Button>
                <Button size="sm" variant="outline">
                  Edit Connection
                </Button>
                <Button size="sm">Manage Source</Button>
              </div>
            </SourceConnectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
