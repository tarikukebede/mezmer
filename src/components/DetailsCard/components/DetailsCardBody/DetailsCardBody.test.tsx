import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailsCardBody } from './DetailsCardBody';

describe('DetailsCardBody', () => {
  it('renders loading status when loading', () => {
    render(
      <DetailsCardBody
        isLoading
        tabs={[
          { key: 'general', label: 'General', component: <div>Body</div> },
        ]}
      />,
    );

    expect(screen.getByRole('status').textContent).toContain('Loading details');
    expect(screen.queryByRole('tablist')).toBeNull();
  });

  it('renders tabs and switches active content', () => {
    render(
      <DetailsCardBody
        isLoading={false}
        tabs={[
          {
            key: 'general',
            label: 'General',
            component: <div>General Body</div>,
          },
          {
            key: 'security',
            label: 'Security',
            component: <div>Security Body</div>,
          },
        ]}
      />,
    );

    expect(
      screen
        .getByRole('tab', { name: 'General' })
        .getAttribute('aria-selected'),
    ).toBe('true');
    expect(screen.getByRole('tabpanel').textContent).toContain('General Body');

    fireEvent.click(screen.getByRole('tab', { name: 'Security' }));

    expect(
      screen
        .getByRole('tab', { name: 'Security' })
        .getAttribute('aria-selected'),
    ).toBe('true');
    expect(screen.getByRole('tabpanel').textContent).toContain('Security Body');
  });

  it('returns null when there are no tabs and not loading', () => {
    const { container } = render(
      <DetailsCardBody isLoading={false} tabs={[]} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
