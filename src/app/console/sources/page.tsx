'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/_common/ui/card';
import { Button } from '@/components/_common/ui/button';
import { Badge } from '@/components/_common/ui/badge';
import { Input } from '@/components/_common/ui/input';
import {
  Database,
  Search,
  ChevronRight,
  ChevronDown,
  Check,
  Clock,
  Layers,
  BarChart4,
  CloudCog,
  Snowflake,
  Boxes,
  LayoutGrid,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { Page } from '@/components/_common/layout/page';

export default function SourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSourceId, setExpandedSourceId] = useState<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleSourceExpand = (id: number) => {
    setExpandedSourceId(expandedSourceId === id ? null : id);
  };

  // Mock source data
  const sources = [
    {
      id: 1,
      name: 'Primary Data Lake',
      type: 'BigQuery',
      status: 'healthy',
      icon: <Database className="h-5 w-5 text-blue-600" />,
      iconBg: 'bg-blue-100',
      datasets: 42,
      models: 6,
      lastRefresh: '1 hour ago',
      refreshInterval: '6 hours',
      schema: {
        tables: 65,
        views: 23
      },
      health: {
        status: 'Healthy',
        metrics: {
          availability: '99.9%',
          latency: '54ms',
          errors: '0.01%'
        }
      }
    },
    {
      id: 2,
      name: 'Patient Demographics and History',
      type: 'Snowflake',
      status: 'healthy',
      icon: <Snowflake className="h-5 w-5 text-cyan-600" />,
      iconBg: 'bg-cyan-100',
      datasets: 18,
      models: 4,
      lastRefresh: '3 hours ago',
      refreshInterval: '12 hours',
      schema: {
        tables: 32,
        views: 14
      },
      health: {
        status: 'Healthy',
        metrics: {
          availability: '99.8%',
          latency: '125ms',
          errors: '0.02%'
        }
      }
    },
    {
      id: 3,
      name: 'Specialist Scheduling Data',
      type: 'Amazon Redshift',
      status: 'profiling',
      icon: <CloudCog className="h-5 w-5 text-purple-600" />,
      iconBg: 'bg-purple-100',
      datasets: 12,
      models: 3,
      lastRefresh: '2 days ago',
      refreshInterval: '1 day',
      schema: {
        tables: 18,
        views: 7
      },
      health: {
        status: 'Profiling',
        metrics: {
          availability: '98.2%',
          latency: '210ms',
          errors: '1.2%'
        }
      }
    },
    {
      id: 4,
      name: 'Discharge and Follow-Up Logs',
      type: 'PostgreSQL',
      status: 'healthy',
      icon: <Database className="h-5 w-5 text-green-600" />,
      iconBg: 'bg-green-100',
      datasets: 9,
      models: 2,
      lastRefresh: '5 hours ago',
      refreshInterval: '8 hours',
      schema: {
        tables: 14,
        views: 5
      },
      health: {
        status: 'Healthy',
        metrics: {
          availability: '99.7%',
          latency: '87ms',
          errors: '0.05%'
        }
      }
    }
  ];

  return (
    <Page
      title="Add A New Source"
      actionButton={{
        label: "New Source",
        onClick: () => console.log("New source clicked")
      }}
    >
      <div className="relative w-64 ml-auto mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Search sources..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* New Source Connection Options */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-red-200">
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
              <Boxes className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-center text-sm font-medium">Azure Blob Storage</CardTitle>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-blue-200">
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-center text-sm font-medium">BigQuery</CardTitle>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-cyan-200">
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center mb-3">
              <Snowflake className="h-6 w-6 text-cyan-600" />
            </div>
            <CardTitle className="text-center text-sm font-medium">Snowflake</CardTitle>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-red-200">
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
              <Layers className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-center text-sm font-medium">Databricks</CardTitle>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-amber-200">
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
              <BarChart4 className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle className="text-center text-sm font-medium">Google Analytics</CardTitle>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <LayoutGrid className="h-6 w-6 text-slate-600" />
            </div>
            <CardTitle className="text-center text-sm font-medium">Custom Source</CardTitle>
          </CardContent>
        </Card>
      </div>

      {/* Existing Sources Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Existing Sources</h2>
        <div className="space-y-4">
          {sources.map((source) => (
            <Card key={source.id} className="hover:shadow-md transition-all overflow-hidden">
              <div
                className="flex items-center p-4 cursor-pointer"
                onClick={() => toggleSourceExpand(source.id)}
              >
                <div className={`h-10 w-10 rounded-full ${source.iconBg} flex items-center justify-center mr-4`}>
                  {source.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{source.name}</h3>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs mr-2">{source.type}</Badge>
                        {source.status === 'healthy' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-0">
                            <Check className="h-3 w-3 mr-1" />
                            Healthy
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs px-2 py-0">
                            <Clock className="h-3 w-3 mr-1" />
                            Profiling
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Datasets</div>
                        <div className="font-medium">{source.datasets}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Models</div>
                        <div className="font-medium">{source.models}</div>
                      </div>
                      {expandedSourceId === source.id ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded section */}
              {expandedSourceId === source.id && (
                <div className="border-t px-4 py-4 bg-muted/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-white">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm mb-2">Connection Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Connection Type:</span>
                            <span>{source.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Refresh:</span>
                            <span>{source.lastRefresh}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Refresh Interval:</span>
                            <span>{source.refreshInterval}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Schema Size:</span>
                            <span>{source.schema.tables} tables, {source.schema.views} views</span>
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
                              {source.health.status === "Healthy" ? (
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
                            <span className="text-muted-foreground">Availability:</span>
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
                    <Button size="sm" variant="outline">View Datasets</Button>
                    <Button size="sm" variant="outline">Edit Connection</Button>
                    <Button size="sm">Manage Source</Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}