'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/_common/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/_common/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/_common/ui/button';

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    label: string;
    hidden?: boolean;
    hideOnMobile?: boolean;
  }[];
  title: string;
  description: string;
  renderRow: (item: T, index: number) => React.ReactNode;
  itemsPerPage: number;
  currentOffset: number;
  totalItems: number;
  basePath: string;
}

export function DataTable<T>({
  data,
  columns,
  title,
  description,
  renderRow,
  itemsPerPage,
  currentOffset,
  totalItems,
  basePath
}: DataTableProps<T>) {
  let router = useRouter();

  function prevPage() {
    const newOffset = Math.max(currentOffset - itemsPerPage, itemsPerPage);
    router.push(`${basePath}?offset=${newOffset}`, { scroll: false });
  }

  function nextPage() {
    router.push(`${basePath}?offset=${currentOffset + itemsPerPage}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={column.hideOnMobile ? 'hidden md:table-cell' : column.hidden ? 'hidden' : undefined}
                >
                  {column.label === 'sr-only' ? (
                    <span className="sr-only">{column.key}</span>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => renderRow(item, index))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(currentOffset - itemsPerPage, totalItems) + 1)}-{currentOffset}
            </strong>{' '}
            of <strong>{totalItems}</strong> items
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={currentOffset === itemsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={currentOffset + itemsPerPage > totalItems}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}