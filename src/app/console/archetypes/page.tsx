import { Page } from '@/components/_common/layout/page';
import { ArchetypesList } from '@/app/console/archetypes/list';
import { Metadata } from 'next';
import { actionButton } from './artifacts';

export const metadata: Metadata = {
  title: 'Archetypes',
  description: 'VI Operate Console Archetypes'
};
export default function ArchetypesPage() {
  return (
    <Page title="Archetypes" actionButton={actionButton} variant="container">
      <ArchetypesList />
    </Page>
  );
}
