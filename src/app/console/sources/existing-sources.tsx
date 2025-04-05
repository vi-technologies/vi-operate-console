'use client';

import React, { useState } from 'react';
import { useSources } from '@/hooks';
import { SourceConnectionCard } from '@/components/features/sources';
import { Button } from '@/components/_common/ui/button';
import { Card, CardContent } from '@/components/_common/ui/card';
import { RefreshCw, AlertTriangle, ChevronRight, Search } from 'lucide-react';
import SourceSearch from './search';

export default function ExistingSources() {
  const { sources } = useSources();
  const [expandedSourceId, setExpandedSourceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSourceExpand = (id) => {
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Existing Sources</h2>
        <div className="relative">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 border rounded-md pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {filteredSources.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No sources found matching "{searchTerm}"
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSources.map((source) => (
            <div
              key={source.id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden"
            >
              <div
                className="flex items-center p-4 cursor-pointer"
                onClick={() => toggleSourceExpand(source.id)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-md flex items-center justify-center ${source.iconBg || 'bg-blue-100'}`}
                  >
                    {source.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{source.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-3 py-0.5 bg-gray-100 text-gray-700 text-sm rounded-md">
                        {source.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center flex-1">
                  <div
                    className={`flex-1 rounded-md p-2 mx-2 text-center ${source.status === 'Healthy' ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 border' : 'border'}`}
                  >
                    <div className="text-sm">Status</div>
                    <div
                      className={`font-medium flex items-center justify-center mt-1 ${source.status === 'Healthy' ? 'text-green-600' : 'text-amber-600'}`}
                    >
                      {source.status === 'Healthy' ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                          Healthy
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                          {source.status || 'Unknown'}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 border rounded-md p-2 mx-2 text-center">
                    <div className="text-sm">Datasets</div>
                    <div className="font-bold text-lg">
                      {source.datasets || 0}
                    </div>
                  </div>

                  <div className="flex-1 border rounded-md p-2 mx-2 text-center">
                    <div className="text-sm">Models</div>
                    <div className="font-bold text-lg">
                      {source.models || 0}
                    </div>
                  </div>

                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform ml-2 ${expandedSourceId === source.id ? 'rotate-90' : ''}`}
                  />
                </div>
              </div>

              {expandedSourceId === source.id && (
                <div className="p-4 border-t">
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
                              {source.schema.tables} tables,{' '}
                              {source.schema.views} views
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <RefreshCw className="h-3 w-3 mr-2" />
                            Refresh Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm mb-2">
                          Health & Metrics
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Status:
                            </span>
                            <span className="flex items-center">
                              {source.health?.status === 'Healthy' ? (
                                <>
                                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                  {source.health.status}
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                                  {source.health?.status || 'Unknown'}
                                </>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Availability:
                            </span>
                            <span>
                              {source.health?.metrics?.availability || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Latency:
                            </span>
                            <span>
                              {source.health?.metrics?.latency || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Error Rate:
                            </span>
                            <span>
                              {source.health?.metrics?.errors || 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
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
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
