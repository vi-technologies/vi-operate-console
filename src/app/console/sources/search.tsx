'use client';

import React from 'react';
import { Input } from '@/components/_common/ui/input';
import { Search } from 'lucide-react';

interface SourceSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SourceSearch({ searchTerm, onSearchChange }: SourceSearchProps) {
  return (
    <div className="relative w-64 ml-auto mb-4">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-8"
        placeholder="Search sources..."
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
}