'use client';

import React, { useState } from 'react';
import ConnectionOptions from './connection-options';
import ExistingSources from './existing-sources';
import SourceSearch from './search';

export default function SourcesPageClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="relative w-64 ml-auto mb-4">
        <SourceSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>
      <ConnectionOptions />
      <ExistingSources searchTerm={searchTerm} />
    </>
  );
}
