import type React from 'react';
import type { Row } from '@tanstack/react-table';
import { Column } from '../../types';

const getValueAtPath = (source: object, path: string): unknown => {
  const pathParts = path.split('.');
  let current: unknown = source;

  for (const part of pathParts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return '';
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current;
};

export const getRawValue = <T extends object>(
  row: Row<T>,
  column: Column<T>,
): unknown => {
  if (
    column.combinationAccessorKeys &&
    column.combinationAccessorKeys.length > 0
  ) {
    return column.combinationAccessorKeys
      .map((key) => getValueAtPath(row.original, String(key)))
      .filter(
        (value) =>
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean',
      )
      .map(String)
      .join(' ');
  }

  if (column.accessorKey) {
    return getValueAtPath(row.original, String(column.accessorKey));
  }

  return '';
};

export const getNestedValue = <T extends object>(
  row: Row<T>,
  column: Column<T>,
): string => {
  const value = getRawValue(row, column);

  if (column.transformer && value !== '') {
    return column.transformer(value);
  }

  if (value === null || value === undefined) {
    return '-';
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }

  return '-';
};

export const formatDateValue = (value: unknown): string => {
  if (!value) {
    return '-';
  }

  if (
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    !(value instanceof Date)
  ) {
    return '-';
  }

  const parsed = new Date(String(value));
  if (Number.isNaN(parsed.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(parsed);
};

export const toStatusLabel = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (
    value !== null &&
    value !== undefined &&
    typeof value === 'object' &&
    'label' in value
  ) {
    const label = (value as { label?: unknown }).label;
    if (typeof label === 'string' || typeof label === 'number') {
      return String(label);
    }
  }

  return '-';
};

export const resolveIconComponent = <T extends object>(
  column: Column<T>,
  value: unknown,
): React.ComponentType<{ className?: string }> | undefined => {
  if (column.iconMapper) {
    const mappedIcon = column.iconMapper(value);
    if (mappedIcon) {
      return mappedIcon;
    }
  }

  return column.icon;
};
