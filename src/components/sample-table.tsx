'use client';

import { DataTable } from './data-display/data-table';
import { DataRow } from './data-display/data-row';
import { Badge } from '@/components/_common/ui/badge';
import Image from 'next/image';

interface SampleItem {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  imageUrl: string;
  price: number;
  stock: number;
  createdAt: Date;
}

interface SampleTableProps {
  items: SampleItem[];
  offset: number;
  totalItems: number;
}

export function SampleTable({ items, offset, totalItems }: SampleTableProps) {
  const columns = [
    { key: 'image', label: 'sr-only', hideOnMobile: true },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'price', label: 'Price', hideOnMobile: true },
    { key: 'stock', label: 'Stock', hideOnMobile: true },
    { key: 'createdAt', label: 'Created at', hideOnMobile: true },
    { key: 'actions', label: 'sr-only' }
  ];

  const handleEdit = (item: SampleItem) => {
    console.log('Edit item:', item.id);
  };

  const handleDelete = (item: SampleItem) => {
    console.log('Delete item:', item.id);
  };

  const renderRow = (item: SampleItem, index: number) => {
    return (
      <DataRow
        key={item.id}
        item={item}
        columns={[
          {
            key: 'image',
            hideOnMobile: true,
            renderCell: (item) => (
              <Image
                alt="Item image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src={item.imageUrl}
                width="64"
              />
            )
          },
          { key: 'name' },
          {
            key: 'status',
            renderCell: (item) => (
              <Badge variant="outline" className="capitalize">
                {item.status}
              </Badge>
            )
          },
          {
            key: 'price',
            hideOnMobile: true,
            renderCell: (item) => `$${item.price}`
          },
          { key: 'stock', hideOnMobile: true },
          {
            key: 'createdAt',
            hideOnMobile: true,
            renderCell: (item) => item.createdAt.toLocaleDateString('en-US')
          }
        ]}
        actions={[
          { label: 'Edit', onClick: handleEdit },
          { label: 'Delete', onClick: handleDelete }
        ]}
      />
    );
  };

  return (
    <DataTable
      data={items}
      columns={columns}
      title="Sample Items"
      description="This is a sample table demonstrating the generic data table component."
      renderRow={renderRow}
      itemsPerPage={5}
      currentOffset={offset}
      totalItems={totalItems}
      basePath="/sample"
    />
  );
}
