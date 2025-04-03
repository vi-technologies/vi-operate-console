'use client';

import React from 'react';
import { StandardPage } from '@/components/_common/layout/standard-page';
import { Input } from '@/components/_common/ui/input';
import { Search } from 'lucide-react';
import { ArchetypeCard, NotificationBanner } from '@/components/features/archetypes';
import { useArchetypes } from '@/hooks/useArchetypes';

export default function ArchetypesPage() {
  const { searchTerm, setSearchTerm, filteredArchetypes, expandedArchetypeId, toggleExpand } = useArchetypes();

  return (
    <StandardPage
      title="Archetypes"
      actionButton={{
        label: "New Archetype",
        onClick: () => console.log("New archetype clicked")
      }}
    >
      {/* Notification banner */}
      <NotificationBanner
        message="Two archetypes were updated since your last visit. Last refreshed 12 min ago"
        onAction={() => console.log("Refresh clicked")}
      />

      {/* Search input */}
      <div className="flex justify-end">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search archetypes"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Archetypes list */}
      <div className="grid gap-4">
        {filteredArchetypes.map(archetype => (
          <ArchetypeCard
            key={archetype.id}
            id={archetype.id}
            name={archetype.name}
            description={archetype.description}
            status={archetype.status}
            statusColor={archetype.statusColor}
            tablesCount={archetype.tablesCount}
            lastUpdated={archetype.lastUpdated}
            icon={archetype.icon}
            details={archetype.details}
            expandedId={expandedArchetypeId}
            onToggleExpand={toggleExpand}
          />
        ))}
      </div>
    </StandardPage>
  );
}
