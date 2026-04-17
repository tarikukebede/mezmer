import type React from 'react';
import { cn } from '@lib/utils';
import { CellType } from './components/BaseTableCell';
import type { Column, IconVariant } from './types';
import {
  formatDateValue,
  resolveIconComponent,
  toStatusLabel,
} from './components/BaseTableCell/helper';

const isObjectLike = (value: unknown): value is Record<string, unknown> => {
  return value !== null && value !== undefined && typeof value === 'object';
};

export const getByPath = (source: object, accessor?: string): unknown => {
  if (!accessor) {
    return '';
  }

  return accessor.split('.').reduce<unknown>((value, segment) => {
    if (!isObjectLike(value)) {
      return '';
    }

    return value[segment];
  }, source);
};

export const toText = (value: unknown): string => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return '-';
};

const getRowValue = <T extends object>(item: T, column: Column<T>): unknown => {
  if (
    column.combinationAccessorKeys &&
    column.combinationAccessorKeys.length > 0
  ) {
    return column.combinationAccessorKeys
      .map((key) => getByPath(item, String(key)))
      .filter(
        (value) =>
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean',
      )
      .map(String)
      .join(' ');
  }

  return getByPath(
    item,
    column.accessorKey ? String(column.accessorKey) : undefined,
  );
};

const statusToneClass = (variant?: IconVariant): string => {
  if (variant === 'danger') {
    return 'text-red-600';
  }
  if (variant === 'success') {
    return 'text-green-600';
  }
  if (variant === 'warning') {
    return 'text-amber-600';
  }
  if (variant === 'primary') {
    return 'text-blue-600';
  }
  return 'text-muted-foreground';
};

export const renderRowCellContent = <T extends object>(
  item: T,
  column: Column<T>,
): React.ReactNode => {
  const rawValue = getRowValue(item, column);

  switch (column.type) {
    case CellType.IMAGE: {
      const imageSource = typeof rawValue === 'string' ? rawValue : '';
      return imageSource ? (
        <img
          src={imageSource}
          alt={column.header}
          className="h-8 w-8 rounded object-cover"
          loading="lazy"
        />
      ) : (
        <span className="text-xs text-muted-foreground">-</span>
      );
    }
    case CellType.AVATAR: {
      const initials = toText(rawValue)
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((segment: string) => segment[0]?.toUpperCase() ?? '')
        .join('');

      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
          {initials || '--'}
        </span>
      );
    }
    case CellType.DATE: {
      return (
        <span className="text-xs text-muted-foreground">
          {formatDateValue(rawValue)}
        </span>
      );
    }
    case CellType.STATUS:
    case CellType.CHIP: {
      const chipStyle = column.styler ? column.styler(rawValue) : '';
      return (
        <span
          className={cn(
            'inline-flex rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground',
            chipStyle,
            column.className,
          )}
        >
          {toStatusLabel(rawValue)}
        </span>
      );
    }
    case CellType.BOOLEAN: {
      return (
        <span className="text-xs text-muted-foreground">
          {rawValue ? 'Yes' : 'No'}
        </span>
      );
    }
    case CellType.DIMENSION:
    case CellType.DIMENSTION: {
      return (
        <span className="text-xs text-muted-foreground">
          {toText(rawValue)}
        </span>
      );
    }
    case CellType.MULTI_STATUS: {
      if (!Array.isArray(rawValue) || rawValue.length === 0) {
        return <span className="text-xs text-muted-foreground">-</span>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {rawValue.map((status) => {
            const label = toStatusLabel(status);
            const className =
              status !== null &&
              status !== undefined &&
              typeof status === 'object' &&
              'className' in status &&
              typeof (status as { className?: unknown }).className === 'string'
                ? (status as { className: string }).className
                : '';

            return (
              <span
                key={`${column.id}-status-${label}-${className}`}
                className={cn(
                  'inline-flex rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground',
                  column.className,
                  className,
                )}
              >
                {label}
              </span>
            );
          })}
        </div>
      );
    }
    case CellType.ICON: {
      const Icon = resolveIconComponent(column, rawValue);
      if (!Icon) {
        return <span className="text-xs text-muted-foreground">-</span>;
      }

      return (
        <span className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground">
          <Icon className="h-4 w-4" />
        </span>
      );
    }
    case CellType.ACTIONS: {
      if (!column.actions?.length) {
        return <span className="text-xs text-muted-foreground">-</span>;
      }

      return (
        <div className="flex flex-wrap items-center justify-end gap-1">
          {column.actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={`${column.id}-${action.label}`}
                type="button"
                className="inline-flex items-center gap-1 rounded border px-2 py-1 text-xs hover:bg-muted"
                onClick={(event) => {
                  event.stopPropagation();
                  action.onClick(item);
                }}
              >
                {Icon ? (
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5',
                      statusToneClass(action.iconVariant),
                    )}
                  />
                ) : null}
                <span className={statusToneClass(action.iconVariant)}>
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      );
    }
    default:
      return (
        <span className="text-xs text-muted-foreground truncate block">
          {toText(rawValue)}
        </span>
      );
  }
};
