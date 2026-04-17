import React from 'react';
import { cn } from '@lib/utils';
import { RowProps } from './types';
import { renderRowCellContent } from './helper';
import { TableCell, TableRow } from '@/components/ui/table';

export const BaseTableRow = <T extends object>({
  item,
  columns,
  selected,
  onSelect,
  onClick,
  showSelection,
}: RowProps<T>) => {
  const maybeItemId = (item as { id?: unknown }).id;
  const rowId =
    typeof maybeItemId === 'string' || typeof maybeItemId === 'number'
      ? String(maybeItemId)
      : 'row';
  const columnWidth = columns.every((column) => column.width)
    ? undefined
    : `${100 / Math.max(columns.length, 1)}%`;

  return (
    <TableRow
      className={cn(
        'cursor-pointer border-b transition-colors hover:bg-muted/50',
        selected && 'bg-muted/80',
      )}
      onClick={() => onClick?.(item)}
    >
      {showSelection ? (
        <TableCell className="w-10 px-2 py-2">
          <input
            type="checkbox"
            aria-label="Select row"
            checked={Boolean(selected)}
            onChange={(event) => onSelect?.(event.target.checked)}
            onClick={(event) => event.stopPropagation()}
          />
        </TableCell>
      ) : null}
      {columns.map((column) => {
        return (
          <TableCell
            key={`${rowId}-${column.id}`}
            className={cn('px-3 py-2 text-xs', column.className)}
            style={{ width: column.width || columnWidth }}
          >
            {renderRowCellContent(item, column)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
