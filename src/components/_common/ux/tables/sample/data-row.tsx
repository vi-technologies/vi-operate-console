'use client';

import { Badge } from '@/components/_common/ui/badge';
import { Button } from '@/components/_common/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/_common/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/_common/ui/table';

interface DataRowProps<T> {
  item: T;
  columns: {
    key: string;
    renderCell?: (item: T) => React.ReactNode;
    hideOnMobile?: boolean;
  }[];
  actions?: {
    label: string;
    onClick: (item: T) => void;
  }[];
}

export function DataRow<T>({ item, columns, actions }: DataRowProps<T>) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.key}
          className={column.hideOnMobile ? 'hidden md:table-cell' : undefined}
        >
          {column.renderCell
            ? column.renderCell(item)
            : String((item as any)[column.key] || '')}
        </TableCell>
      ))}

      {actions && actions.length > 0 && (
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {actions.map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => action.onClick(item)}
                >
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
}
