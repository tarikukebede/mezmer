import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MoreVertical } from 'lucide-react';
import { DetailsCardHeader } from './DetailsCardHeader';
import { ButtonVariant } from '@components/Button';

vi.mock('@components/Button', () => ({
  ButtonVariant: {
    Primary: 'primary',
    Destructive: 'destructive',
    Default: 'default',
  },
  Button: ({
    label,
    onClick,
    disabled,
  }: {
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button type="button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  ),
}));

vi.mock('@components/Icon', () => ({
  Icon: ({
    icon: IconComponent,
  }: {
    icon: React.ComponentType<{ 'data-testid'?: string }>;
  }) => <IconComponent data-testid="header-icon" />,
}));

interface TestData {
  id: number;
  name: string;
}

afterEach(() => {
  cleanup();
});

describe('DetailsCardHeader', () => {
  it('renders title and action buttons', () => {
    render(
      <DetailsCardHeader<TestData>
        title="Resource Details"
        icon={MoreVertical}
        data={{ id: 1, name: 'Alpha' }}
        onSave={vi.fn()}
        onDelete={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText('Resource Details')).toBeTruthy();
    expect(screen.getByTestId('header-icon')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
  });

  it('passes data to onSave, onDelete and custom button handlers', () => {
    const data: TestData = { id: 10, name: 'Bravo' };
    const onSave = vi.fn();
    const onDelete = vi.fn();
    const onCustom = vi.fn();

    render(
      <DetailsCardHeader<TestData>
        title="Resource Details"
        icon={MoreVertical}
        data={data}
        onSave={onSave}
        onDelete={onDelete}
        customButtons={[
          {
            label: 'Archive',
            onClick: onCustom,
            variant: ButtonVariant.Default,
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }));

    expect(onSave).toHaveBeenCalledWith(data);
    expect(onDelete).toHaveBeenCalledWith(data);
    expect(onCustom).toHaveBeenCalledWith(data);
  });

  it('passes null when data is undefined', () => {
    const onSave = vi.fn();

    render(
      <DetailsCardHeader<TestData>
        title="Resource Details"
        icon={MoreVertical}
        onSave={onSave}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onSave).toHaveBeenCalledWith(null);
  });

  it('calls onClose from close button', () => {
    const onClose = vi.fn();

    render(
      <DetailsCardHeader<TestData>
        title="Resource Details"
        icon={MoreVertical}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
