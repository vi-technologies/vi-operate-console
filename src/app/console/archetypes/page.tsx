'use client';

import { Page } from '@/components/_common/layout/page';
import { ArchetypesList } from '@/components/lists/archetypes-list';

export default function ArchetypesPage() {

  return (
    <Page
      title="Archetypes"
      actionButton={{
        label: "New Archetype",
        onClick: () => console.log("New archetype clicked")
      }}
      variant='container'
    >
      <ArchetypesList />
    </Page>
  );
}
