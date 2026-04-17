import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BaseTableRow } from './BaseTableRow';
import type { Column } from './types';
import { CellType } from './components/BaseTableCell';

const DotIcon = ({ className }: { className?: string }) => (
  <span data-testid="dot-icon" className={className} />
);

type RowModel = {
  id: number;
  name: string;
  createdAt: string;
  active: boolean;
  profileUrl: string;
  statuses: Array<string | { label: string; className?: string }>;
};

const rowItem: RowModel = {
  id: 1,
  name: 'alpha user',
  createdAt: '2026-01-06',
  active: true,
  profileUrl: 'https://example.com/avatar.png',
  statuses: [
    'active',
    { label: 'review', className: 'bg-green-600 text-white' },
  ],
};

describe('BaseTableRow', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders text/date/boolean types', () => {
    const columns: Column<RowModel>[] = [
      { id: 'name', header: 'Name', accessorKey: 'name', type: CellType.TEXT },
      {
        id: 'createdAt',
        header: 'Created',
        accessorKey: 'createdAt',
        type: CellType.DATE,
      },
      {
        id: 'active',
        header: 'Active',
        accessorKey: 'active',
        type: CellType.BOOLEAN,
      },
    ];

    render(
      <table>
        <tbody>
          <BaseTableRow item={rowItem} columns={columns} />
        </tbody>
      </table>,
    );

    expect(Boolean(screen.getByText('alpha user'))).toBe(true);
    expect(Boolean(screen.getByText('Jan 06, 2026'))).toBe(true);
    expect(Boolean(screen.getByText('Yes'))).toBe(true);
  });

  it('renders image/avatar/multi-status cells', () => {
    const columns: Column<RowModel>[] = [
      {
        id: 'profileUrl',
        header: 'Image',
        accessorKey: 'profileUrl',
        type: CellType.IMAGE,
      },
      {
        id: 'avatar',
        header: 'Avatar',
        accessorKey: 'name',
        type: CellType.AVATAR,
      },
      {
        id: 'statuses',
        header: 'Statuses',
        accessorKey: 'statuses',
        type: CellType.MULTI_STATUS,
      },
    ];

    render(
      <table>
        <tbody>
          <BaseTableRow item={rowItem} columns={columns} />
        </tbody>
      </table>,
    );

    expect(Boolean(screen.getByRole('img'))).toBe(true);
    expect(Boolean(screen.getByText('AU'))).toBe(true);
    expect(Boolean(screen.getByText('active'))).toBe(true);
    expect(Boolean(screen.getByText('review'))).toBe(true);
  });

  it('renders action buttons and calls action callback', () => {
    const onEdit = vi.fn();
    const columns: Column<RowModel>[] = [
      {
        id: 'actions',
        header: 'Actions',
        type: CellType.ACTIONS,
        actions: [{ label: 'Edit', onClick: onEdit }],
      },
    ];

    render(
      <table>
        <tbody>
          <BaseTableRow item={rowItem} columns={columns} />
        </tbody>
      </table>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledWith(rowItem);
  });

  it('renders status/chip/icon/dimension types', () => {
    const columns: Column<RowModel>[] = [
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'name',
        type: CellType.STATUS,
      },
      {
        id: 'chip',
        header: 'Chip',
        accessorKey: 'name',
        type: CellType.CHIP,
      },
      {
        id: 'icon',
        header: 'Icon',
        accessorKey: 'active',
        type: CellType.ICON,
        iconMapper: (value) => (value ? DotIcon : undefined),
      },
      {
        id: 'dimension',
        header: 'Dimension',
        accessorKey: 'name',
        type: CellType.DIMENSION,
      },
    ];

    render(
      <table>
        <tbody>
          <BaseTableRow item={rowItem} columns={columns} />
        </tbody>
      </table>,
    );

    expect(screen.getAllByText('alpha user').length > 0).toBe(true);
    expect(Boolean(screen.getByTestId('dot-icon'))).toBe(true);
  });
});
