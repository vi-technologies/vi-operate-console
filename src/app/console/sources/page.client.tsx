'use client';

import React, { useState } from 'react';
import ConnectionOptions from './connection-options';
import ExistingSources from './existing-sources';
import { Page } from '@/components/_common/layout';
import { actionButton } from './artifacts';

export default function SourcesClientPage() {
  return (
    <Page
      title="Add A New Source"
      actionButton={actionButton}
      variant="container"
    >
      <ConnectionOptions />
      <ExistingSources />
    </Page>
  );
}
