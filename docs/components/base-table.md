# BaseTable

## Purpose

Generic table built on TanStack Table with sorting, selection, pagination callbacks, and access-aware behavior.

## Import

```tsx
import { BaseTable } from '@tarikukebede/mezmer';
```

## Required Props

- `data: T[]`

## Common Optional Props

- `columns?: Column<T>[]`
- `customRow?: Column<T>[]`
- `placeholder?: string`
- `paginationParams?: { page: number; size: number; sortBy?: string; sortOrder?: 'asc' | 'desc' }`
- `onPaginationChange?: (params) => void`
- `onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void`
- `enableSelection?: boolean`
- `onSelectionChange?: (selectedItems: T[]) => void`
- `accessRequirements?: string[]`
- `resolveAccess?: (requirement: string, mode: 'view' | 'edit') => boolean`

## Accessibility

- Selection checkboxes expose accessible labels for header and rows.

## Example

```tsx
type Row = { id: number; name: string; status: string };

const rows: Row[] = [
  { id: 1, name: 'Payment Service', status: 'active' },
  { id: 2, name: 'Audit Service', status: 'inactive' },
];

<BaseTable<Row>
  data={rows}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', sortable: true },
  ]}
  onSortChange={(sortBy, sortOrder) => console.log(sortBy, sortOrder)}
/>;
```

## RTK Query Integration

For server-side pagination and sorting, keep a single `paginationParams` state and trigger an RTK Query endpoint from it.

```tsx
import { useMemo, useState } from 'react';
import { BaseTable } from '@tarikukebede/mezmer';
import { useListServicesQuery } from './servicesApi';

type Row = { id: number; name: string; status: string };

type PaginationParams = {
  page: number;
  size: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
  page: 1,
  size: 10,
};

export function ServicesTable() {
  const [paginationParams, setPaginationParams] = useState(
    DEFAULT_PAGINATION_PARAMS,
  );

  const { data, isFetching } = useListServicesQuery(paginationParams);

  const rows = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalItems = data?.totalItems ?? 0;

  const columns = useMemo(
    () => [
      { key: 'name' as const, label: 'Name', sortable: true },
      { key: 'status' as const, label: 'Status', sortable: true },
    ],
    [],
  );

  return (
    <BaseTable<Row>
      data={rows}
      columns={columns}
      isLoading={isFetching}
      totalPages={totalPages}
      totalItems={totalItems}
      paginationParams={paginationParams}
      onPaginationChange={setPaginationParams}
      onSortChange={(sortBy, sortOrder) =>
        setPaginationParams((previous) => ({
          ...previous,
          page: 1,
          sortBy,
          sortOrder,
        }))
      }
    />
  );
}
```
